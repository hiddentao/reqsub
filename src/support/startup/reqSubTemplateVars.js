const packageJson = require('../../../package.json');

module.exports = function*(App) {
  App.templateVars.version = packageJson.version;
};

