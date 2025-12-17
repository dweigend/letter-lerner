# Übergabe: Letter-Lerner Multi-Level Feature

## Status: Phase 5 abgeschlossen ✅ | Phase 6-7 geplant

**Datum**: 2025-12-17
**Branch**: `main`

## Abgeschlossene Phasen

- [x] **Phase 1+2**: Infrastruktur & Route-Umstrukturierung
- [x] **Phase 3**: Buchstabenpuzzle (Drag-and-Drop)
- [x] **Phase 4**: Lese-Level (Emoji-Auswahl)
- [x] **Phase 5**: Wörter Randomisieren

## Level-Übersicht

| Level            | Route                  | Status           |
| ---------------- | ---------------------- | ---------------- |
| Buchstabieren    | `/level/buchstabieren` | ✅ Implementiert |
| Buchstabenpuzzle | `/level/puzzle`        | ✅ Implementiert |
| Lesen            | `/level/lesen`         | ✅ Implementiert |

---

# Nächste Phasen

## Phase 5: Wörter Randomisieren ✅

Implementiert in `src/routes/level/+layout.server.ts` - Wörter werden bei jedem Seitenaufruf randomisiert.

---

## Phase 6: Sound-System

### Ziel

Audio-Feedback für Spielaktionen. Die Audio-Dateien werden von David bereitgestellt.

### Was das Spiel braucht

- **Richtig-Sound**: Wenn ein Buchstabe/Emoji richtig ist
- **Falsch-Sound**: Wenn ein Buchstabe/Emoji falsch ist
- **Feier-Sound**: Bei Wort-Abschluss (mit Confetti)
- **Klick-Sound**: (optional) Bei Button-Interaktion

### Benötigte Audio-Dateien

| Datei             | Zweck  | Wann gespielt             |
| ----------------- | ------ | ------------------------- |
| `correct.mp3`     | Erfolg | Richtiger Buchstabe/Emoji |
| `error.mp3`       | Fehler | Falscher Buchstabe/Emoji  |
| `celebration.mp3` | Feier  | Wort abgeschlossen        |
| `click.mp3`       | Klick  | (optional) Button-Tap     |

**Ablageort**: `static/sounds/`

### Technische Umsetzung

1. Sound-Dictionary in `src/lib/data/sounds.json`
2. Audio-Utility in `src/lib/utils/audio.ts`
3. `playSound()` Aufrufe in den 3 Stores (game, puzzle, reading)

### Aufwand: Mittel (30 Minuten)

---

## Phase 7: Neues Startmenü

### Status: Mockup in Arbeit

David entwickelt gerade ein Design-Mockup. Details werden ergänzt wenn das Mockup fertig ist.

### Aktuelle Menü-Struktur (für Referenz)

| Datei                                      | Zweck                               |
| ------------------------------------------ | ----------------------------------- |
| `src/routes/+page.svelte`                  | Startmenü-Route                     |
| `src/lib/components/menu/LevelGrid.svelte` | Level-Karten Container              |
| `src/lib/components/menu/LevelCard.svelte` | Einzelne Level-Karte                |
| `src/lib/stores/levels.ts`                 | Level-Metadaten                     |
| `src/app.css`                              | Styling (data-menu-_, data-level-_) |

### Aufwand: Abhängig vom Design

---

# Projektkontext

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes: $state, $derived, $effect)
- TypeScript, Tailwind CSS 4, bits-ui
- canvas-confetti, @thisux/sveltednd

## Architektur-Prinzipien

- **Styling**: Alle Styles in `app.css` mit data-attributes
- **State**: Svelte 5 runes mit Context API
- **Utilities**: Wiederverwendbare Funktionen in `src/lib/utils/`
- **Data Loading**: Layout Server Load für shared data

## Aktuelle Architektur

```
src/
├── routes/
│   ├── +page.svelte                    # Start-Menü
│   └── level/
│       ├── +layout.server.ts           # Lädt words.json
│       ├── buchstabieren/+page.svelte
│       ├── puzzle/+page.svelte
│       └── lesen/+page.svelte
├── lib/
│   ├── stores/
│   │   ├── game.svelte.ts              # Buchstabieren-Logic
│   │   ├── puzzle.svelte.ts            # Puzzle-Logic
│   │   └── reading.svelte.ts           # Lesen-Logic
│   ├── components/
│   │   ├── menu/                       # Menü-Komponenten
│   │   ├── game/                       # Buchstabieren-Komponenten
│   │   ├── puzzle/                     # Puzzle-Komponenten
│   │   └── reading/                    # Lesen-Komponenten
│   ├── data/
│   │   └── words.json                  # Wort-Datenbank
│   └── utils/
│       ├── array.ts                    # shuffleArray()
│       └── timeout.ts                  # withTimeout()
└── app.css                             # Alle Styles
```

## Referenzen

- **Claude-Kontext**: `CLAUDE.md`
- **Architektur**: `dev/ARCHITECTURE.md`
- **Roadmap**: `dev/ROADMAP.md`

---

## Refactoring-Notizen

Bei zukünftigen Änderungen berücksichtigen:

| Item                | Beschreibung                                              |
| ------------------- | --------------------------------------------------------- |
| Animation-Timing    | `SHAKE: 500ms` → `400ms` (match CSS `--anim-shake`)       |
| Unused Dependencies | `clsx`, `tailwind-merge`, `autoprefixer` entfernen        |
| Types konsolidieren | `PuzzleLetter`, `EmojiOption` nach `types.ts` verschieben |
| BaseGame-Klasse     | Gemeinsame Store-Logik extrahieren bei Level 4+           |
