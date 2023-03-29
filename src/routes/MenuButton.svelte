<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { Icon } from 'mdi-svelte-ts';

	export let icon: string;
	export let title: string;
	export let href: string = '';
</script>

<Button
	class="flex flex-col items-center text-sm cursor-pointer text-sky-100 hover:bg-sky-500/50 p-3 rounded transition-colors bg-transparent"
	on:click
	{href}
>
	<Icon color="#e0f2fe" size={1.5} path={icon} />

	<slot>
		<div>
			{title}
		</div>
	</slot>
</Button>
