<script lang="ts">
	let { children } = $props();
</script>

<div class="p-3">
	{@render children?.()}
</div>
