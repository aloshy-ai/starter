// tests/setup.ts

import '@testing-library/jest-dom'
import { TextDecoder } from 'util'
import dotenv from 'dotenv'

// Load env vars from .env.local
dotenv.config({ path: '.env.local' })

// Fix TextDecoder
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder
}
