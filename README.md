# Employee App - Fullstack (React + Spring Boot + H2/PostgreSQL)

## 🚀 Quick Start Instructions

### Prerequisites

- Java 17 (OpenJDK Temurin recommended)
- Maven 3.6+
- Node.js 16+ & npm
- Docker Desktop (optional, for PostgreSQL)

### ✅ Option 1: Run with H2 Database (Easiest - No Docker needed)

**Terminal 1 - Backend Setup:**

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Build and run Spring Boot (Windows):

   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
   mvn clean install
   mvn spring-boot:run
   ```

3. Wait for message: `Started ... in X seconds`
   - **Backend API**: http://localhost:8081
   - **H2 Database Console**: http://localhost:8081/h2-console
     - JDBC URL: `jdbc:h2:mem:employee_db`
     - Username: `SA`
     - Password: (empty)

**Terminal 2 - Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

- **Frontend**: http://localhost:5173 (Vite default port)

### 📖 API Documentation (Swagger)

Once backend is running, open in browser:

🔗 **[http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)**

#### Using Swagger with Authentication

**Public Endpoints (No Authentication Required):**

- `GET /api/employees` - List all employees
- `GET /api/users` - List all users
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user

**Protected Endpoints (Authentication Required):**

- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- Other management endpoints

**How to Authorize in Swagger:**

1. Click **POST /api/auth/login** → Try it out
2. Use credentials: `{"username": "admin", "password": "admin"}`
3. Copy the returned JWT token from response
4. Click **🔓 Authorize** button at top of Swagger UI
5. Enter: `Bearer <your-token-here>` (include "Bearer" prefix)
6. Click **Authorize** → Now you can access protected endpoints

> **Troubleshooting Swagger:**
>
> - ✓ Ensure backend is running on port 8081
> - ✓ Check console for startup errors
> - ✓ Try: `mvn clean install` then restart
> - ✓ URL should be `/swagger-ui/index.html` (not `.html`)
> - ✓ If getting 403 error, verify security config allows Swagger routes

### 🔐 Default Login Credentials

| Role  | Username | Password |
| ----- | -------- | -------- |
| Admin | `admin`  | `admin`  |
| User  | `user1`  | `user1`  |

### Option 2: Run with PostgreSQL Database

1. **Start Docker Desktop** and run:

   ```bash
   docker-compose up -d postgres
   ```

2. **Update backend `application.yml`:**

   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/employee_db
       driver-class-name: org.postgresql.Driver
       username: admin
       password: pass
     jpa:
       hibernate:
         ddl-auto: update
       database-platform: org.hibernate.dialect.PostgreSQLDialect
   ```

3. **Run backend:**
   ```bash
   cd backend
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
   mvn clean install
   mvn spring-boot:run
   ```

### Option 3: Full Docker Setup

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8081
- Swagger: http://localhost:8081/swagger-ui/index.html
- PostgreSQL: localhost:5432

---

## � API Documentation

### Accessing Swagger UI

**URL:** http://localhost:8081/swagger-ui/index.html

The Swagger UI provides:

- ✅ Interactive API endpoint explorer
- ✅ Test endpoints with sample data
- ✅ View all request/response schemas
- ✅ Authentication token management

### Common API Endpoints

| Method | Endpoint             | Purpose             |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/login`    | User login          |
| POST   | `/api/auth/register` | User registration   |
| GET    | `/api/users`         | List all users      |
| POST   | `/api/users`         | Create new user     |
| GET    | `/api/employees`     | List all employees  |
| POST   | `/api/employees`     | Create new employee |

### Authentication

All protected endpoints require Bearer token:

```
Authorization: Bearer <jwt-token>
```

Obtain token from login endpoint:

```json
POST /api/auth/login
{
  "username": "admin",
  "password": "admin"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎨 Features

### Frontend (React + TypeScript)

- ✅ **Modern UI** - Responsive design with Tailwind-inspired colors
- ✅ **Dark Mode** - Full dark theme with high contrast
- ✅ **Authentication** - JWT-based login/register flows
- ✅ **Dashboard** - Real-time analytics and statistics
- ✅ **Employee Management** - CRUD operations with validation
- ✅ **User Management** - Admin controls for user accounts
- ✅ **Navigation** - React Router with protected routes

### Backend (Spring Boot)

- ✅ **REST API** - Full RESTful endpoints with validation
- ✅ **Security** - Spring Security with JWT authentication
- ✅ **Database** - JPA with H2/PostgreSQL support
- ✅ **Documentation** - Swagger/OpenAPI integration
- ✅ **Error Handling** - Comprehensive exception management
- ✅ **CORS** - Configured for local development

---

## 🔧 Troubleshooting

### Backend Won't Start

**Error:** "No plugin found for prefix 'spring-boot'"

- ✓ Ensure you're in the `backend` directory
- ✓ Run: `cd backend` first

**Error:** "JAVA_HOME not defined"

- ✓ Set JAVA_HOME before running Maven
- ✓ Windows PowerShell: `$env:JAVA_HOME = "C:\path\to\jdk17"`

**Error:** "Port 8081 already in use"

- ✓ Change port in `application.yml`: `server.port: 8082`
- ✓ Or kill existing process on port 8081

### Frontend Won't Connect

**Error:** "Failed to fetch from localhost:8081"

- ✓ Check backend is running
- ✓ Verify backend is on port 8081
- ✓ Clear browser cache (Ctrl+Shift+Delete)
- ✓ Check `frontend/src/services/api.ts` has correct backend URL

### Swagger Not Working

**Error:** 404 on `/swagger-ui/index.html`

- ✓ Ensure backend started successfully
- ✓ Check Maven log for errors
- ✓ Try: `mvn clean install` and restart
- ✓ Verify dependency in pom.xml: `springdoc-openapi-starter-webmvc-ui` v2.5.0+

### Database Issues

**H2 Database:**

- Access console at: http://localhost:8081/h2-console
- JDBC URL: `jdbc:h2:mem:employee_db`
- Data persists only during session

**PostgreSQL:**

- Check Docker container: `docker ps`
- View logs: `docker logs employee-postgres`
- Connect: `psql -U admin -d employee_db -h localhost`

---

## 📁 Project Structure

```
employee-app/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/example/
│   │       ├── config/         # Security & Swagger config
│   │       ├── controller/     # REST endpoints
│   │       ├── entity/         # JPA entities
│   │       ├── service/        # Business logic
│   │       └── repository/     # Data access
│   ├── pom.xml                # Maven dependencies
│   └── application.yml        # Server config
│
├── frontend/                   # React + TypeScript UI
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API & Auth service
│   │   └── styles.css        # Global + dark mode styles
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── db/                        # PostgreSQL data volumes
├── docker-compose.yml         # Docker services config
└── README.md                  # This file
```

---

## 📋 TODO / Future Enhancements

- [ ] Advanced employee search and filtering
- [ ] Performance ratings and reviews
- [ ] Attendance tracking system
- [ ] Leave and time-off management
- [ ] Document management and upload
- [ ] Email notifications
- [ ] Export reports (PDF/Excel)
- [ ] Multi-language support (i18n)
- [ ] Two-factor authentication (2FA)
- [ ] Audit logging and activity tracking
- [ ] Bulk operations (import/export)
- [ ] API rate limiting
- [ ] Database backup automation
- [ ] Performance monitoring dashboard
- [ ] Unit and integration tests
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deployment to cloud (AWS/Azure/GCP)

---

## 🔐 Security Notes

- JWT tokens expire after configured duration
- Passwords hashed using Spring Security BCrypt
- CORS enabled for local development only
- Input validation on both frontend and backend
- SQL injection prevention via JPA parameterized queries

> ⚠️ **Production Checklist:**
>
> - Change default admin credentials
> - Enable HTTPS/SSL
> - Configure CORS for production domain
> - Enable JWT token expiration
> - Set environment variables for sensitive data
> - Enable database backups
> - Configure firewall rules
> - Enable rate limiting
> - Set up monitoring and logging

---

## 📞 Support & Documentation

1. Check [Troubleshooting](#-troubleshooting) section above
2. View API docs: http://localhost:8081/swagger-ui/index.html
3. Check backend logs for error details
4. Inspect browser console for frontend errors
5. Check `application.yml` for configuration issues

---

## 📄 Tech Stack

| Layer              | Technology                                          |
| ------------------ | --------------------------------------------------- |
| **Frontend**       | React 18, TypeScript, Vite, CSS3                    |
| **Backend**        | Spring Boot 3.3.0, Spring Security, Spring Data JPA |
| **Database**       | H2 (dev), PostgreSQL (prod)                         |
| **API Docs**       | Springdoc OpenAPI 2.5.0 (Swagger)                   |
| **Authentication** | JWT (jjwt 0.11.5)                                   |
| **Build Tools**    | Maven, npm                                          |

---

## 📚 Documentation

- **[📖 Setup & Troubleshooting Guide](./SETUP.md)** - Detailed step-by-step setup with common issues
- **[📋 Project TODOs](./TODOS.md)** - Feature roadmap and enhancement ideas
- **[🔗 API Swagger](http://localhost:8081/swagger-ui/index.html)** - Interactive API documentation (requires backend running)

---

- For PostgreSQL: Ensure Docker is running and postgres container is up

## 📁 Project Structure

```
employee-app/
├── backend/           # Spring Boot API
├── frontend/          # React frontend
├── db/               # Database data (when using Docker)
├── docker-compose.yml
└── README.md
```
