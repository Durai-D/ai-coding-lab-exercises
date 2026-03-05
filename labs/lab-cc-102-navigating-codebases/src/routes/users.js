const express = require('express');
const { hashToken } = require('../utils/helpers');
const users = require('../../data/users.json');

const router = express.Router();

// Get current user profile
router.get('/me', (req, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Strip sensitive fields before returning
    const { passwordHash, ...safeUser } = user;
    res.json(safeUser);
});

// Update user display name
router.patch('/me', (req, res) => {
    const { displayName } = req.body;
    if (!displayName || displayName.trim().length < 2) {
        return res.status(400).json({ error: 'Display name must be at least 2 characters' });
    }

    // In-memory update (resets on server restart)
    const idx = users.findIndex(u => u.id === req.userId);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });
    users[idx].displayName = displayName.trim();

    res.json({ updated: true, displayName: users[idx].displayName });
});

// Get user's wishlist
router.get('/me/wishlist', (req, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ wishlist: user.wishlist || [] });
});

module.exports = { userRoutes: router };
