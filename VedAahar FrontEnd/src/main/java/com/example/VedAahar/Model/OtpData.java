package com.example.VedAahar.Model;
import lombok.Data;

import java.time.*;

@Data
public class OtpData {

    private int otp;
    private LocalDateTime expTime;

}
