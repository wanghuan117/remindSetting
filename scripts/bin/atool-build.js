#!/usr/bin/env node

var program = require('commander');

program
  .option('-o, --output-path <path>', 'output path')
  .option('-w, --watch [delay]', 'watch file changes and rebuild')
  .option('--hash', 'build with hash and output map.json')
  .option('--publicPath <publicPath>', 'publicPath for webpack')
  .option('--devtool <devtool>', 'sourcemap generate method, default is null')
  .option('--config <path>', 'custom config path, default is webpack.config.js')
  .option('--no-compress','build without compress')
  .option('--json','running webpack with --json, ex. result.json')
  .option('--verbose', 'run with more logging messages.')
  .option('-s, --staticPath <staticPath>', 'copy static path to dump folder.')
  .parse(process.argv);

program.cwd = process.cwd();
require('../dist/atool-build/lib/build')(program, function () {
  process.exit(0);
});
require('atool-monitor').emit();
