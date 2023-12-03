import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { publicUri } from './credentials.tsx'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={publicUri}>
    <QueryClientProvider client={queryClient}>
    {/* <Routes>
    <Route path='/spotify-ui/*'  element= {<App/>} />
    </Routes> */}
    <App/>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
