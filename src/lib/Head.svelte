<script>
	import settings from './stores/settings';
</script>

{#if $settings.colorScheme === 'dark'}
	<style>
		:root {
			--backgroundColor: #1d1d1d;
			--textColor: #fff;
		}
	</style>
{:else}
	<style>
		:root {
			--backgroundColor: #ffffff;
			--textColor: #000000;
		}
	</style>
{/if}
