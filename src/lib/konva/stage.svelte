<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import Konva from 'konva';
	import { stageKey } from './context-Keys';

	let container;
	let stage;

	export let width;
	export let height;

	setContext(stageKey, {
		getStage: () => stage
	});

	onMount(() => {
		stage = new Konva.Stage({
			container,
			width,
			height
		});
	});

	onDestroy(() => {
		if (stage) stage.destroy();
	});
</script>

<div bind:this={container}>
	{#if stage}
		<slot />
	{/if}
</div>
