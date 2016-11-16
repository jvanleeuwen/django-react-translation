const path = require('path');

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    'browser': true,
  },
  ecmaFeatures: {
    jsx: true,
    classes: true,
  },
  globals: {
    MARK_TRANSLATIONS: true,
  },
  plugins: [
    'getsentry',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    // 'getsentry/jsx-needs-i18n': [1],
    'import/no-extraneous-dependencies': [0],
    'import/extensions': [0],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.dev.js',
      },
    },
  },
};
