<svelte:options immutable={true} />

<script>
	import { createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import { debug } from 'svelte/internal';

	onMount(() => {
		console.log('Mounted!');
		return () => {
			console.log('Destroyed2');
		};
	});
	onDestroy(() => {
		console.log('Destroyed!');
	});
	beforeUpdate(() => {
		if (listDiv) {
			console.log(listDiv.offsetHeight);
		}
	});
	afterUpdate(() => {
		if (autoScroll) listDiv.scrollTo(0, listDiv.scrollHeight);
		autoScroll = false;
	});

	const dispatch = createEventDispatcher();

	export let todos = [];
	let input, listDiv, autoScroll;
	let prevTodo = todos;
	export const readonly = 'read only';
	export function clearInput() {
		inputText = '';
	}

	export function focusInput() {
		input.focus();
	}

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
		}
	};

	function handleRemoveItems(id) {
		dispatch('removetodo', {
			id: id
		});
	}

	function handleToggleCheckBox(id, value) {
		dispatch('toggleCheckBox', {
			id,
			value
		});
	}

	$: {
		autoScroll = todos.length > prevTodo.length;
	}
</script>

<div class="todo-list-wrapper">
	<div bind:this={listDiv} class="todo-list">
		<ul>
			{#each todos as { id, title, completed }, index (id)}
				<!-- {@debug id, title} -->
				<li>
					<label>
						<input
							on:input={(event) => {
								event.currentTarget.checked = completed;
								handleToggleCheckBox(id, !completed);
							}}
							type="checkbox"
							checked={completed}
						/>
						{title}
					</label>
					<button on:click={() => handleRemoveItems(id)}>Remove</button>
				</li>
			{/each}
		</ul>
	</div>
	<form class="add-todo-form" on:submit|preventDefault={handleAddtodo}>
		<input bind:this={input} bind:value={inputText} />
		<button type="submit">Add</button>
	</form>
</div>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
