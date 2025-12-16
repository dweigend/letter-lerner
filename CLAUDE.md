# CLAUDE.md

German spelling game for children (SvelteKit 2 + Svelte 5).

## Commands

```bash
bun dev      # Dev server
bun build    # Production build
bun check    # TypeScript check
bun lint     # Prettier + ESLint
bun format   # Auto-format
```

## Core Rules

### 1. Use bits-ui components

```svelte
// ✅ CORRECT import {Button} from 'bits-ui';
<Button.Root>Click</Button.Root>

// ❌ WRONG
<button>Click</button>
```

### 2. Styles in app.css only

```svelte
// ✅ CORRECT - data-attributes
<Button.Root data-variant="key">A</Button.Root>

// ❌ WRONG - inline Tailwind
<Button.Root class="bg-pink-500 px-4">A</Button.Root>
```

### 3. Style via data-attributes

```css
/* app.css */
[data-button-root][data-variant='key'] {
	@apply h-12 w-9 rounded-xl bg-white/80;
}
```

## Routes

| Route                  | Description                  |
| ---------------------- | ---------------------------- |
| `/`                    | Start menu (level selection) |
| `/level/buchstabieren` | Spelling game                |
| `/level/puzzle`        | Letter puzzle (planned)      |
| `/level/lesen`         | Reading level (planned)      |
| `/admin`               | Word list management         |

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript, Tailwind CSS 4
- bits-ui, canvas-confetti
- @thisux/sveltednd (drag-drop)

## Architecture

See `dev/ARCHITECTURE.md` for details on:

- Animation system (CSS-first)
- Component structure
- State management
- Celebration flow
