<script>
	export let src = undefined;
	export let width;
	export let height;

	let paused = true;
	let currentTime = 0;
	let volume = 0;
</script>

<video class:playing={!paused} {src} {width} {height} controls muted bind:paused bind:volume bind:currentTime /><br />
<button on:click={()=>{
    paused = !paused;
}}>{paused ? 'Play' : 'Pause'} </button>
<p>{currentTime}</p>
<p>Volume: {volume}</p>


<style>
    video.playing{
        outline: 4px solid #ff3e00;
    }
    </style>