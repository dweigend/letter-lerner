<script lang="ts">
	import type { PageData } from './$types';
	import { type DragDropState } from '@thisux/sveltednd';
	import { createPuzzleGame, setPuzzleContext, type PuzzleLetter } from '$lib/stores/puzzle.svelte';
	import ProgressBar from '$lib/components/game/ProgressBar.svelte';
	import PuzzleBoard from '$lib/components/puzzle/PuzzleBoard.svelte';

	let { data }: { data: PageData } = $props();

	const game = createPuzzleGame(data.words);
	setPuzzleContext(game);

	function parseSlotIndex(container: string | null | undefined): number | null {
		if (!container?.startsWith('slot-')) return null;
		return parseInt(container.split('-')[1]);
	}

	function handleDrop(state: DragDropState<PuzzleLetter>) {
		if (game.celebrationPhase) return;

		const { draggedItem, targetContainer, sourceContainer } = state;
		if (!draggedItem || !sourceContainer) return;

		const slotIndex = parseSlotIndex(targetContainer);
		if (slotIndex === null) return;

		game.handleDrop(slotIndex, draggedItem, sourceContainer);
	}

	function handleReturnToPool(state: DragDropState<PuzzleLetter>) {
		if (game.celebrationPhase) return;

		const slotIndex = parseSlotIndex(state.sourceContainer);
		if (slotIndex === null) return;

		game.returnToPool(slotIndex);
	}

	function handleCelebrationComplete() {
		game.endCelebration();
	}

	$effect(() => {
		if (game.isComplete && !game.celebrationPhase) {
			game.startCelebration();
		}
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-between gap-6 p-4">
	<ProgressBar currentIndex={game.index} totalWords={game.totalWords} />

	<main class="flex flex-1 flex-col items-center justify-center">
		<PuzzleBoard
			emoji={game.emoji}
			pool={game.pool}
			slots={game.slots}
			shakeIndex={game.shakeSlotIndex}
			isCelebrating={game.celebrationPhase}
			onDrop={handleDrop}
			onReturnToPool={handleReturnToPool}
			onCelebrationComplete={handleCelebrationComplete}
		/>
	</main>
</div>
