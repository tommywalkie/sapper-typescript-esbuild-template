<script context="module">
	export const preload: Function = () => {};
</script>

<script>
	import { stores } from "@sapper/app";
	export let segment: string = "";
	if (segment) {};
	const { page }: any = stores();
	let path: string;
	$: path = $page.path.slice(1);
</script>

<svelte:head>
	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1) : "Index"}
	</title>
</svelte:head>

<slot />