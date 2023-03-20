<svelte:options immutable={true} />

<script>
	import { createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import IoIosTrash from 'svelte-icons/io/IoIosTrash.svelte';
	import { scale } from 'svelte/transition';
	import Button from './Button.svelte';
	import { flip } from 'svelte/animate';

	export let todos = null;
	export let error = null;
	export let isLoading = null;
	export let disabelAdding = null;
	export let disabledItems = [];
	export let scrollOnAdd = undefined;

	$: done = todos ? todos.filter((t) => t.completed) : [];
	$: todo = todos ? todos.filter((t) => !t.completed) : [];

	let input, listDiv, autoScroll, listDivScrollHeight;
	let prevTodo = todos;

	onMount(() => {});
	onDestroy(() => {});
	beforeUpdate(() => {});

	const dispatch = createEventDispatcher();

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
		autoScroll = todos && prevTodo && todos.length > prevTodo.length;
	}
	afterUpdate(() => {
		if (scrollOnAdd) {
			let pos;
			if (scrollOnAdd === 'top') pos = 0;
			if (scrollOnAdd === 'bottom') pos = listDivScrollHeight;
			if (autoScroll) listDiv.scrollTo(0, pos);
			autoScroll = false;
		}
	});
</script>

<div class="todo-list-wrapper">
	{#if isLoading}
		<p class="no-item-text">Loading...</p>
	{:else if error}
		<p class="no-item-text">{error}</p>
	{:else if todos}
		<div bind:this={listDiv} class="todo-list">
			<div bind:offsetHeight={listDivScrollHeight}>
				{#if todos.length === 0}
					<p class="no-item-text">Nothing to display, please add an item!</p>
				{:else}
					<div style="display:flex">
						{#each [todo, done] as list, index}
							<div class="list-wrapper">
								<h2>{index === 0 ? 'Todo' : 'Done'}</h2>
								<ul>
									{#each list as { id, title, completed }, index (id)}
										<!-- {@debug id, title} -->
										<li animate:flip>
											<div transition:scale|local={{ start: 0.5 }} class:completed>
												<label>
													<input
														disabled={disabledItems.includes(id)}
														on:input={(event) => {
															event.currentTarget.checked = completed;
															handleToggleCheckBox(id, !completed);
														}}
														type="checkbox"
														checked={completed}
													/>
													{title}
												</label>
											</div>
											<button
												disabled={disabledItems.includes(id)}
												class="remove-todo-button"
												aria-label="Remove todo:{title}"
												on:click={() => handleRemoveItems(id)}
											>
												<span style:width="15px" style:display="inline-block"><IoIosTrash /></span
												></button
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<form class="add-todo-from" on:submit|preventDefault={handleAddtodo}>
		<input disabled={disabelAdding} bind:this={input} bind:value={inputText} />
		<Button class="add-todo-button" type="submit" disabled={!inputText || disabelAdding}>Add</Button
		>
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
			max-height: 400px;
			overflow: auto;

			.list-wrapper {
				padding: 10px;
				flex: 1;
				h2 {
					margin: 0 0 10px 40px;
				}
				ul {
					margin: 0;
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

						:disabled {
							cursor: not-allowed;
							opacity: 0.4;
						}
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
						.completed {
							opacity: 0.5;
							text-decoration: line-through;
						}

						.remove-todo-button {
							border: none;
							background-color: none;
							padding: 5px;
							position: absolute;
							right: 10px;
							display: none;

							:disabled {
								cursor: not-allowed;
								opacity: 0.4;
							}

							:global(svg path) {
								fill: #bd1414;
							}
						}
					}
				}
			}
		}

		.add-todo-from {
			padding: 15px;
			background-color: #303030;
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #4b4b4b;

			input {
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;

				:disabled {
					cursor: not-allowed;
					opacity: 0.4;
				}
			}
		}
	}
</style>
