/* eslint-disable @typescript-eslint/no-var-requires */
const { EsbuildPlugin } = require('esbuild-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: true, // 보고서를 브라우저로 자동 오픈
    }),
  ],
  optimization: {
    minimize: false, // Terser 비활성화
    minimizer: [
      // EsbuildPlugin로 JS 축소
      new EsbuildPlugin({
        target: 'es2015',
        css: true, // CSS assets 축소
      }),
    ],
  },
});
