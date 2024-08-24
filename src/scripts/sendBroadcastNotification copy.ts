import admin from '../firebaseAdmin'; // 引入 Firebase Admin 初始化文件

// 定義廣播訊息
const message = {
  notification: {
    title: '廣播通知標題',
    body: '這是一條測試廣播通知',
  },
  topic: 'all', // 或者使用 token 發送給特定的用戶
};

// 發送通知
admin.messaging().send(message)
  .then((response: string) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error: Error) => {
    console.log('Error sending message:', error);
  });
