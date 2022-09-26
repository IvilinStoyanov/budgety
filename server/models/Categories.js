const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: String,
    color: String,
    icon: String,
    exp: { type: Number, default: 0 },
    expPercentage: { type: Number, default: 0 },
    categoryId: { type: Number, default: 0 },
    inc: { type: Number, default: 0 },
    incPercentage: { type: Number, default: 0 },
    transactionsCount: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    _user: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('categories', categoriesSchema);