// Migration script to add approvalStatus to existing users
// Run this once to update existing users in the database

import { db } from '../firebase';
import { ApprovalStatus } from '../types';

async function migrateExistingUsers() {
  try {
    console.log('Starting user migration...');
    
    const usersSnapshot = await db.collection('users').get();
    const batch = db.batch();
    let count = 0;

    usersSnapshot.docs.forEach((doc) => {
      const userData = doc.data();
      
      // Only update if approvalStatus doesn't exist
      if (!userData.approvalStatus) {
        const userRef = db.collection('users').doc(doc.id);
        batch.update(userRef, {
          approvalStatus: ApprovalStatus.APPROVED, // Approve existing users by default
          createdAt: userData.createdAt || new Date().toISOString(),
        });
        count++;
        console.log(`Updating user: ${userData.fullName || doc.id}`);
      }
    });

    if (count > 0) {
      await batch.commit();
      console.log(`✅ Successfully migrated ${count} users`);
    } else {
      console.log('ℹ️  No users needed migration');
    }
  } catch (error) {
    console.error('❌ Error migrating users:', error);
  }
}

// Uncomment to run:
// migrateExistingUsers();

export default migrateExistingUsers;
