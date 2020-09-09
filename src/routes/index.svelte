<script>
import {a} from './example'
export let dest: string = 'world'
</script>

<style>
	.centerer {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>

<div class="centerer">
	<h1>Hello {dest}, magic number is {a}</h1>
</div>