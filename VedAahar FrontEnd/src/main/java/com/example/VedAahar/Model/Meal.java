package com.example.VedAahar.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="meals")
public class Meal {                                 //Use for DB.

    @Id
    @Column(name="meal_id")
    private String mealId;

    @Column(name="meal_name")
    private String mealName;

    @Column(name="recipe_url")
    private String recipeUrl;
}
