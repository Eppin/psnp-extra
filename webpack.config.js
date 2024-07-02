import { join } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import packageJson from './package.json' with { type: 'json' };

import pkg from 'webpack';
const { ProgressPlugin } = pkg;

const buildTargets = [ 'firefox', 'chrome', 'safari' ];

const sanitizeEnv = (value, defaultValue = '') =>
  String(value || defaultValue)
    .toLowerCase()
    .replace(/[^a-z0-9\.\,\-]+/gi, '')
    .replace(/\s+/g, '-');

export default (envWebpack) => {
  const __DEV__ = process.env.NODE_ENV !== 'production';
  const mode = __DEV__ ? 'development' : 'production';

  const env = {
    BUILD_DATE: Date.now().toString(16).toUpperCase(),
    BUILD_SUFFIX: sanitizeEnv(process.env.BUILD_SUFFIX),
    BUILD_TARGET: sanitizeEnv(
      envWebpack.BUILD_TARGET,
      buildTargets[0] ?? 'firefox'
    ),
    NODE_ENV: mode,
    PACKAGE_AUTHOR_NAME: packageJson.author,
    PACKAGE_DESCRIPTION: packageJson.description,
    PACKAGE_NAME: packageJson.name,
    PACKAGE_VERSION: packageJson.version
  };

  const copyPatterns = [
    {
      from: 'src/manifest.json',
      to: 'manifest.json',
      transform: (content) => {
        const parsed = JSON.parse(content.toString());

        parsed.manifest_version = 3;

        parsed.version = env.PACKAGE_VERSION;
        parsed.description = env.PACKAGE_DESCRIPTION;
        parsed.author = env.PACKAGE_AUTHOR_NAME;

        switch (env.BUILD_TARGET) {
          case 'safari': {
            delete parsed.browser_specific_settings;
            break;
          }

          case 'firefox': {
            break;
          }

          case 'chrome': {
            delete parsed.browser_specific_settings;
            break;
          }
        }

        return Buffer.from(JSON.stringify(parsed));
      }
    },
    { from: './src/styles/*.css', to: '[name][ext]' }
  ];

  const plugins = [
    new ProgressPlugin(),
    new CopyWebpackPlugin({ patterns: copyPatterns })
  ];

  return {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: join(import.meta.dirname, __DEV__ ? 'build' : 'dist', env.BUILD_TARGET)
    },
    plugins
  };
};
