# Übergabe: Letter-Lerner Multi-Level Feature

## Status: Phase 6 abgeschlossen ✅ | Phase 7 geplant

**Datum**: 2025-12-17
**Branch**: `main`

## Abgeschlossene Phasen

- [x] **Phase 1+2**: Infrastruktur & Route-Umstrukturierung
- [x] **Phase 3**: Buchstabenpuzzle (Drag-and-Drop)
- [x] **Phase 4**: Lese-Level (Emoji-Auswahl)
- [x] **Phase 5**: Wörter Randomisieren
- [x] **Phase 6**: Sound-System

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

## Phase 6: Sound-System ✅ Implementiert

Audio-Feedback in allen 3 Levels implementiert.

### Audio-Dateien

| Datei             | Zweck  | Wann gespielt                           |
| ----------------- | ------ | --------------------------------------- |
| `click.mp3`       | Klick  | Buchstabieren: richtiger Buchstabe      |
| `correct.mp3`     | Erfolg | Puzzle/Lesen: richtiger Buchstabe/Emoji |
| `error.mp3`       | Fehler | Alle Levels: falscher Buchstabe/Emoji   |
| `celebration.mp3` | Feier  | Alle Levels: Wort abgeschlossen         |
| `click_2.mp3`     | Klick  | (optional) Alternative                  |

**Ablageort**: `static/sounds/`

### Implementierte Dateien

- `src/lib/utils/audio.ts` - Audio-Utility mit `playSound()`
- `src/lib/stores/game.svelte.ts` - Sounds integriert
- `src/lib/stores/puzzle.svelte.ts` - Sounds integriert
- `src/lib/stores/reading.svelte.ts` - Sounds integriert

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
│       ├── audio.ts                    # playSound() (Phase 6)
│       └── timeout.ts                  # withTimeout()
├── static/
│   └── sounds/                         # Audio-Dateien (Phase 6)
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
