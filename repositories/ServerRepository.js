const config = require('../config')

class ServerRepository {
    async getServerInfo() {
        try {
            const hostname = require('os').hostname();
            const info = {
                hostname,
                config: config
            };
            return info;
        } catch (err) {
            return err;
        }
    }

}

module.exports = ServerRepository