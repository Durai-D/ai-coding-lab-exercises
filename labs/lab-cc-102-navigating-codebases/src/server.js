const express = require('express');
const { bookRoutes } = require('./routes/books');
const { userRoutes } = require('./routes/users');
const { orderRoutes } = require('./routes/orders');
const { authMiddleware } = require('./middleware/auth');
const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

// Public routes
app.use('/api/books', bookRoutes);

// Protected routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: '1.0.0', uptime: process.uptime() });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Bookshop API running on port ${PORT}`);
});

module.exports = app;
