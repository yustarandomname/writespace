<script lang="ts">
	import type { Paragraph } from '$lib/TextBlock';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let block: Paragraph;

	const dispatch = createEventDispatcher();

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

<div class="relative" id={block.id} out:fly={{ x: 200 }}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-yellow-300 pl-4 pr-2 py-1">
			<div class="font-medium">Paragraph</div>

			<!-- Actions -->
			<div class="flex gap-2">
				<Button color="red" on:click={() => dispatch('delete')}>Delete</Button>
			</div>
		</div>

		<textarea
			class="w-full overflow-hidden resize-none border-none rounded-b"
			rows="1"
			use:resizeInit
			on:keydown={resize}
			on:keyup={resize}
			bind:value={block.text}
			placeholder="Enter paragraph content"
		/>
	</div>
</div>
