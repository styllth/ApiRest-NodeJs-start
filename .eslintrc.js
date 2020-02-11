module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        jest: true
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        /*
        "react/jsx-filename-extension": [
            "error",
            {
                "extensions": [".js", ".jsx"]
            }
        ],
        */
        "prettier/prettier": ["error"],
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "func-names": "off",
        "no-process-exit": "off",
        "object-shorthand": "off",
        "no-cond-assign": ["error", "always"],
        "no-console": "off",
        "global-require": "off",
        "import/prefer-default-export": "off",
        "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
        // usar o _id na variavel
        "no-underscore-dangle": ["error", { "allow": ["_id"] }]
    },
};