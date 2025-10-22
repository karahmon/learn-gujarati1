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

const missing = requiredKeys.filter(k => !getEnv(k));
if (missing.length) {
  // Provide a clear runtime message in development when envs are missing.
  // In production, you may want a different strategy.
  // eslint-disable-next-line no-console
  console.warn(`Missing required Firebase env vars: ${missing.join(', ')}. ` +
    'Create a local `.env` with the VITE_FIREBASE_* keys or configure them in your hosting provider.');
}

export const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || 'REPLACE_ME',
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || 'REPLACE_ME',
  // Optional Realtime Database URL
  databaseURL: getEnv('VITE_FIREBASE_DATABASE_URL') || undefined,
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || 'REPLACE_ME',
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || 'REPLACE_ME',
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || 'REPLACE_ME',
  appId: getEnv('VITE_FIREBASE_APP_ID') || 'REPLACE_ME',
  // measurementId is optional
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID')
};
