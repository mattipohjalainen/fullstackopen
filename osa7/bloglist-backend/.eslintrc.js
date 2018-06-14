module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017,
    sourceType: "module"
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: [1, "double"],
    semi: [1, "never"],
    "no-console": 0,
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }]
  },
  "globals": {
    "test": true,
    "expect": true,
    "describe": true,
    "afterAll": true,
    "beforeAll": true
}
};
