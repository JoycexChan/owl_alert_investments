// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });  // 加载 .env.local 文件



// 打印出所有环境变量，包括 .env.local 中的内容
console.log('Loaded environment variables:', process.env);


module.exports = {
  mode: 'production',
  entry: './src/firebase-messaging-sw.js',  // Service Worker 文件的入口
  output: {
    path: path.resolve(__dirname, 'public'),  // 输出的目录
    filename: 'firebase-messaging-sw.js',  // 输出的文件名
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NEXT_PUBLIC_FIREBASE_API_KEY': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
      'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
      'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
      'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.NEXT_PUBLIC_FIREBASE_APP_ID': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
      'process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
    }),
  ],
};
