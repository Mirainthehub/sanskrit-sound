import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices()
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
