import { join, resolve } from 'path';
import { writeFileSync } from 'fs';
import { ncp } from 'ncp';
import mkdirp from 'mkdirp';
import webpack, { ProgressPlugin } from 'webpack';
import chalk from 'chalk';
import mergeCustomConfig from './mergeCustomConfig';
import getWebpackDevConfig from './getWebpackDevConfig';
import getWebpackProdConfig from './getWebpackProdConfig';


function getWebpackConfig(args) {
  let webpackConfig;
  if (args.compress) {
    webpackConfig = getWebpackProdConfig(args);
  } else {
    webpackConfig = getWebpackDevConfig(args);
  }

  webpackConfig.plugins = webpackConfig.plugins || [];

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath;
  }

  if (args.publicPath) {
    webpackConfig.output.publicPath = args.publicPath;
  }

  // Config if no --no-compress.
  if (args.compress) {
    //move to Webpack Prod Config
    //webpackConfig.UglifyJsPluginConfig = {
    //  output: {
    //    ascii_only: true,
    //  },
    //  compress: {
    //    warnings: false,
    //  },
    //};
    //webpackConfig.plugins = [...webpackConfig.plugins,
    //  new webpack.optimize.UglifyJsPlugin(webpackConfig.UglifyJsPluginConfig),
    //  new webpack.DefinePlugin({
    //    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    //  }),
    //];
  } else {
    if (process.env.NODE_ENV) {
      webpackConfig.plugins = [...webpackConfig.plugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ];
    }
  }

  webpackConfig.plugins = [...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
  ];

  // Output map.json if hash.
  if (args.hash) {
    const pkg = require(join(args.cwd, 'package.json'));
    webpackConfig.output.filename = webpackConfig.output.chunkFilename = '[name]-[chunkhash].js';
    webpackConfig.plugins = [...webpackConfig.plugins,
      require('map-json-webpack-plugin')({
        assetsPath: pkg.name,
      }),
    ];
  }

  webpackConfig = mergeCustomConfig(webpackConfig, resolve(args.cwd, args.config || 'webpack.config.js'));

  return webpackConfig;
}

export default function build(args, callback) {
  // Get config.
  let webpackConfig = getWebpackConfig(args);
  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];

  let fileOutputPath;
  webpackConfig.forEach(config => {
    fileOutputPath = config.output.path;
  });

  if (args.watch) {
    webpackConfig.forEach(config => {
      config.plugins.push(
        new ProgressPlugin((percentage, msg) => {
          const stream = process.stderr;
          if (stream.isTTY && percentage < 0.71) {
            stream.cursorTo(0);
            stream.write(`📦  ${chalk.magenta(msg)}`);
            stream.clearLine(1);
          } else if (percentage === 1) {
            console.log(chalk.green('\nwebpack: bundle build is now finished.'));
          }
        })
      );
    });
  }

  function doneHandler(err, stats) {
    if (args.json) {
      const filename = typeof args.json === 'boolean' ? 'build-bundle.json' : args.json;
      const jsonPath = join(fileOutputPath, filename);
      writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
      console.log(`Generate Json File: ${jsonPath}`);
    }

    const { errors } = stats.toJson();
    if (errors && errors.length) {
      process.on('exit', () => {
        process.exit(1);
      });
    }
    // if watch enabled only stats.hasErrors would log info
    // otherwise  would always log info
    if (!args.watch || stats.hasErrors()) {
      const buildInfo = stats.toString({
        colors: true,
        children: true,
        chunks: !!args.verbose,
        modules: !!args.verbose,
        chunkModules: !!args.verbose,
        hash: !!args.verbose,
        version: !!args.verbose,
      });
      if (stats.hasErrors()) {
        console.error(buildInfo);
      } else {
        console.log(buildInfo);
      }
    }

    if (err) {
      process.on('exit', () => {
        process.exit(1);
      });
      console.error(err);
    }

    if (callback) {
      callback(err);
    }
  }

  // Run compiler.
  const compiler = webpack(webpackConfig);

  // Hack: remove extract-text-webpack-plugin log
  if (!args.verbose) {
    compiler.plugin('done', (stats) => {
      stats.stats.forEach((stat) => {
        stat.compilation.children = stat.compilation.children.filter((child) => {// eslint-disable-line
          return child.name !== 'extract-text-webpack-plugin';
        });
      });
    });
  }

  // copy static folder
  if (args.staticPath) {
    const staticPath = resolve(args.cwd, args.staticPath);
    const outputStaticPath = resolve(fileOutputPath, args.staticPath);
    mkdirp(outputStaticPath, function (err) {
      if (err) {
        console.error(err);
      }
      ncp(staticPath, outputStaticPath, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('copy static folder done!');
        return null;
      });
    });
  }

  if (args.watch) {
    compiler.watch(args.watch || 200, doneHandler);
  } else {
    compiler.run(doneHandler);
  }
}
