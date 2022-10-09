const _ = require('lodash');
const mongoose = require('mongoose');
const Categories = mongoose.model('categories');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/categories', requireLogin, async (req, res) => {
        try {
            const categories = await Categories.find({ _user: req.user.id });

            return res.send(categories);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get('/api/category/:id', requireLogin, async (req, res) => {
        try {
            const category = await Categories
                .findOne({ _user: req.user.id, _id: req.params.id });

            res.send(category);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/api/categories', requireLogin, async (req, res) => {
        const categories = _.map(req.body, ({ name, icon, color }) => {
            return { name, icon, color, _user: req.user._id };
        });

        try {
            await Categories.insertMany(categories);

            req.user.isCategoriesSet = true;
            const user = await req.user.save();

            res.send(user);
        } catch (error) {
            res.status(422).send(error);
        }
    });
};