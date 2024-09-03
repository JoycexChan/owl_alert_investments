import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import path from 'path';

// 使用相對路徑加載 .env.local 文件
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function generateAccessToken() {
    const client = new JWT(
        process.env.FIREBASE_CLIENT_EMAIL,
        null,
        process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
