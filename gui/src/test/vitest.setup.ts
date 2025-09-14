// Setup file for vitest
import { beforeAll, vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
})