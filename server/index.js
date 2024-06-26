const express = require('express');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./models/Categories');
require('./models/Transactions');
require('./services/passport');

mongoose.connect(keys.mongoURL);
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
    app.use(express.static('client/dist'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000);