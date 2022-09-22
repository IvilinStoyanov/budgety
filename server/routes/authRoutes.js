const passport = require('passport');
const keys = require('../config/keys');

module.exports = app => {
    app.get(
        '/api/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/api/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect(`${keys.redirectDomain}/latest`);
        }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/users', (req, res) => {
        res.send({ test: 'test'});
    });
};
