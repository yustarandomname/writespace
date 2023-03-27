<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import { Section, type Chapter } from './TextBlock';
	import { Button, Chevron, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import NestedSection from '../c/NestedSection.svelte';

	export let chapter: Chapter;
	export let nested = false;

	const dispatch = createEventDispatcher();

	let removeChapterPopup = false;

	function deleteSection(section: Section) {
		chapter.sections = chapter.sections.filter((s) => s.id !== section.id);
	}

	function prependSectionToChapter() {
		const newSection: Section = new Section('', '');

		chapter.sections = [newSection, ...chapter.sections];
	}
</script>

<!-- Remove chapter -->
<Modal bind:open={removeChapterPopup} size="xs" autoclose>
	<div class="text-center prose">
		<h3 class="mb-5 text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this chapter?
		</h3>
		<Button on:click={() => dispatch('delete')} color="red" class="mr-2">Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>

<div class="chapter relative" id={chapter.id} out:fly={{ x: 200 }}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-sky-400 pl-4 pr-2 py-1">
			<div class="font-medium">Chapter {chapter.id}</div>

			<!-- Actions -->
			<div class="flex gap-2">
				<Button><Chevron>Move item</Chevron></Button>
				<Dropdown>
					<DropdownItem on:click={() => notifyNotImplemented('Move up')}>Up</DropdownItem>
					<DropdownItem on:click={() => notifyNotImplemented('Move down')}>Down</DropdownItem>
				</Dropdown>

				<Button color="red" on:click={() => (removeChapterPopup = true)}>Delete</Button>
			</div>
		</div>

		<input
			type="text"
			bind:value={chapter.title}
			placeholder="Enter chapter name"
			class="py-2 px-8 outline-none border-none w-full"
		/>
	</div>

	{#if nested}
		<div class="absolute left-0 top-0 h-full w-2 rounded bg-sky-400" />
	{/if}

	<!-- Content -->
	<div class:nested>
		<div class="flex justify-center">
			<Button color="green" on:click={prependSectionToChapter}>+ Add Section</Button>
		</div>

		{#each chapter.sections as section (section.id)}
			<NestedSection {nested} on:delete={() => deleteSection(section)} {section} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.nested {
		@apply p-4 pr-0;
	}
</style>
