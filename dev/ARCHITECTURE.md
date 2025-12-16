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
└── menu/
    ├── LevelCard.svelte    # Level selection card
    └── LevelGrid.svelte    # Grid of level cards
```

## State Management

Svelte 5 runes with context pattern (`src/lib/stores/game.svelte.ts`):

```typescript
class Game {
	index = $state(0);
	input = $state<string[]>([]);
	// ...
}

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

| File                            | Purpose                       |
| ------------------------------- | ----------------------------- |
| `src/app.css`                   | All styles + animation config |
| `src/lib/config/animations.ts`  | Timing constants              |
| `src/lib/animations/gsap.ts`    | floatEmoji + confetti         |
| `src/lib/stores/game.svelte.ts` | Game state class              |
| `src/lib/stores/levels.ts`      | Level metadata                |
| `src/lib/data/words.json`       | Word database                 |
