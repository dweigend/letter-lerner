<script lang="ts">
	import { Button } from 'bits-ui';
	import { Trash2 } from 'lucide-svelte';
	import type { WordItem } from '$lib/types';

	let { words }: { words: WordItem[] } = $props();
</script>

<div class="admin-card">
	<h2 class="admin-title">Wortliste ({words.length} Wörter)</h2>

	{#if words.length === 0}
		<p class="text-slate-500">Noch keine Wörter vorhanden.</p>
	{:else}
		<ul class="space-y-2">
			{#each words as item (item.word)}
				<li class="admin-list-item">
					<div class="admin-list-item-content">
						<span class="admin-list-emoji">{item.emoji}</span>
						<span class="admin-list-word">{item.word}</span>
					</div>
					<form method="POST" action="?/delete">
						<input type="hidden" name="word" value={item.word} />
						<Button.Root type="submit" data-variant="danger" title="Wort löschen">
							<Trash2 class="h-5 w-5" />
						</Button.Root>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>
