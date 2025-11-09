# 🚀 Complete Setup & Troubleshooting Guide

## Prerequisites Checklist

- [x] Java 17+ installed (OpenJDK Temurin recommended)
- [x] Maven 3.6+ installed
- [x] Node.js 16+ and npm installed
- [x] Git installed
- [ ] Docker Desktop (optional, for PostgreSQL)

---

## ✅ Step-by-Step Quick Start (Windows)

### Step 1: Clone & Navigate

```bash
cd employee-app
```

### Step 2: Start Backend (Terminal 1)

```powershell
# Navigate to backend
cd backend

# Set Java Home
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"

# Build project
mvn clean install

# Run backend
mvn spring-boot:run
```

**Expected Output:**

```
Started EmployeeAppApplication in X seconds
```

**Verify Backend:**

- API: http://localhost:8081
- Swagger: http://localhost:8081/swagger-ui/index.html ✅
- H2 Console: http://localhost:8081/h2-console

### Step 3: Start Frontend (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

**Expected Output:**

```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

**Verify Frontend:**

- URL: http://localhost:5173 ✅

### Step 4: Login

- **Username:** `admin`
- **Password:** `admin`

---

## 🔗 Access Points

| Component      | URL                                         | Port | Notes                    |
| -------------- | ------------------------------------------- | ---- | ------------------------ |
| Frontend App   | http://localhost:5173                       | 5173 | React development server |
| Backend API    | http://localhost:8081                       | 8081 | Spring Boot server       |
| **Swagger UI** | http://localhost:8081/swagger-ui/index.html | 8081 | **📖 API Documentation** |
| H2 Database    | http://localhost:8081/h2-console            | 8081 | In-memory DB console     |

---

## 📖 Using Swagger API Documentation

1. **Open URL:** http://localhost:8081/swagger-ui/index.html

2. **View Endpoints:**

   - Expand `/api/auth` → POST `/api/auth/login`
   - Expand `/api/users` → GET, POST, PUT, DELETE
   - Expand `/api/employees` → GET, POST, PUT, DELETE

3. **Test Login Endpoint:**

   - Click on `POST /api/auth/login`
   - Click "Try it out"
   - Enter: `{ "username": "admin", "password": "admin" }`
   - Click "Execute"
   - Copy the token from response

4. **Authenticate for Protected Endpoints:**
   - Click the 🔒 "Authorize" button at top
   - Paste token as: `Bearer <token>`
   - Click "Authorize"
   - Now test other endpoints

---

## 🔍 Troubleshooting

### Issue: "Connection refused" or "Cannot connect to backend"

**Cause:** Backend not running or wrong port

**Solutions:**

1. ✓ Verify backend terminal shows "Started EmployeeAppApplication"
2. ✓ Check port 8081 is not used by another process
3. ✓ In Windows PowerShell:
   ```powershell
   netstat -ano | findstr :8081
   ```
4. ✓ If port in use, kill process or change port in `application.yml`

---

### Issue: "Swagger returns 404" or "Cannot find /swagger-ui/index.html"

**Cause:** Wrong URL or Swagger not configured

**Solutions:**

1. ✓ Use CORRECT URL: `http://localhost:8081/swagger-ui/index.html`

   - ❌ Wrong: `/swagger-ui.html`
   - ❌ Wrong: `/swagger-ui`
   - ✅ Correct: `/swagger-ui/index.html`

2. ✓ Verify Maven dependency in `pom.xml`:

   ```xml
   <dependency>
     <groupId>org.springdoc</groupId>
     <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
     <version>2.5.0</version>
   </dependency>
   ```

3. ✓ Rebuild project:

   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

4. ✓ Check backend logs for errors

---

### Issue: "Login fails" or "Invalid credentials"

**Cause:** Wrong credentials or database not initialized

**Solutions:**

1. ✓ Use default credentials:

   - Username: `admin`
   - Password: `admin`

2. ✓ Check H2 database:

   - URL: http://localhost:8081/h2-console
   - JDBC URL: `jdbc:h2:mem:employee_db`
   - Username: `SA`
   - Password: (leave empty)
   - Click "Connect"
   - Query: `SELECT * FROM users;`

3. ✓ If no users, restart backend to initialize

---

### Issue: "npm: command not found"

**Cause:** Node.js not installed or not in PATH

**Solutions:**

1. ✓ Install Node.js from https://nodejs.org/
2. ✓ Restart terminal/PowerShell
3. ✓ Verify: `node --version` and `npm --version`

---

### Issue: "JAVA_HOME not defined"

**Cause:** Java environment variable not set

**Solutions:**

1. ✓ Set temporarily in PowerShell (current session):

   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
   java -version  # Verify
   ```

2. ✓ Set permanently in Windows:
   - Press `Win + X` → Environment Variables
   - New System Variable:
     - Name: `JAVA_HOME`
     - Value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot`
   - Restart terminal

---

### Issue: "Maven not found"

**Cause:** Maven not installed or not in PATH

**Solutions:**

1. ✓ Install Maven from https://maven.apache.org/
2. ✓ Add to PATH environment variable
3. ✓ Verify: `mvn --version`

---

### Issue: Frontend can't connect to backend

**Cause:** CORS, firewall, or wrong API URL

**Solutions:**

1. ✓ Check API service URL in `frontend/src/services/api.ts`:

   ```typescript
   const api = axios.create({
     baseURL: "http://localhost:8081/api", // ✅ Correct
   });
   ```

2. ✓ Clear browser cache:

   - Press `Ctrl + Shift + Delete`
   - Clear all cache

3. ✓ Check browser console for errors:

   - Press `F12` → Console tab
   - Look for red error messages

4. ✓ Check if firewall blocks port 8081

---

### Issue: "Port 8081 already in use"

**Cause:** Another application using same port

**Solutions:**

1. ✓ Find what's using port 8081:

   ```powershell
   netstat -ano | findstr :8081
   ```

2. ✓ Kill the process:

   ```powershell
   taskkill /PID <PID_NUMBER> /F
   ```

3. ✓ Or change port in `backend/src/main/resources/application.yml`:
   ```yaml
   server:
     port: 8082 # Change to different port
   ```

---

## 📋 Development Tips

### Hot Reload / Auto-Reload

**Frontend:** Already enabled with Vite

- Changes automatically refresh browser

**Backend:** Use Spring Boot DevTools

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
</dependency>
```

Add to `pom.xml` for automatic restart on file changes

### Database Reset

**H2 (In-Memory):**

- Simply restart backend: `Ctrl + C` then `mvn spring-boot:run`
- All data resets

**PostgreSQL:**

- Keep running: `docker-compose up -d postgres`
- Data persists

### View Request/Response

**Swagger UI:**

1. Make a request
2. Response appears below
3. Shows status code and data

**Browser DevTools:**

- Press `F12`
- Network tab
- Filter to `XHR`
- Click request
- See details

---

## 🐛 Debug Logging

### Backend Logs

Logs appear in terminal where you ran `mvn spring-boot:run`

Look for:

- ✅ "Started EmployeeAppApplication" = Success
- ❌ Red errors = Problem
- 🟡 Warnings = Check these

### Frontend Logs

Press `F12` → Console tab in browser

Check for:

- Red errors
- Network failures (CORS, 404, 500)
- Warnings

---

## 🔐 Default Credentials

| User  | Username | Password |
| ----- | -------- | -------- |
| Admin | `admin`  | `admin`  |
| User  | `user1`  | `user1`  |

**Create New User:**

1. Click "Register" on login page
2. Fill form
3. Submit
4. Auto login with new credentials

---

## 📊 API Response Examples

### Login Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzMjY4OTYwMn0.XYZ"
}
```

### Get Users Response

```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "ROLE_ADMIN"
  }
]
```

### Error Response

```json
{
  "error": "Invalid credentials",
  "status": 401,
  "timestamp": "2025-11-07T10:30:00"
}
```

---

## 🎯 Next Steps

1. ✅ Start backend and frontend
2. ✅ Login with admin/admin
3. ✅ Explore Dashboard
4. ✅ Create test employees
5. ✅ Test Swagger API
6. ✅ Try dark mode toggle
7. ✅ Check About page for system info

---

## 📞 Support Resources

- **Swagger Docs:** http://localhost:8081/swagger-ui/index.html
- **H2 Console:** http://localhost:8081/h2-console (User: SA)
- **Frontend Console:** F12 in browser
- **Backend Logs:** Terminal where backend is running

---

**Last Updated:** November 7, 2025  
**For Help:** Check this guide's troubleshooting section
