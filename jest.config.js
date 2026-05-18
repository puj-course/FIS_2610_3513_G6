module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  testMatch: ['**/*.test.js'],
  testEnvironment: 'jsdom',

  collectCoverage: true,
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text', 'json-summary'],

  collectCoverageFrom: [
    'src/behavioralPatterns/**/*.js',
    'src/CreationalPatterns/**/*.js',
    'src/structuralPatterns/**/*.js',
  ],

  reporters: ['default'],
  testTimeout: 10000,
  clearMocks: true,
  verbose: true
};
