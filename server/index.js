const express = require('express');
// const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('Budgety API');
})

app.listen(process.env.PORT || 5000);