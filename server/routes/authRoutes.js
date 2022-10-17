const passport = require('passport');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

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

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.status(200).send({status: 'OK'})
    });

    app.get('/api/current_user', (req, res) => {
        try {
            res.send(req.user);
        } catch (error) {
            res.status(400).send(error);
        }
      
    });
};
