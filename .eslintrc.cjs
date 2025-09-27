module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  ignorePatterns: [
    "node_modules/",
    "chatmodes/",
    "instructions/",
    "prompts/",
    "references/",
    "toolkits/",
    ".schemas/",
    ".vscode/",
    "README*.md",
  ],
};
