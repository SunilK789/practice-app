<script>
	import settings from '../stores/settings';
	import direction from '../stores/direction';
</script>

<h2>Settings</h2>
<button
	on:click={() => {
		settings.toggleColorScheme()
	}}
>
	Toggle color colorSchema</button
>

{$settings.colorScheme}
{$settings.language}
<br />
<button on:click={()=>{
	settings.updateSetting("language",Math.random())
}}>Update language</button>
<br />
<button on:click={()=>{
	settings.reset()
}}>Reset settings</button>
<hr />
{$direction}
<hr />
<label>
  <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="dark" /> Dark
</label>
<label>
  <input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="light" /> Light
</label>

<select bind:value={$settings.language}>
<option value="en">English</option>
<option value="ar">Arabic</option>
</select>