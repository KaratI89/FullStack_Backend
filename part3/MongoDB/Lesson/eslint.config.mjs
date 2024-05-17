import globals from "globals"
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin-js"


export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"},
    languageOptions: { globals: globals.browser },
    plugins: {
      stylistic: stylistic
    },
    rules: {
      'stylistic/indent': [
        'error',
        2
      ],
      'stylistic/linebreak-style': [
        'error',
        'unix'
      ],
      'stylistic/quotes': [
        'error',
        'single'
      ],
      'stylistic/semi': [
        'error',
        'never'
      ],
    }
  }
];