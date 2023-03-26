<script lang="ts">
	import type { Chapter } from '$lib/TextBlock';
	import hardCodedBook from '$lib/hardCodedBook';
	import MenuBar from '../MenuBar.svelte';
	import NestedChapter from './NestedChapter.svelte';
	import NestedOverview from './NestedOverview.svelte';

	let title = 'new page';

	let chapters: Chapter[] = hardCodedBook;

	function deleteChapter(chapter: Chapter) {
		chapters = chapters.filter((c) => c.id !== chapter.id);
	}
</script>

<MenuBar />

<div class="flex gap-8 my-12 justify-center">
	<div class="relative w-72">
		<div class="overview fixed rounded-lg w-72 bg-slate-700 min-h-[20rem] prose p-4">
			<h2 class="text-sky-100">Overview</h2>
			<NestedOverview blocks={chapters} />
		</div>
	</div>

	<div class="content max-w-3xl w-full">
		{#each chapters as chapter (chapter.id)}
			<NestedChapter nested {chapter} on:delete={() => deleteChapter(chapter)} />
		{/each}
	</div>
</div>
