# Employee Management System

A full-stack employee management application demonstrating modern web development practices with React + TypeScript frontend, Spring Boot REST API backend, JWT authentication, role-based access control, and comprehensive CRUD operations.

## 🚀 Features

### Backend (Spring Boot)
- ✅ **RESTful API** with Spring Boot 3.1.5
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Admin and User roles with different permissions
- ✅ **Spring Security** - Comprehensive security configuration
- ✅ **JPA/Hibernate** - Database abstraction with ORM
- ✅ **H2 Database** - In-memory database for development
- ✅ **PostgreSQL Support** - Production-ready database configuration
- ✅ **Swagger/OpenAPI Documentation** - Interactive API documentation
- ✅ **CORS Configuration** - Cross-origin resource sharing enabled
- ✅ **Data Validation** - Input validation with Jakarta Bean Validation
- ✅ **Lombok** - Reduced boilerplate code

### Frontend (React + TypeScript)
- ✅ **React 18** with TypeScript
- ✅ **Vite** - Fast build tool and dev server
- ✅ **React Router** - Client-side routing
- ✅ **Axios** - HTTP client for API calls
- ✅ **Context API** - State management for authentication
- ✅ **Protected Routes** - Role-based route protection
- ✅ **Modern UI** - Clean, responsive design with custom CSS
- ✅ **JWT Token Management** - Automatic token handling
- ✅ **Form Validation** - Client-side validation

### CRUD Operations
- ✅ Create new employees (Admin only)
- ✅ Read/View employee list (All authenticated users)
- ✅ Update employee information (Admin only)
- ✅ Delete employees (Admin only)
- ✅ Filter employees by department

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 18+** and npm
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fgulen/employee-app.git
cd employee-app
```

### 2. Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend development server will start at `http://localhost:5173`

## 🔐 Demo Credentials

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Permissions:** Full access to all CRUD operations

### User Account
- **Username:** `user`
- **Password:** `user123`
- **Permissions:** Read-only access to employee data

## 📚 API Documentation

Once the backend is running, access the interactive Swagger API documentation at:

**Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

**OpenAPI JSON:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Employee Endpoints (Requires Authentication)
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee (Admin only)
- `PUT /api/employees/{id}` - Update employee (Admin only)
- `DELETE /api/employees/{id}` - Delete employee (Admin only)
- `GET /api/employees/department/{department}` - Get employees by department

## 🏗️ Project Structure

```
employee-app/
├── backend/                          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/employeeapp/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   ├── security/        # Security components
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/                         # React + TypeScript frontend
    ├── src/
    │   ├── components/              # Reusable components
    │   ├── contexts/                # React contexts
    │   ├── pages/                   # Page components
    │   ├── services/                # API services
    │   ├── types/                   # TypeScript types
    │   ├── App.tsx                  # Main app component
    │   └── main.tsx                 # Entry point
    ├── package.json
    └── vite.config.ts
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Port
server.port=8080

# Database Configuration (H2 - Development)
spring.datasource.url=jdbc:h2:mem:employeedb
spring.h2.console.enabled=true

# JWT Configuration
app.jwt.secret=your-secret-key
app.jwt.expiration=86400000
```

For production, use `application-prod.properties`:
- Configure PostgreSQL database
- Use environment variables for sensitive data
- Disable H2 console

### Frontend Configuration

Edit `frontend/src/services/api.ts` to change the API base URL:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🚀 Production Deployment

### Backend

1. Build the production JAR:
```bash
cd backend
mvn clean package -DskipTests
```

2. Run with production profile:
```bash
java -jar target/employee-app-1.0.0.jar --spring.profiles.active=prod
```

3. Configure environment variables:
```bash
export JWT_SECRET=your-production-secret
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/employeedb
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your-password
```

### Frontend

1. Build for production:
```bash
cd frontend
npm run build
```

2. The build output will be in `frontend/dist/`

3. Deploy to any static hosting service (Netlify, Vercel, AWS S3, etc.)

4. Update the API base URL in production build to point to your backend server

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🛡️ Security Features

- **JWT Token Authentication** - Stateless authentication mechanism
- **Password Encryption** - BCrypt password hashing
- **CORS Protection** - Configured allowed origins
- **SQL Injection Prevention** - JPA/Hibernate parameterized queries
- **XSS Protection** - React's built-in XSS protection
- **Role-Based Authorization** - Method-level security with @PreAuthorize
- **Session Management** - Stateless session policy

## 🔨 Technologies Used

### Backend
- Spring Boot 3.1.5
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)
- H2 Database
- PostgreSQL (production)
- Swagger/OpenAPI 3
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS3

## 📝 License

This project is open source and available under the [Apache 2.0 License](LICENSE).

## 👥 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using React + Spring Boot**
