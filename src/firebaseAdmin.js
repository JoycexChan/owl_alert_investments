import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "owl-alert-investments",
      clientEmail: "firebase-adminsdk-di51a@owl-alert-investments.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCHoU9UFhtqFlj\nHhRO768Irepz60cEgJkE276LJFxTCuNTzI1ed0qu3KcwRUaHDpofuh46DdRqGsFH\n47uLy+evwQ8SxXw273+2K6jgV+PSv8HPfkEGGGqWclfrZbv0RQpPI5KRPYFP86nB\nVl3Wtux9zLbd9hu4WOsy8RCC5KMhA1kvVyrARlB+VR0x7Q7NJIO8x9gfSb02rakO\nLPT9rkGJSvOHCYE0N8cnzLMaDoOvhC4nVrVSEdAoUjhfkgt5jj2ZIASeEuzxLe10\nOr1w8YrunWuq3yauz9whQh6JmDoVPI4wYuk5Na6/PGGKKHj+ktdgUS+zWcSKatmw\nk+nrZogHAgMBAAECggEAGMgJrXKo31LrGma4I/2gRETjlenW1qHOJxsgf6XkLWvJ\n6qRF9eXXwGwF4fkuEEbScTNy8WlbkTIaM6HEiwu8Z6kHUhepDGBV1v1K4V0HBhwZ\n03HkPjF2xf8R70i9DmmT79d0Oht2eyz5omdyslsG5OZx//MPxeCAIjA5MeSbWLba\nRGyzKsFqOd9u3CVRxOKpwP5t9T2xL3wYKx2X0HBa4G4kYBZCXzPb2SnerfbtKNEi\nXoiebSzA4Cp2A6exQLpIiCUn+FsbemhPrfEbAUDIJwPvVSSsCN3PyWYIvrXKImOK\nL+VUON+O+NXhK6TPXffQxznM7XlelHbnZAWFKtKIUQKBgQDma8kxrYU8JXUyhI9H\noBxqOWC2b1M4agZnKvg3lNmBvC2g/aF3SnPFC0nvijJzxBNV3z4AZJ6q7RH0Y7qz\nWAE05KBBPilsw5ROLmcQvi6+jn9CZ1ADu3Vem++QcyuHu6wONIKx/qK2rNeHjGKa\nDgyEhekHn1T0sIUyKwIaAiDmsQKBgQDXqxehq7o9yJ1QBB9A0Bd0qRwLh25X97Y3\nGGCyRVEPZM38t49IPi3Yju0Y93ZCE/l1z7k1/0SK9Su6iHLwY+bscyacmzlxkShn\n9W/F5naQ1mhplDdErxfzJjK2k61mwGJqrJhp1QKQwp0XQ3YCWTX+68TZYvAUeQYM\nCggw3dJ4NwKBgQCex/2/ruwWE1Xcdv5pBAswo9NiQ/qb8GvzIegkHP15ahwjSUO/\n+V0nlmzflWLI5X/Rd+G40Z2I+Y6a0zJvraA/O6C29MgE/A0xhsZdAkEh7P4C20CH\nIeFyTZBbARIpGYkpzMOXNnoX2ak37eRwdmfn1oNLTl9zskRG2t463+aeMQKBgE4s\nMv2j7Hb2n6bgR5/LjaT4ozS+m02BeWfRC0OzAmXNCSkgM+xgtWd4rxJMqG3dJaAB\nckXTSDoCEh6j1N2zqIFuX8GGNjUnA3ljKmeWWMW5IdGbKslXmhvFbb5mGwVSmJnI\nA9rgnfRwxlYnWsARLBRBy3Fsfk89aua0QDHORbrTAoGAMuzi/R+gL2lCDMS3WDV7\nR4+Binn7bXmeC/fQmP7Dul9yWfQRpvcuGMZZQshsIGE6PTiBxBCVlfN4u47b9Xa2\nbbS3B9VJA5E6vyNjWe3pw8yWvSiqOb6mtowAMrtsiYixNYboOn09magQgvJ84p/t\nDCJfyM7xM+t6bjJrkAQ2Tvc=\n-----END PRIVATE KEY-----\n"
    }),
    databaseURL: "https://owl-alert-investments-default-rtdb.firebaseio.com"
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
