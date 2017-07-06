import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import getBabelCommonConfig from './getBabelCommonConfig';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { existsSync } from 'fs';
import { join } from 'path';
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';

export default function getWebpackCommonConfig(args) {
  const pkgPath = join(args.cwd, 'package.json');
  const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

  const clientPath = join(args.cwd, pkg.client || './src/');

  const jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
  const cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
  const commonName = args.hash ? 'common-[chunkhash]' : 'common';

  const templatePath = join(args.cwd, pkg.template || 'index.html');


  const babelQuery = getBabelCommonConfig();

  const emptyBuildins = [
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'fs',
    'module',
    'net',
    'readline',
    'repl',
    'tls',
  ];

  const browser = pkg.browser || {};

  const node = emptyBuildins.reduce((obj, name) => {
    if (!(name in browser)) {
      return { ...obj, ...{ [name]: 'empty' } };
    }
    return obj;
  }, {});

  //console.log("path:" + join(args.cwd, 'assets'));
  return {

    babel: babelQuery,

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    devtool: args.devtool,
    //loader debug mode
    debug: true,
    resolve: {
      root: [
        clientPath,
        join(args.cwd, "./src/"),
      ],
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['', '.web.jsx', '.web.js', '.js', '.jsx', '.json'],
    },
    resolveLoader: {
      root: [
        clientPath,
        join(args.cwd, "./src/"),
      ],
      extensions: ['', '.web.jsx', '.web.js', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
    },

    entry: pkg.entry,

    node,

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelQuery,
        },
        {
          test: /\.jsx$/,
          loader: 'babel',
          query: babelQuery,
        },
        {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-restructuring!' +
            'postcss'
          ),
        },
        {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]!' +
            'postcss'
          ),
        },
        {
          test(filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'postcss!' +
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(pkg.theme || {})}}`
          ),
        },
        {
          test: /\.module\.less$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
            'postcss!' +
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(pkg.theme || {})}}`
          ),
        },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loaders: [
          'url?limit=10000&minetype=image/svg+xml',
          'image-webpack?{progressive:true,  bypassOnDebug: true, ' +
          'optimizationLevel: 7, interlaced: false, svgo: {plugins: [{removeViewBox: false,},{removeEmptyAttrs: false,}]}}',
        ]},
        { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loaders:[
          'url?limit=10000',
          'image-webpack?{progressive:true,  bypassOnDebug: true, ' +
          'optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ]},
        { test: /\.json$/, loader: 'json' },
        { test: /\.html?$/, loader: 'file?name=[name].[ext]' },
      ],
    },

    postcss: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ],

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: templatePath,
        inject: 'body',
        hash: false,
        pkg: pkg
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: commonName,
        minChunks: function (module, count) {
          return module.resource &&
            (module.resource.indexOf('apollo-react') !== -1
            || module.resource.indexOf('apollo-mobile') !== -1
            || module.resource.indexOf('apollo-ionic') !== -1
            || module.resource.indexOf(clientPath) === -1);
        }
      }),
      new ExtractTextPlugin(cssFileName, {
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
  };
}
