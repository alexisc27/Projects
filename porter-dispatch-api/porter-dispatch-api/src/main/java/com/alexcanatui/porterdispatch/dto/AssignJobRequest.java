package com.alexcanatui.porterdispatch.dto;

import jakarta.validation.constraints.NotNull;

public record AssignJobRequest(@NotNull Long porterId) {
}
