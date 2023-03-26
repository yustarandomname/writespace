<script>
	import '../app.postcss';

	import notificationStore from '../lib/stores/notifyStore';
	import { Alert } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex py-4 px-8 items-center justify-between bg-sky-100">
	<img class="h-16" src="Logo.png" alt="logo" />

	<div class="flex gap-4">
		<div>Font-size</div>
		<div>Language</div>
		<div>Account</div>
	</div>
</div>

<slot />

<div class="fixed bottom-0 right-0 flex flex-col gap-4 w-96 max-w-full p-4">
	{#each $notificationStore as notification (notification.id)}
		<div transition:fade>
			<Alert
				color={notification.color}
				dismissable
				on:click={() => notificationStore.delete(notification.id)}
			>
				{notification.message}
			</Alert>
		</div>
	{/each}
</div>
