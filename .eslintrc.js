module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    camelcase: ['error', { allow: ['answer_id', 'product_id', 'default_price', 'created_at', 'updated_at', 'style_id', 'sale_price', 'original_price', 'thumbnail_url', 'review_id', 'reviewer_name', 'question_id', 'question_body', 'question_date', 'asker_name', 'question_helpfulness', 'answerer_name', 'sku_id'] }],
  },
  ignorePatterns: ['bundle.js'],
};
