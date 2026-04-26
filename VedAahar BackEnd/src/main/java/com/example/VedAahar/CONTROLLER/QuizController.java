package com.example.VedAahar.CONTROLLER;

import com.example.VedAahar.Model.Quiz;
import com.example.VedAahar.Repository.QuizRepo;
import com.example.VedAahar.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin
public class QuizController {

    @Autowired
    private QuizService quizService;


    @GetMapping("/getQuestions")
    public List<Quiz> getAllQuestions() {
        return quizService.getAllQuestions();
    }
}

