const express = require('express');
const router = express.Router();

const ServerRepository = require('../../repositories/ServerRepository');

module.exports = () => {
    const repository = new ServerRepository()

    router.get('/getInfo', async (req, res) => {
        try {
            const info = await repository.getServerInfo();
            res.send(info);
        } catch(err) {
            return next(err);
        }
    });

    return router;
}