# EduInsight360 – Student Performance Analytics & Reporting System

EduInsight360 is a full-stack web application designed for analyzing student performance data to generate reports, insights, and actionable recommendations.

## 🏗️ System Architecture

- **Frontend**: React (Vite, TypeScript, Tailwind CSS, Axios, Lucide React)
- **Backend**: Spring Boot 3.x (Java 17+, Maven, JPA, Hibernate)
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **Analytics**: Automated average calculation and risk status detection logic.

## 🛠️ Setup Instructions

### Backend (Spring Boot)
1. **Prerequisites**: Ensure you have Java 17+ and Maven 3.x installed.
2. **Database**: 
   - Start your MySQL server.
   - Create a database called `eduinsight360`.
   - Update `backend/src/main/resources/application.properties` with your MySQL `username` and `password`.
3. **Run**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. **API Documentation**: Once running, visit `http://localhost:8080/swagger-ui.html` to explore the REST APIs.

### Frontend (React)
1. **Prerequisites**: Ensure you have Node.js and npm installed.
2. **Setup**:
   ```bash
   npm install
   ```
3. **Run**:
   ```bash
   npm run dev
   ```
4. **Access**: Visit `http://localhost:5173`.

## 👨‍🏫 Key Features
- **Admin (Teacher)**: Manage students, input marks, and view class-wide analytics.
- **Student**: View individual performance reports and track growth history.
- **Analytics**: Automated "At Risk" detection for students with low attendance or performance.
- **Security**: Stateless JWT-based authentication with role-based access control (ADMIN/STUDENT).
- **AOP**: Custom logging aspect for method execution time tracking.
