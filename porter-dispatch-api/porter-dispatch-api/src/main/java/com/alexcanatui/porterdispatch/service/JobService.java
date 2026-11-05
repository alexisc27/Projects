package com.alexcanatui.porterdispatch.service;

import com.alexcanatui.porterdispatch.dto.CreateJobRequest;
import com.alexcanatui.porterdispatch.dto.JobResponse;
import com.alexcanatui.porterdispatch.dto.StatsResponse;
import com.alexcanatui.porterdispatch.exception.NotFoundException;
import com.alexcanatui.porterdispatch.model.Job;
import com.alexcanatui.porterdispatch.model.JobPriority;
import com.alexcanatui.porterdispatch.model.JobStatus;
import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.model.PorterStatus;
import com.alexcanatui.porterdispatch.repository.JobRepository;
import com.alexcanatui.porterdispatch.repository.PorterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

/**
 * Business logic for jobs. Each public method is one transaction: either all of
 * its changes are saved, or none are.
 *
 * Entities loaded inside a transaction are "managed": changes to them (like
 * job.start()) are saved automatically when the transaction commits, so we
 * don't need to call save() after every change.
 */
@Service
public class JobService {

    private static final ZoneId HOSPITAL_ZONE = ZoneId.of("Europe/Dublin");

    private final JobRepository jobRepository;
    private final PorterRepository porterRepository;
    private final PorterService porterService;

    public JobService(JobRepository jobRepository, PorterRepository porterRepository, PorterService porterService) {
        this.jobRepository = jobRepository;
        this.porterRepository = porterRepository;
        this.porterService = porterService;
    }

    @Transactional
    public JobResponse create(CreateJobRequest request) {
        Job job = new Job(
                request.type(),
                request.priority(),
                request.fromLocation().trim(),
                request.toLocation().trim(),
                request.notes());
        return JobResponse.from(jobRepository.save(job));
    }

    @Transactional(readOnly = true)
    public List<JobResponse> list(JobStatus status) {
        List<Job> jobs = (status == null)
                ? jobRepository.findAllByOrderByCreatedAtDesc()
                : jobRepository.findByStatusOrderByPriorityRankAscCreatedAtAsc(status);
        return jobs.stream().map(JobResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public JobResponse get(Long id) {
        return JobResponse.from(findJob(id));
    }

    /** A dispatcher manually gives a specific job to a specific porter. */
    @Transactional
    public JobResponse assign(Long jobId, Long porterId) {
        Job job = findJob(jobId);
        Porter porter = porterService.findPorter(porterId);
        job.assignTo(porter);
        return JobResponse.from(job);
    }

    /** A porter asks for the most urgent job waiting in the queue. */
    @Transactional
    public JobResponse takeNext(Long porterId) {
        Porter porter = porterService.findPorter(porterId);
        Job job = jobRepository.findFirstByStatusOrderByPriorityRankAscCreatedAtAsc(JobStatus.PENDING)
                .orElseThrow(() -> new NotFoundException("No pending jobs in the queue"));
        job.assignTo(porter);
        return JobResponse.from(job);
    }

    @Transactional
    public JobResponse start(Long id) {
        Job job = findJob(id);
        job.start();
        return JobResponse.from(job);
    }

    @Transactional
    public JobResponse complete(Long id) {
        Job job = findJob(id);
        job.complete();
        return JobResponse.from(job);
    }

    @Transactional
    public JobResponse cancel(Long id) {
        Job job = findJob(id);
        job.cancel();
        return JobResponse.from(job);
    }

    @Transactional(readOnly = true)
    public StatsResponse stats() {
        Instant startOfToday = LocalDate.now(HOSPITAL_ZONE).atStartOfDay(HOSPITAL_ZONE).toInstant();
        List<Job> completedToday = jobRepository.findByStatusAndCompletedAtAfter(JobStatus.COMPLETED, startOfToday);

        OptionalDouble averageWaitSeconds = completedToday.stream()
                .filter(job -> job.getAssignedAt() != null)
                .mapToLong(job -> Duration.between(job.getCreatedAt(), job.getAssignedAt()).toSeconds())
                .average();
        Double averageWaitMinutes = averageWaitSeconds.isPresent()
                ? Math.round(averageWaitSeconds.getAsDouble() / 60.0 * 10) / 10.0
                : null;

        Map<JobPriority, Long> pendingByPriority = new EnumMap<>(JobPriority.class);
        for (JobPriority priority : JobPriority.values()) {
            pendingByPriority.put(priority, jobRepository.countByStatusAndPriority(JobStatus.PENDING, priority));
        }

        long active = jobRepository.countByStatus(JobStatus.ASSIGNED) + jobRepository.countByStatus(JobStatus.IN_PROGRESS);

        return new StatsResponse(
                jobRepository.countByStatus(JobStatus.PENDING),
                active,
                completedToday.size(),
                averageWaitMinutes,
                pendingByPriority,
                porterRepository.countByStatus(PorterStatus.AVAILABLE));
    }

    private Job findJob(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Job " + id + " not found"));
    }
}
