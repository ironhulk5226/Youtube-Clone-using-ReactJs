import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
// React is a Single Page Application (SPA) framework — meaning, it loads one HTML page and dynamically changes the content without reloading the page.
// To allow navigating between different components like /home, /about, or /videos without reloading the page, we use React Router.
// BrowserRouter is the top-level router component that enables this.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
)
