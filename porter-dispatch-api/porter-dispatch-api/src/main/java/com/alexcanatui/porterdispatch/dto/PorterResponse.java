package com.alexcanatui.porterdispatch.dto;

import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.model.PorterStatus;

public record PorterResponse(Long id, String name, PorterStatus status) {

    public static PorterResponse from(Porter porter) {
        return new PorterResponse(porter.getId(), porter.getName(), porter.getStatus());
    }
}
