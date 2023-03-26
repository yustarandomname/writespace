<script lang="ts">
	import MenuBar from '../MenuBar.svelte';
	import { Alert } from 'flowbite-svelte';
</script>

<MenuBar />

<div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
	</Alert>
</div>
