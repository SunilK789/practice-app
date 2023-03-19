<svelte:options immutable={true} />

<script>
	import { createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import IoIosTrash from 'svelte-icons/io/IoIosTrash.svelte';
  import Button from './Button.svelte';

	onMount(() => {});
	onDestroy(() => {});
	beforeUpdate(() => {});
	afterUpdate(() => {
		if (autoScroll) listDiv.scrollTo(0, listDiv.scrollHeight);
		autoScroll = false;
	});

	const dispatch = createEventDispatcher();

	export let todos = [];
	let input, listDiv, autoScroll;
	let prevTodo = todos;
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
			id
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
		{#if todos.length === 0}
			<p class="no-item-text">Nothing to display, please add an item!</p>
		{:else}
			<ul>
				{#each todos as { id, title, completed }, index (id)}
					<!-- {@debug id, title} -->
					<li class:completed>
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
						<button
							class="remove-todo-button"
							aria-label="Remove todo:{title}"
							on:click={() => handleRemoveItems(id)}
						>
							<span style:width="15px" style:display="inline-block"><IoIosTrash /></span></button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<form class="add-todo-from" on:submit|preventDefault={handleAddtodo}>
		<input bind:this={input} bind:value={inputText} />
		<!-- <button disabled={!inputText} class="add-todo-button" type="submit">Add</button> -->
		<Button class="add-todo-button" type="submit" disabled={!inputText}>Add</Button>
	</form>
</div>

<style lang="scss">
	.todo-list-wrapper {
		background-color: #4b4b4b;
		border: 1px solid #4b4b4b;
		.no-item-text {
			margin: 0;
			padding: 15px;
			text-align: center;
		}
		.todo-list {
			max-height: 250px;
			overflow: auto;
			ul {
				margin: 0;
				padding: 10px;
				list-style: none;

				li {
					margin-bottom: 5px;
					display: flex;
					align-items: center;
					background-color: #303030;
					border-radius: 5px;
					padding: 10px;
					position: relative;
					color: #fff;

					&:hover {
						.remove-todo-button {
							display: block;
						}
					}
					&.completed {
						opacity: 0.5;
						text-decoration: line-through;
					}
					label {
						cursor: pointer;
						font-size: 18px;
						display: flex;
						align-items: baseline;
						padding-right: 25px;
						input[type='checkbox'] {
							margin: 0 10px 0 0;
							cursor: pointer;
						}
					}

					.remove-todo-button {
						border: none;
						background-color: none;
						padding: 5px;
						position: absolute;
						right: 10px;
						display: none;

						:global(svg path) {
							fill: #bd1414;
						}
					}
				}
			}
		}

		.add-todo-from{
			padding: 15px;
			background-color: #303030;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #4b4b4b;
			
			// .add-todo-button{
			// 	background-color: red;
			// 	color: #fff;
			// 	border-radius: 5px;
			// 	margin: 0;
			// 	padding: 10px;

			// 	&:disabled{
			// 		cursor: not-allowed;
			// 		opacity: 0.5;
			// 	}
			// }

			input{
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
