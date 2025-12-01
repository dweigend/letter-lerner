<script lang="ts">
	import { Dialog } from 'bits-ui';
	import confetti from 'canvas-confetti';
	import { Star, Trophy, ArrowRight } from 'lucide-svelte';
	import { createGame } from '$lib/game.svelte';
	import { WORDS } from '$lib/data';
	import clsx from 'clsx';

	// Initialize Game State
	const game = createGame();

	// German QWERTZ Keyboard Layout with Umlauts
	const ROW1 = 'QWERTZUIOPÜ'.split('');
	const ROW2 = 'ASDFGHJKLÖÄ'.split('');
	const ROW3 = 'YXCVBNM'.split('');

	function handleKey(key: string) {
		game.handleInput(key);
	}

	function handlePhysicalKey(event: KeyboardEvent) {
		// Allow letters and German umlauts
		if (event.key.length === 1 && event.key.match(/[a-zA-ZäöüÄÖÜß]/)) {
			game.handleInput(event.key);
		}
	}

	// Effect for winning
	$effect(() => {
		if (game.isComplete) {
			triggerConfetti();
		}
	});

	function triggerConfetti() {
		const duration = 3000;
		const end = Date.now() + duration;

		(function frame() {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				colors: ['#bb0000', '#ffffff']
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				colors: ['#bb0000', '#ffffff']
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}

	function nextLevel() {
		game.nextLevel();
	}

	// Track virtual keyboard presses for visual feedback could be added here
</script>

<svelte:window onkeydown={handlePhysicalKey} />

<div class="min-h-screen flex flex-col items-center justify-between p-4 max-w-4xl mx-auto">
	<!-- Header -->
	<header class="w-full flex justify-between items-center py-4">
		<div class="flex items-center gap-3">
			<div class="bg-pink-500 p-2 rounded-full text-white">
				<Star size={24} fill="currentColor" />
			</div>
			<span class="text-xl font-bold text-slate-700">Annelies Schreib-Spaß</span>
		</div>
		<div class="text-slate-500 font-medium">
			Wort {game.index + 1} von {WORDS.length}
		</div>
	</header>

	<!-- Game Area -->
	<main class="flex-1 flex flex-col items-center justify-center w-full gap-8 py-8">
		<!-- The Emoji -->
		<div
			class="text-[150px] leading-none filter drop-shadow-xl hover:scale-110 transition-transform duration-300 cursor-default select-none"
		>
			{game.emoji}
		</div>

		<!-- The Word Slots - Simple underscores -->
		<div class="flex flex-wrap gap-4 justify-center">
			{#each game.input as char, i (i)}
				{@const isFilled = char !== ''}

				<div
					class={clsx(
						'w-12 sm:w-16 flex flex-col items-center justify-end transition-all duration-200',
						game.shakeIndex === i && 'animate-shake'
					)}
				>
					<!-- Letter -->
					<span
						class={clsx(
							'text-4xl sm:text-5xl font-bold h-12 sm:h-14 flex items-end justify-center transition-all',
							isFilled ? 'text-slate-700 animate-bounce-in' : 'text-transparent'
						)}
					>
						{char || '_'}
					</span>
					<!-- Underscore line -->
					<div
						class={clsx(
							'w-full h-1 rounded-full mt-1 transition-colors',
							game.shakeIndex === i ? 'bg-red-400' : 'bg-slate-400'
						)}
					></div>
				</div>
			{/each}
		</div>
	</main>

	<!-- Virtual Keyboard -->
	<div class="w-full max-w-3xl bg-slate-100 p-4 sm:p-6 rounded-t-3xl">
		<div class="flex flex-col gap-2 items-center w-full">
			{#each [ROW1, ROW2, ROW3] as row, rowIdx (rowIdx)}
				<div class="flex gap-1.5 sm:gap-2 justify-center">
					{#each row as key (key)}
						<button
							onclick={() => handleKey(key)}
							class="active:scale-95 transition-all active:bg-slate-200 bg-white h-12 sm:h-14 w-9 sm:w-12 rounded-lg shadow-sm font-semibold text-lg sm:text-xl text-slate-600 flex items-center justify-center hover:bg-slate-50 select-none"
						>
							{key}
						</button>
					{/each}
				</div>
			{/each}
		</div>
		<!-- Hint text -->
		<p class="text-center text-slate-400 text-sm mt-4">
			Tippe auf die Tasten oder nutze deine Tastatur
		</p>
	</div>
</div>

<!-- Winner Dialog (Bits UI) -->
<Dialog.Root open={game.isComplete}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg md:w-full outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
		>
			<div class="flex flex-col items-center text-center space-y-6 py-6">
				<div class="bg-yellow-100 p-6 rounded-full animate-bounce">
					<Trophy class="w-16 h-16 text-yellow-500" />
				</div>

				<div class="space-y-2">
					<Dialog.Title class="text-3xl font-black text-purple-600 tracking-tight">
						Super gemacht!
					</Dialog.Title>
					<Dialog.Description class="text-slate-500 text-xl">
						Du hast <strong>{game.word}</strong> richtig geschrieben!
					</Dialog.Description>
				</div>

				<button
					onclick={nextLevel}
					class="group inline-flex h-14 w-full items-center justify-center rounded-xl bg-purple-600 px-8 font-bold text-white transition-all hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-xl"
				>
					<span>Weiter zum nächsten Wort</span>
					<ArrowRight class="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
				</button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
