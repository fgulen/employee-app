# Employee App - Fullstack (React + Spring Boot + H2/PostgreSQL)

## 🚀 Quick Start Instructions

### Prerequisites

- Java 17 (OpenJDK Temurin recommended)
- Maven
- Node.js & npm
- Docker Desktop (optional, for PostgreSQL)

### Option 1: Run with H2 Database (Easiest - No Docker needed)

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Set JAVA_HOME and run Spring Boot:**

   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
   mvn spring-boot:run
   ```

3. **Access the application:**

   - **Backend API**: http://localhost:8081
   - **H2 Database Console**: http://localhost:8081/h2-console
     - JDBC URL: `jdbc:h2:mem:employee_db`
     - Username: `SA`
     - Password: (empty)
   - **Swagger Documentation**: http://localhost:8081/swagger-ui.html

4. **Default Login Credentials:**

   - Username: `admin`
   - Password: `admin`

5. **Run Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - **Frontend**: http://localhost:3000

### Option 2: Run with PostgreSQL Database

1. **Start Docker Desktop**

2. **Start PostgreSQL database:**

   ```bash
   docker-compose up -d postgres
   ```

3. **Update backend configuration:**
   - Change `application.yml` to use PostgreSQL instead of H2
4. **Run backend:**
   ```bash
   cd backend
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
   mvn spring-boot:run
   ```

### Option 3: Full Docker Setup

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8081
- Swagger: http://localhost:8081/swagger-ui.html

## 📝 API Usage Notes

- **Default Admin User**: `admin/admin` (created automatically on startup)
- **Register new user**: POST `/api/auth/register`
  ```json
  {
    "username": "newuser",
    "password": "password123",
    "email": "user@example.com",
    "role": "ROLE_USER"
  }
  ```
- **Login**: POST `/api/auth/login`
- **Authorization**: Use Bearer token in header: `Authorization: Bearer <token>`

## 🔧 Troubleshooting

1. **"No plugin found for prefix 'spring-boot'"**: Make sure you're in the `backend` directory
2. **"JAVA_HOME not defined"**: Set JAVA_HOME environment variable before running Maven
3. **Database connection issues**:
   - For H2: Check if application.yml uses H2 configuration
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
