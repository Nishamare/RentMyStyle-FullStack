package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Notification;
import com.clothrental.ClothRent.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findByUserUserId(userId);
    }

    public Notification markAsRead(Long notificationId) {
        Optional<Notification> notifOpt = notificationRepository.findById(notificationId);
        if (notifOpt.isPresent()) {
            Notification notif = notifOpt.get();
            notif.setRead(true);
            return notificationRepository.save(notif);
        }
        return null;
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
