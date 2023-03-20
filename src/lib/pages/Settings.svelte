<script>
	import settings from '../stores/settings';
</script>

<h2>Settings</h2>
<button
	on:click={() => {
		$settings.colorScheme = $settings.colorScheme === 'dark' ? 'light' : 'dark';
	}}
>
	Toggle color colorSchema</button
>

{$settings.colorScheme}
<label>
  <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="dark" /> Dark
</label>
<label>
  <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="light" /> Light
</label>
