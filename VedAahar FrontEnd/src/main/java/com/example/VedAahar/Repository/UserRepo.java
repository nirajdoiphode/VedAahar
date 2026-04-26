package com.example.VedAahar.Repository;


import com.example.VedAahar.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;


public interface UserRepo extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email);

    Optional<Users> findByUsername(String username);



    boolean existsByEmail(String email);
}
