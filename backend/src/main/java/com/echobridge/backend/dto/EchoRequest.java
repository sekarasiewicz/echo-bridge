package com.echobridge.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EchoRequest {

  @NotBlank(message = "Message cannot be empty")
  @Size(max = 1000, message = "Message cannot exceed 1000 characters")
  private String message;

  public EchoRequest() {}

  public EchoRequest(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
