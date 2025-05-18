const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database
 * @param {string} DATABASE_URL - MongoDB connection string
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async (DATABASE_URL) => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const conn = await mongoose.connect(DATABASE_URL, connectionParams);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Set up connection error handlers
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB; 