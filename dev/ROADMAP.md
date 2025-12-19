# Roadmap

Status der Entwicklungsphasen für Letter-Lerner.

## Abgeschlossen ✅

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

### Phase 5: Wort-Randomisierung

- Wörter bei jedem Spielstart zufällig anordnen
- `shuffleArray()` in `+layout.server.ts`

### Phase 6: Sound-System

- Audio-Feedback in allen 3 Levels
- `playSound()` Utility
- Sounds: click, correct, error, celebration

### Phase 7: Neues Startmenü

- Bildbasiertes Menü mit 3D-Assets
- Einhorn-Maskottchen, Holztheke, Level-Objekte
- CSS-Hover-Effekte
- Komponenten: MenuScene, LevelItem

---

## Geplant

### Phase 8: Hover-Animationen (optional)

- Video-basierte Hover-Effekte für Level-Items
- Animiertes Einhorn

---

## Refactoring-Notizen

Bei zukünftigen Änderungen diese Optimierungen berücksichtigen:

| Item                | Beschreibung                                 | Wann             |
| ------------------- | -------------------------------------------- | ---------------- |
| Animation-Timing    | SHAKE 500ms → 400ms (match CSS)              | Bei nächstem Bug |
| Unused Dependencies | clsx, tailwind-merge, autoprefixer entfernen | Bei Phase 5      |
| Types konsolidieren | PuzzleLetter, EmojiOption nach types.ts      | Bei neuem Level  |
| BaseGame-Klasse     | Gemeinsame Store-Logik extrahieren           | Bei Level 4+     |
