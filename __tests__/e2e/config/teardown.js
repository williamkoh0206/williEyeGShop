const { detox } = require('detox');
const adapter = require('detox/runners/jest/adapter');

module.exports = async function() {
  await adapter.afterAll();
  await detox.cleanup();
};