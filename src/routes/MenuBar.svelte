<script>
	import MenuButton from './MenuButton.svelte';
	import { mdiHome, mdiUndo, mdiRedo, mdiPrinter, mdiAccountPlus } from '@mdi/js';
</script>

<div class="flex px-8 py-2 bg-sky-700 items-center justify-between">
	<MenuButton icon={mdiHome} title="Home" />

	<div class="flex p-4 rounded bg-sky-100 w-96 h-fit" contenteditable>Search...</div>

	<div class="flex gap-1">
		<MenuButton icon={mdiUndo} title="Undo" />
		<MenuButton icon={mdiRedo} title="Redo" />
		<MenuButton icon={mdiAccountPlus} title="Share" />
		<MenuButton icon={mdiPrinter} title="Print/export" />
	</div>
</div>
