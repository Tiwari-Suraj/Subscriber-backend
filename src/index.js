const app = require('./app.js')
const connectDB = require('./db/connectDB')

const port = process.env.PORT || 3000
const DATABASE_URL = "mongodb+srv://prescripto-s:suraj@hospital.lswvacc.mongodb.net/Subscribers"

// Start server and connect to database
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB(DATABASE_URL)

        // Start Express server
        app.listen(port, () => {
            const baseUrl = process.env.NODE_ENV === 'production'
                ? 'https://subscriber-backend.onrender.com'
                : `http://localhost:${port}`;

            console.log(`Server is running on ${baseUrl}`);
            console.log(`API Documentation: ${baseUrl}/api-docs`);
            console.log(`API Tester: ${baseUrl}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
