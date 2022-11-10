const baseConfig = require('./jest');

const config = {
    rootDir: 'integration'
};

module.exports = { ...baseConfig, ...config };
