package com.example.employeeapp.config;

import com.example.employeeapp.model.Employee;
import com.example.employeeapp.model.Role;
import com.example.employeeapp.model.User;
import com.example.employeeapp.repository.EmployeeRepository;
import com.example.employeeapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER));
            userRepository.save(admin);
        }
        
        // Create regular user
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRoles(Set.of(Role.ROLE_USER));
            userRepository.save(user);
        }
        
        // Create sample employees
        if (employeeRepository.count() == 0) {
            Employee emp1 = new Employee();
            emp1.setFirstName("John");
            emp1.setLastName("Doe");
            emp1.setEmail("john.doe@example.com");
            emp1.setPhone("+1-555-0101");
            emp1.setDepartment("Engineering");
            emp1.setPosition("Software Engineer");
            emp1.setSalary(80000.0);
            emp1.setHireDate(LocalDate.of(2020, 1, 15));
            employeeRepository.save(emp1);
            
            Employee emp2 = new Employee();
            emp2.setFirstName("Jane");
            emp2.setLastName("Smith");
            emp2.setEmail("jane.smith@example.com");
            emp2.setPhone("+1-555-0102");
            emp2.setDepartment("Marketing");
            emp2.setPosition("Marketing Manager");
            emp2.setSalary(95000.0);
            emp2.setHireDate(LocalDate.of(2019, 6, 1));
            employeeRepository.save(emp2);
            
            Employee emp3 = new Employee();
            emp3.setFirstName("Bob");
            emp3.setLastName("Johnson");
            emp3.setEmail("bob.johnson@example.com");
            emp3.setPhone("+1-555-0103");
            emp3.setDepartment("Engineering");
            emp3.setPosition("Senior Developer");
            emp3.setSalary(100000.0);
            emp3.setHireDate(LocalDate.of(2018, 3, 10));
            employeeRepository.save(emp3);
            
            Employee emp4 = new Employee();
            emp4.setFirstName("Alice");
            emp4.setLastName("Williams");
            emp4.setEmail("alice.williams@example.com");
            emp4.setPhone("+1-555-0104");
            emp4.setDepartment("HR");
            emp4.setPosition("HR Manager");
            emp4.setSalary(90000.0);
            emp4.setHireDate(LocalDate.of(2021, 8, 20));
            employeeRepository.save(emp4);
        }
    }
}
