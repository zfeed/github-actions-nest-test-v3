module.exports = {
    env: {
        node: true,
        es2022: true
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never'
            }
        ]
    }
};
