package com.example.VedAahar.Model;

import lombok.Data;
import java.util.List;

@Data
public class FastingMealResponse {

        private String fasting_type;
        private List<String> recommended_meals;
        private String status;

}
