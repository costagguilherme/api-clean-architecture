/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: 'babel',
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  }
};
