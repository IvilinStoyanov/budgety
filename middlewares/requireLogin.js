module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'You are not authorized, please sign in first' });
    }

    next();
};