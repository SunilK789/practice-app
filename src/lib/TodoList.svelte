<svelte:options immutable={true} />

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let todos = [];
	let inputText = '';
	const handleAddtodo = () => {
		if (inputText !== '') {
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
		}
	};

	function handleRemoveItems(id){
		dispatch('removetodo',{
			id:id
		})
	}
</script>

<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title, completed }, index (id)}
			<li>
				<label>
					<input type="checkbox" checked={completed} />
					{title}
				</label>
				<button on:click={()=>handleRemoveItems(id)}>Remove</button>
			</li>
		{/each}
	</ul>

	<form class="add-todo-form" on:submit|preventDefault={handleAddtodo}>
		<input bind:value={inputText} />
		<button type="submit">Add</button>
		{inputText}
	</form>
</div>
