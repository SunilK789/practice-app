<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { onMount, tick } from 'svelte';
	import Button from '../lib/Button.svelte';

	let todoList;
	let showHide = true;
	let todos = null;
	let error = null;
	let isLoading = false;

	onMount(() => {
		loadTodos();
	});

	async function loadTodos() {
		isLoading = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(async (response) => {
			if (response.ok) {
				todos = await response.json();
			} else {
				error = 'An error has occurred!';
			}
		});

		isLoading = false;
	}

	let promise = loadTodos();

	async function handleAddtodo(event) {
		event.preventDefault();
		todos = [
			...todos,
			{
				id: uuid(),
				title: event.detail.title,
				completed: false
			}
		];
		todoList.clearInput();
	}
	function handlRemoveTodos(event) {
		todos = todos.filter((t) => t.id !== event.detail.id);
	}
	function toggleCheckBox(event) {
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return { ...todo, completed: event.detail.value };
			}
			return { ...todo };
		});
	}
</script>

<label>
	<input type="checkbox" bind:checked={showHide} />
	Show/Hide List
</label>

{#if showHide}
	
	<div class="mainDiv" style:max-width="400px">
		<TodoList
			bind:this={todoList}
			{todos}
			{error}
			{isLoading}
			on:addtodo={handleAddtodo}
			on:removetodo={handlRemoveTodos}
			on:toggleCheckBox={toggleCheckBox}
		/>
	</div>
{/if}

<style>
</style>
