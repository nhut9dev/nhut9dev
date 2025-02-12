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
		'^@(app|components|config|constants|hooks|lib|models|scripts|stores|utils)',
		'^[@/]',
		'^[./]',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
