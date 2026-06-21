package com.expensehub.backend.service.impl;

import com.expensehub.backend.service.OtpService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private static class OtpData {
        String code;
        LocalDateTime expiryTime;

        OtpData(String code, LocalDateTime expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }
    }

    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();
    private final Random random = new Random();

    @Override
    public String generateOtp(String email) {
        String code = String.format("%06d", random.nextInt(1000000));
        otpStorage.put(email, new OtpData(code, LocalDateTime.now().plusMinutes(5)));
        System.out.println("==================================================");
        System.out.println("OTP FOR EMAIL " + email + ": " + code);
        System.out.println("==================================================");
        return code;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        OtpData data = otpStorage.get(email);
        if (data == null) {
            return false;
        }
        if (data.expiryTime.isBefore(LocalDateTime.now())) {
            otpStorage.remove(email);
            return false;
        }
        boolean isValid = data.code.equals(otp);
        if (isValid) {
            otpStorage.remove(email);
        }
        return isValid;
    }
}
