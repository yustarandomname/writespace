<script lang="ts">
	import NewBlock from './NewBlock.svelte';

	import type { Block, Heading } from './TextBlock';

	export let block: Heading;

	let blockInEdit: Block | null = null;

	function addHeading() {
		blockInEdit = block.addHeading('');
	}

	function addParagraph() {
		blockInEdit = block.addParagraph('');
	}
</script>

<NewBlock
	{block}
	bind:blockInEdit
	on:addHeading={addHeading}
	on:addParagraph={addParagraph}
	on:update
/>
