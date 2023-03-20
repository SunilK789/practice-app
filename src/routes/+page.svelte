<script>
	import { onMount } from 'svelte';
	import Head from '../lib/Head.svelte';
	import Home from '../lib/pages/Home.svelte';
	import Settings from '../lib/pages/Settings.svelte';
	let page;

	onMount(onRoutesChange);

	function onRoutesChange() {
		if (window.location.hash) {
			const path = window.location.hash.slice(1);
			if (path === '/') {
				page = 'home';
			} else if (path === '/settings') {
				page = 'settings';
			} else {
				window.location.hash = '/';
			}
		}
	}
</script>

<svelte:window on:hashchange={onRoutesChange} />
<svelte:head>
	<Head />
</svelte:head>

<nav>
	<a href="#/">Home</a>
	<a href="#/settings">Setting</a>
</nav>

{#if page === 'home'}
	<Home />
{:else if page === 'settings'}
	<Settings />
{/if}

<style>
</style>
