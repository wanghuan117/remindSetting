import webpack from 'webpack';
import path from 'path';
import getWebpackCommonConfig from './getWebpackCommonConfig';


export default function getWebpackDevConfig(args) {
  let config = getWebpackCommonConfig(args);

  config.devtool = args.devtool;
//debug
  config.debug = true;

  config.plugins = config.plugins.concat([

    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('debug')
      }
    })
  ]);

  return config;
}




