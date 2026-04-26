package com.example.VedAahar.Service;

import com.example.VedAahar.Model.Users;
import com.example.VedAahar.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JavaMailSender mailSender;


    //Registration
    public Users saveUser(Users users)
    {
        return userRepo.save(users);
    }

    //Find user Exist or not  (user validation)
    public  Boolean findUser(String email, String password)
    {

        Optional<Users> user = userRepo.findByEmail(email);
        System.out.println(user.isPresent());

//        String data=user.get().getPassword();
//        System.out.println(data);
        if(user.isPresent())
        {
            return user.get().getPassword().equals(password);
        }
        return false;
    }

    // Forget Pass mail sending
    public void sendEmail(String to,String subject, String body)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public Users getPassword(String username)
    {
         Users user=userRepo.findByUsername(username).orElse(null);
         return user;
    }

    public Users getUserData(String email)
    {
        Optional<Users> user = userRepo.findByEmail(email);

        return user.orElse(null);
    }

    public boolean updatePassword(String email, String newPassword) {

        Users user=userRepo.findByEmail(email).orElse(null);

        if(user==null)
        {
            return false;
        }

        user.setPassword(newPassword);
        userRepo.save(user);

        return true;
    }


}
