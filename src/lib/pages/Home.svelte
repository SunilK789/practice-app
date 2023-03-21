<script>
	import { Stage, Layer, Rect } from '../konva';

	let container;
	let showConvas = true;
</script>

<div bind:this={container} />

<label>
	<input type="checkbox" bind:checked={showConvas} />
	Show/Hide convas</label
>
{#if showConvas}
	<Stage width={300} height={400}>
		<Layer draggable>
			<Rect x={20} y={20} fill="blue" width={150} height={100} />
		</Layer>
        <Layer>
			<Rect x={50} y={50} fill="aqua" width={100} height={100} />
		</Layer>
         <Layer>
			<Rect x={70} y={70} fill="green" width={50} height={150} />
		</Layer>
	</Stage>
{/if}
