<script>
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import Konva from 'konva';
	import { stageKey, layerKey } from './context-Keys';

	const { getStage } = getContext(stageKey);
    export let draggable = undefined;

	const stage = getStage();

	//console.log(stage)

	let layer;
	layer = new Konva.Layer({
        draggable
    });
	stage.add(layer);

	setContext(layerKey, layer);

    onDestroy(() => {
		if (layer) layer.destroy();
	});
</script>

<slot />
