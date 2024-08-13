// src/api/triggerGoogleCalendarAlert.ts
import { google } from 'googleapis';

export const triggerGoogleCalendarAlert = async (userId: string, rate: number) => {
  const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URL
  );

  // 假設用戶已經授權過，你應該保存用戶的token並用它來調用API
  oauth2Client.setCredentials({
    access_token: 'user-access-token',  // 你應該從資料庫獲取
    refresh_token: 'user-refresh-token', // 你應該從資料庫獲取
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  const event = {
    summary: '匯率警報: 美元兌台幣',
    description: `匯率達到 ${rate}，觸發警報。`,
    start: {
      dateTime: new Date().toISOString(),
    },
    end: {
      dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1小時後
    },
  };

  await calendar.events.insert({
    calendarId: 'primary', // 主要日曆
    resource: event,
  });
};
