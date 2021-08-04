const path = require('path');

const rootPath = process.cwd();
const currentProject = process.env.CURRENT_PROJECT || '';
const projectPath = path.join(rootPath, currentProject);

const coveragePath = path.join(projectPath, 'reports/coverage');
const htmlReporterBinPath = path.join(rootPath, './node_modules/jest-html-reporter');
const reportsPath = path.join(projectPath, 'reports/tests.html');

module.exports = {
  preset: 'ts-jest',
  rootDir: projectPath,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: coveragePath,
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'json-summary',
    'text',
    'lcov'
  ],
  testMatch: [
    `**/?(*.)+(spec|test).[tj]s?(x)`
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  reporters: [
    'default',
    [htmlReporterBinPath, {
      'pageTitle': `${currentProject} Test Report`,
      'outputPath': reportsPath
    }]
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  }
};
