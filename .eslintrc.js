module.exports = {
  // 解析器 插件
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/no-var-requires': 0, // 允许 require 导入
    'no-extra-semi': 0, // 禁止不必要的分号
    quotes: ['error', 'single'], // 强制使用单引号
    'no-unused-vars': 0,
    'no-irregular-whitespace': 2,
    'no-mixed-spaces-and-tabs': [2, false],
    'no-multi-spaces': 1, //不能用多余的空格,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx", ".tsx"] }] 
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
