const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.post('/api/savings', requireLogin, async (req, res) => {
        try {
            const { savings } = req.body;

            req.user.savings = savings;

            const user = await req.user.save();

            res.send(user);
        } catch (error) {
            res.status(400).send({ message: 'Not able to update savings.' });
        }
    });
};