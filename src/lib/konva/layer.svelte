<script>
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import Konva from 'konva';
	import { stageKey, layerKey } from './context-Keys';

	const { getStage } = getContext(stageKey);

	const stage = getStage();

	//console.log(stage)

	let layer;
	layer = new Konva.Layer();
	stage.add(layer);

	setContext(layerKey, layer);
</script>

<slot />
