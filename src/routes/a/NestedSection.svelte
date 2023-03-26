<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import type { Paragraph, Section } from '$lib/TextBlock';
	import { Button, Chevron, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import NestedParagraph from './NestedParagraph.svelte';

	export let section: Section;

	const dispatch = createEventDispatcher();

	let removeSectionPopup = false;

	function deleteParagraph(paragraph: Paragraph) {
		section.paragraphs = section.paragraphs.filter((p) => p.id !== paragraph.id);
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

	<div class="absolute left-0 top-0 h-full w-2 rounded bg-green-400" />

	<div class="p-4 pr-0">
		<div class="flex justify-center">
			<Button color="green">+ Add Paragraph</Button>
		</div>

		{#each section.paragraphs as paragraph (paragraph.id)}
			<NestedParagraph on:delete={() => deleteParagraph(paragraph)} {paragraph} />
		{/each}
	</div>
</div>
