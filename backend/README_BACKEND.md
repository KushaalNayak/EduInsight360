# EduInsight360 Backend

This is the Spring Boot backend for the EduInsight360 project, as required for your review.

## Tech Stack
- **Java 17+**
- **Spring Boot 3.2.4**
- **Spring Data JPA** (for database operations)
- **MySQL** (Relational database for storing user data)
- **REST APIs** (To communicate with React)

## How to Run

1.  **Open a terminal** and navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  **Run the application** using Maven:
    ```bash
    mvn spring-boot:run
    ```
3.  The backend will start on `http://localhost:8081`.
4.  Ensure you have a local MySQL instance running on `localhost:3306`. The application will create `edudb` database if it doesn't exist.

## Key API Endpoints
- `GET /api/students` - Fetch all students
- `GET /api/students/{id}` - Fetch a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/{id}` - Update student details
- `DELETE /api/students/{id}` - Delete a student

## Project Structure
- `com.eduinsight.backend.model` - JPA Entities (Student, Subject, Activity, Trend)
- `com.eduinsight.backend.repository` - Data Access Layer
- `com.eduinsight.backend.service` - Business Logic Layer
- `com.eduinsight.backend.controller` - REST API Layer
- `com.eduinsight.backend.config.DataLoader` - Seeds the database with sample data automatically on startup.
