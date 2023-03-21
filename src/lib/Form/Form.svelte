<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import formKey from '../Form/form-key';
    const dispatch = createEventDispatcher();

	export let initialValues = {};
	const form = writable({ values: initialValues, errors: {} });

	console.log('formKey: ', formKey);
	setContext(formKey, form);
</script>

<pre>
{JSON.stringify($form)}</pre>
<form
	on:submit|preventDefault={() => {
		dispatch('submit', $form.values);
	}}
>
	<slot />
</form>
