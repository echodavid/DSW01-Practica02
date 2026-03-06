package com.example.empleados;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EmpleadosApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmpleadosApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(EmpleadoRepository empleadoRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (empleadoRepository.count() == 0) {
                Empleado admin = new Empleado("1", "Admin User", "Admin Address", "000-0000", passwordEncoder.encode("admin123"));
                empleadoRepository.save(admin);
                System.out.println("Default admin employee created with ID: 1");
            }
        };
    }
}