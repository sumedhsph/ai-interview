// vitest.setup.ts  (root mein)
import '@testing-library/jest-dom';

// Safe TextEncoder polyfill (import style – no require)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = await import('util');
  // @ts-ignore
  global.TextEncoder = TextEncoder;
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}