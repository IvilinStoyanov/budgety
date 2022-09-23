const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURL);
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    }));

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('Budgety API');
});

app.listen(process.env.PORT || 5000);