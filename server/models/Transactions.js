const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionsSchema = new Schema({
    color: String,
    exp: Number,
    expPercentage: Number,
    icon: String,
    categoryId: Number,
    inc: Number,
    incPercentage: Number,
    isVisible: { type: Boolean, default: false },
    _user: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('transactions', transactionsSchema);