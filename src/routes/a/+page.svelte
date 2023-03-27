<script lang="ts">
	import hardCodedBook from '$lib/hardCodedBook';
	import { isHeading, type Block } from '$lib/TextBlock';
	import HeadingBlock from '../HeadingBlock.svelte';
	import Overview from '../Overview.svelte';
	import ParagraphBlock from '../ParagraphBlock.svelte';
	import TitleBlock from '../TitleBlock.svelte';

	let title = 'new page';

	let blocks: Block[] = hardCodedBook;
</script>

<menubar />

<div class="flex gap-8 my-12 justify-center">
	<div class="relative w-72">
		<div class="overview fixed rounded-lg w-72 bg-slate-700 min-h-[20rem] prose p-4">
			<h2 class="text-sky-100">Overview</h2>
			<Overview {blocks} />
		</div>
	</div>

	<div class="content max-w-3xl w-full">
		<TitleBlock {title} />

		{#each blocks as block (block.id)}
			{#if isHeading(block)}
				<HeadingBlock {block} nested />
			{:else}
				<ParagraphBlock {block} />
			{/if}
		{/each}
	</div>
</div>
