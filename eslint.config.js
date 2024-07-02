// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'semi': [ 'error', 'always' ],
      'array-bracket-newline': [ 'error', 'consistent' ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'arrow-parens': [ 'error', 'always' ],
      'camelcase': 1,
      'computed-property-spacing': [ 'error', 'never' ],
      'eol-last': [ 'error', 'always' ],
      'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
      'keyword-spacing': 'error',
      'no-extend-native': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'error',
      'no-use-before-define': [ 'error', 'nofunc' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'quotes': [ 'error', 'single' ],
      'space-unary-ops': 2
    }
  },
  {
    files: [ '**/*.js' ],
    ...tseslint.configs.disableTypeChecked,
  },
);
