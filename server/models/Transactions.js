const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionsSchema = new Schema({
    description: String,
    dateCreated: Date,
    type: String,
    value: Number,
    _categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
    _user: { type: Schema.Types.ObjectId, ref: 'user' }
})

mongoose.model('transactions', transactionsSchema);