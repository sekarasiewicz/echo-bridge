package com.echobridge.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class EchoResponse {

  private String echo;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime timestamp;

  public EchoResponse() {}

  public EchoResponse(String echo) {
    this.echo = echo;
    this.timestamp = LocalDateTime.now();
  }

  public EchoResponse(String echo, LocalDateTime timestamp) {
    this.echo = echo;
    this.timestamp = timestamp;
  }

  public String getEcho() {
    return echo;
  }

  public void setEcho(String echo) {
    this.echo = echo;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
