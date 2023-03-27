<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import { isHeading, type Block, type Heading } from '$lib/TextBlock';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import ParagraphBlock from './ParagraphBlock.svelte';

	export let block: Heading;
	export let nested: boolean = false;

	const dispatch = createEventDispatcher();

	function removeBlock(nestedBlock: Block) {
		block.children = block.children.filter((b) => b.id !== nestedBlock.id);
	}
</script>

<div class="relative level{block.level}" id={block.id} out:fly={{ x: 200 }}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between pl-4 background pr-2 py-1">
			<div class="font-medium font-size print:hidden">Chapter at level {block.level}</div>

			<!-- Actions -->
			<div class="flex gap-2 print:hidden">
				<Button color="red" on:click={() => dispatch('delete')}>Delete</Button>
			</div>
		</div>

		<div
			class="py-2 px-8 outline-none border-none w-full bg-white print-size"
			on:click={() => notifyNotImplemented("open chapter's editor")}
			on:keydown
		>
			{block.text}
		</div>
	</div>

	{#if nested}
		<div class="absolute left-0 top-0 h-full w-2 rounded background" />
	{/if}

	<!-- Content -->
	<div class:nested>
		{#each block.children as nestedBlock (nestedBlock.id)}
			{#if isHeading(nestedBlock)}
				<svelte:self on:delete={() => removeBlock(nestedBlock)} bind:block={nestedBlock} {nested} />
			{:else}
				<ParagraphBlock on:delete={() => removeBlock(nestedBlock)} bind:block={nestedBlock} />
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.nested {
		@apply p-4 pr-0;
	}

	/* Level 0 */
	.level0 .background {
		@apply bg-sky-400;
	}

	.level0 .font-size {
		@apply text-2xl;
	}

	/* Level 1 */
	.level1 .background {
		@apply bg-green-400;
	}

	.level1 .font-size {
		@apply text-xl;
	}

	/* Level 2 */
	.level2 .background {
		@apply bg-orange-400;
	}

	.level2 .font-size {
		@apply text-lg;
	}

	@media print {
		.nested {
			@apply p-0;
		}

		.level0 .print-size {
			@apply text-2xl;
		}
		.level1 .print-size {
			@apply text-xl;
		}
		.level2 .print-size {
			@apply text-lg;
		}
	}
</style>
