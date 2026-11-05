package com.alexcanatui.porterdispatch.dto;

import com.alexcanatui.porterdispatch.model.JobPriority;

import java.util.Map;

/**
 * @param averageWaitMinutes average time from a job being requested to a porter
 *                           taking it, over jobs completed today; null if none yet
 */
public record StatsResponse(
        long pendingJobs,
        long activeJobs,
        long completedToday,
        Double averageWaitMinutes,
        Map<JobPriority, Long> pendingByPriority,
        long availablePorters
) {
}
