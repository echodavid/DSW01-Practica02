package com.example.empleados;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
@Tag(name = "Empleados", description = "API para gestión de empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping
    @Operation(summary = "Registrar empleado")
    public ResponseEntity<Empleado> create(@Valid @RequestBody Empleado empleado) {
        Empleado saved = empleadoService.save(empleado);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    @Operation(summary = "Consultar empleados con paginación")
    public ResponseEntity<Page<Empleado>> findAll(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size) {
        Page<Empleado> empleados = empleadoService.findAll(page, size);
        return ResponseEntity.ok(empleados);
    }

    @GetMapping("/{clave}")
    @Operation(summary = "Consultar empleado por clave")
    public ResponseEntity<Empleado> findById(@PathVariable String clave) {
        Optional<Empleado> empleado = empleadoService.findById(clave);
        return empleado.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{clave}")
    @Operation(summary = "Actualizar empleado")
    public ResponseEntity<Empleado> update(@PathVariable String clave, @Valid @RequestBody Empleado empleado) {
        Empleado updated = empleadoService.update(clave, empleado);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{clave}")
    @Operation(summary = "Eliminar empleado")
    public ResponseEntity<Void> delete(@PathVariable String clave) {
        empleadoService.deleteById(clave);
        return ResponseEntity.noContent().build();
    }
}