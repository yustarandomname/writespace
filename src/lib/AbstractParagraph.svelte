<script lang="ts">
	import type { Paragraph } from '$lib/TextBlock';

	export let block: Paragraph;
</script>

<div class="relative max-w-5xl" id={block.id}>
	<div class="rounded my-4 overflow-hidden">
		<div class="flex items-center justify-between bg-yellow-300 pl-4 pr-2 py-1">
			<div class="font-medium print:hidden">Paragraph</div>

			<!-- Actions -->
			<div class="flex gap-2 print:hidden">
				<slot name="actions" />
			</div>
		</div>

		<slot>
			<button class="w-full rounded-b bg-white p-3 cursor-pointer text-left" on:click>
				<div>
					{block.text}
				</div>
			</button>
		</slot>
	</div>
</div>
