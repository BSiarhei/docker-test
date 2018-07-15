const express = require('express');

const routes = require('./routes');

const app = express();

app.use(routes);

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
