<script>
	import longpress from '../lib/actions/longpress';
	let showButton = true;
	let duration = 1000;
</script>

<label>
	<input type="checkbox" bind:checked={showButton} /> Toggle
</label>
<input type="range" bind:value={duration} max="10000" step="100" />
{#if showButton}
	<button use:longpress={{ duration: duration }} on:longpress={()=>{alert("pressed")}}>Hello</button>
{/if}

<style>
</style>
