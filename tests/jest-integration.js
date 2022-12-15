const baseConfig = require('./jest');

const config = {
    rootDir: 'integration',
    setupFiles: ['dotenv/config']
};

module.exports = { ...baseConfig, ...config };
