module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      "react-app",        // Use CRA's default ESLint config
      "react-app/jest"    // Jest-specific rules if you’re using Jest for testing
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ does not require React to be in scope for JSX
    },
  };