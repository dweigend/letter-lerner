# Roadmap

Status der Entwicklungsphasen für Letter-Lerner.

## Abgeschlossen

### Phase 1-2: Infrastruktur & Routes

- Level-System mit shared Layout
- Route-Struktur: `/level/buchstabieren`, `/level/puzzle`, `/level/lesen`
- Start-Menü mit Level-Auswahl

### Phase 3: Buchstabenpuzzle

- Drag-and-Drop mit @thisux/sveltednd
- PuzzleGame Store mit shuffle-Logik
- Komponenten: DraggableLetter, DropSlot, DropSlots, LetterPool, PuzzleBoard

### Phase 4: Lese-Level

- Emoji-Auswahl (1 richtig, 2 falsch)
- ReadingGame Store mit Zufalls-Emojis
- Komponenten: EmojiOption, EmojiGrid, ReadingBoard

---

## Aktuell: Phase 5 - Wort-Randomisierung

**Ziel**: Wörter bei jedem Spielstart zufällig anordnen.

**Änderung**:

```typescript
// src/routes/level/+layout.server.ts
import { shuffleArray } from '$lib/utils/array';

export const load = async () => {
	const words = await loadWords();
	return { words: shuffleArray(words) };
};
```

**Aufwand**: ~5 Minuten

---

## Geplant

### Phase 6: Sound-System

**Benötigte Sounds** (von David bereitgestellt):
| Datei | Zweck |
|-------|-------|
| `static/sounds/correct.mp3` | Richtiger Buchstabe/Emoji |
| `static/sounds/error.mp3` | Falscher Buchstabe/Emoji |
| `static/sounds/celebration.mp3` | Wort abgeschlossen |

**Implementierung**:

1. Audio-Utility in `src/lib/utils/audio.ts`
2. `playSound()` Aufrufe in den 3 Stores

### Phase 7: Neues Startmenü

Design-Mockup in Arbeit. Details folgen.

---

## Refactoring-Notizen

Bei zukünftigen Änderungen diese Optimierungen berücksichtigen:

| Item                | Beschreibung                                 | Wann             |
| ------------------- | -------------------------------------------- | ---------------- |
| Animation-Timing    | SHAKE 500ms → 400ms (match CSS)              | Bei nächstem Bug |
| Unused Dependencies | clsx, tailwind-merge, autoprefixer entfernen | Bei Phase 5      |
| Types konsolidieren | PuzzleLetter, EmojiOption nach types.ts      | Bei neuem Level  |
| BaseGame-Klasse     | Gemeinsame Store-Logik extrahieren           | Bei Level 4+     |
