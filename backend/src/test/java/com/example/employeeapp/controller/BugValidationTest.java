package com.example.employeeapp.controller;

import com.example.employeeapp.dto.RegisterRequest;
import com.example.employeeapp.model.Employee;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BugValidationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @org.junit.jupiter.api.BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    // 🔴 BUG TEST 1: Duplicate Username Should Return 409, Not 500
    @Test
    @DisplayName("🔴 BUG-001: Duplicate Username Returns 500 Instead of 409")
    public void testDuplicateUsernameReturns409() throws Exception {
        // Arrange: Create duplicate username request
        RegisterRequest duplicateRequest = new RegisterRequest();
        duplicateRequest.setUsername("admin"); // admin already exists in seeded data
        duplicateRequest.setPassword("test123");
        duplicateRequest.setRole("ROLE_USER");

        // Act & Assert: Should return 409 Conflict, NOT 500
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(duplicateRequest)))
                .andDo(print())
                .andExpect(status().isConflict()) // Expected: 409
                .andExpect(jsonPath("$.message").exists())
                .andExpect(jsonPath("$.status").value("409"));
    }

    // 🔴 BUG TEST 2: Invalid Email Should Return 400, Not 201
    @Test
    @DisplayName("🔴 BUG-002: Invalid Email Format Accepted")
    public void testInvalidEmailReturns400() throws Exception {
        // Arrange: Employee with invalid email
        Employee invalidEmployee = new Employee();
        invalidEmployee.setFirstName("Test");
        invalidEmployee.setLastName("User");
        invalidEmployee.setEmail("invalidemail"); // Invalid format
        invalidEmployee.setPosition("Developer");

        // Act & Assert: Should return 400 Bad Request, NOT 201 Created
        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidEmployee)))
                .andDo(print())
                .andExpect(status().isBadRequest()) // Expected: 400
                .andExpect(jsonPath("$.email").exists());
    }

    // 🔴 BUG TEST 3: Missing Required Fields Should Return 400
    @Test
    @DisplayName("🔴 BUG-003: Missing Required Fields Validation")
    public void testMissingRequiredFieldsReturns400() throws Exception {
        // Arrange: Employee with missing required fields
        Employee incompleteEmployee = new Employee();
        incompleteEmployee.setFirstName(""); // Empty - should fail
        incompleteEmployee.setLastName(""); // Empty - should fail
        incompleteEmployee.setEmail("test@example.com");
        incompleteEmployee.setPosition(""); // Empty - should fail

        // Act & Assert: Should return 400 for validation errors
        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(incompleteEmployee)))
                .andDo(print())
                .andExpect(status().isBadRequest()); // Expected: 400
    }

    // 🔴 BUG TEST 4: Update with Invalid Email Should Return 400
    @Test
    @DisplayName("🔴 BUG-004: Update Email Validation Gap")
    public void testUpdateInvalidEmailReturns400() throws Exception {
        // Arrange: Update existing employee with invalid email
        Employee updateEmployee = new Employee();
        updateEmployee.setFirstName("Updated");
        updateEmployee.setLastName("User");
        updateEmployee.setEmail("invalid-email-format"); // Invalid
        updateEmployee.setPosition("Senior Developer");

        // Act & Assert: Update should also validate email format
        mockMvc.perform(put("/api/employees/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateEmployee)))
                .andDo(print())
                .andExpect(status().isBadRequest()); // Expected: 400
    }

    // ✅ POSITIVE TEST: Valid Registration Should Work
    @Test
    @DisplayName("✅ POSITIVE: Valid Registration Works")
    public void testValidRegistrationWorks() throws Exception {
        // Arrange: Valid new user
        RegisterRequest validRequest = new RegisterRequest();
        validRequest.setUsername("newuser123");
        validRequest.setPassword("validpass123");
        validRequest.setRole("ROLE_USER");

        // Act & Assert: Should return 200/201 success
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    // ✅ POSITIVE TEST: Valid Employee Creation Should Work
    @Test
    @DisplayName("✅ POSITIVE: Valid Employee Creation Works")
    public void testValidEmployeeCreationWorks() throws Exception {
        // Arrange: Valid employee data
        Employee validEmployee = new Employee();
        validEmployee.setFirstName("John");
        validEmployee.setLastName("Doe");
        validEmployee.setEmail("john.doe@company.com");
        validEmployee.setPosition("Software Engineer");

        // Act & Assert: Should return 200/201 success
        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEmployee)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    // 🟡 EDGE CASE TEST: Various Email Formats
    @Test
    @DisplayName("🟡 EDGE CASE: Email Format Validation")
    public void testEmailFormatValidation() throws Exception {
        String[] invalidEmails = {
            "plainaddress",           // No @ symbol
            "@missingdomain.com",     // Missing local part
            "missing@.com",           // Missing domain
            "missing@domain",         // Missing TLD
            "spaces @domain.com",     // Spaces
            "test@",                  // Incomplete
            ".test@domain.com",       // Leading dot
            "test.@domain.com"        // Trailing dot
        };

        for (String invalidEmail : invalidEmails) {
            Employee employee = new Employee();
            employee.setFirstName("Test");
            employee.setLastName("User");
            employee.setEmail(invalidEmail);
            employee.setPosition("Tester");

            // Each should return 400 Bad Request
            mockMvc.perform(post("/api/employees")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(employee)))
                    .andExpect(status().isBadRequest());
        }
    }

    // 🟡 SECURITY TEST: Basic SQL Injection Prevention
    @Test
    @DisplayName("🟡 SECURITY: SQL Injection Prevention")
    public void testSQLInjectionPrevention() throws Exception {
        // Arrange: Malicious input attempt
        Employee maliciousEmployee = new Employee();
        maliciousEmployee.setFirstName("'; DROP TABLE employees; SELECT * FROM users WHERE '1'='1");
        maliciousEmployee.setLastName("Hacker");
        maliciousEmployee.setEmail("hacker@evil.com");
        maliciousEmployee.setPosition("SQL Injection");

        // Act & Assert: Should either succeed safely or fail with validation
        // JPA/Hibernate should prevent SQL injection by default
        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(maliciousEmployee)))
                .andDo(print());
        
        // Additional check: Database should still exist and function
        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk());
    }
}