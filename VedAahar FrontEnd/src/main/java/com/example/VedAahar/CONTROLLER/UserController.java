package com.example.VedAahar.CONTROLLER;

import com.example.VedAahar.Model.OtpData;
import com.example.VedAahar.Model.Users;
import com.example.VedAahar.Repository.UserRepo;
import com.example.VedAahar.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/info")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;


    Map<String, OtpData> otpCollection=new ConcurrentHashMap();

    private static final SecureRandom random = new SecureRandom();

    @PostMapping("/user")
    public void getData(@RequestBody Users user)
    {
        System.out.println(user.toString());
    }

    @PostMapping("/addUser")
    public Boolean addUser(@RequestBody Users user)
    {

        if(userRepo.existsByEmail(user.getEmail()))
        {
            System.out.println("User already exists");
            return false;
        }
        userService.saveUser(user);
        System.out.println(user.toString());
        return true;

    }

    @PostMapping("/validateUser")               //Login using Mail and password - Working.
    public Map<String, Object> validateUser(@RequestBody Users user)
    {
        Map<String,Object> response = new HashMap<>();
        Boolean result= userService.findUser(user.getEmail(), user.getPassword());
        if (result)
        {
            System.out.println("Request Received, Attempting to logining in: ");
            response.put("status",true);
            response.put("username",userService.getUserData(user.getEmail()).getUsername());
            response.put("email",userService.getUserData(user.getEmail()).getEmail());
            response.put("prakriti",userService.getUserData(user.getEmail()).getPrakriti());

        }
        else {
            response.put("status",false);
        }
        return response;
    }

    @PostMapping("/forgetPass")
    public String forgetPass(@RequestBody Users user)
    {
        // Users dbuser=userService.getPassword(user.getUsername());

        Users dbuser=userService.getUserData(user.getEmail());

        if(dbuser==null)
        {
            return "User not found";
        }
//        String mail=user.getEmail();
//        System.out.println(mail);
//        userService.sendEmail(dbuser.getEmail(), "Forget Password","Your password for "+dbuser.getEmail()+" is : "+dbuser.getPassword());

        String mail=user.getEmail();
        int OTP= generateOtp(user.getEmail());

        System.out.println(mail);
        userService.sendEmail(dbuser.getEmail(), "\uD83D\uDD10 VedAahar Password Reset OTP","You recently requested to reset your password for your VedAahar account.\n" +
                "\n" +
                "\uD83D\uDD11 OTP:" +OTP+
                "\n " +
                "\n ⏳ This OTP will expire in 5 minutes.\n" +
                "⚠\uFE0F For your security, do not share this code with anyone.\n" +
                "\n" +
                "If this request was not made by you, you can safely ignore this email.\n" +
                "\n" +
                "Stay healthy, stay balanced \uD83C\uDF3F\n" +
                "VedAahar Team ");

        System.out.println(otpCollection);
        return "Email sent on registed email....";

    }

    public int generateOtp(String email)
    {
        int otp=100000 + random.nextInt(900000);

        OtpData otpData=new OtpData();
        otpData.setOtp(otp);
        otpData.setExpTime(LocalDateTime.now().plusMinutes(5));
        otpCollection.put(email,otpData);

        return otp;
    }

    @PostMapping("/VerifyOtp")
    public Boolean verifyOTP(@RequestBody Map<String, String> request)
    {
        String email = request.get("email");
        int OTP = Integer.parseInt(request.get("otp"));

        OtpData data = otpCollection.get(email);

        if (data == null) return false;

        // Check expiry
        if (LocalDateTime.now().isAfter(data.getExpTime())) {
            otpCollection.remove(email);
            return false;
        }

        // Check OTP match
        if (data.getOtp() == OTP) {
            otpCollection.remove(email);
            return true;
        }

        return false;
    }

   @Scheduled(fixedRate = 300000)
    public void clearExpiredOTP()
    {
        LocalDateTime now = LocalDateTime.now();

        otpCollection.entrySet().removeIf(entry ->
                entry.getValue().getExpTime().isBefore(now)
        );

        System.out.println("Expired OTPs cleaned");
    }



    @PostMapping("/resetPassword")
    public String resetPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");


        System.out.println("Email: "+email+" Password: "+password);

        boolean updated = userService.updatePassword(email, password);

        if (updated) {
            return "Password updated successfully";
        } else {
            return "User not found";
        }
    }

}
