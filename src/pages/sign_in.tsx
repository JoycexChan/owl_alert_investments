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
import styles from '../styles/RegisterPage.module.css'; // 導入 CSS 模組
import Image from 'next/image';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(''); // 新增一個狀態用於存放錯誤訊息
    const { user, setUser } = useAuth();
    const auth = getAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setError(''); // 清除之前的錯誤訊息
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log('User signed in:', userCredential.user);
            router.push('/member'); // 登入成功後跳轉到會員頁
        } catch (error) {
            const e = error as Error & { code?: string }; // 使用 Error 類型並添加可選的 code 屬性
            switch (e.code) {
                case 'auth/user-not-found':
                    setError('尚未註冊，請註冊新帳號');
                    break;
                case 'auth/wrong-password':
                    setError('密碼錯誤');
                    break;
                default:
                    setError('帳號密碼錯誤');
                    break;
            }
        }
    };

    const handleRegister = async () => {
        setError(''); // 清除之前的錯誤訊息
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log('User registered:', userCredential.user);
            router.push('/member'); // 註冊成功後跳轉到會員頁
        } catch (error) {
            const e = error as Error & { code?: string }; // 同上，使用 Error 類型
            if (e.code === 'auth/email-already-in-use') {
                setError('該帳號已註冊');
            } else {
                setError('註冊錯誤');
            }
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
            console.log('User signed in with Google:', userCredential.user);
            router.push('/member'); // 使用 Google 登入成功後跳轉到會員頁
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

    const toggleRegistering = () => {
        setError(''); // 切換登入註冊時清空錯誤訊息
        setIsRegistering(!isRegistering);
    };

    return (
        <main>
            <div className={styles.loginwrapperout}>
            <div className={styles.loginwrapper}>

                {user ? (
                    <div>
                        <p>已登入，使用者: {user.email}</p>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            登出
                        </button>
                    </div>
                ) : (
                    <>

                    <div className={styles.loginContainer}>
                    <h1>{isRegistering ? '註冊金訊鴞' : '登入金訊鴞'}</h1>
                        <Image
                            src="/images/oai-icon-removebg-preview.png" 
                            alt="Menu"
                            width={120} 
                            height={120} 
                            className={styles.homeIcon}
                        />
                        <div className={styles.quickAccess}>
                            <button onClick={handleGoogleLogin} className={styles.googleLogin}>
                            <Image
                                src="/images/googleicon.png" 
                                alt="Menu"
                                width={24} 
                                height={24} 
                                className={styles.homeIcon}
                            />
                            <span className={styles.buttonText}>Google 快速登入</span>
                            </button>
     
                        </div>

                        
                        <div className={styles.Access}>
                        <label className={styles.emailInput}>
                            <p>輸入您的Email帳號：</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label className={styles.passwordInput}>
                            <p>輸入您的密碼：</p>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        </div>

                        {isRegistering ? (
                            <button onClick={handleRegister} className={styles.registerButton}>
                                註冊
                            </button>
                        ) : (
                            <button onClick={handleLogin} className={styles.loginButton}>
                                登入
                            </button>
                        )}
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>} 
{/* 
                        <button onClick={() => setIsRegistering(!isRegistering)} className={styles.toggleLogin}>
                            {isRegistering ? '已有帳號？登入' : '還沒有帳號？註冊新帳號'}
                        </button> */}
                        <button onClick={toggleRegistering} className={styles.toggleLogin}>
                                {isRegistering ? '已有帳號？登入' : '還沒有帳號？註冊新帳號'}
                            </button>

</>
                    
                )}
            </div>
            </div>
            </main>
    );
};

export default RegisterPage;