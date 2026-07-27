module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        diagnostics: {
          ignoreCodes: [1295, 1287, 1343]
        }
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/components/**/types.ts',
    '!src/components/Modals/**/types.ts',
    '!src/templates/**/types.ts',
    '!src/pages/**/*.tsx',
    '!src/styles/**/*.ts',
    '!src/hooks/**/*.ts',
    '!src/skeleton/**/*.tsx',
    '!src/contexts/**/*.tsx',
    '!src/utils/modules/**/*.ts',
    '!src/utils/exports/**/*.ts',
    '!src/services/**/*.ts',
    '!src/@types/**/*.d.ts',
    '!src/typings/**/*.ts',
    '!src/app/**/*.ts(x)?'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/helpers/TestingLibrary/setup.tsx'],
  modulePaths: ['<rootDir>/src/']
}
