<script lang="ts">
	import KeyButton from './KeyButton.svelte';
	import { KEYBOARD_ROWS } from '$lib/data';

	let {
		lastPressedKey,
		lastKeyCorrect,
		onKeyPress
	}: {
		lastPressedKey: string | null;
		lastKeyCorrect: boolean | null;
		onKeyPress: (key: string) => void;
	} = $props();

	function handlePhysicalKeyboard(event: KeyboardEvent) {
		if (event.repeat) return;
		const key = event.key.toUpperCase();
		if (/^[A-ZÜÖÄ]$/.test(key)) {
			onKeyPress(key);
		}
	}
</script>

<svelte:window onkeydown={handlePhysicalKeyboard} />

<div class="flex flex-col items-center gap-2">
	{#each KEYBOARD_ROWS as row, rowIndex (rowIndex)}
		<div class="flex gap-1">
			{#each row as key (key)}
				<KeyButton
					{key}
					isCorrect={lastPressedKey === key && lastKeyCorrect === true}
					isError={lastPressedKey === key && lastKeyCorrect === false}
					onclick={() => onKeyPress(key)}
				/>
			{/each}
		</div>
	{/each}
	<p class="mt-4 text-center text-sm text-slate-500">
		Tippe auf die Buchstaben oder benutze deine Tastatur!
	</p>
</div>
