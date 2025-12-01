<script lang="ts">
	import { Dialog } from 'bits-ui';
	import confetti from 'canvas-confetti';
	import { Star, Trophy, ArrowRight } from 'lucide-svelte';
	import { createGame } from '$lib/game.svelte';
	import { WORDS, KEYBOARD_ROWS } from '$lib/data';
	import clsx from 'clsx';

	// Initialize Game State
	const game = createGame();

	// Separate state for dialog - shows after confetti
	let showDialog = $state(false);

	// Confetti configuration
	const CONFETTI_DURATION_MS = 3000;
	const DIALOG_DELAY_MS = 1500;
	const CONFETTI_COLORS = ['#ec4899', '#f472b6', '#fbcfe8', '#fdf2f8'];

	function handlePhysicalKey(event: KeyboardEvent) {
		// Allow letters and German umlauts
		if (event.key.length === 1 && event.key.match(/[a-zA-ZäöüÄÖÜß]/)) {
			game.handleInput(event.key);
		}
	}

	// Effect for winning: Confetti first, then dialog
	$effect(() => {
		if (game.isComplete) {
			triggerConfetti();
			setTimeout(() => (showDialog = true), DIALOG_DELAY_MS);
		}
	});

	function triggerConfetti() {
		const end = Date.now() + CONFETTI_DURATION_MS;

		(function frame() {
			confetti({
				particleCount: 3,
				angle: 90,
				spread: 120,
				origin: { x: Math.random(), y: -0.1 },
				gravity: 0.6,
				ticks: 300,
				scalar: 0.8,
				colors: CONFETTI_COLORS,
				drift: Math.random() - 0.5
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}

	function nextLevel() {
		showDialog = false;
		game.nextLevel();
	}
</script>

<svelte:window onkeydown={handlePhysicalKey} />

<div class="flex min-h-screen flex-col items-center justify-between p-4">
	<!-- Header with Glassmorphism -->
	<header
		class="w-full max-w-4xl rounded-2xl border border-white/30 bg-white/50 px-6 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="rounded-full bg-pink-500 p-2 text-white shadow-lg shadow-pink-500/25">
					<Star size={22} fill="currentColor" />
				</div>
				<span class="text-lg font-bold text-slate-700">Annelies Schreib-Spaß</span>
			</div>
			<div class="rounded-full bg-slate-100/80 px-4 py-1.5 text-sm font-semibold text-slate-500">
				Wort {game.index + 1} von {WORDS.length}
			</div>
		</div>
	</header>

	<!-- Game Area -->
	<main class="flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 py-8">
		<!-- The Emoji with floating animation -->
		<div
			class="animate-float cursor-default select-none text-[140px] leading-none drop-shadow-2xl filter"
		>
			{game.emoji}
		</div>

		<!-- Word Slots Container with Glassmorphism -->
		<div
			class="rounded-2xl border border-white/40 bg-white/40 px-8 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm"
		>
			<div class="flex flex-wrap justify-center gap-3">
				{#each game.input as char, i (i)}
					{@const isFilled = char !== ''}

					<div
						class={clsx(
							'flex w-12 flex-col items-center justify-end transition-all duration-200 sm:w-14',
							game.shakeIndex === i && 'animate-shake'
						)}
					>
						<!-- Letter -->
						<span
							class={clsx(
								'flex h-12 items-end justify-center text-4xl font-bold transition-all sm:h-14 sm:text-5xl',
								isFilled ? 'animate-letter-drop text-slate-700' : 'text-transparent'
							)}
						>
							{char || '_'}
						</span>
						<!-- Underscore line -->
						<div
							class={clsx(
								'mt-1 h-1 w-full rounded-full transition-all duration-300',
								game.shakeIndex === i
									? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'
									: isFilled
										? 'bg-pink-400'
										: 'bg-slate-300'
							)}
						></div>
					</div>
				{/each}
			</div>
		</div>
	</main>

	<!-- Virtual Keyboard with Glassmorphism -->
	<div
		class="w-full max-w-3xl rounded-3xl border border-white/30 bg-white/60 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-6"
	>
		<div class="flex w-full flex-col items-center gap-2">
			{#each KEYBOARD_ROWS as row, rowIdx (rowIdx)}
				<div class="flex justify-center gap-1.5 sm:gap-2">
					{#each row as key (key)}
						<button
							onclick={() => game.handleInput(key)}
							class={clsx(
								'flex h-12 w-9 select-none items-center justify-center rounded-xl border border-white/50 text-lg font-semibold text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 active:scale-95 sm:h-14 sm:w-12 sm:text-xl',
								game.lastPressedKey === key && game.lastKeyCorrect === true
									? 'animate-key-success'
									: game.lastPressedKey === key && game.lastKeyCorrect === false
										? 'animate-key-error'
										: 'bg-white/80 hover:bg-white/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
							)}
						>
							{key}
						</button>
					{/each}
				</div>
			{/each}
		</div>
		<!-- Hint text -->
		<p class="mt-4 text-center text-sm text-slate-400">
			Tippe auf die Tasten oder nutze deine Tastatur
		</p>
	</div>
</div>

<!-- Winner Dialog with Glassmorphism -->
<Dialog.Root open={showDialog}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-white/30 bg-white/90 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] outline-none backdrop-blur-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:w-full"
		>
			<div class="flex flex-col items-center space-y-6 py-6 text-center">
				<div class="animate-bounce rounded-full bg-pink-100 p-6 shadow-lg shadow-pink-200/50">
					<Trophy class="h-16 w-16 text-pink-500" />
				</div>

				<div class="space-y-2">
					<Dialog.Title class="text-3xl font-extrabold tracking-tight text-slate-800">
						Super gemacht!
					</Dialog.Title>
					<Dialog.Description class="text-lg text-slate-500">
						Du hast <strong class="text-pink-500">{game.word}</strong> richtig geschrieben!
					</Dialog.Description>
				</div>

				<button
					onclick={nextLevel}
					class="group inline-flex h-14 w-full items-center justify-center rounded-2xl bg-pink-500 px-8 text-lg font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
				>
					<span>Weiter zum nächsten Wort</span>
					<ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
				</button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
