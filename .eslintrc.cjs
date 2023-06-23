/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    browser: true,
    es2020: true,
  },

  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "react-hooks",
    "react",
    "unicorn",
    "import",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:unicorn/recommended",
    "prettier",
  ],

  settings: {
    react: {
      version: "18",
    },
    // Copied from 'eslint-import-resolver-typescript' README:
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },

  reportUnusedDisableDirectives: true,

  rules: {
    "import/no-unresolved": "off",

    "react-refresh/only-export-components": "warn",

    "unicorn/filename-case": ["error", { case: "camelCase" }],
  },

  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "unicorn/filename-case": ["error", { case: "pascalCase" }],
      },
    },
    {
      files: [".eslintrc.cjs"],
      rules: { "no-undef": "off" },
    },
    {
      files: ["*.config.cjs"],
      rules: {
        "no-undef": "off",
        "unicorn/filename-case": "off",
      },
    },
  ],
};
