module.exports = {
  plugins: [
    '@typescript-eslint',
    'jest',
    'unicorn',
    'prettier',
    'react',
    'react-native',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'plugin:react-native/all',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'import/no-relative-parent-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'unicorn/import-index': 'off',
    'unicorn/filename-case': 'off',
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
