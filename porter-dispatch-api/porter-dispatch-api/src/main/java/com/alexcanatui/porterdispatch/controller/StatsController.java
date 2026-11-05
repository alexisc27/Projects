package com.alexcanatui.porterdispatch.controller;

import com.alexcanatui.porterdispatch.dto.StatsResponse;
import com.alexcanatui.porterdispatch.service.JobService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final JobService jobService;

    public StatsController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public StatsResponse stats() {
        return jobService.stats();
    }
}
