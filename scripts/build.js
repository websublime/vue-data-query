/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const chalk = require('chalk');
const execa = require('execa');
const { gzipSync } = require('zlib');
const { compress } = require('brotli');

const files = [
  'dist/vue-data-query.esm-browser.js',
  'dist/vue-data-query.esm-browser.prod.js',
  'dist/vue-data-query.esm-bundler.js',
  'dist/vue-data-query.global.js',
  'dist/vue-data-query.global.prod.js',
  // 'dist/vue-data-query.cjs.js',
];

async function run() {
  await build();
  checkAllSizes();
  generateApiDocs();
}

async function build() {
  await fs.remove('dist');

  await execa('rollup', ['-c', 'rollup.config.js'], { stdio: 'inherit' });
}

function checkAllSizes() {
  console.log();
  files.map((f) => checkSize(f));
  console.log();
}

function checkSize(file) {
  const f = fs.readFileSync(file);
  const minSize = (f.length / 1024).toFixed(2) + 'kb';
  const gzipped = gzipSync(f);
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb';
  const compressed = compress(f);
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb';
  console.log(`${chalk.gray(chalk.bold(file))} size:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`);
}

async function generateApiDocs() {
  await execa('yarn', ['build:dts'], { stdio: 'inherit' });
}

run();
