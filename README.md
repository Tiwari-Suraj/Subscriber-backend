# YouTube Subscribers API

A robust Node.js and MongoDB-based RESTful API for managing YouTube channel subscribers, featuring comprehensive documentation and a user-friendly testing interface.

## Project Summary

The YouTube Subscribers API is a well-structured Node.js application that provides a seamless interface for managing YouTube channel subscriber data. Built with Express.js and MongoDB, this API demonstrates best practices in modern web API development, including modular architecture, comprehensive documentation, and robust error handling.

Key Features:

- RESTful API endpoints for subscriber management
- Interactive Swagger documentation
- User-friendly API testing interface
- MongoDB integration with proper error handling
- CORS support for cross-origin requests
- Environment-based configuration
- Production-ready setup

The project follows a modular architecture with clear separation of concerns:

- Route handlers are isolated in app.js
- Database connection is managed in a separate module
- Configuration is environment-based
- API documentation is auto-generated from code comments

The API provides three main endpoints:

1. GET /subscribers - Returns complete subscriber information
2. GET /subscribers/names - Returns subscriber names and their subscribed channels
3. GET /subscribers/:id - Returns specific subscriber details by ID

Technical Stack:

- Node.js with Express.js for the server
- MongoDB for data storage
- Swagger for API documentation
- HTML/CSS/JavaScript for the testing interface
- Environment-based configuration for deployment flexibility

## Deployment Instructions

1. Prerequisites:

   - Node.js (v14 or higher)
   - MongoDB instance (local or cloud)
   - npm or yarn package manager

2. Environment Setup:

   ```bash
   # Clone the repository
   git clone <repository-url>
   cd youtube-subscribers-api

   # Install dependencies
   npm install

   # Create .env file from example
   cp .env.example .env
   ```

3. Configure Environment Variables:
   Edit the `.env` file with your settings:

   ```
   PORT=3000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   CORS_ORIGIN=your-frontend-domain
   ```

4. Database Setup:

   ```bash
   # Initialize the database with sample data
   npm run create-db
   ```

5. Start the Server:

   ```bash
   # Production mode
   npm start

   # Development mode with auto-reload
   npm run dev
   ```

6. Access Points:
   - API Documentation: `http://your-domain/api-docs`
   - API Testing Interface: `http://your-domain`
   - API Endpoints: `http://your-domain/subscribers`

## Production Considerations

- Set appropriate CORS settings for production
- Use environment variables for sensitive data
- Configure proper MongoDB authentication
- Set up monitoring and logging
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Set up proper error tracking

## Monitoring and Maintenance

- API endpoints are monitored for errors
- Database connection is automatically managed
- Graceful shutdown handling
- Comprehensive error logging
- Response time monitoring

The project is ready for both development and production deployment, with proper security measures and best practices implemented throughout the codebase.

## Description

This project provides a RESTful API to manage YouTube channel subscribers. It uses MongoDB for data storage and Express.js for handling HTTP requests. The API allows you to retrieve subscriber information in various formats.

## Features

- Get all subscribers with complete information
- Get subscribers' names and subscribed channels only
- Get specific subscriber details by ID
- Error handling for invalid requests
- MongoDB integration

## API Endpoints

1. `GET /subscribers`

   - Returns an array of all subscribers with complete details
   - Response: Array of subscriber objects

2. `GET /subscribers/names`

   - Returns an array of subscribers with only name and subscribedChannel
   - Response: Array of objects with name and subscribedChannel fields

3. `GET /subscribers/:id`
   - Returns a specific subscriber by their ID
   - Response: Single subscriber object
   - Error Response (400): If ID is invalid or not found

## Schema

```javascript
{
    name: String,           // Subscriber's name
    subscribedChannel: String,    // Channel name
    subscribedDate: Date         // Subscription date
}
```

## Setup Instructions

1. Prerequisites:

   - Node.js installed
   - MongoDB installed and running locally

2. Installation:

   ```bash
   npm install
   ```

3. Database Setup:

   ```bash
   node src/createDatabase.js
   ```

4. Start the Server:

   ```bash
   node src/index.js
   ```

5. Access the API at:
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app.js              # Express app and route handlers
├── createDatabase.js   # Database initialization
├── data.js            # Sample data
├── index.js           # Server startup
└── models/
    └── subscribers.js  # Mongoose schema and model
```

## Error Handling

- 400: Bad Request (Invalid ID)
- 500: Server Error

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Testing

To test the API endpoints:

1. Get all subscribers:

   ```
   GET http://localhost:3000/subscribers
   ```

2. Get names and channels:

   ```
   GET http://localhost:3000/subscribers/names
   ```

3. Get by ID:
   ```
   GET http://localhost:3000/subscribers/:id
   ```
