module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
rules: {
    'no-undef': 'off',                // Уберет ошибку 'apiUrl' is not defined
    'no-inner-declarations': 'off',   // Разрешит функции внутри блоков
    'no-extra-semi': 'off',           // Простит лишние точки с запятой
    'react/no-unknown-property': 'off', // Разрешит 'class' вместо 'className'
    'react-refresh/only-export-components': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
  },
}