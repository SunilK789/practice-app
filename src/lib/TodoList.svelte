<svelte:options immutable={true} />

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let todos = [];
	let input;
	export const readonly  = "read only";
	export function clearInput(){
		inputText = '';
	}

	export function focusInput(){
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
			// if (isNotCancelled) {
			// 	inputText = '';
			// }
		}
	};

	function handleRemoveItems(id){
		dispatch('removetodo',{
			id:id
		})
	}

	function handleToggleCheckBox(id,value){
		dispatch('toggleCheckBox',{
			id,
			value
		})
	}
</script>

<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title, completed }, index (id)}
			<li>
				<label>
					<input  on:input={(event)=>{
						event.currentTarget.checked = completed;
						handleToggleCheckBox(id, !completed);
						
					}} type="checkbox" checked={completed} />
					{title}
				</label>
				<button on:click={()=>handleRemoveItems(id)}>Remove</button>
			</li>
		{/each}
	</ul>

	<form class="add-todo-form" on:submit|preventDefault={handleAddtodo}>
		<input bind:this={input} bind:value={inputText} />
		<button type="submit">Add</button>		
		
	</form>
</div>
