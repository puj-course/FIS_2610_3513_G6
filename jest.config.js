module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  coverageDirectory: 'test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test/reports',
      outputName: 'junit.xml'
    }]
  ],
  testTimeout: 10000
};
