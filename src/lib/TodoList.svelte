<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let todos = [];
	let inputText = '';
	const handleAddtodo = () => {
		const isNotCancelled = dispatch(
			'addtodo',
			{
				title: inputText
			},
			{ cancelable: true }
		);
		if (isNotCancelled) {
			inputText = '';
		}
	};
</script>

<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title }, index (id)}
			{@const number = index + 1}
			<li>{number} - {title}</li>
		{/each}
	</ul>

	<form class="add-todo-form" on:submit|preventDefault={handleAddtodo}>
		<input bind:value={inputText} />
		<button type="submit">Add</button>
		{inputText}
	</form>
</div>
