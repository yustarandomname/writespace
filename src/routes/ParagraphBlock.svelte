<script lang="ts">
	import AbstractParagraph from '$lib/AbstractParagraph.svelte';
	import Modal from '$lib/Modal.svelte';
	import type { Paragraph } from '$lib/TextBlock';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let block: Paragraph;

	const dispatch = createEventDispatcher();
	let showEditor = false;
</script>

<div out:fly={{ x: 200 }}>
	<AbstractParagraph {block} on:click={() => (showEditor = true)}>
		<svelte:fragment slot="actions">
			<Button color="blue" on:click={() => (showEditor = true)}>Edit</Button>
		</svelte:fragment>
	</AbstractParagraph>
</div>

<Modal bind:show={showEditor}>
	<AbstractParagraph {block} let:resize let:resizeInit>
		<svelte:fragment slot="actions">
			<Button color="red" on:click={() => dispatch('delete')}>Delete</Button>
			<Button color="green" on:click={() => (showEditor = false)}>Save & Close</Button>
		</svelte:fragment>

		<textarea
			class="w-[40rem] overflow-hidden resize-none border-none rounded-b"
			rows="1"
			use:resizeInit
			on:keydown={resize}
			on:keyup={resize}
			bind:value={block.text}
			placeholder="Enter paragraph content"
		/>
	</AbstractParagraph>
</Modal>
