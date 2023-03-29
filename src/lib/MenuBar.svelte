<script lang="ts">
	import MenuButton from '../routes/MenuButton.svelte';
	import { mdiHome, mdiUndo, mdiRedo, mdiPrinter, mdiAccountPlus } from '@mdi/js';
	import { notifyNotImplemented } from '$lib/stores/notifyStore';
</script>

<div class="flex px-8 py-2 bg-sky-700 items-center justify-between print:hidden">
	<MenuButton icon={mdiHome} title="Home" on:click={() => notifyNotImplemented('Home')} />

	<div class="flex p-4 rounded bg-sky-100 w-96 h-fit" contenteditable>Search...</div>

	<div class="flex gap-1">
		<MenuButton icon={mdiUndo} title="Undo" on:click={() => notifyNotImplemented('Undo')} />
		<MenuButton icon={mdiRedo} title="Redo" on:click={() => notifyNotImplemented('Redo')} />
		<MenuButton
			icon={mdiAccountPlus}
			title="Share"
			on:click={() => notifyNotImplemented('Share')}
		/>
		<MenuButton icon={mdiPrinter} title="Print/export" on:click={() => window?.print()} />
	</div>
</div>
