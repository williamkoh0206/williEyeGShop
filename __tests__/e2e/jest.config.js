/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "WilliEyeGShop Test Report",
      "outputPath": "./__tests__/e2e/test-report/index.html",
      "includeFailureMsg": true,
      "includeSuiteFailure": true,
      "includeConsoleLog": true,
      "useCssFile": true,
    }]
  ],
};