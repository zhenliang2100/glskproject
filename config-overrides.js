const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  config.entry = {
    main: './src/index.js',
    qwassistant: './src/202604/qwAssistantEntry.js',
    coursetabletview: './src/202604/courseTabletViewEntry.js',
    coursebackend: './src/202604/courseBackendEntry.js',
  };

  config.output = {
    ...config.output,
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  };

  config.plugins = [
    ...config.plugins.filter(plugin => !(plugin instanceof HtmlWebpackPlugin)),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './public/qwassistant.html',
      filename: 'qwassistant.html',
      chunks: ['qwassistant'],
    }),
    new HtmlWebpackPlugin({
      template: './public/coursetabletview.html',
      filename: 'coursetabletview.html',
      chunks: ['coursetabletview'],
    }),
    new HtmlWebpackPlugin({
      template: './public/coursebackend.html',
      filename: 'coursebackend.html',
      chunks: ['coursebackend'],
    }),
  ];

  return config;
};
