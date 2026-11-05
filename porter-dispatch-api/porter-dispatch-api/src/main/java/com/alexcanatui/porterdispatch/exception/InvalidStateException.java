package com.alexcanatui.porterdispatch.exception;

/** Mapped to HTTP 409 Conflict: the request is valid but not allowed right now. */
public class InvalidStateException extends RuntimeException {
    public InvalidStateException(String message) {
        super(message);
    }
}
