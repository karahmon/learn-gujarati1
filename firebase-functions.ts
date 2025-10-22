// Firebase Cloud Functions Helper
// Add this to your firebase.ts or create a new file

import { auth, db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';

// Initialize Cloud Functions
const functions = firebase.functions();

// If using emulator (local development)
// Uncomment this line when testing locally:
// functions.useEmulator('localhost', 5001);

/**
 * Call the Cloud Function to delete a user from both Firestore and Authentication
 * @param uid - The user ID to delete
 * @returns Promise with the result
 */
export async function deleteUserWithAuth(uid: string): Promise<{ success: boolean; message: string }> {
  try {
    const deleteUserFn = functions.httpsCallable('deleteUserByAdmin');
    const result = await deleteUserFn({ uid });
    return result.data as { success: boolean; message: string };
  } catch (error: any) {
    console.error('Error calling deleteUserByAdmin:', error);
    throw new Error(error.message || 'Failed to delete user');
  }
}

/**
 * Check if Cloud Functions are available
 */
export function areCloudFunctionsAvailable(): boolean {
  try {
    return !!firebase.functions;
  } catch {
    return false;
  }
}
