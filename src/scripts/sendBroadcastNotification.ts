const admin = require('../firebaseAdmin'); // 使用 require 導入

// 定義廣播訊息
const message = {
  notification: {
    title: '廣播通知標題',
    body: '這是一條測試廣播通知',
  },
  topic: 'all', // 發送給訂閱這個主題的所有用戶
};

// 發送通知
admin.messaging().send(message)
  .then((response: string) => { // 指定 response 的類型為 string
    console.log('Successfully sent message:', response);
  })
  .catch((error: Error) => { // 指定 error 的類型為 Error
    console.log('Error sending message:', error);
  });
