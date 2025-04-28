import React from 'react';
import { createRoot } from 'react-dom/client'; // Using createRoot correctly
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

// Replace with your Clerk publishable key
const clerkPublishableKey = 'pk_test_cGxlYXNpbmctZ2lyYWZmZS0yNC5jbGVyay5hY2NvdW50cy5kZXYk';

if (!clerkPublishableKey) {
  console.error('Missing Clerk Publishable Key!');
}

// Get the root container
const container = document.getElementById('root');

// Create root using React 18's API
const root = createRoot(container);

// Render the app
root.render(
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ClerkProvider>
);
