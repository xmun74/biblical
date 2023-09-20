/* eslint-disable @typescript-eslint/no-var-requires */
const { EsbuildPlugin } = require('esbuild-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      openAnalyzer: false,
      // openAnalyzer: true,
    }),
  ],
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
});
