<script lang="ts">
	import MenuBar from '$lib/MenuBar.svelte';
	import { Heading } from '$lib/TextBlock';
	import HeadingBlock from '../HeadingBlock.svelte';
	import Overview from '../Overview.svelte';

	let block: Heading = new Heading('', 0);
</script>

<MenuBar />

<div class="flex gap-8 my-12 justify-center">
	<div class="relative w-72 print:hidden">
		<div class="overview fixed rounded-lg w-72 bg-slate-700 min-h-[20rem] prose p-4">
			<h2 class="text-sky-100">Overview</h2>
			<div class="w-full">
				<Overview blocks={block.children} nested />
			</div>
		</div>
	</div>

	<div class="content max-w-3xl w-full">
		<HeadingBlock bind:block nested />
	</div>
</div>
