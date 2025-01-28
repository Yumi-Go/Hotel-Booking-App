/** @type {import("eslint").Linter.Config} */
const config = {
    env: {
      node: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
    },
    plugins: ['node'],
  };
  
  export default config;
  