module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            { 'avoidEscape': true }
        ],
        'semi': [
            'error',
            'always'
        ],
        "comma-dangle": [
            'error',
            'always-multiline'
        ],
        "no-trailing-spaces": [
            'error'
        ],
    }
};
