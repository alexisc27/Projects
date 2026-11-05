package com.alexcanatui.porterdispatch.model;

import com.alexcanatui.porterdispatch.exception.InvalidStateException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * A request to move a patient, equipment or a sample from one place to another.
 *
 * The state machine lives here, in the entity, rather than in the service.
 * That way a job can never be put into an invalid state, whoever calls it.
 */
@Entity
@Table(name = "jobs", indexes = {
        @Index(name = "idx_jobs_queue", columnList = "status, priorityRank, createdAt")
})
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobPriority priority;

    @Column(nullable = false)
    private int priorityRank;

    @Column(nullable = false, length = 100)
    private String fromLocation;

    @Column(nullable = false, length = 100)
    private String toLocation;

    @Column(length = 500)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "porter_id")
    private Porter porter;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant assignedAt;
    private Instant startedAt;
    private Instant completedAt;

    /** Required by JPA. */
    protected Job() {
    }

    public Job(JobType type, JobPriority priority, String fromLocation, String toLocation, String notes) {
        this.type = type;
        this.priority = priority;
        this.priorityRank = priority.rank();
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.notes = notes;
        this.status = JobStatus.PENDING;
        this.createdAt = Instant.now();
    }

    public void assignTo(Porter newPorter) {
        requireStatus(JobStatus.PENDING, "assign");
        newPorter.markBusy();
        this.porter = newPorter;
        this.status = JobStatus.ASSIGNED;
        this.assignedAt = Instant.now();
    }

    public void start() {
        requireStatus(JobStatus.ASSIGNED, "start");
        this.status = JobStatus.IN_PROGRESS;
        this.startedAt = Instant.now();
    }

    public void complete() {
        requireStatus(JobStatus.IN_PROGRESS, "complete");
        this.status = JobStatus.COMPLETED;
        this.completedAt = Instant.now();
        porter.markAvailable();
    }

    public void cancel() {
        if (status == JobStatus.COMPLETED || status == JobStatus.CANCELLED) {
            throw new InvalidStateException("Job " + id + " is already " + status);
        }
        if (porter != null) {
            porter.markAvailable();
        }
        this.status = JobStatus.CANCELLED;
    }

    private void requireStatus(JobStatus expected, String action) {
        if (status != expected) {
            throw new InvalidStateException(
                    "Cannot " + action + " job " + id + ": it is " + status + ", expected " + expected);
        }
    }

    public Long getId() {
        return id;
    }

    public JobType getType() {
        return type;
    }

    public JobPriority getPriority() {
        return priority;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public String getNotes() {
        return notes;
    }

    public JobStatus getStatus() {
        return status;
    }

    public Porter getPorter() {
        return porter;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getAssignedAt() {
        return assignedAt;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }
}
