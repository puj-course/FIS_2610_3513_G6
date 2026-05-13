module.exports = {
  roots: ['<rootDir>/src/test/unit'],

  testMatch: ['**/*.test.js'],

  testEnvironment: 'node',

  collectCoverage: true,

  coverageDirectory: 'src/test/coverage',

  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text',
    'json-summary'
  ],

  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      branches: 60,
      statements: 70
    }
  },

  collectCoverageFrom: [
    'unimercs-backend/*.js',
    'unimercs-backend/routes/**/*.js',
    'unimercs-backend/models/**/*.js',
    'unimercs-backend/middleware/**/*.js',

    '!**/node_modules/**',
    '!src/test/**'
  ],

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'src/test/reports',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}'
    }]
  ],

  testTimeout: 10000,

  clearMocks: true,

  verbose: true
};
