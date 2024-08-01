// Import functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Define your Firebase configuration
export abstract class FirebaseConfig {
    public static webFirebaseConfig = {
        apiKey: "AIzaSyD5D2ujF27zFHLhCCG-OEU9MIcuJWGNKPI",
        authDomain: "metaroon-d5d41.firebaseapp.com",
        projectId: "metaroon-d5d41",
        storageBucket: "metaroon-d5d41.appspot.com",
        messagingSenderId: "221905738106",
        appId: "1:221905738106:web:62bb1e00a72a5caf64dec3"
    }
}

// Initialize Firebase
export const firebaseApp = initializeApp(FirebaseConfig.webFirebaseConfig);

// Get Firebase Authentication instance
export const auth = getAuth(firebaseApp);
