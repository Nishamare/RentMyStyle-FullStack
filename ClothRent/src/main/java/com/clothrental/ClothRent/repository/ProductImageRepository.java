package com.clothrental.ClothRent.repository;

import com.clothrental.ClothRent.entity.ProductImage;
import com.clothrental.ClothRent.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    // Find all images for a given product
    List<ProductImage> findByProduct(Product product);
}
