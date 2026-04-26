package com.example.VedAahar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class VedAaharApplication {

	public static void main(String[] args) {
		SpringApplication.run(VedAaharApplication.class, args);
	}

}
