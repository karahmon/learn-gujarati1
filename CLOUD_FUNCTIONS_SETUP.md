# Firebase Cloud Functions Setup Guide

## What This Enables

With Cloud Functions deployed, you can:
- ✅ **Completely delete users** from both Firestore AND Firebase Authentication
- ✅ **Automatic cleanup** when deleting users from the admin panel
- ✅ **Secure deletion** - Only Super Admins can trigger deletions
- ✅ **Background processing** - Deletion requests are processed automatically

---

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project with Blaze plan (pay-as-you-go) - Cloud Functions require this
- Node.js 18+ installed

---

## Setup Steps

### Step 1: Initialize Cloud Functions

```bash
cd /Users/monilkarania/Developer/learn-gujarati

# Login to Firebase (if not already logged in)
firebase login

# Initialize Cloud Functions
firebase init functions
```

When prompted:
- **Select your Firebase project**
- **Language**: JavaScript (or TypeScript if you prefer)
- **ESLint**: Yes (recommended)
- **Install dependencies**: Yes

This will create a `functions` directory with the necessary files.

### Step 2: Copy the Cloud Functions Code

The functions are already created in `functions/index.js`. If the file doesn't exist or needs updating, the code includes:

**Three Cloud Functions:**

1. **`deleteUserAuth`** (Firestore Trigger)
   - Automatically triggered when a deletion request is created
   - Deletes user from Firebase Authentication
   - Updates the deletion request status

2. **`deleteUserByAdmin`** (Callable Function)
   - Can be called directly from your frontend
   - Validates that caller is a Super Admin
   - Deletes from both Firestore and Authentication in one call

3. **`processPendingDeletions`** (Scheduled Function)
   - Runs every 5 minutes
   - Processes any pending deletion requests
   - Ensures no requests get stuck

### Step 3: Install Dependencies

```bash
cd functions
npm install
```

### Step 4: Update Firestore Security Rules

Make sure your `firestore.rules` includes permissions for the deletion requests collection:

```javascript
// Add this to your firestore.rules
match /auth_deletion_requests/{requestId} {
  // Super Admins can create deletion requests
  allow create: if isSuperAdmin();
  
  // Super Admins can read deletion requests
  allow read: if isSuperAdmin();
  
  // Cloud Functions can update deletion requests
  allow update: if request.auth == null; // Cloud Functions run without auth context
}
```

### Step 5: Deploy Cloud Functions

```bash
# From the project root directory
firebase deploy --only functions
```

Or deploy specific functions:

```bash
firebase deploy --only functions:deleteUserAuth
firebase deploy --only functions:deleteUserByAdmin
firebase deploy --only functions:processPendingDeletions
```

### Step 6: Enable Required APIs

Cloud Functions need these APIs enabled in your Google Cloud Console:

1. Go to https://console.cloud.google.com/
2. Select your Firebase project
3. Enable these APIs:
   - **Cloud Functions API**
   - **Cloud Build API**
   - **Firebase Admin SDK API**

### Step 7: Test the Functions

1. **Test in your app:**
   - Login as Super Admin
   - Go to Role Management
   - Try to delete a test user
   - You should see a success message confirming deletion from both systems

2. **Check Firebase Console:**
   - Go to Firebase Console → Functions
   - You should see your deployed functions
   - Click on each function to see logs and metrics

3. **Check deletion status:**
   - Go to Firestore → `auth_deletion_requests` collection
   - You should see requests with status 'completed'

---

## Cost Considerations

**Firebase Blaze Plan Pricing:**
- Cloud Functions: First 2 million invocations/month are FREE
- For a small app with occasional user deletions, this should cost $0/month
- Check current pricing: https://firebase.google.com/pricing

**Typical Usage:**
- Deleting 100 users per month ≈ 100 function invocations
- Well within the free tier

---

## Alternative: Manual Deletion (No Cloud Functions)

If you don't want to set up Cloud Functions:

1. **Delete from Admin Panel** (only removes Firestore data)
2. **Manually delete from Firebase Console:**
   - Go to Firebase Console → Authentication → Users
   - Find the user by email
   - Click the three dots menu
   - Select "Delete account"

The app will create deletion requests in the `auth_deletion_requests` collection for your reference.

---

## Troubleshooting

### Error: "Firebase project not on Blaze plan"

**Solution:** Upgrade to Blaze plan
1. Go to Firebase Console → Settings → Usage and billing
2. Click "Modify plan"
3. Select Blaze plan (pay-as-you-go)
4. Add a payment method
5. Set a spending limit (e.g., $10/month) to avoid surprises

### Error: "functions/not-found"

**Solution:** Deploy the functions
```bash
firebase deploy --only functions
```

### Error: "permission-denied"

**Solution:** Check that:
1. You're logged in as a Super Admin
2. Your Firestore rules allow Super Admins to create deletion requests
3. Your user document has `role: "Super Admin"`

### Error: "Build failed"

**Solution:**
1. Check Node.js version: `node --version` (should be 18+)
2. Delete node_modules and reinstall:
   ```bash
   cd functions
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Check for syntax errors in `functions/index.js`

### Functions deployed but not working

**Solution:**
1. Check function logs: `firebase functions:log`
2. Verify IAM permissions in Google Cloud Console
3. Make sure Cloud Build API is enabled
4. Check that service account has proper permissions

---

## Local Testing (Optional)

Test functions locally before deploying:

```bash
# Install Firebase emulator
firebase init emulators

# Start emulators
firebase emulators:start

# In your app's firebase-functions.ts, uncomment this line:
# functions.useEmulator('localhost', 5001);
```

---

## Security Notes

- ✅ Only Super Admins can trigger deletions (validated in Cloud Function)
- ✅ Cloud Functions run with admin privileges (Firebase Admin SDK)
- ✅ All deletions are logged with timestamp and admin UID
- ✅ Deletion requests are stored in Firestore for audit trail

---

## Monitoring

**View function logs:**
```bash
firebase functions:log
```

**View function metrics:**
1. Go to Firebase Console → Functions
2. Click on a function name
3. See invocations, errors, and execution time

**Set up alerts:**
1. Go to Firebase Console → Functions
2. Click "Monitoring"
3. Set up email alerts for errors

---

## Updating Functions

When you make changes to `functions/index.js`:

```bash
# Deploy updated functions
firebase deploy --only functions
```

Or deploy a specific function:
```bash
firebase deploy --only functions:deleteUserByAdmin
```

---

## Files Created

- ✅ `functions/index.js` - Cloud Functions code
- ✅ `functions/package.json` - Dependencies
- ✅ `firebase-functions.ts` - Frontend helper functions
- ✅ `CLOUD_FUNCTIONS_SETUP.md` - This guide

---

## Summary

**With Cloud Functions:**
- Click delete → User removed from both Firestore AND Authentication ✅
- Automatic, secure, and complete user deletion

**Without Cloud Functions:**
- Click delete → User removed from Firestore only
- Must manually delete from Firebase Console → Authentication
- Deletion request created for tracking

Choose based on your needs and comfort level with Firebase deployment!
