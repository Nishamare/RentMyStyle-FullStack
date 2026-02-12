package com.clothrental.ClothRent.service;

import com.clothrental.ClothRent.entity.Brand;
import com.clothrental.ClothRent.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Brand addBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }
}
