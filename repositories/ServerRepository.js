class ServerRepository {
    async getServerInfo() {
        try {
            const hostname = require('os').hostname();
            const port = 3000;
            const info = {
                hostname,
                port,
            };
            return info;
        } catch (err) {
            return err;
        }
    }

}

module.exports = ServerRepository