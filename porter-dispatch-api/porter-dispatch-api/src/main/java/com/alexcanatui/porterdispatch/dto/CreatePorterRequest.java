package com.alexcanatui.porterdispatch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePorterRequest(@NotBlank @Size(max = 100) String name) {
}
