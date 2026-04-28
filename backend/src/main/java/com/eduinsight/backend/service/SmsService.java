package com.eduinsight.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void init() {
        if (!accountSid.equals("YOUR_SID")) {
            Twilio.init(accountSid, authToken);
        }
    }

    public void sendSms(String to, String body) {
        // Ensure the number is in international format (E.164)
        if (!to.startsWith("+")) {
            to = "+91" + to; 
        }
        
        if (accountSid.equals("YOUR_SID")) {
            System.out.println("⚠️ MOCK SMS to " + to + ": " + body);
            return;
        }

        try {
            Message.creator(
                    new PhoneNumber(to),
                    new PhoneNumber(twilioPhoneNumber),
                    body
            ).create();
            System.out.println("✅ SMS sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("❌ Twilio Error: " + e.getMessage());
            // We don't rethrow so the API doesn't crash with a 500 error
        }
    }
}
