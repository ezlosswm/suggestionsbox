<script lang="ts">
	let { data } = $props();

	const id = $derived(data.pd);
</script>

<h1>Id: {id}</h1>
