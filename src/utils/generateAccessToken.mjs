// /src/utils/generateAccessToken.mjs

import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import path from 'path';

// 手動加載 .env.local
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
