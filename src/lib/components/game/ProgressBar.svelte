<script lang="ts">
	import { Star } from 'lucide-svelte';

	let {
		currentIndex,
		totalWords
	}: {
		currentIndex: number;
		totalWords: number;
	} = $props();
</script>

<header
	class="flex items-center justify-between rounded-2xl bg-white/40 px-6 py-4 shadow-lg backdrop-blur-sm"
>
	<div class="flex items-center gap-3">
		<Star class="h-8 w-8 fill-yellow-400 text-yellow-400" />
		<h1 class="text-2xl font-bold text-slate-700">Annelies Schreib-Spass</h1>
	</div>
	<div class="text-lg font-semibold text-slate-600">
		Wort {currentIndex + 1} von {totalWords}
	</div>
</header>
