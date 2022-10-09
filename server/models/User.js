const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    savings: { type: Number, default: 0 },
    inc: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    isCategoriesSet: { type: Boolean, default: false }
});

mongoose.model('user', userSchema);