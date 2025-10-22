
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from './firebase-credentials';

// Basic runtime validation to catch misconfigured envs quickly.
function isLikelyApiKey(key?: string) {
	if (!key) return false;
	// Most Firebase web API keys start with 'AIza' — use a permissive check.
	return /^AIza[0-9A-Za-z-_]{10,}$/.test(key);
}

if (!isLikelyApiKey(firebaseConfig.apiKey) || firebaseConfig.apiKey === 'REPLACE_ME') {
	// Mask key for logging
	const masked = firebaseConfig.apiKey ? (firebaseConfig.apiKey.slice(0, 8) + '...' ) : '<<missing>>';
	// Provide actionable instructions for the developer
	throw new Error(
		`Firebase API key appears invalid: ${masked}. ` +
		`Check your project .env (VITE_FIREBASE_API_KEY) and ensure it is present, has no extra quotes or trailing commas, ` +
		`and that you restarted the dev server after editing the .env file.`
	);
}

// Initialize Firebase with the configuration from the credentials file
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
export const auth = firebase.auth();

// Get a reference to the Firestore service
export const db = firebase.firestore();