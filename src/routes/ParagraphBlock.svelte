<script lang="ts">
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
	import type { Paragraph } from '$lib/TextBlock';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let block: Paragraph;

	const dispatch = createEventDispatcher();
</script>

<div class="relative" id={block.id} out:fly={{ x: 200 }}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-yellow-300 pl-4 pr-2 py-1">
			<div class="font-medium print:hidden">Paragraph</div>

			<!-- Actions -->
			<div class="flex gap-2 print:hidden">
				<Button color="red" on:click={() => dispatch('delete')}>Delete</Button>
			</div>
		</div>

		<div
			class="w-full overflow-hidden resize-none border-none rounded-b bg-white p-3 cursor-pointer"
			on:click={() => notifyNotImplemented("open paragraph's editor")}
			on:keydown
		>
			{block.text}
		</div>
	</div>
</div>
