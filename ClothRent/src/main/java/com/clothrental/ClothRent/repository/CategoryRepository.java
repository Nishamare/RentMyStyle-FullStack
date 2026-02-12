package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> { }
