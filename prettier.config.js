module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  printWidth: 80,
  bracketSpacing: true,

  useTabs: true,
  semi: true,
  singleQuote: true,
  arrowParens: "always",
  trailingComma: "all",
  endOfLine: "auto",

  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@biso24",
    "^@(assets|components|constants|contexts|hocs|features|hooks|pages|services|store|stores|styles|utils)",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
