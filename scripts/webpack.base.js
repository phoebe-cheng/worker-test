const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
    assetModuleFilename: (pathData) => {
      const { filename } = pathData;

      if (filename.endsWith('.ts')) {
        return '[name].js';
      } else {
        return '[name][ext]';
      }
    },
  },
  stats: {
    children: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      // 通过设置 worker-loader 的选项参数 inline 把 worker 内联成 blob 数据格式，而不再是通过下载脚本文件的方式来使用 worker
      { test: /\.worker\.ts$/, loader: 'worker-loader', options: { inline: 'no-fallback' } },
      {
        test: /.(ts|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                    useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                    corejs: 3, // 使用 core-js@3 版本
                  },
                ],
                ['@babel/preset-typescript'],
                ['@babel/preset-react'],
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|ogg|wav)$/,
        type: 'asset/resource',
        generator: {
          filename: 'source/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 使用自定义模板
    }),
    new MiniCssExtractPlugin(),
  ],
};
