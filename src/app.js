/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       required:
 *         - name
 *         - subscribedChannel
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           description: Name of the subscriber
 *         subscribedChannel:
 *           type: string
 *           description: Name of the subscribed channel
 *         subscribedDate:
 *           type: string
 *           format: date
 *           description: Date when the subscription was made
 */

/**
 * Main application file for YouTube Subscribers API
 * Handles all route definitions and request processing
 */

const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const Subscriber = require('./models/subscribers');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "YouTube Subscribers API Documentation"
}));

// Serve the HTML page at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Retrieve a list of all YouTube channel subscribers
 *     responses:
 *       200:
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       500:
 *         description: Server error
 */
app.get('/subscribers', async (req, res) => {
    try {
        console.log('Fetching all subscribers...');
        const subscribers = await Subscriber.find();
        console.log(`Successfully retrieved ${subscribers.length} subscribers`);
        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /subscribers/names:
 *   get:
 *     summary: Get subscribers names and channels
 *     description: Retrieve a list of subscribers with only their names and subscribed channels
 *     responses:
 *       200:
 *         description: A list of subscriber names and their channels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   subscribedChannel:
 *                     type: string
 *       500:
 *         description: Server error
 */
app.get('/subscribers/names', async (req, res) => {
    try {
        console.log('Fetching subscribers names and channels...');
        const subscribers = await Subscriber.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
        console.log(`Successfully retrieved ${subscribers.length} subscriber names`);
        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscriber names:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get subscriber by ID
 *     description: Retrieve a specific subscriber by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the subscriber
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A subscriber object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       400:
 *         description: Invalid ID or subscriber not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get('/subscribers/:id', async (req, res) => {
    try {
        console.log(`Fetching subscriber with ID: ${req.params.id}`);
        const subscriber = await Subscriber.findById(req.params.id);
        if (subscriber) {
            console.log('Subscriber found:', subscriber.name);
            res.json(subscriber);
        } else {
            console.log(`No subscriber found with ID: ${req.params.id}`);
            res.status(400).json({ message: "Subscriber not found" });
        }
    } catch (error) {
        console.error('Error fetching subscriber by ID:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = app;
