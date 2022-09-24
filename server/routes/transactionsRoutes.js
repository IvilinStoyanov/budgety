const mongoose = require('mongoose');
const Transactions = mongoose.model('transactions');
const Items = mongoose.model('items');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.get('/api/transactions', async (req, res) => {
        const transactions = await Transactions
            .find({ _user: req.user.id });

        res.send(transactions);
    });


    app.post('/api/transactions', requireLogin, async (req, res) => {
        console.log(req.body);
        const { id, color, icon, exp, inc, expPercentage, incPercentage, isVisible } = req.body;

        try {
            const transactions = Transactions
                .updateOne({
                    categoryId: id
                }, {
                    $inc: { [req.body.items.type]: req.body.items.value },
                    $set: {
                        color,
                        expPercentage,
                        icon,
                        incPercentage,
                        isVisible,
                        _user: req.user.id
                    }
                }, { upsert: true })
                .exec();

            const items = new Items({
                descriptions: req.body.items.descriptions,
                type: req.body.items.type,
                value: req.body.items.value,
                dateCreated: req.body.items.dateCreated,
                _transaction: transactions._id
            });

            await items.save();

            res.send({ transactions });

        } catch (error) {
            res.status(422).send(error);
        }
    });
};