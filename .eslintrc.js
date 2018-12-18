module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "no-tabs":"off",
        'linebreak-style':'off',
        'max-len': 'off',
        'quotes':'off',
        'eqeqeq':'off',
        'no-console': 'off',
        'no-alert': 'off',
        'no-bitwise': 'off',
        'no-empty': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        'no-unused-vars': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-expressions': 'off',
        'no-plusplus': 'off',
        'func-names':'off',
        'no-restricted-syntax': 'off',
        'one-var':'off',
        'no-prototype-builtins':'off',
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};