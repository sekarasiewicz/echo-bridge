# Echo Bridge Backend

A Spring Boot REST API that provides echo functionality for the Echo Bridge application.

## Features

- **REST API**: POST endpoint for echo functionality
- **Input Validation**: Comprehensive validation with meaningful error messages
- **Error Handling**: Global exception handler with proper HTTP status codes
- **CORS Support**: Configured for cross-origin requests
- **Health Check**: Health endpoint for monitoring
- **Docker Support**: Containerized with multi-stage build

## Technology Stack

- **Java**: 17+
- **Spring Boot**: 3.2.0
- **Maven**: Build tool
- **Docker**: Containerization

## API Endpoints

### POST /api/echo
Echoes back the provided message with a timestamp.

**Request:**
```json
{
  "message": "Hello, World!"
}
```

**Response:**
```json
{
  "echo": "Echo: Hello, World!",
  "timestamp": "2024-01-15 10:30:45"
}
```

**Validation Rules:**
- Message cannot be empty
- Message cannot exceed 1000 characters

### GET /api/health
Health check endpoint.

**Response:**
```
Echo Bridge Backend is running!
```

## Local Development

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   Or using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Access the application**
   - API: http://localhost:8080
   - Health check: http://localhost:8080/api/health

### Testing

Run the test suite:
```bash
mvn test
```

Run tests with coverage:
```bash
mvn test jacoco:report
```

## Docker

### Building the Docker Image
```bash
docker build -t echo-bridge-backend .
```

### Running with Docker
```bash
docker run -p 8080:8080 echo-bridge-backend
```

### Docker Compose
The backend is configured to work with Docker Compose. See the root `docker-compose.yml` file for the complete setup.

## Configuration

The application can be configured through `application.properties`:

- **Server Port**: 8080 (default)
- **Logging**: DEBUG level for development
- **CORS**: Configured to allow all origins
- **Jackson**: Configured to exclude null values

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request with detailed field errors
- **Generic Errors**: 500 Internal Server Error with error details
- **All errors include**: Error type, message, status code, and timestamp

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/echobridge/backend/
│   │   │   ├── EchoBridgeApplication.java
│   │   │   ├── controller/
│   │   │   │   └── EchoController.java
│   │   │   ├── dto/
│   │   │   │   ├── EchoRequest.java
│   │   │   │   └── EchoResponse.java
│   │   │   └── exception/
│   │   │       └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/echobridge/backend/
│           └── controller/
│               └── EchoControllerTest.java
├── pom.xml
├── Dockerfile
├── .dockerignore
└── README.md
```

## Contributing

1. Follow the existing code style
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

This project is part of the Echo Bridge application. 