package com.example.empleados;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmpleadoServiceTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @InjectMocks
    private EmpleadoService empleadoService;

    @Test
    void save_ValidEmpleado_ReturnsSaved() {
        Empleado empleado = new Empleado("1", "Juan", "Calle 1", "123");
        when(empleadoRepository.existsById("1")).thenReturn(false);
        when(empleadoRepository.save(empleado)).thenReturn(empleado);

        Empleado result = empleadoService.save(empleado);

        assertEquals(empleado, result);
        verify(empleadoRepository).save(empleado);
    }

    @Test
    void save_DuplicateClave_ThrowsException() {
        Empleado empleado = new Empleado("1", "Juan", "Calle 1", "123");
        when(empleadoRepository.existsById("1")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> empleadoService.save(empleado));
    }

    @Test
    void findAll_ValidPage_ReturnsPage() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Empleado> empleados = List.of(new Empleado("1", "Juan", "Calle 1", "123"));
        Page<Empleado> page = new PageImpl<>(empleados, pageable, 1);
        when(empleadoRepository.findAll(pageable)).thenReturn(page);

        Page<Empleado> result = empleadoService.findAll(0, 5);

        assertEquals(page, result);
    }

    @Test
    void findAll_InvalidSize_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> empleadoService.findAll(0, 0));
    }
}