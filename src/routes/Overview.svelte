<script lang="ts">
	import { isHeading, type Block } from '$lib/TextBlock';

	export let blocks: Block[];
	export let nested: boolean = false;
</script>

{#each blocks as block (block.id)}
	{#if isHeading(block)}
		<div class="border-l-2 block px-1 my-1" style="border-color: {block.color}">
			<a href="#{block.id}" class="overview text-sky-100 no-underline block">
				{block.text}
			</a>

			{#if nested && block.children}
				<div class="ml-1">
					<svelte:self blocks={block.children} {nested} />
				</div>
			{/if}
		</div>

		{#if !nested && block.children}
			<svelte:self blocks={block.children} />
		{/if}
	{/if}
{/each}

<style lang="postcss">
	.overview {
		@apply text-ellipsis overflow-hidden;
		white-space: nowrap;
	}
</style>
