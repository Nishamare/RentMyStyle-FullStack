package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find all notifications for a given user
    List<Notification> findByUserUserId(Long userId);
}
