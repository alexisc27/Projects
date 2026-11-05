package com.alexcanatui.porterdispatch.service;

import com.alexcanatui.porterdispatch.dto.CreatePorterRequest;
import com.alexcanatui.porterdispatch.dto.PorterResponse;
import com.alexcanatui.porterdispatch.exception.NotFoundException;
import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.model.PorterStatus;
import com.alexcanatui.porterdispatch.repository.PorterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PorterService {

    private final PorterRepository porterRepository;

    public PorterService(PorterRepository porterRepository) {
        this.porterRepository = porterRepository;
    }

    @Transactional
    public PorterResponse create(CreatePorterRequest request) {
        Porter porter = porterRepository.save(new Porter(request.name().trim()));
        return PorterResponse.from(porter);
    }

    @Transactional(readOnly = true)
    public List<PorterResponse> list() {
        return porterRepository.findAll().stream().map(PorterResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public PorterResponse get(Long id) {
        return PorterResponse.from(findPorter(id));
    }

    @Transactional
    public PorterResponse changeStatus(Long id, PorterStatus status) {
        Porter porter = findPorter(id);
        porter.changeStatus(status);
        return PorterResponse.from(porter);
    }

    Porter findPorter(Long id) {
        return porterRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Porter " + id + " not found"));
    }
}
