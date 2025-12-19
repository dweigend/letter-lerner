<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Level } from '$lib/stores/levels';
	import { playSound } from '$lib/utils/audio';

	let { level }: { level: Level } = $props();

	function handleClick() {
		playSound('click');
	}

	function handleHover() {
		playSound('click_2');
	}
</script>

{#if level.disabled}
	<div data-level-item data-disabled data-level={level.id}>
		<img src={level.image} alt={level.name} data-level-image />
	</div>
{:else}
	<Button.Root
		data-level-item
		href={level.route}
		data-level={level.id}
		onclick={handleClick}
		onmouseenter={handleHover}
	>
		<img src={level.image} alt={level.name} data-level-image />
	</Button.Root>
{/if}
