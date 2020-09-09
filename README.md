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

- Normal comments inside `<script>` tags in `.svelte` files affect default exports, leading to type errors (`'render' implicitly has return type 'any' because [...]`) with `svelte-check`, which is a known issue ([sveltejs/language-tools#530](https://github.com/sveltejs/language-tools/issues/530)).
