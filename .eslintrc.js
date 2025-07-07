module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'react-hooks/exhaustive-deps'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    // Prevent direct axios imports except in specific files
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'axios',
            message: 'Direct axios imports are not allowed. Use apiClient from services/apiClient.ts instead. Only exceptions: apiClient.ts itself and files that need axios.isAxiosError for type checking.'
          }
        ],
        patterns: [
          {
            group: ['axios'],
            message: 'Direct axios imports are not allowed. Use apiClient from services/apiClient.ts instead.'
          }
        ]
      }
    ]
  },
  overrides: [
    {
      // Allow axios imports only in these specific files
      files: [
        'src/services/apiClient.ts',
        'src/services/apiClient.d.ts',
        // Add any other files that legitimately need axios for type checking
        'src/components/Inspection/InspectionDueDates.tsx'
      ],
      rules: {
        'no-restricted-imports': 'off'
      }
    }
  ]
};
