module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "webpack.config.js",
    "babel.config.js",
    "jest.config.js",
  ],
};
