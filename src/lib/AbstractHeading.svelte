<script lang="ts">
	import type { Heading } from '$lib/TextBlock';

	export let block: Heading;
</script>

<div class="relative max-w-5xl" id={block.id}>
	<div class="rounded my-4 overflow-hidden bg-sky-100 level{block.level}">
		<div class="flex items-center justify-between background pl-4 pr-2 py-1">
			<div class="font-medium print:hidden">{block.scope}</div>

			<!-- Actions -->
			<div class="flex gap-2 print:hidden">
				<slot name="actions" />
			</div>
		</div>

		<slot>
			<button class="w-full rounded-b bg-white p-3 cursor-pointer text-left" on:click>
				<div>
					<span class="hidden print:block">{block.numbering}</span>
					{block.text}
				</div>
			</button>
		</slot>
	</div>
</div>

<style lang="postcss">
	/* Level 0 */
	.level1 .background {
		@apply bg-sky-400;
	}

	/* Level 1 */
	.level2 .background {
		@apply bg-green-400;
	}

	/* Level 2 */
	.level3 .background {
		@apply bg-orange-400;
	}
</style>
