package com.example.empleados;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmpleadoController.class)
public class EmpleadoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetAllEmpleados() throws Exception {
        mockMvc.perform(get("/v1/empleados"))
                .andExpect(status().isOk());
    }

    @Test
    void testAsignarDepartamento() throws Exception {
        mockMvc.perform(put("/v1/empleados/1/departamento")
                .contentType("application/json")
                .content("{\"id\":1,\"nombre\":\"TI\"}"))
                .andExpect(status().isOk());
    }
}
