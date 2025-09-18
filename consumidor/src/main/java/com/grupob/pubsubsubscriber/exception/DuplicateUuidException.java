package com.grupob.pubsubsubscriber.exception;

public class DuplicateUuidException extends Exception {
    

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DuplicateUuidException(String message) {
        super(message);
    }
    
    public DuplicateUuidException(String message, Throwable cause) {
        super(message, cause);
    }
}
