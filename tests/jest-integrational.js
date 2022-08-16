const baseConfig = require('./jest');

const config = {
    rootDir: 'integrational'
};

module.exports = { ...baseConfig, ...config };
