var apolloReact = require.resolve('./scripts/dist/babel-plugin-apollo-react/index.js');

module.exports = function (webpackConfig) {

  //if use moment js,  uncomment this

  //webpackConfig.module.loaders.unshift({
  //  test: /[\/]moment\.js$/,
  //  loader: 'expose?moment'
  //});

  //if use moment js with zh-cn,  uncomment this
  //webpackConfig.plugins.unshift(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/));

  //if use lodash, uncomment this
  /*
  webpackConfig.module.loaders.unshift({
    expire: /[\/]lodash\.js$/,
    loader: 'expose?_'
  });
  */

  // Fix ie8 compatibility
  //webpackConfig.module.loaders.unshift({
  //  expire: /\.jsx?$/,
  //  loader: 'es3ify-loader',
  //});
  //按需加载
  webpackConfig.babel.plugins.push(  ["import", {
    style: 'css',  // 'less',
    libraryName: 'antd-mobile'
  }]);

  //按需加载
  webpackConfig.babel.plugins.push([apolloReact, {
    // const { libDir = 'lib', libraryName = defaultLibraryName, style } = opts;
    // const path = `${libraryName}/${libDir}/${camel2Dash(methodName)}`;
    style: true,  // if true, use less
    libDir: 'components',
    libraryName: 'apollo-mobile',
  }]);

  //use react lite
  webpackConfig.resolve.alias = {
    'react': 'react-lite',
    'react-dom': 'react-lite'
  };

  //切换不同入口
  // if (process.env.RUN_ENV === 'NATIVE') {
  //   webpackConfig.entry.index  = './demo/native/index.js';
  // }

  return webpackConfig;
};
