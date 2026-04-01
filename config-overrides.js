const path = require('path');

module.exports = function override(config, env) {
  config.entry = {
    main: './src/index.js',
    qwassistant: './src/202604/qwAssistantEntry.js',
    coursetabletview: './src/202604/courseTabletViewEntry.js',
    coursebackend: './src/202604/courseBackendEntry.js',
  };

  config.output = {
    ...config.output,
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, 'build'),
  };

  return config;
};
