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

const cssRule = {
  test: /\.css$/,
};

const vueStyleLoader = {
  loader: 'vue-style-loader',
};

const cssLoader = {
  loader: 'css-loader',
  // Enabling sourcemaps in styles when using HMR causes style-loader to inject
  // styles using a <link> tag instead of <style> tag. This causes
  // a FOUC content, which can cause issues with JS that is reading
  // the DOM for styles (width, height, visibility) on page load.
  options: {
    sourceMap: !isDev,
    modules: {
      localIdentName: '[local]_[hash:base64:8]',
    },
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: !isDev,
    postcssOptions: {
      plugins: config.get('webpack.postcss.plugins'),
    },
  },
};

cssRule.use = [
  ...(isDev ? [vueStyleLoader] : [MiniCssExtractPlugin.loader]),
  cssLoader,
  postcssLoader,
];
part.module.rules.push(cssRule);

module.exports = part;
