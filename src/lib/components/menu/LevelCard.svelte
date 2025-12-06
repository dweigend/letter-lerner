<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Level } from '$lib/stores/levels';

	let { level }: { level: Level } = $props();
</script>

{#if level.disabled}
	<div data-level-card data-disabled>
		<span data-level-emoji>{level.emoji}</span>
		<span data-level-name>{level.name}</span>
		<span data-level-description>{level.description}</span>
		<span data-level-badge>Bald</span>
	</div>
{:else}
	<Button.Root data-level-card href={level.route}>
		<span data-level-emoji>{level.emoji}</span>
		<span data-level-name>{level.name}</span>
		<span data-level-description>{level.description}</span>
	</Button.Root>
{/if}
