package com.example.empleados;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DepartamentoController.class)
public class DepartamentoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetAllDepartamentos() throws Exception {
        mockMvc.perform(get("/departamentos"))
                .andExpect(status().isOk());
    }

    @Test
    void testCreateDepartamento() throws Exception {
        mockMvc.perform(post("/departamentos")
                .contentType("application/json")
                .content("{\"nombre\":\"TI\"}"))
                .andExpect(status().isOk());
    }
}
