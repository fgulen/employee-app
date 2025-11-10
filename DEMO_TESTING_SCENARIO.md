# 🎯 Demo Testing Scenario - Employee Management System

**Demo Date:** November 8, 2025  
**Presenter:** QA Test Automation Engineer  
**Duration:** 15 minutes  
**Focus:** UI Testing + API Testing + Database Validation

---

## 📋 Demo Overview

This demonstration showcases a comprehensive 3-tier testing approach:

- **UI Testing** - Manual/Automated browser testing
- **API Testing** - REST API validation with Playwright
- **Database Testing** - Data integrity verification

**Intentional Bugs for Educational Purposes:** 2 critical bugs have been left in the system to demonstrate real-world testing scenarios.

---

## 🐛 Bug #1: Duplicate Username Error (500 Internal Server Error)

### 🎯 Bug Description

When a user tries to register with an existing username, the API returns a generic 500 Internal Server Error instead of a meaningful 409 Conflict error with a clear message.

### 📱 UI Testing Steps

**Precondition:** Admin user exists (username: `admin`, password: `admin`)

**Test Steps:**

1. Open application: `http://localhost:5173`
2. Click **"Register"** button on login page
3. Fill registration form:
   - Username: `admin`
   - Password: `admin123`
   - Role: `ROLE_USER`
4. Click **"Submit"** button

**Expected Result:**

- ✅ Error message: "Username already exists"
- ✅ HTTP Status: 409 Conflict
- ✅ User-friendly error displayed

**Actual Result:**

- ❌ Error message: "Internal Server Error"
- ❌ HTTP Status: 500
- ❌ Generic error, not user-friendly

**Screenshot Evidence:**

```
Browser Console:
POST http://localhost:8081/api/auth/register 500 (Internal Server Error)
Response: {
  "timestamp": "2025-11-08T12:00:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/auth/register"
}
```

---

### 🔌 API Testing - Playwright Test

**Test File:** `tests/employee-api.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Bug #1: Duplicate Username Registration", () => {
  test("Should return 409 when registering duplicate username", async ({
    request,
  }) => {
    const baseURL = "http://localhost:8081";

    // Step 1: Register first user
    const firstResponse = await request.post(`${baseURL}/api/auth/register`, {
      data: {
        username: "testuser",
        password: "password123",
        role: "ROLE_USER",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(firstResponse.status()).toBe(200);
    console.log("✅ First registration successful");

    // Step 2: Try to register same username (DUPLICATE)
    const duplicateResponse = await request.post(
      `${baseURL}/api/auth/register`,
      {
        data: {
          username: "testuser",
          password: "password123",
          role: "ROLE_USER",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Expected: 409 Conflict
    // Actual: 500 Internal Server Error (BUG!)
    console.log(`Status Code: ${duplicateResponse.status()}`);
    const responseBody = await duplicateResponse.json();
    console.log("Response:", JSON.stringify(responseBody, null, 2));

    // This assertion will FAIL - demonstrating the bug
    expect(duplicateResponse.status()).toBe(409);
    expect(responseBody.message).toContain("already exists");
  });

  test("Should return proper error message format", async ({ request }) => {
    const baseURL = "http://localhost:8081";

    // Try duplicate admin username
    const response = await request.post(`${baseURL}/api/auth/register`, {
      data: {
        username: "admin",
        password: "newpassword",
        role: "ROLE_USER",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    // Expected error format
    expect(body).toHaveProperty("error");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("timestamp");
    expect(body.error).toBe("Conflict");
    expect(body.message).toMatch(/username.*already.*exists/i);
  });
});
```

**Run Command:**

```bash
npx playwright test tests/employee-api.spec.ts -g "Bug #1"
```

---

### 💾 Database Verification

**H2 Console Access:**

```
URL: http://localhost:8081/h2-console
JDBC URL: jdbc:h2:mem:employee_db
Username: SA
Password: (empty)
```

**SQL Query to Check Duplicate:**

```sql
-- Check if username 'admin' exists
SELECT username, role, email, id
FROM users
WHERE username = 'admin';

-- Count duplicate usernames (should be 0)
SELECT username, COUNT(*) as count
FROM users
GROUP BY username
HAVING COUNT(*) > 1;
```

---

## 🐛 Bug #2: Invalid Email Format Accepted

### 🎯 Bug Description

The employee creation endpoint accepts invalid email formats without validation. This allows corrupt data to be stored in the database.

### 📱 UI Testing Steps

**Precondition:** Logged in as admin/admin

**Test Steps:**

1. Navigate to **Employees** page
2. Click **"Add Employee"** button
3. Fill employee form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `invalidemail` (no @ symbol!)
   - Position: `Software Engineer`
4. Click **"Submit"** button

**Expected Result:**

- ✅ Error message: "Invalid email format"
- ✅ HTTP Status: 400 Bad Request
- ✅ Form validation prevents submission

**Actual Result:**

- ❌ Success message: "Employee created successfully"
- ❌ HTTP Status: 201 Created
- ❌ Invalid email stored in database

**More Invalid Email Examples:**

```
❌ "test@"           - Missing domain
❌ "@example.com"    - Missing local part
❌ "notanemail"      - No @ symbol
❌ "test@@test.com"  - Double @
❌ "test @test.com"  - Space in email
```

---

### 🔌 API Testing - Playwright Test

```typescript
test.describe("Bug #2: Invalid Email Validation", () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // Get authentication token
    const baseURL = "http://localhost:8081";
    const loginResponse = await request.post(`${baseURL}/api/auth/login`, {
      data: {
        username: "admin",
        password: "admin",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const loginData = await loginResponse.json();
    authToken = loginData.token;
    console.log("✅ Authenticated successfully");
  });

  test("Should reject employee with invalid email format", async ({
    request,
  }) => {
    const baseURL = "http://localhost:8081";

    const invalidEmails = [
      "invalidemail", // No @ symbol
      "test@", // Missing domain
      "@example.com", // Missing local part
      "test@@test.com", // Double @
      "test @test.com", // Space in email
    ];

    for (const invalidEmail of invalidEmails) {
      console.log(`\nTesting invalid email: "${invalidEmail}"`);

      const response = await request.post(`${baseURL}/api/employees`, {
        data: {
          firstName: "Test",
          lastName: "User",
          email: invalidEmail,
          position: "Engineer",
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Status: ${response.status()}`);

      // Expected: 400 Bad Request
      // Actual: 201 Created (BUG!)
      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.message).toMatch(/invalid.*email/i);
    }
  });

  test("Should accept valid email formats", async ({ request }) => {
    const baseURL = "http://localhost:8081";

    const validEmails = [
      "test@example.com",
      "john.doe@firma.de",
      "user+tag@domain.co.uk",
    ];

    for (const validEmail of validEmails) {
      const response = await request.post(`${baseURL}/api/employees`, {
        data: {
          firstName: "Valid",
          lastName: "User",
          email: validEmail,
          position: "Engineer",
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      expect(response.status()).toBe(201);
    }
  });
});
```

---

### 💾 Database Verification

**SQL Query to Find Invalid Emails:**

```sql
-- Find emails without @ symbol
SELECT id, first_name, last_name, email, position
FROM employees
WHERE email NOT LIKE '%@%';

-- Find emails without domain
SELECT id, first_name, last_name, email, position
FROM employees
WHERE email NOT LIKE '%@%.%';

-- Find emails with spaces
SELECT id, first_name, last_name, email, position
FROM employees
WHERE email LIKE '% %';

-- Count total invalid emails
SELECT COUNT(*) as invalid_email_count
FROM employees
WHERE email NOT LIKE '%@%.%'
   OR email LIKE '% %'
   OR email LIKE '%@@%';
```

---

## 🎬 Complete Demo Script (15 minutes)

### Part 1: Introduction (2 min)

```
"Hello everyone! Today I'll demonstrate comprehensive testing
of our Employee Management System across three layers:
- UI Testing (manual browser testing)
- API Testing (automated with Playwright)
- Database Testing (SQL validation)

I've intentionally left 2 bugs in the system to show how we
catch issues at different testing levels."
```

### Part 2: Bug #1 Demo - Duplicate Username (5 min)

**Step 1: UI Testing (2 min)**

1. Show browser: http://localhost:5173
2. Click Register
3. Enter admin/admin123
4. Submit → Show 500 error
5. Open DevTools → Show error details

**Step 2: API Testing (2 min)**

```bash
cd C:\Users\fg\Desktop\emp-app-automation
npx playwright test tests/employee-api.spec.ts -g "Bug #1" --headed
```

6. Show test failure
7. Explain expected vs actual

**Step 3: Database Check (1 min)** 8. Open H2 Console 9. Run: `SELECT * FROM users WHERE username = 'admin'` 10. Show only 1 admin exists

### Part 3: Bug #2 Demo - Invalid Email (5 min)

**Step 1: UI Testing (2 min)**

1. Login with admin/admin
2. Go to Employees page
3. Add Employee with email: `invalidemail`
4. Submit → Show success (wrong!)
5. Show employee list with invalid email

**Step 2: API Testing (2 min)**

```bash
npx playwright test tests/employee-api.spec.ts -g "Bug #2" --headed
```

6. Show test assertions failing
7. Multiple invalid email formats tested

**Step 3: Database Check (1 min)** 8. H2 Console query:

```sql
SELECT * FROM employees WHERE email NOT LIKE '%@%';
```

9. Show invalid data in database
10. Explain data integrity issue

### Part 4: Wrap-up (3 min)

**Lessons Learned:**

1. ✅ Test at multiple levels (UI + API + DB)
2. ✅ User-friendly error messages matter
3. ✅ Server-side validation is critical
4. ✅ Database constraints prevent bad data
5. ✅ Automated tests catch regressions

**Questions?**

---

## 🔧 Bug Fix Guide (For After Demo)

### Fix Bug #1: Duplicate Username Handling

**File:** `backend/src/main/java/com/example/employeeapp/controller/AuthController.java`

**Add Exception Class:**

```java
package com.example.employeeapp.exception;

public class DuplicateUsernameException extends RuntimeException {
    public DuplicateUsernameException(String message) {
        super(message);
    }
}
```

**Update Register Method:**

```java
@PostMapping("/register")
public RegisterResponse register(@RequestBody RegisterRequest request) {
    String username = request.getUsername();

    // Check for duplicate username
    if (userRepository.findByUsername(username).isPresent()) {
        throw new DuplicateUsernameException(
            "Username '" + username + "' already exists. Please choose a different username."
        );
    }

    // Rest of registration logic...
}
```

**Add Global Exception Handler:**

```java
package com.example.employeeapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateUsername(
            DuplicateUsernameException ex) {

        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", 409);
        error.put("error", "Conflict");
        error.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
```

---

### Fix Bug #2: Email Validation

**File:** `backend/src/main/java/com/example/employeeapp/model/Employee.java`

**Add Validation Annotations:**

```java
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Pattern(
        regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
        message = "Email must be in valid format (e.g., user@example.com)"
    )
    private String email;

    @NotBlank(message = "Position is required")
    private String position;

    // Getters and setters...
}
```

**Update Controller:**

```java
import jakarta.validation.Valid;

@PostMapping
public ResponseEntity<Employee> createEmployee(
        @Valid @RequestBody Employee employee) {
    // Validation happens automatically
    Employee saved = employeeRepository.save(employee);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}
```

**Add Validation Exception Handler:**

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidationException(
        MethodArgumentNotValidException ex) {

    Map<String, Object> error = new HashMap<>();
    error.put("timestamp", LocalDateTime.now());
    error.put("status", 400);
    error.put("error", "Bad Request");

    List<String> errors = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(err -> err.getField() + ": " + err.getDefaultMessage())
        .collect(Collectors.toList());

    error.put("message", "Validation failed");
    error.put("errors", errors);

    return ResponseEntity.badRequest().body(error);
}
```

---

## 📊 Test Results After Fix

### Before Fix:

```
Tests: 2 failed, 21 passed, 23 total
Bugs: 2 critical issues
Status: ❌ Not production ready
```

### After Fix:

```
Tests: 23 passed, 23 total
Bugs: 0 critical issues
Status: ✅ Production ready
```

---

## 📁 Demo Files Location

```
employee-app/
├── DEMO_TESTING_SCENARIO.md          # This file
├── backend/
│   └── src/main/java/
│       └── com/example/employeeapp/
│           ├── controller/
│           │   └── AuthController.java        # Bug #1 location
│           ├── model/
│           │   └── Employee.java              # Bug #2 location
│           └── exception/
│               ├── GlobalExceptionHandler.java
│               └── DuplicateUsernameException.java
└── tests/
    └── employee-api.spec.ts          # API test suite
```

---

## 🚀 Quick Start Commands

### Start Backend:

```powershell
cd c:\Users\fg\Desktop\employee-app\backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
mvn spring-boot:run
```

### Start Frontend:

```bash
cd c:\Users\fg\Desktop\employee-app\frontend
npm run dev
```

### Run API Tests:

```bash
cd c:\Users\fg\Desktop\emp-app-automation
npx playwright test tests/employee-api.spec.ts
```

### Open H2 Database Console:

```
http://localhost:8081/h2-console
```

---

## 📝 Notes for Presenter

1. **Keep backend running** throughout demo - don't close the terminal
2. **Have H2 Console open** in a separate browser tab
3. **Prepare test data** - ensure admin user exists
4. **Browser DevTools open** - F12 before starting
5. **Test script ready** - have playwright tests reviewed
6. **Backup plan** - have screenshots if live demo fails
7. **Time management** - stick to 15-minute limit

---

**Demo Status:** ✅ Ready to Execute  
**Last Updated:** November 8, 2025  
**Next Review:** Before presentation day
