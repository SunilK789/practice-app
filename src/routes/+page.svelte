<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { onMount, tick } from 'svelte';
	import { debug } from 'svelte/internal';
	import { fade, fly } from 'svelte/transition';

	let todoList;
	let showHide = true;
	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	let disabledItems = [];

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

		await tick();
		todoList.focusInput();
	}
	async function handlRemoveTodos(event) {
		const id = event.detail.id;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];

		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE'
		}).then(async (response) => {
			if (response.ok) {
				todos = todos.filter((t) => t.id !== event.detail.id);
				todoList.clearInput();
			} else {
				alert('An error has occurred!');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}
	function toggleCheckBox(event) {
		const value = event.detail.value;
		const id = event.detail.id;

		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];

		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				completed: value
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const updatedTodo = await response.json();
				console.log(updatedTodo);
				todos = todos.map((todo) => {
					if (todo.id === id) {
						return updatedTodo;
					}

					return { ...todo };
				});
			} else {
				alert('An error has occurred!');
			}
		});

		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	}
</script>

<label>
	<input type="checkbox" bind:checked={showHide} />
	Show/Hide List
</label>

{#if showHide}
	<div transition:fade={{ delay: 500, duration: 300 }} class="mainDiv" style:max-width="400px">
		<TodoList
			bind:this={todoList}
			{todos}
			{error}
			{isLoading}
			{disabledItems}
			disabelAdding={isAdding}
			on:addtodo={handleAddtodo}
			on:removetodo={handlRemoveTodos}
			on:toggleCheckBox={toggleCheckBox}
		/>
	</div>
	{#if todos}
		<p>
			Total Todos:{#key todos.length}
				<span style:display="inline-block" in:fly|local={{ y: -10 }}> {todos.length}</span>{/key}
		</p>
	{/if}
{/if}

<style>
</style>
