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
		<Layer>
			<Rect x={20} y={20} fill="blue" width={150} height={100} />
		</Layer>
	</Stage>
{/if}
