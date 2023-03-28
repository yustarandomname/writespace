<script lang="ts">
	import hardCodedBook from '$lib/hardCodedBook';
	import { isHeading, type Block } from '$lib/TextBlock';
	import HeadingBlock from '../HeadingBlock.svelte';
	import Overview from '../Overview.svelte';
	import ParagraphBlock from '../ParagraphBlock.svelte';
	import TitleBlock from '../TitleBlock.svelte';
	import MenuBar from '$lib/MenuBar.svelte';
	import { Button } from 'flowbite-svelte';
	import AddNewModal from '$lib/AddNewModal.svelte';

	let title = 'new page';
	let blocks: Block[] = hardCodedBook;
	let showNewEditor: Block | null = null;

	function deleteBlock(block: Block) {
		blocks = blocks.filter((b) => b.id !== block.id);
	}

	function showNewEditorFn(block: Block) {
		showNewEditor = block;
		console.log('showNewEditorFn', block);
	}
</script>

<MenuBar />

<div class="flex gap-8 my-12 justify-center">
	<div class="relative w-72 print:hidden">
		<div class="overview fixed rounded-lg w-72 bg-slate-700 min-h-[20rem] prose p-4">
			<h2 class="text-sky-100">Overview</h2>
			<div class="w-full">
				<Overview {blocks} nested />
			</div>
		</div>
	</div>

	<div class="content max-w-3xl w-full">
		<TitleBlock {title} />

		{#each blocks as block (block.id)}
			<Button on:click={() => showNewEditorFn(block)} class="mt-2">+ Add Block</Button>

			{#if isHeading(block)}
				<HeadingBlock on:delete={() => deleteBlock(block)} bind:block nested />
			{:else}
				<ParagraphBlock on:delete={() => deleteBlock(block)} bind:block />
			{/if}
		{/each}
	</div>
</div>

<AddNewModal {showNewEditor} />
