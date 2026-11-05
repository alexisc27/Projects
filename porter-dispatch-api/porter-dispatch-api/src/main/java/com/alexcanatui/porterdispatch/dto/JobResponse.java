package com.alexcanatui.porterdispatch.dto;

import com.alexcanatui.porterdispatch.model.Job;
import com.alexcanatui.porterdispatch.model.JobPriority;
import com.alexcanatui.porterdispatch.model.JobStatus;
import com.alexcanatui.porterdispatch.model.JobType;
import com.alexcanatui.porterdispatch.model.Porter;

import java.time.Instant;

/**
 * What the API returns for a job. Entities are never returned directly, so the
 * database structure can change without breaking clients.
 */
public record JobResponse(
        Long id,
        JobType type,
        JobPriority priority,
        String fromLocation,
        String toLocation,
        String notes,
        JobStatus status,
        Long porterId,
        String porterName,
        Instant createdAt,
        Instant assignedAt,
        Instant startedAt,
        Instant completedAt
) {
    public static JobResponse from(Job job) {
        Porter porter = job.getPorter();
        return new JobResponse(
                job.getId(),
                job.getType(),
                job.getPriority(),
                job.getFromLocation(),
                job.getToLocation(),
                job.getNotes(),
                job.getStatus(),
                porter == null ? null : porter.getId(),
                porter == null ? null : porter.getName(),
                job.getCreatedAt(),
                job.getAssignedAt(),
                job.getStartedAt(),
                job.getCompletedAt()
        );
    }
}
