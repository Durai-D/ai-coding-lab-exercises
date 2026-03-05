const crypto = require('crypto');

/**
 * Returns a paginated slice of an array plus metadata.
 */
function paginate(array, page = 1, limit = 10) {
    const total = array.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    return {
        data: array.slice(offset, offset + limit),
        pagination: { page, limit, total, totalPages },
    };
}

/**
 * Generates a short unique order ID prefixed with "ORD-"
 */
function generateOrderId() {
    return 'ORD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

/**
 * Returns a SHA-256 hex digest of the input string.
 * Used for token hashing.
 */
function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Groups an array of objects by a given key.
 * e.g. groupBy(books, 'genre') → { Fiction: [...], 'Non-fiction': [...] }
 */
function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const group = item[key] ?? 'unknown';
        (acc[group] = acc[group] || []).push(item);
        return acc;
    }, {});
}

module.exports = { paginate, generateOrderId, hashToken, groupBy };
