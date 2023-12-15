const express = require("express");
const app = express();
const routes = require('./routes');

module.exports = (postgresClient) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', routes({ postgresClient: postgresClient }));

    app.use((req, res, next) => {
        const err = new Error('Page Not Found');
        err.status = 404;

        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send('Error: ' + err.message);
    });

    return app;
}
