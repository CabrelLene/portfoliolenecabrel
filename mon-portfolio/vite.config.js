// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',     // SW se met à jour sans action
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'images/profile.jpeg',
        'lotties/hero.json',
        'fonts/Inter-Bold.woff2',
        'fonts/Inter-Regular.woff2'
      ],
      manifest: {
        name: 'Cabrel Lene — Portfolio',
        short_name: 'Cabrel Lene',
        description: 'Portfolio FullStack / Mobile — Montréal',
        theme_color: '#0f0c29',
        background_color: '#0f0c29',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        shortcuts: [
          { name: 'Projets', url: '/projects', icons: [{ src: '/pwa-shortcut-projects.png', sizes: '96x96', type: 'image/png' }] },
          { name: 'Contact', url: '/contact', icons: [{ src: '/pwa-shortcut-contact.png', sizes: '96x96', type: 'image/png' }] }
        ]
      },
      workbox: {
        navigateFallback: '/index.html', // SPA fallback offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,jpg,jpeg,json}'],
        runtimeCaching: [
          // Images locales
          {
            urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          // Fonts locales
          {
            urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/fonts/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          // Lottie externes (si jamais tu en utilises encore)
          {
            urlPattern: ({ url }) => url.hostname.includes('lottiefiles.com'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'lottie-remote',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          }
        ]
      },
      // Optionnel : activer le SW en dev pour tester l’install (désactive si ça te gêne)
      devOptions: { enabled: true, suppressWarnings: true, type: 'module' }
    })
  ]
})
