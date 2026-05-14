module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  testMatch: ['**/*.test.js'],
  testEnvironment: 'node',

  collectCoverage: true,
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text', 'json-summary'],

  collectCoverageFrom: [
    'src/test/unit/**/*.test.js',
    '!**/node_modules/**'
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
