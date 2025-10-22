# Firestore Security Rules Setup Guide

## Problem: "Failed to fetch users" Error

This error occurs because Firestore has security rules that prevent unauthorized access to the users collection.

## Solution: Deploy Firestore Security Rules

### Step 1: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### Step 3: Initialize Firebase in Your Project (if not done)

```bash
firebase init
```

Select:
- **Firestore**: Configure security rules and indexes files
- Use an existing project
- Select your Firebase project from the list
- Accept the default file names (firestore.rules and firestore.indexes.json)

### Step 4: Deploy the Security Rules

```bash
firebase deploy --only firestore:rules
```

This will deploy the rules from the `firestore.rules` file to your Firebase project.

### Step 5: Verify Deployment

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. You should see the rules deployed

---

## Alternative: Manual Setup via Firebase Console

If you prefer not to use the CLI, you can copy the rules manually:

1. Open the `firestore.rules` file in this project
2. Go to [Firebase Console](https://console.firebase.google.com/)
3. Select your project
4. Go to **Firestore Database** → **Rules**
5. Copy and paste the entire content from `firestore.rules`
6. Click **Publish**

---

## What the Rules Do

### For Super Admins:
- ✅ Can read ALL users
- ✅ Can update any user (role, approval status, batches)
- ✅ Can delete users
- ✅ Can approve/reject user registrations

### For Regular Users:
- ✅ Can read their own user document
- ✅ Can create their own account (signup)
- ✅ Can update their own profile (limited fields)
- ❌ Cannot change their own role, approval status, or batches
- ❌ Cannot read other users' data

### Approval System:
- New users are created with `approvalStatus: 'pending'`
- Super Admins can approve users by setting `approvalStatus: 'approved'`
- Approved users can access the system based on their role
- Rejected users can see a rejection message

---

## Testing the Rules

After deploying, test by:

1. **As Super Admin:**
   - Login with a Super Admin account
   - Go to Role Management page
   - You should see all users

2. **As Regular User:**
   - Login with a non-admin account
   - Try to access Role Management
   - Should see "Permission denied" error

---

## Troubleshooting

### Error: "Permission denied"

**For Super Admin users:**
1. Make sure your user document in Firestore has `role: "Super Admin"` (exact match, including capitalization)
2. Check Firebase Console → Authentication → Users to confirm your UID
3. Check Firestore Database → users collection → your UID document → verify role field

**For Regular Users:**
- This is expected behavior. Only Super Admins can access Role Management.

### Error: "Firebase not configured"

1. Check that all VITE_FIREBASE_* environment variables are set in `.env`
2. Verify `firebase-credentials.ts` has the correct configuration
3. Restart the dev server after changing environment variables

### Error: "Failed to fetch users" (network error)

1. Check your internet connection
2. Verify Firebase project is not paused or disabled
3. Check browser console for detailed error messages

---

## Quick Deploy Script

We've created a helper script for you:

```bash
./deploy-firestore-rules.sh
```

This script will:
- Check if Firebase CLI is installed
- Check if you're logged in
- Create firebase.json if needed
- Show you the deployment command

---

## Next Steps

After deploying the rules:

1. **Create a Super Admin account:**
   ```
   - Sign up with an email
   - Manually update the user document in Firestore Console
   - Set role to "Super Admin"
   - Set approvalStatus to "approved"
   ```

2. **Test the approval workflow:**
   - Create a new test account
   - Should see "Waiting for Approval" page
   - Login as Super Admin
   - Approve the test account
   - Test account should now have access

3. **Assign batches to users:**
   - Go to Role Management
   - Click the batch icon for a user
   - Enter batch numbers (e.g., "Batch 1, Batch 2, All")
   - Users will only see data from their assigned batches

---

## Support

If you encounter issues:

1. Check the browser console for detailed error messages
2. Check the Firebase Console for rule evaluation logs
3. Verify your user document has the correct role and approval status
4. Make sure you've deployed the latest rules

---

## Files Created

- ✅ `firestore.rules` - Security rules for Firestore
- ✅ `deploy-firestore-rules.sh` - Deployment helper script
- ✅ `FIRESTORE_SETUP.md` - This guide
