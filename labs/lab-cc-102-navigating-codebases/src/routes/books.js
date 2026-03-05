const express = require('express');
const { validateISBN, sanitiseQuery } = require('../utils/validator');
const { paginate } = require('../utils/helpers');
const books = require('../../data/books.json');

const router = express.Router();

// List all books (with optional pagination)
router.get('/', (req, res) => {
    const { page = 1, limit = 10, genre } = req.query;
    let results = books;

    if (genre) {
        results = results.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
    }

    res.json(paginate(results, Number(page), Number(limit)));
});

// Search books — BUG: author filter is never applied
router.get('/search', (req, res) => {
    const query = sanitiseQuery(req.query.q || '');
    const author = req.query.author;

    let results = books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase())
    );

    // TODO: also filter by author when provided
    if (author) {
        // This condition is unreachable — author filter was accidentally left out
        results = results;
    }

    res.json({ results, total: results.length });
});

// Get a single book by ISBN
router.get('/:isbn', (req, res) => {
    if (!validateISBN(req.params.isbn)) {
        return res.status(400).json({ error: 'Invalid ISBN format' });
    }

    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
});

// Get books by the same author
router.get('/by-author/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const result = books.filter(b => b.author.toLowerCase().includes(name));
    res.json({ results: result, total: result.length });
});

module.exports = { bookRoutes: router };
