<script lang="ts">
	import type { Chapter } from '$lib/TextBlock';
	import { Button, Chevron, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let chapter: Chapter;

	const dispatch = createEventDispatcher();

	let removeChapterPopup = false;
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

<div class="relative">
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-green-400 pl-4 pr-2 py-1">
			<div class="font-medium">Chapter</div>

			<!-- Actions -->
			<div class="flex gap-2">
				<Button><Chevron>Move item</Chevron></Button>
				<Dropdown>
					<DropdownItem>Up</DropdownItem>
					<DropdownItem>Down</DropdownItem>
				</Dropdown>

				<Button><Chevron>Change item</Chevron></Button>
				<Dropdown>
					<DropdownItem>Section</DropdownItem>
					<DropdownItem>Paragraph</DropdownItem>
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

	<div class="absolute left-0 top-0 h-full w-2 rounded bg-green-400" />

	<div class="flex justify-center">
		<Button color="green">+ Add Section</Button>
	</div>

	<slot />
</div>
