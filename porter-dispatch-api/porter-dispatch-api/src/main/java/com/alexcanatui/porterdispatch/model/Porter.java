package com.alexcanatui.porterdispatch.model;

import com.alexcanatui.porterdispatch.exception.InvalidStateException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "porters")
public class Porter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PorterStatus status;

    /** Required by JPA. */
    protected Porter() {
    }

    public Porter(String name) {
        this.name = name;
        this.status = PorterStatus.AVAILABLE;
    }

    /** Called when the porter picks up a job. */
    public void markBusy() {
        if (status != PorterStatus.AVAILABLE) {
            throw new InvalidStateException("Porter " + id + " is " + status + ", not AVAILABLE");
        }
        status = PorterStatus.BUSY;
    }

    /** Called when the porter's job is completed or cancelled. */
    public void markAvailable() {
        status = PorterStatus.AVAILABLE;
    }

    /** Manual change by the porter, e.g. going on break or starting a shift. */
    public void changeStatus(PorterStatus newStatus) {
        if (newStatus == PorterStatus.BUSY) {
            throw new InvalidStateException("BUSY is set automatically when a porter takes a job");
        }
        if (status == PorterStatus.BUSY) {
            throw new InvalidStateException("Porter " + id + " is on a job; complete or cancel it first");
        }
        status = newStatus;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public PorterStatus getStatus() {
        return status;
    }
}
