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
    public CommandLineRunner seedUsers(UserRepository userRepository) {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            
            // Check if users already exist
            if (userRepository.findByUsername("admin").isEmpty()) {
                // Admin user
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin"));
                admin.setRole("ROLE_ADMIN");
                admin.setEmail("admin@firma.de");
                userRepository.save(admin);
                
                // Regular users
                User user1 = new User();
                user1.setUsername("max.mueller");
                user1.setPassword(encoder.encode("password123"));
                user1.setRole("ROLE_USER");
                user1.setEmail("max.mueller@firma.de");
                userRepository.save(user1);
                
                User user2 = new User();
                user2.setUsername("lena.schmidt");
                user2.setPassword(encoder.encode("password123"));
                user2.setRole("ROLE_USER");
                user2.setEmail("lena.schmidt@firma.de");
                userRepository.save(user2);
                
                User user3 = new User();
                user3.setUsername("jonas.fischer");
                user3.setPassword(encoder.encode("password123"));
                user3.setRole("ROLE_USER");
                user3.setEmail("jonas.fischer@firma.de");
                userRepository.save(user3);
                
                User user4 = new User();
                user4.setUsername("laura.weber");
                user4.setPassword(encoder.encode("password123"));
                user4.setRole("ROLE_USER");
                user4.setEmail("laura.weber@firma.de");
                userRepository.save(user4);
                
                User user5 = new User();
                user5.setUsername("paul.becker");
                user5.setPassword(encoder.encode("password123"));
                user5.setRole("ROLE_ADMIN");
                user5.setEmail("paul.becker@firma.de");
                userRepository.save(user5);
                
                System.out.println("Seeded 6 users (2 admins, 4 regular users)");
                System.out.println("Admin users: admin/admin, paul.becker/password123");
                System.out.println("Regular users: max.mueller, lena.schmidt, jonas.fischer, laura.weber (all password: password123)");
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
