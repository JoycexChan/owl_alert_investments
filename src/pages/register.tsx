import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { user, setUser } = useAuth();
    const auth = getAuth();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log('User signed in:', userCredential.user);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log('User registered:', userCredential.user);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
            console.log('User signed in with Google:', userCredential.user);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log('User signed out');
            router.push('/'); // 登出後跳轉到首頁
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>{isRegistering ? '註冊' : '登入'}</h1>
            {user ? (
                <div>
                    <p>已登入，使用者: {user.email}</p>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                        登出
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 mb-4"
                    />
                    {isRegistering ? (
                        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                            註冊
                        </button>
                    ) : (
                        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                            登入
                            </button>
                    )}
                    <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                        使用 Google 登入
                    </button>
                    <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 underline">
                        {isRegistering ? '已有帳號？登入' : '還沒有帳號？註冊'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RegisterPage;
