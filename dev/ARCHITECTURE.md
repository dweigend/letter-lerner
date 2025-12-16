# Architecture

Technical details for Letter-Lerner development.

## Animation System (CSS-first)

CSS variables in `app.css`:

```css
:root {
	--anim-bounce: 1.5s;
	--anim-exit: 0.6s;
	--anim-shake: 0.4s;
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

Timing constants in `src/lib/config/animations.ts`.

## Component Structure

```
src/lib/components/
├── game/
│   ├── LetterSlot.svelte   # Letter + underline
│   ├── WordSlots.svelte    # Letter container + celebration
│   ├── GameBoard.svelte    # Emoji + word display
│   └── ProgressBar.svelte  # Progress header
├── keyboard/
│   ├── Keyboard.svelte     # QWERTZ keyboard
│   └── KeyButton.svelte    # Key with feedback
├── menu/
│   ├── LevelCard.svelte    # Level selection card
│   └── LevelGrid.svelte    # Grid of level cards
└── puzzle/
    ├── DraggableLetter.svelte  # Draggable letter tile
    ├── DropSlot.svelte         # Drop target with validation
    ├── DropSlots.svelte        # Slots container + celebration
    ├── LetterPool.svelte       # Pool of shuffled letters
    └── PuzzleBoard.svelte      # Main puzzle board
```

## State Management

Svelte 5 runes with context pattern:

**Game Store** (`src/lib/stores/game.svelte.ts`):

```typescript
class Game {
	index = $state(0);
	input = $state<string[]>([]);
	celebrationPhase = $state(false);
}
```

**Puzzle Store** (`src/lib/stores/puzzle.svelte.ts`):

```typescript
class PuzzleGame {
	pool = $state<PuzzleLetter[]>([]);
	slots = $state<PuzzleSlot[]>([]);
	// Uses @thisux/sveltednd for drag-and-drop
}
```

Context pattern for all stores:

```typescript
export function setGameContext(game: Game) {
	setContext(GAME_CONTEXT, game);
}

export function getGameContext(): Game {
	return getContext<Game>(GAME_CONTEXT);
}
```

## Celebration Flow

1. Word complete → `celebrationPhase = true`
2. Letters bounce (CSS `spring-bounce`, staggered)
3. Confetti triggered
4. After `CELEBRATION_DURATION` → exit animation
5. Letters jump away (CSS `jump-away`)
6. After `EXIT_DELAY` → next word

## Key Files

| File                              | Purpose                        |
| --------------------------------- | ------------------------------ |
| `src/app.css`                     | All styles + animation config  |
| `src/lib/config/animations.ts`    | Timing constants               |
| `src/lib/animations/confetti.ts`  | Celebration confetti           |
| `src/lib/stores/game.svelte.ts`   | Buchstabieren state            |
| `src/lib/stores/puzzle.svelte.ts` | Puzzle state + drag-drop logic |
| `src/lib/stores/levels.ts`        | Level metadata                 |
| `src/lib/utils/array.ts`          | shuffleArray utility           |
| `src/lib/utils/timeout.ts`        | withTimeout utility            |
| `src/lib/data/words.json`         | Word database                  |
