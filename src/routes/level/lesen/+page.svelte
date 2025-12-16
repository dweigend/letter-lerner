<script lang="ts">
	import type { PageData } from './$types';
	import { createReadingGame, setReadingContext } from '$lib/stores/reading.svelte';
	import ProgressBar from '$lib/components/game/ProgressBar.svelte';
	import ReadingBoard from '$lib/components/reading/ReadingBoard.svelte';

	let { data }: { data: PageData } = $props();

	const game = createReadingGame(data.words);
	setReadingContext(game);

	function handleSelect(optionId: string) {
		if (game.celebrationPhase) return;
		game.handleSelection(optionId);
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
		<ReadingBoard
			word={game.word}
			options={game.options}
			selectedId={game.selectedId}
			shakeId={game.shakeId}
			isCelebrating={game.celebrationPhase}
			onSelect={handleSelect}
			onCelebrationComplete={handleCelebrationComplete}
		/>
	</main>
</div>
