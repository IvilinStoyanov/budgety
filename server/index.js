const express = require('express');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');
const keys = require('./config/keys');

require('./models/User');
require('./models/Categories');
require('./models/Transactions');
require('./services/passport');


if (!keys.mongoURL) {
    console.error('MongoDB connection string is missing. Set MONGO_URI or MONGO_URL before starting the server.');
} else {
    mongoose.connect(keys.mongoURL, {
        family: 4,
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        tls: true,
    })
        .then(() => console.log('MongoDB connected'))
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    }));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/categoriesRoutes')(app);
require('./routes/transactionsRoutes')(app);
require('./routes/savingsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    const distPath = path.resolve(__dirname, 'client', 'dist', 'browser');

    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

app.listen(process.env.PORT || 5000);