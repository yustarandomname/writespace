<script lang="ts">
	export let title: string;
</script>

<div class="rounded my-4 overflow-hidden">
	<div class="flex items-center justify-between pl-4 bg-sky-100 pr-2 py-1">
		<h1 class="font-bold text-3xl">Title</h1>
	</div>

	<input
		type="text"
		bind:value={title}
		placeholder="Enter title"
		class="py-2 px-8 outline-none border-none w-full"
	/>
</div>
