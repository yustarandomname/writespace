<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import AbstractHeading from './AbstractHeading.svelte';
	import AbstractParagraph from './AbstractParagraph.svelte';
	import Modal from './Modal.svelte';
	import { isHeading, type Block, type Heading } from './TextBlock';

	export let block: Heading;
	export let blockInEdit: Block | null = null;

	let showNewEditor = false;

	const dispatch = createEventDispatcher();

	function close() {
		showNewEditor = false;
		blockInEdit = null;
	}

	function save() {
		dispatch('update');
		close();
	}

	function addHeading() {
		dispatch('addHeading');
	}

	function addParagraph() {
		dispatch('addParagraph');
	}
</script>

<Button class="mt-4 print:hidden" on:click={() => (showNewEditor = true)}>
	+ Add Paragraph or {block.childScope} to this {block.scope}
</Button>

<Modal show={showNewEditor} on:close={close}>
	<p class="bg-sky-100/80 text-center rounded mb-4 p-2 text-lg">What do you want to insert</p>
	{#if blockInEdit && isHeading(blockInEdit)}
		<AbstractHeading block={blockInEdit}>
			<svelte:fragment slot="actions">
				<Button color="red" on:click={close}>Delete</Button>
				<Button color="green" on:click={save}>Save</Button>
			</svelte:fragment>

			<input
				class="w-[40rem] overflow-hidden resize-none border-none rounded-b p-3"
				bind:value={blockInEdit.text}
				placeholder="Enter heading content"
			/>
		</AbstractHeading>
	{:else if blockInEdit && !isHeading(blockInEdit)}
		<AbstractParagraph block={blockInEdit} let:resize let:resizeInit>
			<svelte:fragment slot="actions">
				<Button color="red" on:click={close}>Delete</Button>
				<Button color="green" on:click={save}>Save & Close</Button>
			</svelte:fragment>

			<textarea
				class="w-[40rem] overflow-hidden resize-none border-none rounded-b"
				rows="1"
				use:resizeInit
				on:keydown={resize}
				on:keyup={resize}
				bind:value={blockInEdit.text}
				placeholder="Enter paragraph content"
			/>
		</AbstractParagraph>
	{:else}
		<div class="flex gap-2 flex-col">
			{#if block.level == 0}
				<div class="bg-sky-100 hover:bg-sky-400 button" on:click={addHeading} on:keydown>
					Chapter
				</div>
			{:else if block.level == 1}
				<div class="bg-green-100 hover:bg-green-400 button" on:click={addHeading} on:keydown>
					Section
				</div>
			{:else if block.level == 2}
				<div class="bg-orange-100 hover:bg-orange-400 button" on:click={addHeading} on:keydown>
					Sub-Section
				</div>
			{/if}
			<div class="bg-yellow-100 hover:bg-yellow-300 button" on:click={addParagraph} on:keydown>
				Paragraph
			</div>
		</div>
	{/if}
	<div class="flex justify-center mt-4">
		<Button color="red" on:click={close}>Cancel</Button>
	</div>
</Modal>

<style lang="postcss">
	.button {
		@apply h-20 w-[40rem] p-4 rounded cursor-pointer;
	}
</style>
