<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import type { WordItem } from '$lib/types';

	let { words }: { words: WordItem[] } = $props();
</script>

<div class="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm">
	<h2 class="mb-4 text-xl font-bold text-slate-700">Wortliste ({words.length} Wörter)</h2>

	{#if words.length === 0}
		<p class="text-slate-500">Noch keine Wörter vorhanden.</p>
	{:else}
		<ul class="space-y-2">
			{#each words as item (item.word)}
				<li
					class="flex items-center justify-between rounded-xl bg-white/80 px-4 py-3 shadow-sm transition-all hover:shadow-md"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">{item.emoji}</span>
						<span class="font-semibold text-slate-700">{item.word}</span>
					</div>
					<form method="POST" action="?/delete">
						<input type="hidden" name="word" value={item.word} />
						<button
							type="submit"
							class="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
							title="Wort löschen"
						>
							<Trash2 class="h-5 w-5" />
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>
