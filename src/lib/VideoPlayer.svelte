<script context="module">
	let allVideos = new Set();
</script>

<script>
	import { onDestroy, onMount } from 'svelte';

	export let src = undefined;
	export let width;
	export let height;

	let paused = true;
	let video;

	onMount(() => {
		allVideos.add(video);
	});
	onDestroy(() => {
		allVideos.delete(video);
	});
</script>


<video
	bind:this={video}
	class:playing={!paused}
	{src}
	{width}
	{height}
	controls
	muted
	bind:paused
	on:play={() => {
		allVideos.forEach((vid) => {
			if (vid !== video) vid.pause();
		});
	}}
/>

<style>
	video.playing {
		outline: 4px solid #ff3e00;
	}
</style>
