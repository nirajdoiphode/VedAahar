package com.example.VedAahar.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "prakriti_quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String question;
    private String option1;
    private String option2;
    private String option3;

}
