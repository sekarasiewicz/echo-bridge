package com.echobridge.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.echobridge.backend.dto.EchoRequest;
import com.echobridge.backend.dto.EchoResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EchoController {
    
    @PostMapping("/echo")
    public ResponseEntity<EchoResponse> echo(@Valid @RequestBody EchoRequest request) {
        // Process the message (simple echo for now, can be extended with more complex logic)
        String processedMessage = "Echo: " + request.getMessage();
        
        EchoResponse response = new EchoResponse(processedMessage);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Echo Bridge Backend is running!");
    }
} 