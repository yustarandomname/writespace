<script lang="ts">
	import { isHeading, type Block } from '$lib/TextBlock';

	export let blocks: Block[];
</script>

{#each blocks as block (block.id)}
	{#if isHeading(block)}
		<p class="overview text-sky-100">{block.text}</p>
	{:else}
		<p class="overview text-yellow-100">{block.text}</p>
	{/if}
{/each}

<style lang="postcss">
	.overview {
		@apply text-ellipsis overflow-hidden;
		white-space: nowrap;
	}
</style>
