# AGENTS.md

Configuration for AI coding assistants working with this repository.

## Project Overview

**Annelies Schreib-Spass** is a German spelling game for children built with SvelteKit 2 and Svelte 5. Children type letters to spell German words shown with emoji hints. The game provides visual feedback and celebrates success with bouncing letters and confetti.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm check        # TypeScript + Svelte type checking
pnpm lint         # Prettier + ESLint check
pnpm format       # Format with Prettier
```

## Code Style Rules

### 1. Use bits-ui components (no native HTML)

```svelte
<!-- CORRECT -->
<script>
  import { Button, Progress } from 'bits-ui';
</script>
<Button.Root>Click</Button.Root>

<!-- WRONG -->
<button>Click</button>
```

### 2. All styles in app.css via data-attributes

```svelte
<!-- CORRECT -->
<Button.Root data-variant="key">A</Button.Root>

<!-- WRONG - no inline Tailwind -->
<Button.Root class="bg-pink-500 px-4">A</Button.Root>
```

### 3. Style components using data-attribute selectors

```css
/* app.css */
[data-button-root][data-variant='key'] {
  @apply h-12 w-9 rounded-xl bg-white/80;
}
```

## Architecture

### Animation System (CSS-first)

Animations are CSS-based with configurable variables in `app.css`:

```css
:root {
  --anim-bounce: 1.5s;     /* Celebration bounce */
  --anim-exit: 0.6s;       /* Exit animation */
  --anim-shake: 0.4s;      /* Error shake */
  --bounce-height-max: -50px;
  --color-success: #22c55e;
  --color-error: #ef4444;
}
```

**CSS Animations:**
- `spring-bounce` - Celebration with squash & stretch
- `jump-away` - Exit animation
- `shake` - Error feedback

**GSAP (minimal):**
- `floatEmoji()` - Floating emoji
- `triggerConfetti()` - Celebration confetti

### Component Structure

```
src/lib/components/
├── game/
│   ├── LetterSlot.svelte   # Letter + underline
│   ├── WordSlots.svelte    # Letter container + celebration
│   ├── GameBoard.svelte    # Emoji + word display
│   └── ProgressBar.svelte  # Progress header
└── keyboard/
    ├── Keyboard.svelte     # QWERTZ keyboard
    └── KeyButton.svelte    # Key with feedback
```

### State Management

Svelte 5 runes with context pattern:

```typescript
// src/lib/stores/game.svelte.ts
$state()    // Reactive properties
$derived()  // Computed values
setGameContext() / getGameContext()  // Context API
```

### Celebration Flow

1. Word complete → `isCelebrating = true`
2. Letters bounce (CSS `spring-bounce`, staggered)
3. Confetti triggered
4. After `CELEBRATION_DURATION` (1500ms) → exit animation
5. Letters jump away (CSS `jump-away`)
6. After `EXIT_TO_COMPLETE_DELAY` (1300ms) → next word

## Key Files

| File | Purpose |
|------|---------|
| `src/app.css` | All styles + animation config |
| `src/lib/animations/gsap.ts` | floatEmoji + confetti only |
| `src/lib/components/game/WordSlots.svelte` | Celebration timing |
| `src/lib/components/keyboard/KeyButton.svelte` | Key feedback |

## Routes

- `/` - Main spelling game
- `/admin` - Word list management (German UI)

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript
- Tailwind CSS 4
- bits-ui (headless components)
- GSAP (minimal)
- canvas-confetti

## Boundaries

**Do:**
- Follow bits-ui patterns
- Keep animations in CSS where possible
- Use data-attributes for styling

**Don't:**
- Add inline Tailwind classes to components
- Create new GSAP animations (use CSS)
- Modify game words (German content is intentional)
