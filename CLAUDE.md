# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

"Annelies Schreib-Spass" is a German spelling game for children built with SvelteKit 2 and Svelte 5. Children type letters to spell German words shown with emoji hints. The game provides visual feedback and celebrates success with bouncing letters and confetti.

## Commands

```bash
bun dev          # Start dev server
bun build        # Production build
bun check        # TypeScript + Svelte type checking
bun lint         # Prettier + ESLint check
bun format       # Format with Prettier
```

## Core Rules

### 1. Always use bits-ui components

```svelte
// CORRECT import {(Button, Progress)} from 'bits-ui';
<Button.Root>Click</Button.Root>

// WRONG - no native HTML buttons
<button>Click</button>
```

### 2. All styles in app.css (no inline classes)

```svelte
// CORRECT - only data-attributes
<Button.Root data-variant="key">A</Button.Root>

// WRONG - inline Tailwind
<Button.Root class="bg-pink-500 px-4">A</Button.Root>
```

### 3. Style via data-attributes

```css
/* app.css */
[data-button-root][data-variant='key'] {
	@apply h-12 w-9 rounded-xl bg-white/80;
}
```

## Architecture

### Animation System (CSS-first)

All animations are CSS-based with configurable variables in `app.css`:

```css
:root {
	--anim-bounce: 1.5s; /* Celebration bounce duration */
	--anim-exit: 0.6s; /* Exit animation duration */
	--anim-shake: 0.4s; /* Error shake duration */
	--bounce-height-max: -50px;
	--color-success: #22c55e;
	--color-error: #ef4444;
}
```

**CSS Animations:**

- `spring-bounce` - Celebration with squash & stretch
- `jump-away` - Exit animation (letters jump into nothing)
- `shake` - Error feedback

**GSAP (minimal):**

- `floatEmoji()` - Floating emoji animation
- `triggerConfetti()` - Celebration confetti

### Component Structure

```
src/lib/components/
├── game/
│   ├── LetterSlot.svelte   # Letter + underline (minimal UI)
│   ├── WordSlots.svelte    # Letter container + celebration logic
│   ├── GameBoard.svelte    # Emoji + word display
│   └── ProgressBar.svelte  # Progress header
└── keyboard/
    ├── Keyboard.svelte     # QWERTZ keyboard
    └── KeyButton.svelte    # Key with feedback state
```

### State Management

Svelte 5 runes with context pattern (`src/lib/stores/game.svelte.ts`):

- `$state()` for reactive properties
- `$derived()` for computed values
- Context API: `setGameContext()` / `getGameContext()`

### Celebration Flow

1. Word complete → `isCelebrating = true`
2. Letters bounce (CSS `spring-bounce`, staggered)
3. Confetti triggered
4. After `CELEBRATION_DURATION` → exit animation
5. Letters jump away (CSS `jump-away`)
6. After `EXIT_TO_COMPLETE_DELAY` → next word

Timing constants in `WordSlots.svelte`:

```typescript
const CELEBRATION_DURATION = 1500;
const EXIT_TO_COMPLETE_DELAY = 1300;
```

## Key Files

| File                                           | Purpose                       |
| ---------------------------------------------- | ----------------------------- |
| `src/app.css`                                  | All styles + animation config |
| `src/lib/animations/gsap.ts`                   | Only floatEmoji + confetti    |
| `src/lib/components/game/WordSlots.svelte`     | Celebration timing            |
| `src/lib/components/keyboard/KeyButton.svelte` | Key feedback                  |

## Routes

- `/` - Main game
- `/admin` - Word list management

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript
- Tailwind CSS 4
- bits-ui (headless components)
- GSAP (minimal - emoji float only)
- canvas-confetti
