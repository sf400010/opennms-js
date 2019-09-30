module.exports = {
  'env': {
    'browser': true,
    'node': false
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'allowImportExportEverywhere': true,
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  'rules': {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': 1,
    '@typescript-eslint/no-triple-slash-reference': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'array-callback-return': 2,
    'block-scoped-var': 2,
    'comma-dangle': 0,
    'complexity': 2,
    'consistent-return': 2,
    'curly': 2,
    'default-case': 2,
    'dot-location': [1, 'property'],
    'dot-notation': 0,
    'eqeqeq': 1,
    'guard-for-in': 2,
    'quotes': [1, 'single'],
    'no-caller': 2,
    'no-case-declarations': 2,
    'no-cond-assign': 2,
    'no-console': 1,
    'no-constant-condition': 1,
    'no-control-regex': 2,
    'no-debugger': 2,
    'no-div-regex': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-else-return': 1,
    'no-empty-character-class': 1,
    'no-empty': 1,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-label': 2,
    'no-extra-parens': 0,
    'no-extra-semi': 2,
    'no-fallthrough': 0,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implicit-coercion': 2,
    'no-implicit-globals': 1,
    'no-implied-eval': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-invalid-this': 2,
    'no-irregular-whitespace': 1,
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': 2,
    'no-script-url': 2,
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-sparse-arrays': 2,
    'no-throw-literal': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unreachable': 2,
    'no-unused-expressions': 2,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-useless-escape': 2,
    'no-var': 1,
    'no-void': 0,
    'no-with': 2,
    'prefer-const': 1,
    'radix': 2,
    'use-isnan': 2,
    'valid-jsdoc': 0,
    'valid-typeof': 2,
    'quote-props': 0,
    'yoda': 2
  }
};
