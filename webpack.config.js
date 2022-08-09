const { NODE_ENV } = process.env;
module.exports = require(`./bundle/webpack.config.${NODE_ENV}.js`);