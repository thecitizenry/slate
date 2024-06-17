const fs = require('fs');
const SlateConfig = require('@shopify/slate-config');

const config = new SlateConfig(require('../../../../slate-tools.schema'));

const part = {module: {rules: []}};

const babelLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {targets: '> 0.25%, not dead', useBuiltIns: 'entry', corejs: '3'},
      ],
    ],
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
