<script>
  import { onMount } from 'svelte';
	import tippy  from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	let button;
	onMount(()=>{
		tippy('.tooltip',{
			content:"this is a tooltip"
		})
		tippy(button,{
			content:"another this is a tooltip"
		})
	})
</script>

<button class="tooltip">Button</button>
<button bind:this={button}>Button</button>
<button class="tooltip" data-tippy-content="Hello">Button</button>
<style>
</style>
