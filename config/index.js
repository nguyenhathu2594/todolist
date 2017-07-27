var configValues = require("./config");

module.exports = {
    getDbConnectionString: function () {
        return `mongodb://${configValues.username}:${configValues.password}@ds028310.mlab.com:28310/nodejstodos`;
    }
}