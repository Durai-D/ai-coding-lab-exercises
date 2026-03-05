const users = require('../../data/users.json');

/**
 * Simple token-based auth middleware.
 * Expects: Authorization: Bearer <token>
 * Token format: base64(userId:secret)
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.slice(7);

    let decoded;
    try {
        decoded = Buffer.from(token, 'base64').toString('utf8');
    } catch {
        return res.status(401).json({ error: 'Invalid token encoding' });
    }

    const [userId, secret] = decoded.split(':');

    if (!userId || !secret) {
        return res.status(401).json({ error: 'Malformed token payload' });
    }

    const user = users.find(u => u.id === userId && u.secret === secret);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Attach userId to request for downstream handlers
    req.userId = user.id;
    next();
}

module.exports = { authMiddleware };
