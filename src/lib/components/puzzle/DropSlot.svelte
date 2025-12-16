<script lang="ts">
	import { droppable, type DragDropState } from '@thisux/sveltednd';
	import type { PuzzleLetter, PuzzleSlot } from '$lib/stores/puzzle.svelte';
	import DraggableLetter from './DraggableLetter.svelte';

	interface Props {
		slot: PuzzleSlot;
		isShaking: boolean;
		isCelebrating?: boolean;
		isExiting?: boolean;
		onDrop: (state: DragDropState<PuzzleLetter>) => void;
	}

	const { slot, isShaking, isCelebrating = false, isExiting = false, onDrop }: Props = $props();

	const container = $derived(`slot-${slot.index}`);
	const state = $derived(slot.letter ? 'filled' : 'empty');
	const animationDelay = $derived(slot.index * 0.1);
</script>

<div
	use:droppable={{ container, callbacks: { onDrop } }}
	data-puzzle-slot
	data-state={state}
	data-shaking={isShaking}
>
	{#if slot.letter}
		<DraggableLetter
			letter={slot.letter}
			{container}
			{isCelebrating}
			{isExiting}
			{animationDelay}
		/>
	{:else}
		<div class="slot-placeholder" data-error={isShaking}></div>
	{/if}
</div>
