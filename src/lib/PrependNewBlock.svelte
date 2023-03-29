<script lang="ts">
	import NewBlock from './NewBlock.svelte';
	import type { Block, Heading } from './TextBlock';

	export let within: Heading;
	export let before: Block;

	let blockInEdit: Block | null = null;

	function addHeading() {
		blockInEdit = within.addHeadingBefore('', before);
	}

	function addParagraph() {
		blockInEdit = within.addParagraphBefore('', before);
	}
</script>

<NewBlock
	block={within}
	bind:blockInEdit
	on:addHeading={addHeading}
	on:addParagraph={addParagraph}
	on:update
/>
