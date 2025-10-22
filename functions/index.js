// Firebase Cloud Function to Delete Users from Authentication
// This needs to be deployed to Firebase Functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Cloud Function to delete a user from Firebase Authentication
 * Triggered when a document is created in the 'auth_deletion_requests' collection
 */
exports.deleteUserAuth = functions.firestore
  .document('auth_deletion_requests/{requestId}')
  .onCreate(async (snap, context) => {
    const deletionRequest = snap.data();
    const { uid, email, fullName } = deletionRequest;

    try {
      console.log(`Processing deletion request for user: ${email} (${uid})`);

      // Delete the user from Firebase Authentication
      await admin.auth().deleteUser(uid);
      console.log(`Successfully deleted user ${email} from Authentication`);

      // Update the deletion request status
      await snap.ref.update({
        status: 'completed',
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        message: 'User successfully deleted from Authentication'
      });

      console.log(`Deletion request marked as completed`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user from Auth:', error);

      // Update the deletion request with error status
      await snap.ref.update({
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        error: error.message
      });

      return { success: false, error: error.message };
    }
  });

/**
 * HTTP Callable Function - Alternative approach
 * Can be called directly from the frontend
 */
exports.deleteUserByAdmin = functions.https.onCall(async (data, context) => {
  // Check if the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to call this function'
    );
  }

  // Check if the caller is a Super Admin
  const callerUid = context.auth.uid;
  const callerDoc = await admin.firestore().collection('users').doc(callerUid).get();
  const callerData = callerDoc.data();

  if (!callerData || callerData.role !== 'Super Admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only Super Admins can delete users'
    );
  }

  const { uid } = data;

  if (!uid) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'User UID is required'
    );
  }

  try {
    // Delete from Authentication
    await admin.auth().deleteUser(uid);

    // Delete from Firestore
    await admin.firestore().collection('users').doc(uid).delete();

    console.log(`User ${uid} deleted by Super Admin ${callerUid}`);

    return {
      success: true,
      message: 'User deleted from both Authentication and Firestore'
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to delete user: ${error.message}`
    );
  }
});

/**
 * Scheduled function to process pending deletion requests
 * Runs every 5 minutes to clean up any pending requests
 */
exports.processPendingDeletions = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const pendingRequests = await admin
      .firestore()
      .collection('auth_deletion_requests')
      .where('status', '==', 'pending')
      .limit(10)
      .get();

    const promises = pendingRequests.docs.map(async (doc) => {
      const { uid, email } = doc.data();

      try {
        await admin.auth().deleteUser(uid);
        await doc.ref.update({
          status: 'completed',
          completedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Successfully deleted user ${email}`);
      } catch (error) {
        console.error(`Failed to delete user ${email}:`, error);
        await doc.ref.update({
          status: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          error: error.message
        });
      }
    });

    await Promise.all(promises);
    console.log(`Processed ${promises.length} deletion requests`);
    return null;
  });
