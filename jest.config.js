module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  testMatch: ['**/*.test.js'],
  testEnvironment: 'node',

  collectCoverage: true,
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text', 'json-summary'],


  forceCoverageMatch: ['**/*.test.js'],

  collectCoverageFrom: undefined,

  reporters: [
    'default'
  ],

  testTimeout: 10000,
  clearMocks: true,
  verbose: true
};
