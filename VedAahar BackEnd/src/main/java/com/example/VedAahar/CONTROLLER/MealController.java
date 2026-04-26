package com.example.VedAahar.CONTROLLER;

import com.example.VedAahar.Model.*;
import com.example.VedAahar.Repository.MealRepo;
import com.example.VedAahar.Repository.UserRepo;
import com.example.VedAahar.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MealController {


    public final WebClient webClient=WebClient.create();

    @Autowired
    WeatherService weatherService;

    @Autowired
    private MealRepo mealRepo;

    @Autowired
    private UserRepo userRepo;



    @PostMapping("/generate-meal")
    public MealResponse sendMealPlan(@RequestBody MealRequest mealRequest)
    {

        System.out.println(mealRequest.toString());
        String ritu = weatherService.getRitu(
                mealRequest.getLati(),
                mealRequest.getLongi()
        );


        mealRequest.setRitu(ritu);

        mealRequest.setGoal(userRepo.findByEmail(mealRequest.getEmail()).get().getHealthGoal());
        //mealRequest.setDays(2);
        System.out.println(mealRequest.toString());
        MealPlanResponse response = webClient.post()
                .uri("http://127.0.0.1:5000/generate-plan")
                .bodyValue(mealRequest)
                .retrieve()
                .bodyToMono(MealPlanResponse.class)
                .block();

        response.getMeal_plan().forEach((day, meal) -> {
            System.out.println(day);
            System.out.println("Breakfast: " + meal.getBreakfast());
            System.out.println("Lunch: " + meal.getLunch());
            System.out.println("Dinner: " + meal.getDinner());
        });


        // Collect ML meal IDs
        Set<String> ids = new HashSet<>();

        response.getMeal_plan().values().forEach(day -> {
            ids.add(day.getBreakfast().toUpperCase());
            ids.add(day.getLunch().toUpperCase());
            ids.add(day.getDinner().toUpperCase());
        });

        // Fetch meals from DB
        List<Meal> meals = mealRepo.findByMealIdIn(ids);

        // Convert list → map
        Map<String, Meal> mealMap = new HashMap<>();

        for(Meal meal : meals){
            mealMap.put(meal.getMealId().toUpperCase(), meal);
        }

        // Build final structured response
        Map<String, MealResponse.DayMeals> finalPlan = new HashMap<>();

        response.getMeal_plan().forEach((day, dayMeal) -> {

            MealResponse.DayMeals dayMeals = new MealResponse.DayMeals();

            dayMeals.setBreakfast(mealMap.get(dayMeal.getBreakfast().toUpperCase()));
            dayMeals.setLunch(mealMap.get(dayMeal.getLunch().toUpperCase()));
            dayMeals.setDinner(mealMap.get(dayMeal.getDinner().toUpperCase()));

            finalPlan.put(day, dayMeals);
        });

        MealResponse dto = new MealResponse();
        dto.setStatus("success");
        dto.setMealPlan(finalPlan);

        System.out.println(dto.toString());
        return dto;
    }



    @PostMapping("/generate-fasting-meal")
    public List<Meal> generateFastingMeal(@RequestBody MealRequest mealRequest)
    {
        String ritu = weatherService.getRitu(
                mealRequest.getLati(),
                mealRequest.getLongi()
        );
        mealRequest.setRitu(ritu);
        mealRequest.setGoal(userRepo.findByEmail(mealRequest.getEmail()).get().getHealthGoal());
        mealRequest.setDays(1);

        System.out.println(mealRequest.toString());
        FastingMealResponse response = webClient.post()
                .uri("http://127.0.0.1:5000/generate-fasting-meal")
                .bodyValue(mealRequest)
                .retrieve()
                .bodyToMono(FastingMealResponse.class)
                .block();

        // ML returned IDs
        List<String> recommendedMeals = response.getRecommended_meals();

        // Convert to Set
        Set<String> ids = new HashSet<>(recommendedMeals);

        // Fetch from DB
        List<Meal> meals = mealRepo.findByMealIdIn(ids);

        return meals;
    }
}