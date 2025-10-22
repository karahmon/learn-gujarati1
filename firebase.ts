
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig, firebaseIsConfigured } from './firebase-credentials';

// Basic runtime validation to catch misconfigured envs quickly.
function isLikelyApiKey(key?: string) {
	if (!key) return false;
	// Most Firebase web API keys start with 'AIza' — use a permissive check.
	return /^AIza[0-9A-Za-z-_]{10,}$/.test(key);
}

// Declare exports as variables so we can assign them conditionally.
let auth: any = undefined;
let db: any = undefined;

if (firebaseIsConfigured && isLikelyApiKey(firebaseConfig.apiKey)) {
	// Initialize Firebase with the configuration from the credentials file
	const app = firebase.initializeApp(firebaseConfig as any);

	// Get a reference to the auth service
	auth = firebase.auth();

	// Get a reference to the Firestore service
	db = firebase.firestore();
} else {
	// Avoid throwing in production — provide safe no-op stubs and warn.
	// eslint-disable-next-line no-console
	console.warn('Firebase is not configured. Auth and Firestore will be no-ops. Set VITE_FIREBASE_* env vars to enable Firebase.');

	auth = {
		currentUser: null,
		onAuthStateChanged: (_cb: any) => {
			// return unsubscribe
			return () => {};
		},
		signInWithEmailAndPassword: async () => { throw new Error('Firebase not configured'); }
	};

	db = {
		collection: () => ({ doc: () => ({ get: async () => ({ exists: false }), set: async () => {} }) })
	};
}

export { auth, db };