package com.eduinsight.backend.controller;

import com.eduinsight.backend.model.Student;
import com.eduinsight.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173") // Default Vite port
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable String id, @RequestBody Student studentDetails) {
        return studentService.getStudentById(id)
                .map(student -> {
                    student.setName(studentDetails.getName());
                    student.setEmail(studentDetails.getEmail());
                    student.setGrade(studentDetails.getGrade());
                    student.setOverallScore(studentDetails.getOverallScore());
                    student.setAttendance(studentDetails.getAttendance());
                    student.setStatus(studentDetails.getStatus());
                    student.setSubjects(studentDetails.getSubjects());
                    student.setRecentActivity(studentDetails.getRecentActivity());
                    student.setImprovementTrends(studentDetails.getImprovementTrends());
                    student.setStrengths(studentDetails.getStrengths());
                    student.setWeaknesses(studentDetails.getWeaknesses());
                    student.setRecommendations(studentDetails.getRecommendations());
                    return ResponseEntity.ok(studentService.saveStudent(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export")
    public ResponseEntity<String> exportToCSV() {
        List<Student> students = studentService.getAllStudents();
        StringBuilder csv = new StringBuilder();
        csv.append("Name,ID,Email,Grade,CGPA,Attendance,Status\n");
        for (Student s : students) {
            csv.append(s.getName()).append(",")
               .append(s.getId()).append(",")
               .append(s.getEmail()).append(",")
               .append(s.getGrade()).append(",")
               .append(s.getOverallScore()).append(",")
               .append(s.getAttendance()).append(",")
               .append(s.getStatus()).append("\n");
        }
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=students.csv")
                .body(csv.toString());
    }
}

