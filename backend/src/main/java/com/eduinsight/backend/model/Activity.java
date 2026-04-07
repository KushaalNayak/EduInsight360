package com.eduinsight.backend.model;

import jakarta.persistence.*;

@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String task;
    @Column(name = "activity_date")
    private String date;
    private Integer score;

    public Activity() {}

    public Activity(Long id, String task, String date, Integer score) {
        this.id = id;
        this.task = task;
        this.date = date;
        this.score = score;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTask() { return task; }
    public void setTask(String task) { this.task = task; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}
