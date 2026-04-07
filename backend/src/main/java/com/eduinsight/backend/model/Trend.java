package com.eduinsight.backend.model;

import jakarta.persistence.*;

@Entity
public class Trend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "trend_month")
    private String month;
    private Double score;

    public Trend() {}

    public Trend(Long id, String month, Double score) {
        this.id = id;
        this.month = month;
        this.score = score;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}
