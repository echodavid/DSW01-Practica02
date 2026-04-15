package com.example.empleados;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/departamentos")
public class DepartamentoController {
        @Autowired
        private EmpleadoService empleadoService;
    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping
    public List<Departamento> getAll() {
        return departamentoService.findAll();
    }

    @GetMapping("/{id}")
    public Departamento getById(@PathVariable Long id) {
        Departamento dep = departamentoService.findById(id).orElse(null);
        return dep;
    }

    @GetMapping("/{id}/empleados")
    public List<Empleado> getEmpleadosByDepartamento(@PathVariable Long id) {
        return empleadoService.findByDepartamentoId(id);
    }

    @PostMapping
    public Departamento create(@RequestBody Departamento departamento) {
        return departamentoService.save(departamento);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departamentoService.deleteById(id);
    }
}
