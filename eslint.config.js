import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

// Refactored update: 2025-07-22 check

// Refactored update: 2025-07-24 check

// Refactored update: 2025-07-24 check

// Refactored update: 2025-07-26 check

// Refactored update: 2025-07-28 check

// Refactored update: 2025-07-30 check

// Refactored update: 2025-08-05 check

// Refactored update: 2025-08-06 check

// Refactored update: 2025-08-06 check

// Refactored update: 2025-08-08 check

// Refactored update: 2025-08-09 check

// Refactored update: 2025-08-13 check

// Refactored update: 2025-08-14 check

// Refactored update: 2025-08-19 check

// Refactored update: 2025-08-28 check

// Refactored update: 2025-08-28 check

// Refactored update: 2025-09-08 check

// Refactored update: 2025-09-09 check

// Refactored update: 2025-09-12 check

// Refactored update: 2025-09-17 check
