import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { storage, db, auth } from './../config/firebase-config.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
    const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userProfile = await getDoc(userDoc);
                if (userProfile.exists()) {
                    const data = userProfile.data();
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setProfilePictureUrl(data.profilePictureUrl || '');
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handleProfileUpdate = async () => {
        if (!user) return;

        const userDoc = doc(db, 'users', user.uid);

        let profilePictureUrl = '';
        if (profilePicture) {
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, profilePicture);
            profilePictureUrl = await getDownloadURL(storageRef);
        }

        await updateDoc(userDoc, {
            firstName,
            lastName,
            ...(profilePictureUrl && { profilePictureUrl })
        });

        alert('Profile updated successfully');
    };

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                </div>
                {profilePictureUrl && (
                    <div className="profile-picture-preview">
                        <img src={profilePictureUrl} alt="Profile" />
                    </div>
                )}
                <button type="button" onClick={handleProfileUpdate}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
