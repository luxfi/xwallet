const webpackMerge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.config');

const configPaths = {
  dev: './build/webpack.dev.config',
  pro: './build/webpack.pro.config',
  debug: './build/webpack.debug.config',
  sourcemap: './build/webpack.sourcemap.config',
};

const config = (env) => {
  if (env.config && configPaths[env.config]) {
    const selectedConfig = require(configPaths[env.config]);
    return webpackMerge.merge(commonConfig, selectedConfig);
  }

  return commonConfig;
};

module.exports = config;
