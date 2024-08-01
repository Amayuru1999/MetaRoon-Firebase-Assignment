// src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import './AuthScreen.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './../config/firebase-config.ts';
import { useNavigate } from 'react-router-dom';

const AuthScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Authentication Error:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    return (
        <div className="auth-screen">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AuthScreen;
