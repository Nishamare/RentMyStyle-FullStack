package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.entity.ProductImage;
import com.clothrental.ClothRent.repository.ProductImageRepository;
import com.clothrental.ClothRent.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product-images")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class ProductImageController {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/product/{productId}")
    public List<ProductImage> getImagesByProduct(@PathVariable Long productId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found!");
        }
        return productImageRepository.findByProduct(productOpt.get());
    }
}
