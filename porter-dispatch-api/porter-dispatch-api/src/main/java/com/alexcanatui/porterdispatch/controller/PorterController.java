package com.alexcanatui.porterdispatch.controller;

import com.alexcanatui.porterdispatch.dto.CreatePorterRequest;
import com.alexcanatui.porterdispatch.dto.JobResponse;
import com.alexcanatui.porterdispatch.dto.PorterResponse;
import com.alexcanatui.porterdispatch.dto.UpdatePorterStatusRequest;
import com.alexcanatui.porterdispatch.service.JobService;
import com.alexcanatui.porterdispatch.service.PorterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/porters")
public class PorterController {

    private final PorterService porterService;
    private final JobService jobService;

    public PorterController(PorterService porterService, JobService jobService) {
        this.porterService = porterService;
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<PorterResponse> create(@Valid @RequestBody CreatePorterRequest request) {
        PorterResponse created = porterService.create(request);
        return ResponseEntity.created(URI.create("/api/porters/" + created.id())).body(created);
    }

    @GetMapping
    public List<PorterResponse> list() {
        return porterService.list();
    }

    @GetMapping("/{id}")
    public PorterResponse get(@PathVariable Long id) {
        return porterService.get(id);
    }

    @PatchMapping("/{id}/status")
    public PorterResponse changeStatus(@PathVariable Long id, @Valid @RequestBody UpdatePorterStatusRequest request) {
        return porterService.changeStatus(id, request.status());
    }

    /** The porter takes the most urgent pending job. */
    @PostMapping("/{id}/take-next")
    public JobResponse takeNext(@PathVariable Long id) {
        return jobService.takeNext(id);
    }
}
