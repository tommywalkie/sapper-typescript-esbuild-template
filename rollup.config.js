import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import esbuild from 'rollup-plugin-esbuild'
import config from 'sapper/config/rollup'
import sveltePreprocess from 'svelte-preprocess'
import pkg from './package.json'

const defaults = { script: 'typescript' }
const preprocess = [sveltePreprocess({ defaults })]
const mode = process.env.NODE_ENV
const dev = mode === 'development'
const sourcemap = dev ? 'inline' : false
const sapperVersion = pkg.devDependencies.sapper.match(/[0-9]{1,5}/g).map(el => Number(el))

const optimizer = server => esbuild({
    include: /\.[jt]sx?$/,
    minify: server ? (sapperVersion[1] >= 28 && sapperVersion[2] > 0) ? false : true : true,
    target: 'es2017',
    loaders: {
        '.json': 'json'
    }
})

const warningIsIgnored = (warning) => warning.message.includes(
	'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
) || warning.message.includes('Circular dependency: node_modules')

// Workaround for https://github.lcom/sveltejs/sapper/issues/1266
const onwarn = (warning, _onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || warningIsIgnored(warning) || console.warn(warning.toString())

export default {
	client: {
        input: config.client.input().replace(/\.js$/, '.ts'),
		output: config.client.output(),
		plugins: [
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
			svelte({
                preprocess,
				dev,
				hydratable: true,
				emitCss: true,
			}),
			resolve(),
            commonjs(),
            optimizer()
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
        input: {
            server: config.server.input().server.replace(/\.js$/, '.ts')
        },
		output: { ...config.server.output(), sourcemap },
		plugins: [
			replace({
				"process.browser": false,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
			svelte({
                preprocess,
				generate: "ssr",
				dev,
			}),
			resolve(),
            commonjs(),
            optimizer(true)
		],
		external: Object.keys(pkg.dependencies).concat(
			require("module").builtinModules || Object.keys(process.binding("natives")), // eslint-disable-line global-require
		),
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input().replace(/\.js$/, '.ts'),
        output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
			}),
            commonjs(),
            optimizer()
		],
		onwarn,
	},
};