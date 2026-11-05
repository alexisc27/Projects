package com.alexcanatui.porterdispatch.repository;

import com.alexcanatui.porterdispatch.model.Job;
import com.alexcanatui.porterdispatch.model.JobPriority;
import com.alexcanatui.porterdispatch.model.JobStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data generates the SQL for these methods from their names.
 */
public interface JobRepository extends JpaRepository<Job, Long> {

    /** The dispatch queue: most urgent first, then oldest first. */
    List<Job> findByStatusOrderByPriorityRankAscCreatedAtAsc(JobStatus status);

    List<Job> findAllByOrderByCreatedAtDesc();

    /**
     * Next job in the queue, locked with SELECT ... FOR UPDATE.
     * If two porters ask for the next job at the same moment, the second waits
     * for the first transaction to finish, so the same job is never handed out twice.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Job> findFirstByStatusOrderByPriorityRankAscCreatedAtAsc(JobStatus status);

    long countByStatus(JobStatus status);

    long countByStatusAndPriority(JobStatus status, JobPriority priority);

    List<Job> findByStatusAndCompletedAtAfter(JobStatus status, Instant after);
}
