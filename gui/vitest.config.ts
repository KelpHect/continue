/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/vitest.setup.ts'],
    typecheck: {
      enabled: false
    }
  },
  resolve: {
    alias: {
      // These external dependencies should be resolved from node_modules
      'uuid': 'uuid',
      'minimatch': 'minimatch',
      'zod': 'zod',
      'partial-json': 'partial-json',
      'uri-js': 'uri-js',
    }
  },
  ssr: {
    // Don't externalize these dependencies for tests
    noExternal: [
      'uuid', 
      'minimatch', 
      'zod', 
      'partial-json',
      'uri-js',
      '@continuedev/config-yaml',
      '@continuedev/terminal-security',
      '@continuedev/config-types'
    ]
  }
})