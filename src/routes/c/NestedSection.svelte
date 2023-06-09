<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import { Paragraph, type Section } from './TextBlock';
	import { Button, Chevron, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import NestedParagraph from './NestedParagraph.svelte';

	export let section: Section;
	export let nested = false;

	const dispatch = createEventDispatcher();

	let removeSectionPopup = false;

	function deleteParagraph(paragraph: Paragraph) {
		section.paragraphs = section.paragraphs.filter((p) => p.id !== paragraph.id);
	}

	function prependParToSection() {
		const newParagraph = new Paragraph('');
		section.paragraphs = [newParagraph, ...section.paragraphs];
	}

	/**
	 * Append a new paragraph after the given paragraph
	 */
	function appendParagraphAfter(paragraph: Paragraph) {
		const newParagraph = new Paragraph('');
		const index = section.paragraphs.findIndex((p) => p.id === paragraph.id);
		section.paragraphs = [
			...section.paragraphs.slice(0, index + 1),
			newParagraph,
			...section.paragraphs.slice(index + 1)
		];
	}

	function handleAppendParagraph(e: CustomEvent) {
		appendParagraphAfter(e.detail);
	}
</script>

<!-- Remove Section -->
<Modal bind:open={removeSectionPopup} size="xs" autoclose>
	<div class="text-center prose">
		<h3 class="mb-5 text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this section?
		</h3>
		<Button on:click={() => dispatch('delete')} color="red" class="mr-2">Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>

<div class="relative" id={section.id} out:fly={{ x: 200 }}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-green-400 pl-4 pr-2 py-1">
			<div class="font-medium">Section {section.id}</div>

			<!-- Actions -->
			<div class="flex gap-2">
				<Button><Chevron>Move item</Chevron></Button>
				<Dropdown>
					<DropdownItem on:click={() => notifyNotImplemented('Move up')}>Up</DropdownItem>
					<DropdownItem on:click={() => notifyNotImplemented('Move down')}>Down</DropdownItem>
				</Dropdown>

				<Button color="red" on:click={() => (removeSectionPopup = true)}>Delete</Button>
			</div>
		</div>

		<input
			type="text"
			bind:value={section.title}
			placeholder="Enter section name"
			class="py-2 px-8 outline-none border-none w-full"
		/>
	</div>

	{#if nested}
		<div class="absolute left-0 top-0 h-full w-2 rounded bg-green-400" />
	{/if}

	<div class:nested>
		<div class="flex justify-center">
			<Button color="green" on:click={prependParToSection}>+ Add Paragraph</Button>
		</div>

		{#each section.paragraphs as paragraph (paragraph.id)}
			<NestedParagraph
				on:append={(e) => handleAppendParagraph(e)}
				on:delete={() => deleteParagraph(paragraph)}
				{paragraph}
			/>
		{/each}
	</div>
</div>

<style lang="postcss">
	.nested {
		@apply p-4 pr-0;
	}
</style>
