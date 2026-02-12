// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.Product;
// import com.clothrental.ClothRent.entity.ProductStatus;
// import com.clothrental.ClothRent.repository.ProductRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/products")
// public class ProductController {

//     @Autowired
//     private ProductRepository productRepository;

//     // ------------------- ADD PRODUCT -------------------
//     @PostMapping("/add")
//     public Product addProduct(@RequestBody Product product) {
//         if (product.getStatus() == null) {
//             product.setStatus(ProductStatus.AVAILABLE);
//         }
//         return productRepository.save(product);
//     }

//     // ------------------- LIST ALL PRODUCTS -------------------
//     @GetMapping
//     public List<Product> getAllProducts() {
//         return productRepository.findAll();
//     }

//     // ------------------- GET PRODUCT BY ID -------------------
//     @GetMapping("/{id}")
//     public Product getProductById(@PathVariable Long id) {
//         Optional<Product> optionalProduct = productRepository.findById(id);
//         return optionalProduct.orElse(null);
//     }

//     // ------------------- UPDATE PRODUCT -------------------
//     @PutMapping("/{id}")
//     public Product updateProduct(@PathVariable Long id, @RequestBody Product productData) {
//         Optional<Product> optionalProduct = productRepository.findById(id);
//         if (optionalProduct.isPresent()) {
//             Product product = optionalProduct.get();
//             product.setTitle(productData.getTitle());
//             product.setDescription(productData.getDescription());
//             product.setPricePerDay(productData.getPricePerDay());
//             product.setSize(productData.getSize());
//             product.setConditionStatus(productData.getConditionStatus());
//             product.setStock(productData.getStock());
//             product.setStatus(productData.getStatus());
//             return productRepository.save(product);
//         } else {
//             return null;
//         }
//     }

//     // ------------------- DELETE PRODUCT -------------------
//     @DeleteMapping("/{id}")
//     public String deleteProduct(@PathVariable Long id) {
//         if (productRepository.existsById(id)) {
//             productRepository.deleteById(id);
//             return "Product deleted successfully!";
//         } else {
//             return "Product not found!";
//         }
//     }

//     // ------------------- LIST AVAILABLE PRODUCTS -------------------
//     @GetMapping("/available")
//     public List<Product> getAvailableProducts() {
//         return productRepository.findByStatus(ProductStatus.AVAILABLE);
//     }
// }

package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Product;
import com.clothrental.ClothRent.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
