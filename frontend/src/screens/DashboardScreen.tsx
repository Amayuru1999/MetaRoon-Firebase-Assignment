// src/screens/DashboardScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './../config/firebase-config.ts';
import './DashboardScreen.css';

const DashboardScreen: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    firstName,
                    lastName,
                    email: user.email,
                });
                navigate('/profile');
            } catch (error) {
                console.error('Error saving user data:', error);
            }
        }
    };

    return (
        <div className="dashboard-screen">
            <h1>Welcome to the Dashboard</h1>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default DashboardScreen;
