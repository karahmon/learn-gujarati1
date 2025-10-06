import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router.tsx'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="learn-gujarati-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router}>
        </RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
