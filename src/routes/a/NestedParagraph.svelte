<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import type { Paragraph } from '$lib/TextBlock';
	import { Button, Chevron, Dropdown, DropdownItem, Modal } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	export let paragraph: Paragraph;

	const dispatch = createEventDispatcher();

	let removeSectionPopup = false;

	function appendParagraph() {
		notifyNotImplemented('Append paragraph');
	}

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

<div class="relative">
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-yellow-300 pl-4 pr-2 py-1">
			<div class="font-medium">Paragraph</div>

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

		<textarea
			class="w-full overflow-hidden resize-none"
			rows="1"
			use:resizeInit
			on:keydown={resize}
			on:keyup={resize}
			bind:value={paragraph.content}
		/>
	</div>

	<div class="flex justify-center">
		<Button color="green" on:click={appendParagraph}>+ Add Paragraph</Button>
	</div>
</div>
