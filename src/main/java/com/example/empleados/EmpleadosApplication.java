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
            if (empleadoRepository.findById("master@demo.com").isEmpty()) {
                Empleado master = new Empleado("master@demo.com", "Master User", "Head Office", "000-0000", passwordEncoder.encode("master123"), null);
                empleadoRepository.save(master);
                System.out.println("Default master employee created with clave: master@demo.com");
            }
        };
    }
}