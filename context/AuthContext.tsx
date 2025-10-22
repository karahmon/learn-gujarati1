import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase';
// FIX: Replaced modular auth imports with firebase compat to fix module export errors.
// This provides the necessary Firebase User type and aligns with the v8/compat API style for authentication.
import firebase from 'firebase/compat/app';
import { User, Role } from '../types';

// Define the shape of the data to be passed during signup
interface SignUpData {
  email: string;
  password_redacted: string;
  fullName: string;
  mobile: string;
  subcenter: string;
  mhtId: string;
  country: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password_redacted: string) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Switched to the namespaced `auth.onAuthStateChanged` method and `firebase.User` type from the compat library.
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: firebase.User | null) => {
      if (firebaseUser) {
        // User is signed in, get their profile from Firestore
        const userDocRef = db.collection('users').doc(firebaseUser.uid);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
        } else {
          // This case might happen if a user is created in Auth but their Firestore doc fails
          // Or if the login function determined the state was inconsistent.
          console.error("User document not found in Firestore! Forcing sign out.");
          // FIX: Switched to the namespaced `auth.signOut` method from the compat library.
          await auth.signOut();
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password_redacted: string) => {
    // FIX: Switched to the namespaced `auth.signInWithEmailAndPassword` method from the compat library.
    const userCredential = await auth.signInWithEmailAndPassword(email, password_redacted);
    const userDocRef = db.collection('users').doc(userCredential.user!.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      // This is a critical error: user exists in Auth, but not in our DB.
      // We sign them out and throw an error to be displayed on the UI.
      // FIX: Switched to the namespaced `auth.signOut` method from the compat library.
      await auth.signOut();
      throw new Error('Authentication successful, but user profile not found. Please try signing up again or contact support.');
    }
    // The onAuthStateChanged listener will handle setting the user state.
  };

  const signup = async (data: SignUpData) => {
    const { email, password_redacted, ...profileData } = data;
    // FIX: Switched to the namespaced `auth.createUserWithEmailAndPassword` method from the compat library.
    const userCredential = await auth.createUserWithEmailAndPassword(email, password_redacted);
    const firebaseUser = userCredential.user!;

    // Create a user document in Firestore
    const userDocRef = db.collection('users').doc(firebaseUser.uid);
    await userDocRef.set({
      email,
      ...profileData,
    });
    // The onAuthStateChanged listener will handle setting the user state.
  };

  const logout = async () => {
    // FIX: Switched to the namespaced `auth.signOut` method from the compat library.
    await auth.signOut();
  };

  const value = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};