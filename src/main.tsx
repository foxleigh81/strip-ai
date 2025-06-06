import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'  

// Get root element and clear loading state
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

// Clear loading content
rootElement.innerHTML = ''

// Use concurrent features for better performance
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
) 