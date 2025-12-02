<script lang="ts">
	import { Button } from 'bits-ui';
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

<div class="admin-card">
	<h2 class="admin-title">Neues Wort hinzufügen</h2>

	<form method="POST" action="?/add" use:enhance class="admin-form">
		<div class="flex flex-col gap-2">
			<label for="word" class="admin-label">Wort</label>
			<input
				type="text"
				id="word"
				name="word"
				required
				placeholder="z.B. HUND"
				class="admin-input"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="emoji" class="admin-label">Emoji</label>
			<input
				type="text"
				id="emoji"
				name="emoji"
				required
				placeholder="z.B. 🐕"
				class="admin-input"
			/>
		</div>

		{#if error}
			<p class="admin-message-error">{error}</p>
		{/if}

		{#if success}
			<p class="admin-message-success">Wort erfolgreich hinzugefügt!</p>
		{/if}

		<Button.Root type="submit" data-variant="primary">
			<Plus class="h-5 w-5" />
			<span>Hinzufügen</span>
		</Button.Root>
	</form>
</div>
