package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get product by id
    public Product getProductById(Long id) {
        Optional<Product> opt = productRepository.findById(id);
        return opt.orElse(null); // return null if not found
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add new product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Update existing product
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    // Delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
