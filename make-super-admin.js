// Manual Super Admin Setup Script
// Run this in the browser console on your Firebase Console (Firestore page)

// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project
// 3. Go to Firestore Database
// 4. Find the 'users' collection
// 5. Find YOUR user document (use your UID from Authentication > Users)
// 6. Click on the document
// 7. Open the browser console (F12 or Cmd+Option+I)
// 8. Copy and paste this code, replacing YOUR_USER_ID with your actual UID

const YOUR_USER_ID = 'PASTE_YOUR_UID_HERE';

// This function will help you update your user to Super Admin
async function makeMeSuperAdmin() {
  const db = firebase.firestore();
  
  try {
    await db.collection('users').doc(YOUR_USER_ID).update({
      role: 'Super Admin',
      approvalStatus: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: YOUR_USER_ID
    });
    
    console.log('✅ SUCCESS! You are now a Super Admin!');
    console.log('Please refresh your app to see the changes.');
  } catch (error) {
    console.error('❌ Error:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure you replaced YOUR_USER_ID with your actual UID');
    console.log('2. Check that your user document exists in Firestore');
    console.log('3. You may need to update the security rules first');
  }
}

// Run this function
makeMeSuperAdmin();
