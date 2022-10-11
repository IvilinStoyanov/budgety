const mongoose = require('mongoose');
const Categories = mongoose.model('categories');
const Transactions = mongoose.model('transactions');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/transactions', async (req, res) => {
        try {
            const { _categoryId, pageIndex, pageSize } = req.query;

            const count = await Transactions.count();
            const skip = pageIndex * pageSize;

            const totalPages = Math.ceil(count / pageSize);

            const transactions = await Transactions
                .find({ _user: req.user.id, _categoryId })
                .skip(skip)
                .limit(pageSize);

            res.send({ transactions, totalPages });
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/api/transactions/global', requireLogin, async (req, res) => {
        const { description, dateCreated, type, value, _categoryId } = req.body;

        try {
            await Categories
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

    app.post('/api/transactions', requireLogin, async (req, res) => {
        const { description, dateCreated, type, value, _categoryId } = req.body;

        try {
            await Categories
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
            await req.user.save();

            res.send(transaction);

        } catch (error) {
            res.status(422).send(error);
        }
    });

    app.delete('/api/transactions', requireLogin, async (req, res) => {
        const { _id, type, value, _categoryId } = req.query;

        try {
            const transaction = await Transactions.deleteOne({ _user: req.user.id, _id });
            let user;

            if (transaction.deletedCount > 0) {
                req.user[type] -= value;

                user = await req.user.save();

                await Categories
                    .updateOne({
                        _id: _categoryId
                    }, {
                        $inc: {
                            [type]: -value,
                            transactionsCount: -1,
                        }
                    })
                    .exec();
            }

            res.send({ user });

        } catch (error) {
            res.status(422).send(error);
        }
    });
};