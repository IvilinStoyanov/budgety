const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: Object,
    picture: String,
    email: String,
    locale: String,
    savings: { type: Number, default: 0 },
    inc: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    isCategoriesSet: { type: Boolean, default: false },
    role: { type: String, default: 'Member' }
});

mongoose.model('user', userSchema);