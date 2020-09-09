# Sapper Typescript ESBuild

This is a minimal Sapper project template, inspired by ![@babichjacob](https://github.com/babichjacob)'s ![`sapper-typescript-graphql-template`](https://github.com/babichjacob/sapper-typescript-graphql-template), which uses `@rollup/plugin-typescript`, Babel and Terser. Most of these tools are ditched in favor of `rollup-plugin-esbuild` in this template to increase performance and leave the type-checking job to `tsc` in parallel.

### Clone

```bash
git clone https://github.com/tommywalkie/sapper-typescript-esbuild
```

### Fork

Click the `Use this template` button on [this project's GitHub page.

### Install

```bash
npm install
```

### Start

```bash
npm run dev
```

### Export

```bash
npm run export
```

### Caveats

Server code minification is disabled if using Sapper `0.28.1` or newer, due to a known issue with ESBuild ([#3](https://github.com/tommywalkie/sapper-typescript-esbuild-template/issues/3)).
