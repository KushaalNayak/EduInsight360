package com.eduinsight.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Healthy");
        response.put("message", "Welcome to EduInsight360 API");
        response.put("version", "1.0.0");
        response.put("documentation", "/swagger-ui/index.html");
        return response;
    }
}
