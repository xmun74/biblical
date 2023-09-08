/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    open: true, // 개발 서버 실행하면 브라우저 자동 오픈
    // hot: true, // HMR(Hot Module Replacement) 사용할 수 있게 함. 4버전부터 자동 활성화됨.
    historyApiFallback: true, //spa에서 react-router-dom 사용할 때 404에러 발생 방지
    compress: true, // gzip 압축
  },
  optimization: {
    minimize: false,
  },
});
