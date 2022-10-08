const mongoose = require('mongoose');
const Categories = mongoose.model('categories');
const Transactions = mongoose.model('transactions');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/transactions', async (req, res) => {
        try {
            const { _categoryId } = req.query;

            const transactions = await Transactions
                .find({ _user: req.user.id, _categoryId });

            res.send(transactions);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/api/transactions/global', requireLogin, async (req, res) => {
        const { description, dateCreated, type, value, _categoryId } = req.body;

        try {
            Categories
                .updateOne({
                    _id: _categoryId
                }, {
                    $inc: {
                        [type]: value,
                        transactionsCount: 1,
                    }
                })
                .exec();

            const transaction = new Transactions({
                description,
                type,
                value,
                dateCreated,
                _categoryId
            });

            req.user[type] += value;

            await transaction.save();
            const user = await req.user.save();

            const category = await Categories
                .findOne({ _user: req.user.id, _id: _categoryId });

            res.send({ _categoryId, category, user });

        } catch (error) {
            res.status(422).send(error);
        }
    });
};