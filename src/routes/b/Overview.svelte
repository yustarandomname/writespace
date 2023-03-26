<script lang="ts">
	import type { TextBlocks } from '$lib/TextBlock';

	export let blocks: TextBlocks;
</script>

{#each blocks as block}
	<div class="border-l-2 border-red-100 block px-1 my-1">
		<a href="#{block.id}" class="text-sky-100 no-underline">
			{block.title}
		</a>
	</div>

	{#if block.children}
		<svelte:self blocks={block.children} />
	{/if}
{/each}
