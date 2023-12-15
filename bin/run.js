
const { Sequelize } = require('sequelize');
const config = require("../config")
const sequelize = new Sequelize(`postgres://postgres:${config.pguser}@${config.host}:${config.pgport}/${config.dbname}`)
const http = require('http');
function connectToPostgress(){
    try {
        sequelize.authenticate();
        return sequelize
    } catch (error) {}
}

const postgresClient = connectToPostgress()
const app = require('../app.js')(postgresClient);

const server = http.createServer(app);
server.listen(config.port)

