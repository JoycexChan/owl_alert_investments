## Owl Alert Investments

## 簡介

此專案展示了在前端開發中的技能，包括即時股票數據的處理和用戶自定義警報功能。使用 React 和 Firebase 完成前端，並通過 FinMind 和 YahooFinance2 APIs 提供即時股市資訊。此專案專注於響應式設計、即時通知、以及與後端 API 的無縫整合。

## 功能亮點
- 即時數據處理：使用 Firebase 及外部 API 實現股票數據的即時更新和市場趨勢顯示。
- 股票警報通知：通過 Firebase Cloud Messaging (FCM) 實現每日自動觸發的股票價格警報，用戶可自定義警報門檻。
- 
- 互動式股票儀表板：用戶可獲取個股資訊，並通過點擊來查看相關趨勢圖表與新聞。
- 響應式設計：確保網站在桌面和移動設備上的最佳體驗。

## 使用技術
- 前端框架：React、Styled-components
- 即時數據與通知：Firebase (Firestore、Firebase Cloud Messaging)
- ![image](https://github.com/user-attachments/assets/86a33fb3-8c4b-45c8-b3e8-b46f3f945d35)
- API 整合：FinMind、YahooFinance2 APIs
- 部署與 CI/CD：Vercel
- 通知功能：Firebase Cloud Messaging (FCM)

## 專案展示
可以通過點擊以下鏈接查看完整網站：
[專案連結](https://owl-alert-investments.vercel.app/)

## 安裝指南
## 先決條件
- Node.js (版本 14.x 或更高)
- Firebase 帳戶，用於 Firestore 和 Cloud Messaging 設定

## 本地運行步驟
1. 克隆倉庫：
```bash
git clone https://github.com/JoycexChan/owl_alert_investments.git
cd owl_alert_investments
```

2. 安裝依賴：
```bash
npm install
```

3. 配置 Firebase：
- 創建 Firebase 專案，啟用 Firestore 和 Firebase Cloud Messaging。
- 在 src/firebase.ts 中填寫 Firebase 配置。
- 在 .env.local 中設置 API 密鑰及其他環境變量。

4. 啟動開發伺服器：
```bash
npm run dev
```

5. 建置生產版本：
```bash
npm run build
```

## 部署指南
該專案已部署在 Vercel 上。如果你想部署自己的版本，可以按照以下步驟：

1. 安裝 Vercel CLI：
```bash
npm install -g vercel
```

2. 部署：
```bash
vercel
```

## 項目價值
這個項目展示了對 React 和 Firebase 等現代前端技術的熟練應用，並體現了在處理實時數據和用戶交互方面的能力。


-------------

## Owl Alert Investments

## Introduction

This project demonstrates skills in frontend development, including handling real-time stock data and user-customized alert features. The frontend is built using React and Firebase, with real-time stock information provided by the FinMind and YahooFinance2 APIs. This project focuses on responsive design, real-time notifications, and seamless integration with backend APIs.

## Key Features
- Real-time Data Processing: Uses Firebase and external APIs to enable real-time stock data updates and market trends display.
- Stock Alert Notifications: Implements daily stock price alerts via Firebase Cloud Messaging (FCM), allowing users to set custom alert thresholds.
- Interactive Stock Dashboard: Users can access individual stock information and click to view related trend charts and news.
- Responsive Design: Ensures optimal user experience on both desktop and mobile devices.
  
## Technologies Used
- Frontend Framework: React, Styled-components
- Real-time Data and Notifications: Firebase (Firestore, Firebase Cloud Messaging)
- API Integration: FinMind, YahooFinance2 APIs
- Deployment and CI/CD: Vercel
- Notification Feature: Firebase Cloud Messaging (FCM)

## Project Demo
You can view the full website by clicking the link below：
[Project Link](https://owl-alert-investments.vercel.app/)

## Installation Guide
## Prerequisites
- Node.js (version 14.x or higher)
- Firebase account for Firestore and Cloud Messaging setup

## Local Setup Steps
1. Clone the repository:
```bash
git clone https://github.com/JoycexChan/owl_alert_investments.git
cd owl_alert_investments
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
- Create a Firebase project, enable Firestore and Firebase Cloud Messaging.
- Fill in the Firebase configuration in src/firebase.ts.
- Set API keys and other environment variables in .env.local.

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Deployment Guide
The project is deployed on Vercel. If you want to deploy your own version, follow these steps:

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Project Value
This project demonstrates proficiency in modern frontend technologies like React and Firebase and showcases the ability to handle real-time data and user interactions.



