package com.example.VedAahar.Repository;

import com.example.VedAahar.Model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MealRepo extends JpaRepository<Meal, String> {

    List<Meal> findByMealIdIn(Set<String> meal_id);
}
