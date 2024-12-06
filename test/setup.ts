import '@testing-library/jest-dom'
import { TextDecoder } from 'util'

// Fix the TextDecoder type assignment
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder
}
