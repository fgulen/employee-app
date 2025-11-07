package com.example.employeeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.employeeapp.model.User;
import com.example.employeeapp.model.Employee;
import com.example.employeeapp.repository.UserRepository;
import com.example.employeeapp.repository.EmployeeRepository;
import java.util.Arrays;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class EmployeeAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println("Default admin user created: admin/admin");
            }
        };
    }

    @Bean
    public CommandLineRunner seedEmployees(EmployeeRepository employeeRepository) {
        return args -> {
            System.out.println("Seeding employees: deleting existing employees...");
            employeeRepository.deleteAll();

            Employee e1 = new Employee();
            e1.setFirstName("Maximilian"); e1.setLastName("Müller"); e1.setEmail("max.mueller@firma.de"); e1.setPosition("Softwareentwickler");

            Employee e2 = new Employee();
            e2.setFirstName("Lena"); e2.setLastName("Schmidt"); e2.setEmail("lena.schmidt@firma.de"); e2.setPosition("Produktmanagerin");

            Employee e3 = new Employee();
            e3.setFirstName("Jonas"); e3.setLastName("Fischer"); e3.setEmail("jonas.fischer@firma.de"); e3.setPosition("DevOps Engineer");

            Employee e4 = new Employee();
            e4.setFirstName("Laura"); e4.setLastName("Weber"); e4.setEmail("laura.weber@firma.de"); e4.setPosition("UX Designer");

            Employee e5 = new Employee();
            e5.setFirstName("Lukas"); e5.setLastName("Meyer"); e5.setEmail("lukas.meyer@firma.de"); e5.setPosition("Finanzanalyst");

            Employee e6 = new Employee();
            e6.setFirstName("Anna"); e6.setLastName("Wagner"); e6.setEmail("anna.wagner@firma.de"); e6.setPosition("HR-Managerin");

            Employee e7 = new Employee();
            e7.setFirstName("Paul"); e7.setLastName("Becker"); e7.setEmail("paul.becker@firma.de"); e7.setPosition("Vertriebsleiter");

            Employee e8 = new Employee();
            e8.setFirstName("Sophie"); e8.setLastName("Hoffmann"); e8.setEmail("sophie.hoffmann@firma.de"); e8.setPosition("Kundendienst");

            Employee e9 = new Employee();
            e9.setFirstName("Niklas"); e9.setLastName("Schulz"); e9.setEmail("niklas.schulz@firma.de"); e9.setPosition("Buchhalter");

            Employee e10 = new Employee();
            e10.setFirstName("Marie"); e10.setLastName("Schäfer"); e10.setEmail("marie.schaefer@firma.de"); e10.setPosition("Marketing Managerin");

            List<Employee> seeds = Arrays.asList(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10);
            employeeRepository.saveAll(seeds);
            System.out.println("Seeded " + seeds.size() + " employees.");
        };
    }
}
