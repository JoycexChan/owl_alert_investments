//  functions/src/index.ts
// Firebase Cloud Functions 部署，用來檢查股票的價格變動並通知使用者。
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();


// 根據股票代碼 (stockCode) 從 API 取得該股票的當前價格
/**
 * Fetches the current price of a stock based on its code.
 * @param {string} stockCode The code of the stock to check.
 * @return {Promise<number>} The current price of the stock.
 */
async function checkStockPrice(stockCode: string): Promise<number> {
  const apiUrl = `https://owl-alert-investments.vercel.app/api/stockPrice?symbol=${encodeURIComponent(stockCode)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Failed to fetch stock price for", stockCode, error);
    throw new Error("Failed to fetch stock price");
  }
}

/**
 * Sends a notification to a user about a specific stock's price alert.
 * @param {string} userId
 * The ID of the user to notify.
 * @param {string} stockCode
 * The stock code related to the notification.
 * @param {number} currentPrice
 * The current price of the stock triggering the alert.
 */
async function sendNotification(
  userId: string, stockCode: string, currentPrice: number) {
  const userRef = admin.firestore().doc(`users/${userId}`);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    console.log(`No user found with ID: ${userId}`);
    return;
  }

  const userData = userDoc.data();
  const fcmToken = userData?.fcmToken;

  if (!fcmToken) {
    console.log(`No FCM token found for user: ${userId}`);
    return;
  }

  const message = {
    notification: {
      title: "Stock Alert",
      body: `Your alert for 
      ${stockCode} at price $${currentPrice} has been triggered.`,
    },
    token: fcmToken,
  };

  try {
    await admin.messaging().send(message);
    console.log(`Notification sent to 
        ${userId} for ${stockCode} at price $${currentPrice}.`);
  } catch (error) {
    console.error(`Failed to send notification to ${userId}`, error);
  }
}

/**
 * Cloud Function to check stock alerts and send notifications.
 */
exports.checkStockAlerts =
  functions.pubsub.schedule("0 10 * * *")
    .timeZone("Asia/Taipei")
    .onRun(async () => {
      console.log("Running scheduled stock check...");
      const stocksRef = admin.firestore().collection("stocks");
      const stocksSnapshot = await stocksRef.get();

      for (const doc of stocksSnapshot.docs) {
        const stock = doc.data();
        try {
          const currentPrice = await checkStockPrice(stock.stockCode);
          if (currentPrice > stock.alertPrice) {
            await sendNotification(stock.userId, stock.stockCode, currentPrice);
            await doc.ref.update({
              currentPrice,
              alertTriggered: true,
              lastChecked: admin.firestore.FieldValue.serverTimestamp(),
            });
          }
        } catch (error) {
          console.error(`Error processing stock ${stock.stockCode}:`, error);
        }
      }
      console.log("Stock checks completed.");
    });
