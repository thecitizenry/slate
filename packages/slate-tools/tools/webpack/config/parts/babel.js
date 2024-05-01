const fs = require('fs');
const SlateConfig = require('@shopify/slate-config');

const config = new SlateConfig(require('../../../../slate-tools.schema'));

const part = {module: {rules: []}};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules\/(?!(@builder.io\/sdk-vue)\/).*/,
  loader: 'babel-loader',
  options: {
    presets: [['@babel/preset-env', { targets: "defaults" }]],
    plugins: ['@babel/plugin-transform-nullish-coalescing-operator'],
    extends: config.get('webpack.babel.configPath'),
  },
};

if (
  fs.existsSync(config.get('webpack.babel.configPath')) &&
  config.get('webpack.babel.enable')
) {
  part.module.rules.push(babelLoader);
}

module.exports = part;
