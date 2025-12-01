# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Annelies Schreib-Spass" is a German spelling game for children built with SvelteKit 2 and Svelte 5. Children type letters (via on-screen QWERTZ keyboard or physical keyboard) to spell German words shown with emoji hints. The game provides visual feedback (green/red key flashes, shake animations) and celebrates success with confetti.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm check        # TypeScript + Svelte type checking
pnpm lint         # Prettier + ESLint check
pnpm format       # Format with Prettier
pnpm test         # Run all tests once
pnpm test:unit    # Run tests in watch mode
```

## Testing

Vitest with two test projects:

- **client**: Browser tests using Playwright (`*.svelte.{test,spec}.ts`) - for Svelte component testing
- **server**: Node tests (`*.{test,spec}.ts`, excluding `.svelte.*`) - for pure logic

Test config requires assertions (`expect.requireAssertions: true`).

## Architecture

### State Management

Game state is managed via a Svelte 5 runes-based `Game` class (`src/lib/game.svelte.ts`):

- Uses `$state()` for reactive properties (index, input, shakeIndex, key feedback)
- Uses `$derived()` for computed values (current word, completion status, progress)
- Instantiated via `createGame()` factory

### Data

Word list in `src/lib/data.ts` - array of `{word: string, emoji: string}` objects. All words are uppercase German.

### UI Components

Single page app with one route (`+page.svelte`):

- German QWERTZ keyboard layout with umlauts (Ü, Ö, Ä)
- bits-ui for Dialog component
- canvas-confetti for celebration effects
- lucide-svelte for icons
- Glassmorphism design with Tailwind CSS 4

### Styling

- Tailwind CSS 4 with `@tailwindcss/vite` plugin
- Custom animations defined in `src/app.css` (shake, letter-drop, float, key-success, key-error)
- Nunito font family

## Tech Stack

- SvelteKit 2 with Svelte 5 (runes)
- TypeScript
- Tailwind CSS 4
- Vitest + Playwright for testing
- ESLint + Prettier for linting
