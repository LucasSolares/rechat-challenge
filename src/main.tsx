import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';

import { TasksProvider } from './providers';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <TasksProvider>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </TasksProvider>
  </React.StrictMode>
);
