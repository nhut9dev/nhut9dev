module.exports = {
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	tabWidth: 2,
	printWidth: 80,
	bracketSpacing: true,
	arrowParens: 'always',
	endOfLine: 'auto',

	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'^@biso24',
		'^@/(components|constants|hooks|stores|lib|utils)',
		'^[./]',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
