<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todos = [
		{ id: uuid(), title: 'Todo 1', completed: true },
		{ id: uuid(), title: 'Todo 2', completed: true },
		{ id: uuid(), title: 'Todo 3', completed: true }
	];

	function handleAddtodo(event) {
		//event.preventDefault();
		todos = [
			...todos,
			{
				id: uuid(),
				title: event.detail.title,
				completed: false
			}
		];

		todos = todos;
		//console.log(event);
	}
	function handlRemoveTodos(event) {
		console.log('Todo id: ', event.detail.id);
		todos = todos.filter(t=>t.id!==event.detail.id);
	}

	$: console.log(todos);
</script>

<h2>{todos.length} Todos</h2>
<TodoList {todos} on:addtodo={handleAddtodo} on:removetodo={handlRemoveTodos} />

<style>
</style>
