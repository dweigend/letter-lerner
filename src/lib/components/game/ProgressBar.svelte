<script lang="ts">
	import { Button, Progress } from 'bits-ui';
	import { Settings, Star } from 'lucide-svelte';

	let {
		currentIndex,
		totalWords
	}: {
		currentIndex: number;
		totalWords: number;
	} = $props();

	const progressPercent = $derived(((currentIndex + 1) / totalWords) * 100);
</script>

<header class="progress-header">
	<div class="progress-title">
		<Star class="h-8 w-8 fill-yellow-400 text-yellow-400" />
		<h1>Letter-Lerner</h1>
	</div>

	<div class="progress-info">
		<Progress.Root value={currentIndex + 1} max={totalWords}>
			<div class="progress-indicator" style="width: {progressPercent}%"></div>
		</Progress.Root>
		<span class="progress-text">
			{currentIndex + 1}/{totalWords}
		</span>
		<Button.Root href="/admin" data-variant="mini">
			<Settings class="h-4 w-4" />
		</Button.Root>
	</div>
</header>
