const { GoogleAuth } = require('google-auth-library');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verifyCredentials() {
    const auth = new GoogleAuth({
        credentials: {
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });

    try {
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        console.log('Access Token:', accessToken);
    } catch (error) {
        console.error('Authentication failed:', error);
    }
}

verifyCredentials();
