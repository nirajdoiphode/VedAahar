package com.example.VedAahar.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class Users {

    @Id
    int id;

    String username;
    String password;
    String email;
    String phone;
    String healthGoal;
    String prakriti;
}
