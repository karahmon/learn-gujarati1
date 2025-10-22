#!/bin/bash

# Firestore Security Rules Deployment Guide
# ==========================================

echo "🔥 Firebase Firestore Security Rules Setup"
echo "==========================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed."
    echo ""
    echo "Please install it with:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI is installed"
echo ""

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ You are not logged in to Firebase."
    echo ""
    echo "Please login with:"
    echo "  firebase login"
    echo ""
    exit 1
fi

echo "✅ You are logged in to Firebase"
echo ""

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo "⚠️  firebase.json not found. Creating one..."
    cat > firebase.json << 'EOF'
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
EOF
    echo "✅ Created firebase.json"
fi

# Check if firestore.indexes.json exists
if [ ! -f "firestore.indexes.json" ]; then
    echo "⚠️  firestore.indexes.json not found. Creating one..."
    cat > firestore.indexes.json << 'EOF'
{
  "indexes": [],
  "fieldOverrides": []
}
EOF
    echo "✅ Created firestore.indexes.json"
fi

echo ""
echo "📋 Current Firebase Projects:"
firebase projects:list

echo ""
echo "🚀 To deploy the Firestore rules, run:"
echo "  firebase deploy --only firestore:rules"
echo ""
echo "📝 Important Notes:"
echo "  1. Make sure you have selected the correct Firebase project"
echo "  2. The rules in firestore.rules will be deployed to your project"
echo "  3. Super Admins will be able to manage all users"
echo "  4. Regular users will only see their own data"
echo ""
echo "To select a Firebase project:"
echo "  firebase use <project-id>"
echo ""
