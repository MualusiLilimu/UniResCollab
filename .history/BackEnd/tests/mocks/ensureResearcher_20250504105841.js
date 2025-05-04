// tests/mocks/ensureResearcher.js
module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'researcher') {
        return next();  // User is a researcher, proceed to next middleware or handler
    }
    res.status(403).send('Forbidden'); 
};
