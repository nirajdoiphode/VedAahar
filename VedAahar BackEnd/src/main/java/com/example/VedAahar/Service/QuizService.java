package com.example.VedAahar.Service;

import com.example.VedAahar.Model.Quiz;
import com.example.VedAahar.Repository.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuizService {

    @Autowired
    private QuizRepo quizRepo;

    public List<Quiz> getAllQuestions() {
        return quizRepo.findAll();
    }
}

