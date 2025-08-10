// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import App from './App'

// src/main.jsx
import { registerSW } from 'virtual:pwa-register'

// AutoUpdate + callbacks (facultatifs)
registerSW({
  immediate: true,
  onOfflineReady() {
    // Optionnel: afficher un toast Chakra pour dire "Prêt hors-ligne"
    // ex: toast({ title: 'PWA', description: 'Disponible hors-ligne', status: 'success' })
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
