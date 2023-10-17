import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx';


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
