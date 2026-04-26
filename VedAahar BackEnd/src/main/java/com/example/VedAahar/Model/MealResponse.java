package com.example.VedAahar.Model;

import lombok.Data;

import java.util.Map;

@Data
public class MealResponse {

    private String status;
    private Map<String, DayMeals> mealPlan;

    @Data
    public static class DayMeals {

        private Meal breakfast;
        private Meal lunch;
        private Meal dinner;

    }
}
