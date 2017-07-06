import getWebpackCommonConfig from './getWebpackCommonConfig';
import webpack from 'webpack';
import path from 'path';


export default function getWebpackProdConfig(args){
  let config = getWebpackCommonConfig(args);

  config.debug = false;



  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    // Reduces bundles total size
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        // You can specify all variables that should not be mangled.
        // For example if your vendor dependency doesn't use modules
        // and relies on global variables. Most of angular modules relies on
        // angular global variable, so we should keep it unchanged
        except: ['$super', '$', 'exports', 'require', 'angular','ionic']
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]);

  return config;
}



