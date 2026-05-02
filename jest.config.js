module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  
  testMatch: ['**/*.test.js'],
  
  testEnvironment: 'node',
  
  collectCoverage: true,
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'src/test/reports',
      outputName: 'junit.xml'
    }]
  ],
  
  testTimeout: 10000,
  
  clearMocks: true,
  
  verbose: true
};
