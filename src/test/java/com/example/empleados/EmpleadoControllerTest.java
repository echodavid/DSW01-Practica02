package com.example.empleados;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class EmpleadoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "admin", password = "admin123", roles = "ADMIN")
    void create_ValidEmpleado_ReturnsOk() throws Exception {
        Empleado empleado = new Empleado("1", "Juan", "Calle 1", "123");

        mockMvc.perform(post("/v1/empleados")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(empleado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.clave").value("1"));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin123", roles = "ADMIN")
    void findAll_DefaultPage_ReturnsPage() throws Exception {
        mockMvc.perform(get("/v1/empleados"))
                .andExpect(status().isOk());
    }
}