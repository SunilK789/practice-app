<script>
	import { onMount, onDestroy, getContext } from 'svelte';
	import Konva from 'konva';
	import { layerKey } from './context-Keys';

	export let x = undefined;
	export let y = undefined;
	export let width = undefined;
	export let height = undefined;
	export let fill = undefined;
	export let stroke = undefined;
	export let strokeWidth = undefined;

	const rect = new Konva.Rect({
		x,
		y,
		width,
		height,
		fill,
		stroke,
		strokeWidth
	});

	const layer = getContext(layerKey);

	layer.add(rect);

     onDestroy(() => {
		if (rect) rect.destroy();
	});
</script>
