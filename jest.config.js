module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  testMatch: ['**/*.test.js'],
  testEnvironment: 'node',

  collectCoverage: true,
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text', 'json-summary'],

  collectCoverageFrom: [
    'unimercs-backend/**/*.js',
    '!unimercs-backend/**/node_modules/**',
    '!**/node_modules/**',
    '!unimercs-backend/server.js'
  ],

  reporters: ['default'],
  testTimeout: 10000,
  clearMocks: true,
  verbose: true
};
