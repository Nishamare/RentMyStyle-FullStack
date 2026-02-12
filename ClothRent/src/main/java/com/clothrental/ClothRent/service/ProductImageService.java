package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.ProductImage;
import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    // Add a new product image
    public ProductImage addImage(ProductImage image) {
        return productImageRepository.save(image);
    }

    // Get all images of a product
    public List<ProductImage> getImagesByProduct(Product product) {
        return productImageRepository.findByProduct(product);  // Correct parameter
    }

    // Get all product images
    public List<ProductImage> getAllImages() {
        return productImageRepository.findAll();
    }
}
