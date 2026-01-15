import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* MantineProvider gives all Mantine components a theme + CSS variables */}
    <MantineProvider
      theme={{
        primaryColor: 'blue',
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
)
