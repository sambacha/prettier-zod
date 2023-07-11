## Motivation

Ddeclare our types with Zod in regular JavaScript files and then you can

1. use them at runtime

2. extract them as JSDoc types and use them as hints in your editor.

> You don’t have to compile/transpile/configure anything. The code you write is 100% valid JavaScript you can dump straight into the browser

## Overview

1. Take Prettier Config JSON Schema and convert to `ZOD` format

> https://stefanterdell.github.io/json-schema-to-zod-react

For runtime, you need something like Zod, which lets you write your type schemas, then infer them as Typescript types automatically.

2. Declare your schema with zod

3. Extract the type for typescript

```js
type MainName = z.infer<typeof MainNameSchema>;
```

4. Extract the inferred type as a JSDoc type

```js
/** @typedef { z.infer<typeof MainNameSchema> MainName } */
```

```javascript
// @ts-check

/** "schema": "https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/prettierrc.json", */
// "$schema": "http://json.schemastore.org/prettierrc",
/** @type { import('./prettier.zod').PrettierSchema[] } */
module.exports = {
	arrowParens: "always",
	bracketSpacing: true,
	endOfLine: "lf",
	printWidth: 100,
	proseWrap: "never",
	singleQuote: true,
	tabWidth: 2,
	trailingComma: "all",
	quoteProps: "as-needed",
	semi: true,
	jsxBracketSameLine: false,
	jsxSingleQuote: false,
	overrides: [
		{
			files: "*.md",
			options: {
				parser: "markdown",
				printWidth: 120,
				proseWrap: "never",
				tabWidth: 4,
				useTabs: true,
				singleQuote: false,
				bracketSpacing: true,
			},
		},
	],
};
```

## Acknowledgements

https://github.com/pmuellr  
https://gist.github.com/pmuellr/60668d33049f96ce7323f5eab648f468  
https://blog.jim-nielsen.com/2023/types-in-jsdoc-with-zod/
