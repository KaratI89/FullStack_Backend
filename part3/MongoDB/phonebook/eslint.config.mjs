import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'


export default [
  {
    plugins: {
      stylistic: stylistic
    }
  },
  {
    ignores: ['dist', 'node_modules']
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs}'],
  },
  {
    languageOptions: {
      sourceType : 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.es2021,
        ...globals.node,
      }
    },
  },
  {
    rules: {
      'stylistic/indent': [
        'error',
        2
      ],
      'stylistic/linebreak-style': [
        'error',
        'windows'
      ],
      'stylistic/quotes': [
        'error',
        'single'
      ],
      'stylistic/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
    }
  }
]