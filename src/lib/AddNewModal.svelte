<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Modal from './Modal.svelte';
	import type { Block } from './TextBlock';

	export let showNewEditor: Block | null = null;
	export let level = 0;
</script>

<Modal show={showNewEditor != null}>
	<p class="bg-sky-100/80 text-center rounded mb-4 p-2 text-lg">
		What do you want to insert {level}
	</p>

	<div class="flex gap-2 flex-col">
		{#if level == 0}
			<div class="bg-sky-100 hover:bg-sky-400 button">Chapter</div>
		{:else if level == 1}
			<div class="bg-green-100 hover:bg-green-400 button">Section</div>
		{:else if level == 2}
			<div class="bg-orange-100 hover:bg-orange-400 button">Sub-Section</div>
		{/if}
		<div class="bg-yellow-100 hover:bg-yellow-300 button">Paragraph</div>
	</div>
	<div class="flex justify-center mt-4">
		<Button color="red" on:click={() => (showNewEditor = null)}>Cancel</Button>
	</div>
</Modal>

<style lang="postcss">
	.button {
		@apply h-20 w-[40rem] p-4 rounded cursor-pointer;
	}
</style>
