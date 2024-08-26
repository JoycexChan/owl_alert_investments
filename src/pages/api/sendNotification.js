// pages/api/sendNotification.js
import fetch from 'node-fetch';
import { google } from 'google-auth-library';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // 这里可以添加发送通知的代码
        console.log('收到通知请求:', req.body);
        res.status(200).json({ message: '通知已发送' });
    } else {
        // 处理非POST请求
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
