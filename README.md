# Sapper Typescript ESBuild

This is a minimal Sapper project template, inspired by [@babichjacob](https://github.com/babichjacob)'s [`sapper-typescript-graphql-template`](https://github.com/babichjacob/sapper-typescript-graphql-template), which uses `@rollup/plugin-typescript` and `@rollup/plugin-babel`, which are ditched in favor of `rollup-plugin-esbuild` in this template to increase performance, while `tsc` and `svelte-check` will type-check source files in parallel.

### Getting started

```bash
npm install
npm run dev
```

### Export

```bash
npm run export
```

### Caveats

- Server code minification is disabled if using Sapper `0.28.1` or newer, due to a known issue with ESBuild ([#3](https://github.com/tommywalkie/sapper-typescript-esbuild-template/issues/3)).

- Normal comments inside `<script>` tags in `.svelte` files are treated as docstrings by `svelte-check`, leading to type errors (`'render' implicitly has return type 'any' because [...]`), except the [first comment](https://github.com/jasonlyu123/language-tools/blob/a7b1b51d1adbb17b07e59e085a057ea90278bd4e/packages/svelte2tsx/src/svelte2tsx/nodes/ExportedNames.ts#L56-L59).
