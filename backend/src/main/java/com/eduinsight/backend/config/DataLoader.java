package com.eduinsight.backend.config;

import com.eduinsight.backend.model.*;
import com.eduinsight.backend.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Student s1 = new Student();
                s1.setId("2400030188");
                s1.setName("Nischal Singana");
                s1.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Nischal");
                s1.setEmail("nischalsingana@kluniversity.in");
                s1.setGrade("B Tech - 2nd year");
                s1.setOverallScore(9.36);
                s1.setAttendance(85);
                s1.setSubjects(Arrays.asList(
                    new Subject(null, "Designs and Analysis of Algorithms", 92, "up", "Dr. Smith"),
                    new Subject(null, "Data Structures", 85, "stable", "Prof. Miller"),
                    new Subject(null, "Computer Networks", 78, "down", "Dr. Brown"),
                    new Subject(null, "Operating Systems", 95, "up", "Ms. Davis"),
                    new Subject(null, "Database Management Systems", 88, "stable", "Mr. Wilson")
                ));
                s1.setRecentActivity(Arrays.asList(
                    new Activity(null, "Quiz", "2026-02-15", 25),
                    new Activity(null, "Lab", "2026-02-12", 22),
                    new Activity(null, "Test", "2026-02-10", 24)
                ));
                s1.setImprovementTrends(Arrays.asList(
                    new Trend(null, "Sep", 8.8),
                    new Trend(null, "Oct", 8.2),
                    new Trend(null, "Nov", 8.0),
                    new Trend(null, "Dec", 8.5)
                ));
                s1.setStrengths(Arrays.asList("Analytical Thinking", "Problem Solving", "Creative Writing"));
                s1.setWeaknesses(Arrays.asList("Public Speaking", "Time Management"));
                s1.setRecommendations(Arrays.asList("Maintain current academic consistency.", "Participate in more group discussions to improve confidence."));
                repository.save(s1);

                Student s2 = new Student();
                s2.setId("2400033108");
                s2.setName("Kushaal Nayak");
                s2.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&accessories=prescription01");
                s2.setEmail("2400033108@kluniversity.in");
                s2.setGrade("B Tech - 2nd year");
                s2.setOverallScore(9.14);
                s2.setAttendance(88);
                s2.setSubjects(Arrays.asList(
                    new Subject(null, "Designs and Analysis of Algorithms", 90, "up", "Dr. Smith"),
                    new Subject(null, "Computer Networks", 85, "up", "Dr. Brown")
                ));
                s2.setStrengths(Arrays.asList("Web Development", "Problem Solving", "Public Speaking"));
                s2.setRecommendations(Arrays.asList("Continue focusing on full-stack development projects.", "Maintain high academic performance."));
                repository.save(s2);

                System.out.println("Database seeded with mock students.");
            }
        };
    }
}
