// tests/mocks/ensureAuthenticated.js
module.exports = (req, res, next) => {
    req.user = { id: 1, role: 'researcher' };  // Mock authenticated user
    next();  // Call next() to continue to the next middleware or route handler
};
