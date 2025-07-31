package com.echobridge.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.echobridge.backend.dto.EchoRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(EchoController.class)
class EchoControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @Test
  void testEchoEndpoint_Success() throws Exception {
    EchoRequest request = new EchoRequest("Hello, World!");

    mockMvc
        .perform(
            post("/api/echo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.echo").value("Echo: Hello, World!"))
        .andExpect(jsonPath("$.timestamp").exists());
  }

  @Test
  void testEchoEndpoint_EmptyMessage() throws Exception {
    EchoRequest request = new EchoRequest("");

    mockMvc
        .perform(
            post("/api/echo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Validation failed"));
  }

  @Test
  void testEchoEndpoint_NullMessage() throws Exception {
    EchoRequest request = new EchoRequest();
    request.setMessage(null);

    mockMvc
        .perform(
            post("/api/echo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Validation failed"));
  }

  @Test
  void testEchoEndpoint_MessageTooLong() throws Exception {
    String longMessage = "a".repeat(1001);
    EchoRequest request = new EchoRequest(longMessage);

    mockMvc
        .perform(
            post("/api/echo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Validation failed"));
  }

  @Test
  void testHealthEndpoint() throws Exception {
    mockMvc
        .perform(get("/api/health"))
        .andExpect(status().isOk())
        .andExpect(content().string("Echo Bridge Backend is running!"));
  }
}
