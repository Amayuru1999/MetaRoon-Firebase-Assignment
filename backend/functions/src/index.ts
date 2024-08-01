import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Firestore trigger to add additional data
exports.addAdditionalUserData = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const userId = context.params.userId;
        const additionalData = {
            registrationDate: admin.firestore.FieldValue.serverTimestamp(),
            userStatus: 'active',
        };

        try {
            await db.collection('users').doc(userId).update(additionalData);
        } catch (error) {
            console.error('Error adding additional user data:', error);
        }
    });

// Cloud function to update user profiles and upload profile pictures
exports.updateUserProfile = functions.https.onCall(async (data, context) => {
    const userId = context.auth?.uid;
    if (!userId) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
    }

    const { firstName, lastName, profilePicture } = data;

    try {
        const userDoc = db.collection('users').doc(userId);
        await userDoc.update({
            firstName,
            lastName,
            profilePicture,
        });
        return { message: 'Profile updated successfully' };
    } catch (error) {
        console.error('Error updating profile:', error);
        throw new functions.https.HttpsError('internal', 'Unable to update profile');
    }
});
