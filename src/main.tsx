
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useEffect } from 'react'

const GtagScript = () => {
  useEffect(() => {
    // Dynamically load the Google Analytics script
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RW1Q3YRVS2'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      // Initialize gtag after the script has loaded
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-RW1Q3YRVS2')
    }
  }, [])

  return null
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GtagScript />
    <App />
  </React.StrictMode>,
)
