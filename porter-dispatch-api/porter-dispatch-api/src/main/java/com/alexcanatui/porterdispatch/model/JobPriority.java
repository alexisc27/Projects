package com.alexcanatui.porterdispatch.model;

/**
 * Priority of a job. The rank is stored in the database so the queue can be
 * sorted numerically (1 = most urgent). Sorting the enum name as text would
 * put HIGH before ROUTINE before URGENT, which is wrong.
 */
public enum JobPriority {
    URGENT(1),
    HIGH(2),
    ROUTINE(3);

    private final int rank;

    JobPriority(int rank) {
        this.rank = rank;
    }

    public int rank() {
        return rank;
    }
}
