package com.example.VedAahar.CONTROLLER;

import com.example.VedAahar.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @PostMapping("/weather")
    public String getWeather(@RequestBody Map<String,Double> body)
    {

        return weatherService.getRitu(body.get("lat"), body.get("lon"));
    }


}
