<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todoList;
	let todos = [
		{ id: uuid(), title: 'Todo 1', completed: true },
		{ id: uuid(), title: 'Todo 2', completed: false },
		{ id: uuid(), title: 'Todo 3', completed: true }
	];

	function handleAddtodo(event) {
		event.preventDefault();
		setTimeout(() => {
			todos = [
				...todos,
				{
					id: uuid(),
					title: event.detail.title,
					completed: false
				}
			];
		}, 1000);
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

<TodoList
	bind:this = {todoList}
	{todos}
	on:addtodo={handleAddtodo}
	on:removetodo={handlRemoveTodos}
	on:toggleCheckBox={toggleCheckBox}
/>
<button on:click={()=>{todoList.focusInput()}}>Focus Input</button>

<style>
</style>
