package com.alexcanatui.porterdispatch.dto;

import com.alexcanatui.porterdispatch.model.PorterStatus;
import jakarta.validation.constraints.NotNull;

public record UpdatePorterStatusRequest(@NotNull PorterStatus status) {
}
