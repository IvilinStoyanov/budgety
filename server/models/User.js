const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    budget: Number,
    savings: Number,
    totalInc: Number,
    totalExp: Number,
    incPercentage: Number,
    expPercentage: Number
});

mongoose.model('user', userSchema);