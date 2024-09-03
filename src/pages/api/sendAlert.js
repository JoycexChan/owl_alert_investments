// /pages/api/sendAlert.js

import { sendStockAlertNotification } from '../../scripts/sendStockAlertNotification';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const userId = req.query.userid;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            await sendStockAlertNotification(userId);
            res.status(200).json({ message: 'Notification sent successfully' });
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(500).json({ error: 'Failed to send notification' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
