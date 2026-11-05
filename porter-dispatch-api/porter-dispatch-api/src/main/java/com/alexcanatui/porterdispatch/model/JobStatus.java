package com.alexcanatui.porterdispatch.model;

/**
 * Lifecycle of a job:
 * PENDING -> ASSIGNED -> IN_PROGRESS -> COMPLETED
 * Any job that is not finished can be CANCELLED.
 */
public enum JobStatus {
    PENDING,
    ASSIGNED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}
