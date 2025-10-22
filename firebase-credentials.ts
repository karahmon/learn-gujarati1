// Read Firebase credentials from Vite environment variables (VITE_ prefix).
// Do NOT commit real secrets to source control. Provide values in a local `.env` file
// or via your hosting platform's environment settings.

function getEnv(key: string): string | undefined {
  // Vite exposes env vars on import.meta.env and requires a VITE_ prefix for client-side use
  // TS may not recognize all keys on import.meta.env, so access dynamically.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = (import.meta as any).env;
  if (!(env && env[key])) return undefined;
  let val = String(env[key]);
  // Defensive cleanup: remove surrounding quotes and trailing commas which sometimes
  // appear if the .env file was edited incorrectly.
  val = val.trim().replace(/^"|"$/g, '');
  val = val.replace(/,$/, '');
  return val || undefined;
}

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

// Identify missing keys (either undefined or left as placeholder values like 'REPLACE_ME' or 'REPLACE_')
const missing = requiredKeys.filter(k => {
  const v = getEnv(k);
  return !v || v.startsWith('REPLACE');
});

if (missing.length) {
  // eslint-disable-next-line no-console
  console.warn(`Missing or placeholder Firebase env vars: ${missing.join(', ')}.` +
    ' Configure them locally in a `.env` file or in your hosting provider.');
}

function asMaybe(key: string) {
  const v = getEnv(key);
  if (!v || v.startsWith('REPLACE')) return undefined;
  return v;
}

export const firebaseConfig = {
  apiKey: asMaybe('VITE_FIREBASE_API_KEY'),
  authDomain: asMaybe('VITE_FIREBASE_AUTH_DOMAIN'),
  databaseURL: asMaybe('VITE_FIREBASE_DATABASE_URL'),
  projectId: asMaybe('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: asMaybe('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: asMaybe('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: asMaybe('VITE_FIREBASE_APP_ID'),
  measurementId: asMaybe('VITE_FIREBASE_MEASUREMENT_ID')
};

export const firebaseIsConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
