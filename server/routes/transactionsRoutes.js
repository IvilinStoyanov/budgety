const mongoose = require('mongoose');
const Categories = mongoose.model('categories');
const Transactions = mongoose.model('transactions');
const rateLimit = require('express-rate-limit');

const requireLogin = require('../middlewares/requireLogin');

const transactionsRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const buildUserTransactionQuery = (req, categoryId) => ({
    _categoryId: categoryId,
    $or: [
        { _user: req.user._id || req.user.id },
        { _user: { $exists: false } }
    ]
});

const buildOwnedTransactionsQuery = (req, categoryIds) => ({
    _categoryId: { $in: categoryIds },
    $or: [
        { _user: req.user._id || req.user.id },
        { _user: { $exists: false } }
    ]
});

module.exports = app => {
    app.get('/api/transactions', transactionsRateLimiter, requireLogin, async (req, res) => {
        try {
            const { _categoryId, pageIndex, pageSize } = req.query;
            const parsedPageIndex = Number(pageIndex || 0);
            const parsedPageSize = Number(pageSize || 10);
            const skip = parsedPageIndex * parsedPageSize;
            const transactionQuery = buildUserTransactionQuery(req, _categoryId);

            const count = await Transactions.countDocuments(transactionQuery);

            const transactions = await Transactions
                .find(transactionQuery)
                .sort({ dateCreated: -1 })
                .skip(skip)
                .limit(parsedPageSize);

            res.send({ transactions, length: count });
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get('/api/transactions/latest', transactionsRateLimiter, requireLogin, async (req, res) => {
        try {
            const parsedLimit = Math.min(Math.max(Number(req.query.limit || 10), 1), 50);
            const categories = await Categories.find({ _user: req.user.id }).select('_id name');
            const categoryIds = categories.map(category => category._id.valueOf());

            if (categoryIds.length === 0) {
                return res.send([]);
            }

            const categoryNamesById = new Map(
                categories.map(category => [category._id.valueOf(), category.name])
            );

            const transactions = await Transactions
                .find(buildOwnedTransactionsQuery(req, categoryIds))
                .sort({ dateCreated: -1 })
                .limit(parsedLimit)
                .lean();

            const latestTransactions = transactions.map(transaction => ({
                ...transaction,
                categoryName: categoryNamesById.get(String(transaction._categoryId)) || ''
            }));

            return res.send(latestTransactions);
        } catch (error) {
            return res.status(400).send(error);
        }
    });

    app.post('/api/transactions/global', transactionsRateLimiter, requireLogin, async (req, res) => {
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
                _categoryId,
                _user: req.user._id
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

    app.post('/api/transactions', transactionsRateLimiter, requireLogin, async (req, res) => {
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
                _categoryId,
                _user: req.user._id
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
                        ...buildOwnedTransactionsQuery(req, obj_ids),
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
    
            const currentMonth = monthsList.find(m => m.name.toLowerCase() === month.toLowerCase());
            if (!currentMonth) {
                return res.status(400).send({ error: 'Invalid month parameter' });
            }
    
            const yearInt = parseInt(year, 10);
    
            // Create start date and end date for the given month and year
            const startDate = new Date(yearInt, currentMonth.id, 1, 0, 0, 0);
      
            const endDate = new Date(yearInt, currentMonth.id + 1, 1, 0, 0, 0);
    
            const categories = await Categories.find({ _user: req.user.id });
            const obj_ids = categories.map(category => category._id.valueOf());
    
            const transactions = await Transactions.find({
                ...buildOwnedTransactionsQuery(req, obj_ids),
                dateCreated: {
                    $gte: startDate,
                    $lt: endDate // Use $lt to ensure the end date is exclusive
                }
            });
    
            console.log('Start Date:', startDate.toISOString());
            console.log('End Date:', endDate.toISOString());
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
                        ...buildOwnedTransactionsQuery(req, obj_ids),
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