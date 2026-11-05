package com.alexcanatui.porterdispatch.dto;

import com.alexcanatui.porterdispatch.model.JobPriority;
import com.alexcanatui.porterdispatch.model.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateJobRequest(
        @NotNull JobType type,
        @NotNull JobPriority priority,
        @NotBlank @Size(max = 100) String fromLocation,
        @NotBlank @Size(max = 100) String toLocation,
        @Size(max = 500) String notes
) {
}
