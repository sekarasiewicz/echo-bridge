# Echo Bridge

A full-stack web application with a React TypeScript frontend and Java Spring Boot backend, containerized with Docker and orchestrated with Docker Compose.

## 🚀 Features

- **Frontend**: Modern React 18 with TypeScript and Vite
- **Backend**: Java Spring Boot 3.2 with REST API
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for easy deployment
- **Responsive Design**: Mobile-friendly UI
- **Real-time Validation**: Form validation with instant feedback
- **Error Handling**: Comprehensive error states and user feedback
- **Health Checks**: Built-in health monitoring

## 🏗️ Architecture

```
echo-bridge/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API service layer
│   │   ├── types/           # TypeScript interfaces
│   │   └── App.tsx          # Main application
│   ├── Dockerfile           # Production build
│   ├── Dockerfile.dev       # Development build
│   └── nginx.conf           # Nginx configuration
├── backend/                  # Java Spring Boot application
│   ├── src/
│   │   ├── main/java/
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── dto/         # Data transfer objects
│   │   │   └── exception/   # Error handling
│   │   └── resources/       # Configuration files
│   └── Dockerfile           # Multi-stage build
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development orchestration
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **React**: 18+ with TypeScript
- **Vite**: Build tool and development server
- **Axios**: HTTP client for API communication
- **CSS**: Component-scoped styling with responsive design

### Backend
- **Java**: 17+
- **Spring Boot**: 3.2.0
- **Maven**: Build tool
- **Jackson**: JSON processing

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Service orchestration
- **Nginx**: Web server for frontend
- **Maven**: Java build tool

## 📋 Prerequisites

- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Java**: 17+ (for local development)
- **Node.js**: 18+ (for local development)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd echo-bridge
   ```

2. **Start the application**
   ```bash
   # Production mode
   docker-compose up --build
   
   # Development mode (with hot reload)
   docker-compose -f docker-compose.dev.yml up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Health Check: http://localhost:8080/api/health

### Option 2: Local Development

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

#### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8080)

#### Backend
- `SERVER_PORT`: Server port (default: 8080)
- `SPRING_PROFILES_ACTIVE`: Active profile (docker/dev)

### Docker Compose Profiles

#### Production (`docker-compose.yml`)
- Optimized builds
- Nginx serving frontend
- Health checks enabled
- Production logging

#### Development (`docker-compose.dev.yml`)
- Hot reload enabled
- Volume mounts for live editing
- Debug logging
- Development tools

## 📡 API Endpoints

### Echo Service
- **POST** `/api/echo` - Send message and get echo response
  ```json
  Request:  {"message": "Hello, World!"}
  Response: {"echo": "Echo: Hello, World!", "timestamp": "2024-01-15 10:30:45"}
  ```

### Health Check
- **GET** `/api/health` - Service health status
  ```
  Response: "Echo Bridge Backend is running!"
  ```

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

### Integration Tests
```bash
# Start the application
docker-compose up --build

# Test API endpoints
curl -X POST http://localhost:8080/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

## 🐳 Docker Commands

### Build Images
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Services
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Start specific service
docker-compose up backend
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔍 Monitoring

### Health Checks
- Backend: http://localhost:8080/api/health
- Frontend: http://localhost:3000/health

### Logs
```bash
# View real-time logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :8080
   
   # Change ports in docker-compose.yml if needed
   ```

2. **Build Failures**
   ```bash
   # Clean and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

3. **API Connection Issues**
   - Ensure backend is running: `docker-compose logs backend`
   - Check CORS configuration
   - Verify network connectivity

4. **Frontend Not Loading**
   - Check nginx logs: `docker-compose logs frontend`
   - Verify build output: `docker-compose exec frontend ls /usr/share/nginx/html`

### Development Tips

1. **Hot Reload Issues**
   ```bash
   # Use development compose file
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Database Issues** (if added later)
   ```bash
   # Reset volumes
   docker-compose down -v
   docker-compose up --build
   ```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./backend/README.md#api-endpoints)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs: `docker-compose logs`
3. Open an issue in the repository 