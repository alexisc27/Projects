package com.alexcanatui.porterdispatch.controller;

import com.alexcanatui.porterdispatch.dto.AssignJobRequest;
import com.alexcanatui.porterdispatch.dto.CreateJobRequest;
import com.alexcanatui.porterdispatch.dto.JobResponse;
import com.alexcanatui.porterdispatch.model.JobStatus;
import com.alexcanatui.porterdispatch.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

/**
 * Controllers only handle HTTP: they read the request, call the service and
 * return the result. No business rules live here.
 */
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<JobResponse> create(@Valid @RequestBody CreateJobRequest request) {
        JobResponse created = jobService.create(request);
        return ResponseEntity.created(URI.create("/api/jobs/" + created.id())).body(created);
    }

    /** All jobs (newest first), or the queue for one status (most urgent first). */
    @GetMapping
    public List<JobResponse> list(@RequestParam(required = false) JobStatus status) {
        return jobService.list(status);
    }

    @GetMapping("/{id}")
    public JobResponse get(@PathVariable Long id) {
        return jobService.get(id);
    }

    @PostMapping("/{id}/assign")
    public JobResponse assign(@PathVariable Long id, @Valid @RequestBody AssignJobRequest request) {
        return jobService.assign(id, request.porterId());
    }

    @PostMapping("/{id}/start")
    public JobResponse start(@PathVariable Long id) {
        return jobService.start(id);
    }

    @PostMapping("/{id}/complete")
    public JobResponse complete(@PathVariable Long id) {
        return jobService.complete(id);
    }

    @PostMapping("/{id}/cancel")
    public JobResponse cancel(@PathVariable Long id) {
        return jobService.cancel(id);
    }
}
