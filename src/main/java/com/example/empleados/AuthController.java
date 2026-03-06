package com.example.empleados;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/v1/auth")
@Tag(name = "Authentication", description = "API para autenticación")
public class AuthController {

    @Autowired
    private EmpleadoService empleadoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @Operation(summary = "Login de empleado")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Empleado> empleado = empleadoService.findById(loginRequest.getClave());
        if (empleado.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), empleado.get().getPassword())) {
            String token = jwtUtil.generateToken(loginRequest.getClave());
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}