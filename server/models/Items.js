const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemsSchema = new Schema({
    description: String,
    dateCreated: Date,
    type: String,
    value: Number,
    _transaction: { type: Schema.Types.ObjectId, ref: 'transactions' }
})

mongoose.model('items', itemsSchema);