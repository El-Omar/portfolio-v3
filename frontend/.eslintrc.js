module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "eslint-config-next",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
  ],
  ignorePatterns: ["node_modules", ".next", "dist"],
  plugins: ["@stylistic/js"],
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
