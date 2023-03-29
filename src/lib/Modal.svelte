<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let show = false;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
		show = false;
	}
</script>

{#if show}
	<div
		class="fixed h-full w-full bg-slate-900/30 top-0 left-0 z-10 flex justify-center items-center backdrop-blur"
		on:click={close}
		on:keydown
		transition:fade={{ duration: 100 }}
	>
		<div on:click|stopPropagation on:keydown|stopPropagation>
			<slot />
		</div>
	</div>
{/if}
