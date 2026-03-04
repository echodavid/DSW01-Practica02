package com.example.empleados;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public Empleado save(Empleado empleado) {
        validateEmpleado(empleado);
        if (empleadoRepository.existsById(empleado.getClave())) {
            throw new IllegalArgumentException("Empleado con clave ya existe");
        }
        return empleadoRepository.save(empleado);
    }

    public Page<Empleado> findAll(int page, int size) {
        if (size <= 0) {
            throw new IllegalArgumentException("Tamaño de página debe ser positivo");
        }
        Pageable pageable = PageRequest.of(page, size);
        return empleadoRepository.findAll(pageable);
    }

    public Optional<Empleado> findById(String clave) {
        return empleadoRepository.findById(clave);
    }

    public Empleado update(String clave, Empleado empleado) {
        validateEmpleado(empleado);
        if (!empleadoRepository.existsById(clave)) {
            throw new IllegalArgumentException("Empleado no encontrado");
        }
        empleado.setClave(clave);
        return empleadoRepository.save(empleado);
    }

    public void deleteById(String clave) {
        if (!empleadoRepository.existsById(clave)) {
            throw new IllegalArgumentException("Empleado no encontrado");
        }
        empleadoRepository.deleteById(clave);
    }

    private void validateEmpleado(Empleado empleado) {
        if (empleado.getClave() == null || empleado.getClave().length() > 100) {
            throw new IllegalArgumentException("Clave inválida");
        }
        if (empleado.getNombre() == null || empleado.getNombre().length() > 100) {
            throw new IllegalArgumentException("Nombre inválido");
        }
        if (empleado.getDireccion() == null || empleado.getDireccion().length() > 100) {
            throw new IllegalArgumentException("Dirección inválida");
        }
        if (empleado.getTelefono() == null || empleado.getTelefono().length() > 100) {
            throw new IllegalArgumentException("Teléfono inválido");
        }
    }
}