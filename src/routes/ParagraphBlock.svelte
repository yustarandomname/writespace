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

	function resize(event: KeyboardEvent) {
		const target = event.target as HTMLTextAreaElement;
		target.style.height = 'auto';
		target.style.height = `${target.scrollHeight}px`;
	}

	function resizeInit(node: HTMLTextAreaElement) {
		node.style.height = 'auto';
		node.style.height = `${node.scrollHeight}px`;
	}
</script>

<div out:fly={{ x: 200 }}>
	<AbstractParagraph {block} on:click={() => (showEditor = true)}>
		<svelte:fragment slot="actions">
			<Button color="red" on:click={() => dispatch('delete')}>Delete</Button>
		</svelte:fragment>
	</AbstractParagraph>
</div>

{#if showEditor}
	<Modal>
		<AbstractParagraph {block}>
			<svelte:fragment slot="actions">
				<Button color="green" on:click={() => (showEditor = false)}>Done</Button>
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
{/if}
