package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStatus(ProductStatus status);
}
