
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/todoappdb')
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
server.listen(3456)