<script lang="ts">
	import { isHeading, type Block } from '$lib/TextBlock';

	export let blocks: Block[];
</script>

{#each blocks as block (block.id)}
	{#if isHeading(block)}
		<h1 class="text-sky-100">{block.text}</h1>
	{:else}
		<h1 class="text-yellow-100">{block.text}</h1>
	{/if}
{/each}
