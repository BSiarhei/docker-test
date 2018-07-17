const express = require('express');

const apiRoutes = require('./apiRoutes');
const viewRoutes = require('./viewRoutes');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(viewRoutes);
app.use(apiRoutes);

app.use((req, res, next) => {
    res.status(404).end();
});

app.use((error, req, res, next) => {
    console.log(error);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        message: error.message,
        name: error.name
    });
});

module.exports = app;
