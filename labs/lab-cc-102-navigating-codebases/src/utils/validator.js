/**
 * Validates ISBN-13 format (digits only, 13 chars)
 * NOTE: does not verify the check digit — intentional simplification
 */
function validateISBN(isbn) {
    return /^\d{13}$/.test(isbn);
}

/**
 * Strips leading/trailing whitespace and removes any HTML tags.
 * Used to sanitise search query strings.
 */
function sanitiseQuery(str) {
    return str.trim().replace(/<[^>]*>/g, '');
}

/**
 * Validates that a price is a positive number with at most 2 decimal places.
 */
function validatePrice(price) {
    return typeof price === 'number' && price > 0 && /^\d+(\.\d{1,2})?$/.test(String(price));
}

module.exports = { validateISBN, sanitiseQuery, validatePrice };
