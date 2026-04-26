package com.example.VedAahar.Model;

import java.util.Map;

public class MealPlanResponse {    //Response that we got from ML

    private Map<String, DayMeal> meal_plan;
    private String status;

    public Map<String, DayMeal> getMeal_plan() {
        return meal_plan;
    }

    public void setMeal_plan(Map<String, DayMeal> meal_plan) {
        this.meal_plan = meal_plan;
    }

    public String getStatus() {
        return status;
    }
}