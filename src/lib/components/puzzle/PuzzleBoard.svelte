<script lang="ts">
	import { type DragDropState } from '@thisux/sveltednd';
	import type { PuzzleLetter, PuzzleSlot } from '$lib/stores/puzzle.svelte';
	import DropSlots from './DropSlots.svelte';
	import LetterPool from './LetterPool.svelte';

	interface Props {
		emoji: string;
		pool: PuzzleLetter[];
		slots: PuzzleSlot[];
		shakeIndex: number | null;
		isCelebrating?: boolean;
		onDrop: (state: DragDropState<PuzzleLetter>) => void;
		onReturnToPool: (state: DragDropState<PuzzleLetter>) => void;
		onCelebrationComplete?: () => void;
	}

	const {
		emoji,
		pool,
		slots,
		shakeIndex,
		isCelebrating = false,
		onDrop,
		onReturnToPool,
		onCelebrationComplete
	}: Props = $props();
</script>

<div data-puzzle-board>
	<div class="game-emoji">{emoji}</div>

	<DropSlots {slots} {shakeIndex} {isCelebrating} {onDrop} {onCelebrationComplete} />

	<LetterPool letters={pool} {onReturnToPool} />
</div>
