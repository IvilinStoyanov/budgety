const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionsSchema = new Schema({
    description: String,
    dateCreated: Date,
    type: String,
    value: Number,
    _categoryId: { type: Schema.Types.ObjectId, ref: 'categories' }
})

mongoose.model('transactions', transactionsSchema);