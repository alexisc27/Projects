package com.alexcanatui.porterdispatch.repository;

import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.model.PorterStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PorterRepository extends JpaRepository<Porter, Long> {

    long countByStatus(PorterStatus status);
}
