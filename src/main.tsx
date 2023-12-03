import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
    <QueryClientProvider client={queryClient}>
    <Routes>
    <Route path='/spotify-ui/*'  element= {<App/>} />
    </Routes>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
