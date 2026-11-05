package com.alexcanatui.porterdispatch.config;

import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.repository.PorterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

/** Adds a few demo porters on first start-up so the API can be tried straight away. */
@Component
@Profile("!test")
public class DataSeeder implements CommandLineRunner {

    private final PorterRepository porterRepository;

    public DataSeeder(PorterRepository porterRepository) {
        this.porterRepository = porterRepository;
    }

    @Override
    public void run(String... args) {
        if (porterRepository.count() == 0) {
            porterRepository.saveAll(List.of(
                    new Porter("Porter A"),
                    new Porter("Porter B"),
                    new Porter("Porter C")));
        }
    }
}
