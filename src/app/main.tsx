import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter } from 'react-router-dom'

// components JSX
import App from './App.tsx'

// styles
import 'styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
)

// Real User Monitoring implementation
import { onLCP, onINP, onCLS } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send data to custom API, Google Analytics, Vercel, or Sentry
  console.log(metric)
}

onLCP(sendToAnalytics)
onINP(sendToAnalytics)
onCLS(sendToAnalytics)
