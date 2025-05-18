const app = require('./app.js')
const connectDB = require('./db/connectDB')

const port = 3000
const DATABASE_URL = "mongodb+srv://prescripto-s:suraj@hospital.lswvacc.mongodb.net/Subscribers"

// Start server and connect to database
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB(DATABASE_URL)

        // Start Express server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
            console.log(`API Documentation: http://localhost:${port}/api-docs`)
            console.log(`API Tester: http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
