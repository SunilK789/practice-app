<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todoList;
	let showHide = true;
	let todos = [
		{ id: uuid(), title: 'Todo 1', completed: true },
		{ id: uuid(), title: 'Todo 2', completed: false },
		{ id: uuid(), title: 'Todo 3', completed: true }
	];

	function handleAddtodo(event) {
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

		//todos = todos;
		//console.log(event);
	}
	function handlRemoveTodos(event) {
		//console.log('Todo id: ', event.detail.id);
		todos = todos.filter((t) => t.id !== event.detail.id);
	}
	function toggleCheckBox(event) {
		//console.log('Todo id: ', event.detail.id);
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return { ...todo, completed: event.detail.value };
			}
			return { ...todo };
		});
	}

	//$: console.log(todos);
</script>

<h2>{todos.length} Todos</h2>
<label>
	<input type="checkbox" bind:checked={showHide} />
	Show/Hide List
</label>

{#if showHide}
<TodoList
	bind:this = {todoList}
	{todos}
	on:addtodo={handleAddtodo}
	on:removetodo={handlRemoveTodos}
	on:toggleCheckBox={toggleCheckBox}
/>
{/if}
<style>
</style>
