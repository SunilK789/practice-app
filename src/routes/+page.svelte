<script>
	import TodoList from '../lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { tick } from 'svelte';
  import Button from '../lib/Button.svelte';

	let todoList;
	let showHide = true;
	let todos = null;

	function loadTodos() {
		return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('An error has occurred!');
			}
		});
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

<label>
	<input type="checkbox" bind:checked={showHide} />
	Show/Hide List
</label>

{#if showHide}
	{#await promise}
	<p>Loading...</p>
	{:then todos}
		<div class="mainDiv" style:max-width="400px">
			<TodoList
				bind:this={todoList}
				{todos}
				on:addtodo={handleAddtodo}
				on:removetodo={handlRemoveTodos}
				on:toggleCheckBox={toggleCheckBox}
			/>
		</div>

		{:catch error}
		<p>{error.message || 'An error occurred!'}</p>
	{/await}

	<Button on:click={()=>{
		promise=loadTodos();
	}}>Refresh</Button>
{/if}

<style>
</style>
