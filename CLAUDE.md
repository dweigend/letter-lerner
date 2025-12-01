# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Annelies Schreib-Spass" is a German spelling game for children built with SvelteKit 2 and Svelte 5. Children type letters (via on-screen QWERTZ keyboard or physical keyboard) to spell German words shown with emoji hints. The game provides visual feedback (green/red key flashes, shake animations) and celebrates success with dancing letters and confetti.

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

## Project Structure

```
src/
├── lib/
│   ├── animations/
│   │   └── gsap.ts               # GSAP animation functions
│   ├── components/
│   │   ├── admin/
│   │   │   ├── WordForm.svelte   # Add/edit word form
│   │   │   └── WordList.svelte   # Display word list
│   │   ├── game/
│   │   │   ├── GameBoard.svelte  # Emoji + word display
│   │   │   ├── LetterSlot.svelte # Single letter slot
│   │   │   ├── ProgressBar.svelte# Progress header
│   │   │   └── WordSlots.svelte  # Letter slots container
│   │   └── keyboard/
│   │       ├── Keyboard.svelte   # QWERTZ keyboard
│   │       └── KeyButton.svelte  # Single key
│   ├── data/
│   │   └── words.json            # Word list (editable via admin)
│   ├── stores/
│   │   ├── game.svelte.ts        # Game state with context
│   │   └── words.svelte.ts       # Words store
│   ├── data.ts                   # Keyboard layout constants
│   └── types.ts                  # TypeScript interfaces
├── routes/
│   ├── +page.svelte              # Main game page
│   ├── +page.server.ts           # Load words from JSON
│   └── admin/
│       ├── +page.svelte          # Admin UI
│       └── +page.server.ts       # CRUD actions for words
└── app.css                       # Tailwind + base styles
```

## Architecture

### State Management

Game state uses Svelte 5 runes with context pattern (`src/lib/stores/game.svelte.ts`):

- `$state()` for reactive properties (index, input, shakeIndex, celebrationPhase)
- Getter functions for derived values (word, emoji, isComplete, progress)
- Context API for component access: `setGameContext()` / `getGameContext()`

### Animations (GSAP)

All animations are centralized in `src/lib/animations/gsap.ts`:

- `shakeElement()` - Error shake on wrong input
- `dropLetter()` - Letter drop animation on correct input
- `floatEmoji()` - Floating emoji animation
- `keySuccess()` / `keyError()` - Key feedback animations
- `celebrateLetter()` - Individual letter dance
- `celebrateAll()` - Full celebration sequence with confetti
- `triggerConfetti()` - Confetti effect

### Success Flow

1. Word complete → `game.startCelebration()`
2. Letters dance and blink with colors (GSAP timeline)
3. Confetti triggered
4. After animation → `game.endCelebration()` → next word

### Data Management

- Words stored in `src/lib/data/words.json`
- Loaded server-side via `+page.server.ts`
- Admin page at `/admin` for CRUD operations
- Form actions handle add/delete/update

## Routes

- `/` - Main game
- `/admin` - Word list management (no auth)

## Tech Stack

- SvelteKit 2 with Svelte 5 (runes)
- TypeScript
- GSAP for animations
- Tailwind CSS 4
- canvas-confetti for celebration effects
- lucide-svelte for icons
- Vitest + Playwright for testing
- ESLint + Prettier for linting
