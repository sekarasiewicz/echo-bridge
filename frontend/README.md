# Echo Bridge Frontend

A React TypeScript frontend application built with Vite that provides a user interface for the Echo Bridge application.

## Features

- **Modern React**: Built with React 18 and TypeScript
- **Vite Build Tool**: Fast development and optimized production builds
- **Responsive Design**: Mobile-friendly layout with modern UI
- **Form Validation**: Client-side validation with real-time feedback
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Visual feedback during API calls
- **Docker Support**: Containerized with nginx for production

## Technology Stack

- **React**: 18+ with TypeScript
- **Vite**: Build tool and development server
- **Axios**: HTTP client for API communication
- **CSS Modules**: Component-scoped styling
- **Docker**: Containerization with nginx

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── InputForm.tsx
│   │   ├── InputForm.css
│   │   ├── ResponseDisplay.tsx
│   │   └── ResponseDisplay.css
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── api.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── Dockerfile
├── nginx.conf
├── .dockerignore
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API proxy: http://localhost:3000/api/\* (forwards to backend)

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Integration

The frontend communicates with the backend API through:

- **Base URL**: Configurable via `VITE_API_URL` environment variable
- **Default**: `http://localhost:8080` (with proxy in development)
- **Endpoints**:
  - `POST /api/echo` - Send message and get echo response
  - `GET /api/health` - Health check

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080
```

## Components

### InputForm

- Text input with character limit (1000 chars)
- Real-time validation
- Loading state during submission
- Error display

### ResponseDisplay

- Shows API responses
- Error state handling
- Loading indicators
- Empty state

## Styling

The application uses:

- **CSS Modules** for component-scoped styles
- **Responsive design** with mobile-first approach
- **Modern UI** with gradients and smooth animations
- **Accessibility** considerations

## Docker

### Building the Image

```bash
docker build -t echo-bridge-frontend .
```

### Running with Docker

```bash
docker run -p 80:80 echo-bridge-frontend
```

### Docker Compose

The frontend is configured to work with Docker Compose. See the root `docker-compose.yml` file for the complete setup.

## Production Build

### Build Process

1. **Install dependencies**: `npm ci --only=production`
2. **Build application**: `npm run build`
3. **Serve with nginx**: Optimized static file serving

### Build Output

- **Location**: `dist/` directory
- **Optimization**: Minified and optimized for production
- **Source maps**: Available for debugging

## Configuration

### Vite Configuration (`vite.config.ts`)

- **Port**: 3000 (development)
- **Proxy**: API calls forwarded to backend
- **Build**: Optimized production output

### Nginx Configuration (`nginx.conf`)

- **Port**: 80 (production)
- **Gzip compression**: Enabled
- **Security headers**: Configured
- **SPA routing**: React Router support
- **API proxy**: Backend communication

## Testing

### Manual Testing

1. Start the backend server
2. Start the frontend development server
3. Test form submission and response display
4. Test error scenarios (network issues, validation errors)
5. Test responsive design on different screen sizes

### Automated Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify proxy settings in `vite.config.ts`

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Docker Issues**
   - Ensure Docker is running
   - Check port conflicts
   - Verify nginx configuration

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Update documentation as needed
4. Test on different screen sizes
5. Ensure accessibility compliance

## License

This project is part of the Echo Bridge application.
