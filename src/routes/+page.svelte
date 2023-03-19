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
	let isAdding = false;

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
		isAdding = true;
		await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify({
				title: event.detail.title,
				completed: false
			}),
			headers: {
				'Content-type': 'application/json;charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const todo = await response.json();
				todos = [...todos, { ...todo, id: uuid() }];
				todoList.clearInput();
			} else {
				alert('An error has occurred!');
			}
		});

		isAdding = false;

		await tick()
		todoList.focusInput();
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
			disabelAdding={isAdding}
			on:addtodo={handleAddtodo}
			on:removetodo={handlRemoveTodos}
			on:toggleCheckBox={toggleCheckBox}
		/>
	</div>
{/if}

<style>
</style>
