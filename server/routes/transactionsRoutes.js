const mongoose = require('mongoose');
const Categories = mongoose.model('categories');
const Transactions = mongoose.model('transactions');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/transactions', async (req, res) => {
        try {
            const { _categoryId, pageIndex, pageSize } = req.query;

            const count = await Transactions
                .find({ _categoryId })
                .count();

            const skip = pageIndex * pageSize;

            // const totalPages = Math.ceil(count / pageSize);

            const transactions = await Transactions
                .find({ _user: req.user.id, _categoryId })
                .sort({ dateCreated: -1})
                .skip(skip)
                .limit(pageSize);

            res.send({ transactions, length: count });
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/api/transactions/global', requireLogin, async (req, res) => {
        try {
            const { description, dateCreated, type, value, _categoryId } = req.body;

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
        try {
            const { description, dateCreated, type, value, _categoryId } = req.body;

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
        try {
            const { _id, type, value, _categoryId } = req.query;
            const transaction = await Transactions.deleteOne({ _categoryId, _id });
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

            res.send(user);

        } catch (error) {
            res.status(422).send(error);
        }
    });

    app.get('/api/transactions/monthly', requireLogin, async (req, res) => {
        try {
            const { year } = req.query;

            const categories = await Categories.find({ _user: req.user.id });

            const obj_ids = categories.map(category => {
                return category._id.valueOf();
            });

            const transactions = await Transactions
                .find(
                    {
                        _categoryId: { $in: obj_ids },
                        dateCreated: {
                            $gte: new Date(`${year}-01-01`),
                            $lt: new Date(`${year}-12-31`)
                        }
                    });

            res.send(transactions);

        } catch (error) {
            res.status(422).send(error);
        }
    });

    app.get('/api/transactions/monthly/:year/:month', requireLogin, async (req, res) => {
        try {
            const { year, month } = req.params;

            const monthsList = [
                { name: 'january', id: 0 },
                { name: 'february', id: 1 },
                { name: 'march', id: 2 },
                { name: 'april', id: 3 },
                { name: 'may', id: 4 },
                { name: 'june', id: 5 },
                { name: 'july', id: 6 },
                { name: 'august', id: 7 },
                { name: 'september', id: 8 },
                { name: 'october', id: 9 },
                { name: 'november', id: 10 },
                { name: 'december', id: 11 }
            ];

            const currentMonth = monthsList.find(m => m.name == month);
            const startDate = new Date(Date.UTC(year, (currentMonth.id + 1), 0));
            const endDate = new Date(Date.UTC(year, (currentMonth.id), 1));
            const categories = await Categories.find({ _user: req.user.id });

            const obj_ids = categories.map(category => {
                return category._id.valueOf();
            });

            const transactions = await Transactions
                .find(
                    {
                        _categoryId: { $in: obj_ids },
                        dateCreated: {
                            $gte: endDate,
                            $lte: startDate
                        }
                    });

            res.send(transactions);

        } catch (error) {
            res.status(422).send(error);
        }
    });

    app.get('/api/transactions/yearly', requireLogin, async (req, res) => {
        const { startYear, endYear } = req.query;

        try {
            const categories = await Categories.find({ _user: req.user.id });

            const obj_ids = categories.map(category => {
                return category._id.valueOf();
            });

            const transactions = await Transactions
                .find(
                    {
                        _categoryId: { $in: obj_ids },
                        dateCreated: {
                            $gte: new Date(`${endYear}-01-01`),
                            $lt: new Date(`${startYear}-12-31`)
                        },
                    });

            res.send(transactions);

        } catch (error) {
            res.status(422).send(error);
        }
    });
};