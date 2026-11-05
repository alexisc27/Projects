package com.alexcanatui.porterdispatch;

import com.alexcanatui.porterdispatch.exception.InvalidStateException;
import com.alexcanatui.porterdispatch.model.Job;
import com.alexcanatui.porterdispatch.model.JobPriority;
import com.alexcanatui.porterdispatch.model.JobStatus;
import com.alexcanatui.porterdispatch.model.JobType;
import com.alexcanatui.porterdispatch.model.Porter;
import com.alexcanatui.porterdispatch.model.PorterStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Plain unit tests of the job state machine: no Spring, no database, runs in milliseconds. */
class JobTest {

    private Porter porter;
    private Job job;

    @BeforeEach
    void setUp() {
        porter = new Porter("Test Porter");
        job = new Job(JobType.PATIENT, JobPriority.URGENT, "Emergency Dept", "Radiology", null);
    }

    @Test
    void fullLifecycleFreesThePorterAtTheEnd() {
        job.assignTo(porter);
        assertThat(job.getStatus()).isEqualTo(JobStatus.ASSIGNED);
        assertThat(porter.getStatus()).isEqualTo(PorterStatus.BUSY);

        job.start();
        assertThat(job.getStatus()).isEqualTo(JobStatus.IN_PROGRESS);

        job.complete();
        assertThat(job.getStatus()).isEqualTo(JobStatus.COMPLETED);
        assertThat(job.getCompletedAt()).isNotNull();
        assertThat(porter.getStatus()).isEqualTo(PorterStatus.AVAILABLE);
    }

    @Test
    void cannotCompleteAJobThatHasNotStarted() {
        job.assignTo(porter);
        assertThatThrownBy(job::complete).isInstanceOf(InvalidStateException.class);
    }

    @Test
    void busyPorterCannotTakeASecondJob() {
        job.assignTo(porter);
        Job second = new Job(JobType.SAMPLE, JobPriority.ROUTINE, "Ward 3", "Lab", null);

        assertThatThrownBy(() -> second.assignTo(porter)).isInstanceOf(InvalidStateException.class);
        assertThat(second.getStatus()).isEqualTo(JobStatus.PENDING);
    }

    @Test
    void cancellingAnAssignedJobFreesThePorter() {
        job.assignTo(porter);
        job.cancel();

        assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELLED);
        assertThat(porter.getStatus()).isEqualTo(PorterStatus.AVAILABLE);
    }

    @Test
    void cannotCancelACompletedJob() {
        job.assignTo(porter);
        job.start();
        job.complete();

        assertThatThrownBy(job::cancel).isInstanceOf(InvalidStateException.class);
    }

    @Test
    void offDutyPorterCannotTakeJobs() {
        porter.changeStatus(PorterStatus.OFF_DUTY);
        assertThatThrownBy(() -> job.assignTo(porter)).isInstanceOf(InvalidStateException.class);
    }
}
