const mongoose = require('mongoose');
const Categories = mongoose.model('categories');
const Transactions = mongoose.model('transactions');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/transactions', async (req, res) => {
        try {
            const transactions = await Transactions
                .find({ _user: req.user.id });

            res.send(transactions);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/api/transactions', requireLogin, async (req, res) => {
        const { description, dateCreated, type, value, _categoryId } = req.body;
        console.log(req.body);

        try {
            const category = Categories
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

            res.send({ category, transaction, user });

        } catch (error) {
            res.status(422).send(error);
        }
    });
};