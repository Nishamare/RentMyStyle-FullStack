// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.Category;
// import com.clothrental.ClothRent.repository.CategoryRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/categories")
// public class CategoryController {

//     @Autowired
//     private CategoryRepository categoryRepository;

//     // Add new category
//     @PostMapping("/add")
//     public Category addCategory(@RequestBody Category category) {
//         return categoryRepository.save(category);
//     }

//     // Get all categories
//     @GetMapping("/all")
//     public List<Category> getAllCategories() {
//         return categoryRepository.findAll();
//     }
// }

package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Category;
import com.clothrental.ClothRent.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add")
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
