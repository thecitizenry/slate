const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SlateConfig = require('@shopify/slate-config');
const config = new SlateConfig(require('../../../../slate-tools.schema'));

const isDev = process.env.NODE_ENV === 'development';

const part = {
  module: {
    rules: [],
  },
  plugins: [],
};

const sassRule = {
  test: /\.s[ac]ss$/,
};

const styleLoader = {
  loader: 'style-loader',
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: config.get('webpack.sourceMap.styles'),
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: config.get('webpack.sourceMap.styles'),
    postcssOptions: {
      plugins: config.get('webpack.postcss.plugins'),
    }
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: config.get('webpack.sourceMap.styles'),
    sassOptions: {
      quietDeps: true,
    },
  },
};

sassRule.use = [
  ...(isDev ? [styleLoader] : [MiniCssExtractPlugin.loader]),
  cssLoader,
  postcssLoader,
  sassLoader,
];

part.module.rules.push(sassRule);

module.exports = part;
