import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
const Signup = () => {
    const auth = getAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/'); // 註冊成功後跳轉到首頁
        } catch (error) {
            console.error('註冊失敗:', error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">註冊新帳號</h1>
            <form onSubmit={handleSignup} className="flex flex-col w-80">
                <input
                    type="email"
                    placeholder="信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    註冊
                </button>
            </form>
        </div>
        </div>
    );
};

export default Signup;
