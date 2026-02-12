// package com.clothrental.ClothRent.controller;

// import com.clothrental.ClothRent.entity.Brand;
// import com.clothrental.ClothRent.repository.BrandRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/brands")
// public class BrandController {

//     @Autowired
//     private BrandRepository brandRepository;

//     // Add new brand
//     @PostMapping("/add")
//     public Brand addBrand(@RequestBody Brand brand) {
//         return brandRepository.save(brand);
//     }

//     // Get all brands
//     @GetMapping("/all")
//     public List<Brand> getAllBrands() {
//         return brandRepository.findAll();
//     }
// }

package com.clothrental.ClothRent.controller;

import com.clothrental.ClothRent.entity.Brand;
import com.clothrental.ClothRent.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/brands")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class BrandController {

    @Autowired
    private BrandService brandService;

    @PostMapping("/add")
    public Brand addBrand(@RequestBody Brand brand) {
        return brandService.addBrand(brand);
    }

    @GetMapping("/all")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }
}
