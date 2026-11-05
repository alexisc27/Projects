package com.alexcanatui.porterdispatch;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Starts the whole application against an in-memory H2 database and calls the
 * real HTTP endpoints. @Transactional rolls the database back after each test.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class DispatchApiIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void porterTakesTheMostUrgentJobFirst() throws Exception {
        long porterId = createPorter("Alex");
        createJob("ROUTINE", "Ward 2", "Pharmacy");
        long urgentJobId = createJob("URGENT", "Emergency Dept", "CT Scanner");

        mvc.perform(post("/api/porters/{id}/take-next", porterId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(urgentJobId))
                .andExpect(jsonPath("$.status").value("ASSIGNED"))
                .andExpect(jsonPath("$.porterName").value("Alex"));

        mvc.perform(get("/api/porters/{id}", porterId))
                .andExpect(jsonPath("$.status").value("BUSY"));
    }

    @Test
    void jobMovesThroughItsLifecycleAndInvalidStepsAreRejected() throws Exception {
        long porterId = createPorter("Alex");
        long jobId = createJob("HIGH", "Ward 5", "Theatre 1");

        mvc.perform(post("/api/jobs/{id}/assign", jobId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"porterId\": " + porterId + "}"))
                .andExpect(status().isOk());

        // Can't complete before starting
        mvc.perform(post("/api/jobs/{id}/complete", jobId))
                .andExpect(status().isConflict());

        mvc.perform(post("/api/jobs/{id}/start", jobId))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));

        mvc.perform(post("/api/jobs/{id}/complete", jobId))
                .andExpect(jsonPath("$.status").value("COMPLETED"));

        mvc.perform(get("/api/porters/{id}", porterId))
                .andExpect(jsonPath("$.status").value("AVAILABLE"));

        mvc.perform(get("/api/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completedToday").value(1));
    }

    @Test
    void invalidJobIsRejectedWithFieldErrors() throws Exception {
        mvc.perform(post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"type\": \"PATIENT\", \"priority\": \"URGENT\", \"fromLocation\": \"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.fromLocation").exists())
                .andExpect(jsonPath("$.errors.toLocation").exists());
    }

    @Test
    void unknownJobReturns404() throws Exception {
        mvc.perform(get("/api/jobs/{id}", 999999))
                .andExpect(status().isNotFound());
    }

    @Test
    void takeNextWithEmptyQueueReturns404() throws Exception {
        long porterId = createPorter("Alex");
        mvc.perform(post("/api/porters/{id}/take-next", porterId))
                .andExpect(status().isNotFound());
    }

    private long createPorter(String name) throws Exception {
        String body = mvc.perform(post("/api/porters")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"" + name + "\"}"))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).get("id").asLong();
    }

    private long createJob(String priority, String from, String to) throws Exception {
        String json = """
                {"type": "PATIENT", "priority": "%s", "fromLocation": "%s", "toLocation": "%s"}
                """.formatted(priority, from, to);
        String body = mvc.perform(post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).get("id").asLong();
    }
}
