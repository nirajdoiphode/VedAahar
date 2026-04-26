package com.example.VedAahar.Service;

import ch.qos.logback.core.joran.spi.HttpUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {


    private final WebClient webClient;

    public WeatherService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://json.freeastrologyapi.com").build();
    }
    public String getRitu(double lat, double lon) {

        LocalDateTime now = LocalDateTime.now();

        Map<String, Object> body = new HashMap<>();
        body.put("year", now.getYear());
        body.put("month", now.getMonthValue());
        body.put("date", now.getDayOfMonth());
        body.put("hours", now.getHour());
        body.put("minutes", now.getMinute());
        body.put("seconds", now.getSecond());
        body.put("latitude", lat);
        body.put("longitude", lon);
        body.put("timezone", 5.5);
        body.put("observation_point", "topocentric");

        return webClient.post()
                .uri("/rituinfo")
                .header("Content-Type", "application/json")
                .header("x-api-key", "ra6LqIcPZZ318oXI3A8Df4iAtNkKPEq212KwrL2f")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(res -> {

                    Map<String, Object> output = (Map<String, Object>) res.get("output");

                    if (output == null) {
                        System.out.println("API Response: " + res);
                        return "Unknown";
                    }

                    Object nameObj = output.get("name");

                    if (nameObj == null) {
                        System.out.println("Missing name: " + res);
                        return "Unknown";
                    }

                    String name = nameObj.toString();
                    System.out.println("Ritu: " + name.split("\\(")[0].trim());

                    return name.split("\\(")[0].trim();
                })
                .onErrorReturn("Vasant")
                .block();


    }
}


