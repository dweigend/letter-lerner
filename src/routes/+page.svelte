<script lang="ts">
	import type { PageData } from './$types';
	import { createGame, setGameContext } from '$lib/stores/game.svelte';
	import ProgressBar from '$lib/components/game/ProgressBar.svelte';
	import GameBoard from '$lib/components/game/GameBoard.svelte';
	import Keyboard from '$lib/components/keyboard/Keyboard.svelte';

	let { data }: { data: PageData } = $props();

	const game = createGame(data.words);
	setGameContext(game);

	function handleKeyPress(key: string) {
		if (game.celebrationPhase) return;
		game.handleInput(key);
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
		<GameBoard
			emoji={game.emoji}
			word={game.word}
			input={game.input}
			shakeIndex={game.shakeIndex}
			isCelebrating={game.celebrationPhase}
			onCelebrationComplete={handleCelebrationComplete}
		/>
	</main>

	<Keyboard
		lastPressedKey={game.lastPressedKey}
		lastKeyCorrect={game.lastKeyCorrect}
		onKeyPress={handleKeyPress}
	/>
</div>
