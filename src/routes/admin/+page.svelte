<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { resolve } from '$app/paths';
	import { Home, Settings } from 'lucide-svelte';
	import WordList from '$lib/components/admin/WordList.svelte';
	import WordForm from '$lib/components/admin/WordForm.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const homeRoute = resolve('/');
</script>

<div class="min-h-screen p-4">
	<div class="mx-auto max-w-2xl space-y-6">
		<!-- Header -->
		<header
			class="flex items-center justify-between rounded-2xl bg-white/40 px-6 py-4 shadow-lg backdrop-blur-sm"
		>
			<div class="flex items-center gap-3">
				<Settings class="h-7 w-7 text-pink-500" />
				<h1 class="text-2xl font-bold text-slate-700">Admin</h1>
			</div>
			<a
				href={homeRoute}
				class="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-slate-600 shadow-sm transition-all hover:bg-white hover:shadow-md"
			>
				<Home class="h-5 w-5" />
				<span>Zum Spiel</span>
			</a>
		</header>

		<!-- Add Word Form -->
		<WordForm error={form?.error} success={form?.success} />

		<!-- Word List -->
		<WordList words={data.words} />
	</div>
</div>
