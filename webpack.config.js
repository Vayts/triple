const path = require('node:path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(filepath, fileName) {
  return path.resolve(process.cwd(), 'src', 'pages', filepath, fileName);
}

const isDevMode = /* process.env.DEV_STAGE !== "production" */ false;

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: {
    millionaire: resolve('Millionaire', 'index.js'),
    main: resolve('Index', 'index.js'),
    calculator: resolve('Calculator', 'index.js'),
    random: resolve('Random', 'index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name]-[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.tsx', '.json', 'js'],
  }, // ВАЖНО
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(process.cwd(), 'src'),
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/env', '@babel/preset-typescript'],
          plugins: [],
        },
      },
      {
        test: /\.scss$/i,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    // new CopyPlugin({patterns: [{ from: "public", to: "public" }]}),
    !isDevMode && new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'millionaire.html',
      template: resolve('Millionaire', 'millionaire.html'),
      excludeChunks: ['main', 'calculator', 'random'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('Index', 'index.html'),
      excludeChunks: ['millionaire', 'calculator', 'random'],
    }),
    new HtmlWebpackPlugin({
      filename: 'random.html',
      template: resolve('Random', 'random.html'),
      excludeChunks: ['millionaire', 'calculator', 'main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'calculator.html',
      template: resolve('Calculator', 'calculator.html'),
      excludeChunks: ['millionaire', 'random', 'main'],
    }),
  ].filter(Boolean),
  devtool: 'eval',
};
