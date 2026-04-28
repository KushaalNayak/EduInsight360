package com.eduinsight.backend.config;

import com.eduinsight.backend.model.*;
import com.eduinsight.backend.repository.StudentRepository;
import com.eduinsight.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                // Create a default admin user for login
                if (userRepository.findByUsername("kushaal").isEmpty()) {
                    User admin = new User();
                    admin.setUsername("kushaal");
                    admin.setPassword(passwordEncoder.encode("password123"));
                    admin.setPhoneNumber("+910000000000"); // Placeholder phone number
                    admin.setRole("ADMIN");
                    userRepository.save(admin);
                    System.out.println("✅ Admin user created.");
                }

                // Create some default students if table is empty
                if (studentRepository.count() == 0) {
                    Student s1 = new Student();
                    s1.setId("2400033108");
                    s1.setName("Kushaal Nayak");
                    s1.setEmail("kushaal@kluniversity.in");
                    s1.setGrade("B Tech - 2nd year");
                    s1.setOverallScore(9.2);
                    s1.setAttendance(95);
                    s1.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=kushaal");
                    
                    List<Subject> subjects = new ArrayList<>();
                    Subject sub1 = new Subject();
                    sub1.setName("Data Structures");
                    sub1.setScore(92);
                    sub1.setTeacher("Dr. Smith");
                    sub1.setTrend("up");
                    subjects.add(sub1);
                    
                    s1.setSubjects(subjects);
                    s1.setStrengths(Arrays.asList("Problem Solving", "Java"));
                    s1.setWeaknesses(Arrays.asList("Time Management"));
                    s1.setRecommendations(Arrays.asList("Continue focusing on algorithmic complexity."));
                    
                    studentRepository.save(s1);

                    Student s2 = new Student();
                    s2.setId("2400033109");
                    s2.setName("John Doe");
                    s2.setEmail("john@kluniversity.in");
                    s2.setGrade("B Tech - 1st year");
                    s2.setOverallScore(8.5);
                    s2.setAttendance(88);
                    s2.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=john");
                    studentRepository.save(s2);
                    System.out.println("✅ Sample students created.");
                }
            } catch (Exception e) {
                System.err.println("⚠️ WARNING: Data seeding skipped due to error: " + e.getMessage());
                // The app will continue running even if seeding fails
            }
        };
    }
}
