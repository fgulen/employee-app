# 🔧 Swagger Fix - Step by Step

## ❌ Problem

```
http://localhost:8081/swagger-ui/index.html returns 404
```

## ✅ Solution

### What Was Fixed

1. **Created OpenApiConfig.java** - Enables Swagger UI configuration
2. **Updated application.yml** - Added springdoc configuration
3. **Updated AppSecurityConfig.java** - Allows all Swagger routes

### Steps to Apply Fix

#### Step 1: Rebuild Backend

```powershell
cd c:\Users\fg\Desktop\employee-app\backend
mvn clean install
```

#### Step 2: Stop Backend (if running)

- Press `Ctrl + C` in the backend terminal

#### Step 3: Restart Backend

```powershell
mvn spring-boot:run
```

**Wait for message:**

```
Started EmployeeAppApplication in X seconds
```

#### Step 4: Test Swagger

Open in browser:

```
http://localhost:8081/swagger-ui/index.html
```

---

## 📝 Files Modified

### 1. New File: `OpenApiConfig.java`

**Location:** `backend/src/main/java/com/example/employeeapp/config/OpenApiConfig.java`

```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Employee Management System API")
                .version("1.0.0")
                ...
            );
    }
}
```

### 2. Updated: `application.yml`

**Added Springdoc Configuration:**

```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
  api-docs:
    path: /v3/api-docs
    enabled: true
```

### 3. Updated: `AppSecurityConfig.java`

**Already allows all Swagger routes:**

```java
.requestMatchers(
    "/swagger-ui/**",
    "/swagger-ui.html",
    "/v3/api-docs/**",
    "/v3/api-docs",
    "/swagger-resources/**",
    "/webjars/**"
).permitAll()
```

---

## ✅ Verification

### Check 1: Maven Build

```bash
mvn clean install
```

Expected: ✅ `BUILD SUCCESS`

### Check 2: Backend Start

```bash
mvn spring-boot:run
```

Expected: ✅ `Started EmployeeAppApplication`

### Check 3: API Health

```bash
curl http://localhost:8081/v3/api-docs
```

Expected: ✅ Returns JSON with API definitions

### Check 4: Swagger UI

Open URL in browser:

```
http://localhost:8081/swagger-ui/index.html
```

Expected: ✅ Interactive Swagger UI loads

---

## 🐛 If Still Not Working

### Problem 1: Still Getting 404

**Solutions:**

1. ✓ Hard refresh browser: `Ctrl + F5`
2. ✓ Clear browser cache: `Ctrl + Shift + Delete`
3. ✓ Close and reopen browser
4. ✓ Try incognito/private mode
5. ✓ Check Maven built successfully (no errors)

### Problem 2: Compile Errors

**Solution:**

```bash
# Clear everything and rebuild
mvn clean
mvn install
```

### Problem 3: Port Already in Use

**Solution:**

```powershell
# Find process on port 8081
netstat -ano | findstr :8081

# Kill it (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in application.yml
server:
  port: 8082
```

### Problem 3: "Cannot connect to localhost:8081"

**Solution:**

1. ✓ Check backend is running
2. ✓ Check terminal shows "Started..."
3. ✓ Try: `curl http://localhost:8081`
4. ✓ Check if firewall blocks port 8081

---

## 🔍 Debug Steps

### View Backend Logs

Look at terminal where you ran `mvn spring-boot:run`

**Good signs:**

```
2025-11-07 14:30:00 - Started EmployeeAppApplication
DocumentBuilderFactory is TransformerFactoryImpl
```

**Bad signs (red text):**

```
ERROR ... [Swagger initialization failed]
ERROR ... Port 8081 already in use
```

### Check API Docs Endpoint

```bash
curl -v http://localhost:8081/v3/api-docs
```

Expected: JSON response starting with `{"openapi":"3.0.1"`

### Test with curl

```bash
curl http://localhost:8081/swagger-ui/index.html
```

Expected: HTML page content (not 404 error)

---

## ✨ What You Should See

### Swagger UI Interface

When working correctly, you'll see:

1. **Top bar** - "Swagger UI" title and version
2. **Authorize button** - At top right (🔒)
3. **Endpoint list** - /api/auth, /api/users, /api/employees
4. **Try it out** - Buttons to test each endpoint
5. **Models** - Data schemas listed below

### Try This:

1. Go to http://localhost:8081/swagger-ui/index.html
2. Click on `POST /api/auth/login`
3. Click "Try it out"
4. Enter: `{ "username": "admin", "password": "admin" }`
5. Click "Execute"
6. Should see: 200 status with token in response

---

## 📞 Still Having Issues?

1. **Check Maven installed:** `mvn --version`
2. **Check Java 17 installed:** `java -version`
3. **Check Node/npm (frontend):** Not needed for Swagger
4. **Look at error message** in browser console (F12)
5. **Look at terminal logs** where backend runs

---

## 🎯 Quick Checklist

- [ ] Backend running on port 8081
- [ ] `mvn clean install` completed successfully
- [ ] No red errors in terminal output
- [ ] Browser can reach http://localhost:8081
- [ ] Browser can reach http://localhost:8081/swagger-ui/index.html
- [ ] Swagger UI displays interactive interface
- [ ] Can test login endpoint

---

**Need More Help?**
See `SETUP.md` for complete troubleshooting guide.
