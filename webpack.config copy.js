// 根目錄webpack.config.js

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'firebase-messaging-sw': './src/firebase-messaging-sw.js', // 指定你的 Service Worker 文件
  },
  output: {
    path: path.resolve(__dirname, 'public'), // 輸出到 public 文件夾
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次構建前清理輸出目錄
    new webpack.DefinePlugin({
      'process.env': {
        NEXT_PUBLIC_FIREBASE_API_KEY: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
        NEXT_PUBLIC_FIREBASE_APP_ID: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
      },
    }),
  ],
  mode: 'production', // 或 'development' 根據你的環境設置
};
