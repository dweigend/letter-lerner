<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let {
		error = null,
		success = false
	}: {
		error?: string | null;
		success?: boolean;
	} = $props();
</script>

<div class="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm">
	<h2 class="mb-4 text-xl font-bold text-slate-700">Neues Wort hinzufügen</h2>

	<form method="POST" action="?/add" use:enhance class="space-y-4">
		<div class="flex flex-col gap-2">
			<label for="word" class="text-sm font-medium text-slate-600">Wort</label>
			<input
				type="text"
				id="word"
				name="word"
				required
				placeholder="z.B. HUND"
				class="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="emoji" class="text-sm font-medium text-slate-600">Emoji</label>
			<input
				type="text"
				id="emoji"
				name="emoji"
				required
				placeholder="z.B. 🐕"
				class="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
			/>
		</div>

		{#if error}
			<p class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
		{/if}

		{#if success}
			<p class="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600">
				Wort erfolgreich hinzugefügt!
			</p>
		{/if}

		<button
			type="submit"
			class="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:bg-pink-600 hover:shadow-xl"
		>
			<Plus class="h-5 w-5" />
			<span>Hinzufügen</span>
		</button>
	</form>
</div>
