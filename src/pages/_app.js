// pages/_app.js
import { AuthProvider } from '../AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;





