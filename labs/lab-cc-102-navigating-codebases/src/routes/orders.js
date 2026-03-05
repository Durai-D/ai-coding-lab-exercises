const express = require('express');
const { generateOrderId } = require('../utils/helpers');
const books = require('../../data/books.json');

const router = express.Router();

// In-memory order store (resets on server restart)
const orders = [];

// Get all orders for the current user
router.get('/', (req, res) => {
    const userOrders = orders.filter(o => o.userId === req.userId);
    res.json({ orders: userOrders, total: userOrders.length });
});

// Place a new order
router.post('/', (req, res) => {
    const { isbn, quantity = 1 } = req.body;

    if (!isbn) return res.status(400).json({ error: 'ISBN is required' });

    const book = books.find(b => b.isbn === isbn);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (quantity < 1 || quantity > 10) {
        return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
    }

    const order = {
        id: generateOrderId(),
        userId: req.userId,
        isbn,
        bookTitle: book.title,
        quantity,
        totalPrice: (book.price * quantity).toFixed(2),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
    };

    orders.push(order);
    res.status(201).json(order);
});

// Get a specific order
router.get('/:orderId', (req, res) => {
    const order = orders.find(
        o => o.id === req.params.orderId && o.userId === req.userId
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
});

module.exports = { orderRoutes: router };
