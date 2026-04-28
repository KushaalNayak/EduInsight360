package com.eduinsight.backend.controller;

import com.eduinsight.backend.model.AuthRequest;
import com.eduinsight.backend.model.AuthResponse;
import com.eduinsight.backend.model.User;
import com.eduinsight.backend.repository.UserRepository;
import com.eduinsight.backend.util.JwtUtil;
import com.eduinsight.backend.service.OtpService;
import com.eduinsight.backend.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow all origins (dev + production)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;

    @Autowired
    private SmsService smsService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Incorrect username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userRequest) {
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setRole("STUDENT");
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String username) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (user.getPhoneNumber() == null || user.getPhoneNumber().isEmpty()) {
                        return ResponseEntity.badRequest().body("No phone number associated with this user");
                    }
                    String otp = otpService.generateOtp(user.getPhoneNumber());
                    smsService.sendSms(user.getPhoneNumber(), "Your EduInsight360 OTP is: " + otp);
                    return ResponseEntity.ok("OTP sent to your registered phone number");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String username, @RequestParam String otp) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (otpService.validateOtp(user.getPhoneNumber(), otp)) {
                        return ResponseEntity.ok("OTP verified successfully");
                    }
                    return ResponseEntity.status(401).body("Invalid OTP");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String username, @RequestParam String otp, @RequestParam String newPassword) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (otpService.validateOtp(user.getPhoneNumber(), otp)) {
                        user.setPassword(passwordEncoder.encode(newPassword));
                        userRepository.save(user);
                        otpService.clearOtp(user.getPhoneNumber());
                        return ResponseEntity.ok("Password reset successfully");
                    }
                    return ResponseEntity.status(401).body("Invalid OTP or session expired");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }

    @PostMapping("/update-phone")
    public ResponseEntity<?> updatePhone(@RequestParam String username, @RequestParam String phoneNumber) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    user.setPhoneNumber(phoneNumber);
                    userRepository.save(user);
                    return ResponseEntity.ok("Phone number updated successfully");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }
}
