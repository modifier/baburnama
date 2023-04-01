module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["svelte3", "@typescript-eslint"],
  extends: [
    "prettier"
  ],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/typescript": true,
  },
};
