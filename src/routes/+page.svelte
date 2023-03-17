<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todos = [
		{ id: uuid(), title: 'Todo 1', completed: true },
		{ id: uuid(), title: 'Todo 2', completed: true },
		{ id: uuid(), title: 'Todo 3', completed: true }
	];

	function handleAddtodo(event){
		event.preventDefault();
		console.log(event);
	}
	
	$: console.log(todos);
</script>

<h2>{todos.length} Todos</h2>
<TodoList {todos} on:addtodo={handleAddtodo} />


<style>
</style>
