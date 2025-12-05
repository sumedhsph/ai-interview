// vitest.setup.ts
import '@testing-library/jest-dom'

// Optional: Polyfill for TextEncoder if needed (rarely required)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}