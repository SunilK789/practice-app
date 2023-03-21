<script>
	import { setContext } from 'svelte';
    import formKey from '../Form/form-key'

	export let initialValues;

    console.log("formKey: ",formKey)
	setContext(formKey, { values: initialValues, error: {} });
</script>

<form>
	<slot />
</form>
