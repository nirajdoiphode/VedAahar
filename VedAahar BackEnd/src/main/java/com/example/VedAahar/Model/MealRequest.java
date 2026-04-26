package com.example.VedAahar.Model;

import lombok.Data;

@Data
public class MealRequest {          // data that we will get from Frontend and use to generaete Meal plan

        private String prakriti;
        private String ritu;
        private String goal;
        private String day_type;
        private int days;
        private String email;
        private String fasting_type;   // important
        private double lati;
        private double longi;
}
