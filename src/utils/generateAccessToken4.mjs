import { JWT } from 'google-auth-library';
// import { config } from 'dotenv';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// 使用相對路徑加載 .env.local 文件
// config({ path: path.resolve(process.cwd(), '.env.local') });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
// dotenv.config({ path: 'C:/OAI_0814/owl_alert_investments/.env.local' });

console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY);

async function generateAccessToken() {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;
    if (!privateKey) {
        throw new Error('FIREBASE_PRIVATE_KEY is not defined');
    }
    const client = new JWT(
        process.env.FIREBASE_CLIENT_EMAIL,
        null,
        privateKey,
        ['https://www.googleapis.com/auth/cloud-platform']
    );
    await client.authorize();
    return client.getAccessToken();
}

export { generateAccessToken };

// 簡單的測試函數來印出訪問令牌
async function testGenerateAccessToken() {
    try {
        const accessToken = await generateAccessToken();
        console.log('Access Token:', accessToken);
    } catch (error) {
        console.error('Failed to generate access token:', error);
    }
}

// 呼叫測試函數
testGenerateAccessToken();
