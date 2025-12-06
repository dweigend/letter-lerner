<script lang="ts">
	import { Button } from 'bits-ui';

	let { children } = $props();
</script>

<div class="relative min-h-screen">
	<nav data-level-nav>
		<Button.Root data-variant="back" href="/">
			<span aria-hidden="true">&larr;</span>
			<span>Menu</span>
		</Button.Root>
	</nav>

	{@render children()}
</div>
