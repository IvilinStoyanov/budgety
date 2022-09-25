const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    budget: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },
    totalInc: Number,
    totalExp: Number,
    incPercentage: Number,
    expPercentage: Number,
    isCategoriesSet: { type: Boolean, default: false }
});

mongoose.model('user', userSchema);