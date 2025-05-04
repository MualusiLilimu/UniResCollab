// tests/mocks/ensureResearcher.js
module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'researcher') {
        return next(); 
    }
    res.status(403).send('Forbidden'); 
};
