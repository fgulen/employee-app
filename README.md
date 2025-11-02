Employee App - Fullstack (React + Spring Boot + PostgreSQL)

Quick start with Docker:
  1. docker-compose up --build
  2. Frontend: http://localhost:3000
  3. Swagger/UI: http://localhost:8080/swagger-ui/index.html

Dev run separately:
  - Start DB: docker run -d -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=employeedb -p 5432:5432 postgres:15
  - Backend: cd backend && mvn spring-boot:run
  - Frontend: cd frontend && npm install && npm run dev

Notes:
  - Register a user via POST /api/auth/register with JSON { "username": "...", "password": "...", "role": "ROLE_ADMIN" }
  - Login at POST /api/auth/login to get { token }
  - Set Authorization header: "Bearer <token>"
