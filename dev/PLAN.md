# Plan: Multi-Level Game für Letter-Lerner

## Übersicht

Neue Spielvarianten für das Kinder-Rechtschreibspiel mit Start-Menü und mehreren Leveln.

## Architektur-Prinzipien

- **Clean Code**: Lesbar, wartbar, selbstdokumentierend
- **Separation of Concerns**: Klare Trennung von UI, State, Logic
- **KISS**: Einfachste Lösung bevorzugen
- **DRY**: Vorhandenen Code wiederverwenden und allgemein nutzbar machen
- **Gemeinsame Basis**: Alle Level bauen auf dem Buchstabieren-Level auf
  - Gleiche Grundstruktur (GameBoard, ProgressBar, Celebration)
  - Komponenten werden wiederverwendet und erweitert
  - Shared State-Patterns und Animationen

## Entwicklungsregeln

- **Sprache Code**: Englisch (Code, Comments, Docs, Folder, Variables)
- **Sprache Spiel**: Deutsch (UI-Texte, Labels, Feedback)
- **Zentrale Daten**: `src/lib/data/words.json` ist die einzige Wort-Datenbank
- **Komponenten**: Durchgehend bits-ui verwenden (Button.Root, Progress.Root, etc.)
- **Struktur**: Game-Komponenten in `src/lib/components/` organisieren
- **Wiederverwendung**: Bestehende Komponenten nutzen, nicht duplizieren

## Anforderungen

1. **Git Branch**: feature/game-levels
2. **Start-Menü**: Hauptseite mit Level-Auswahl
3. **Route-Umstrukturierung**: Aktuelles Spiel nach /level/buchstabieren verschieben
4. **Level 1 - Buchstabenpuzzle**: Drag-and-Drop der Buchstaben auf Wort-Slots
5. **Level 2 - Lese-Level**: Wort anzeigen + 3 Emojis (1 richtig, 2 zufällig)

## Route-Struktur (Neu)

```
src/routes/
├── +page.svelte                    # Start-Menü (NEU)
├── level/
│   ├── +layout.svelte              # Shared Layout für alle Level
│   ├── buchstabieren/
│   │   ├── +page.svelte            # Buchstabieren (verschoben von /)
│   │   └── +page.server.ts
│   ├── puzzle/
│   │   ├── +page.svelte            # Buchstabenpuzzle (NEU)
│   │   └── +page.server.ts
│   └── lesen/
│       ├── +page.svelte            # Lese-Level (NEU)
│       └── +page.server.ts
└── admin/                          # Unverändert
```

## Komponenten-Struktur

### Wiederverwendete Komponenten (aus Buchstabieren)

```
src/lib/components/game/            # Shared zwischen allen Levels
├── GameBoard.svelte                # Emoji + Wort-Anzeige (wiederverwendet)
├── ProgressBar.svelte              # Fortschrittsanzeige (wiederverwendet)
├── LetterSlot.svelte               # Einzelner Buchstaben-Slot (wiederverwendet)
└── WordSlots.svelte                # Container für Buchstaben (wiederverwendet)
```

### Neue Komponenten

```
src/lib/components/
├── menu/
│   ├── LevelCard.svelte            # Level-Karte für Start-Menü
│   └── LevelGrid.svelte            # Grid der Level-Karten
├── puzzle/
│   ├── DraggableLetter.svelte      # Ziehbarer Buchstabe
│   └── LetterPool.svelte           # Container für gemischte Buchstaben
└── reading/
    └── EmojiOption.svelte          # Auswahl-Button für Emoji
```

## Stores

### Bestehend (erweitert)

```
src/lib/stores/
├── game.svelte.ts                  # BaseGame Klasse → allgemein nutzbar machen
```

### Neu

```
src/lib/stores/
├── levels.ts                       # Level-Metadaten (Name, Emoji, Route)
├── puzzle.svelte.ts                # PuzzleGame extends BaseGame
└── reading.svelte.ts               # ReadingGame extends BaseGame
```

## Drag-and-Drop Library

- **@thisux/sveltednd** - Svelte 5 kompatibel
- Verwendet `use:draggable` und `use:droppable` Actions
- Unterstützt Touch-Geräte

## Implementierungsreihenfolge

### Phase 1: Infrastruktur & Refactoring ✅

1. ✅ Git Branch erstellen: `git checkout -b feature/game-levels`
2. ✅ `bun add @thisux/sveltednd` installieren
3. ✅ `src/lib/stores/levels.ts` erstellen
4. ✅ Level-Layout `src/routes/level/+layout.svelte` erstellen

### Phase 2: Route-Umstrukturierung ✅

5. ✅ Buchstabieren von `/` nach `/level/buchstabieren/` verschieben
6. ✅ Start-Menü an `/` erstellen
7. ✅ Menu-Komponenten erstellen (LevelCard, LevelGrid)

### Phase 3: Buchstabenpuzzle

9. `src/lib/stores/puzzle.svelte.ts` erstellen (extends BaseGame)
10. Puzzle-Komponenten erstellen (nutzt LetterSlot, WordSlots)
11. Route `/level/puzzle/` erstellen
12. CSS-Styles in `app.css` hinzufügen

### Phase 4: Lese-Level

13. `src/lib/stores/reading.svelte.ts` erstellen (extends BaseGame)
14. Reading-Komponenten erstellen (nutzt GameBoard, ProgressBar)
15. Route `/level/lesen/` erstellen
16. CSS-Styles in `app.css` hinzufügen

### Phase 5: Polish

17. Touch-Geräte testen
18. Celebration-Animationen (bereits vorhanden) in alle Level integrieren
19. Navigation zwischen Leveln

## Kritische Dateien

| Datei                           | Aktion                                   |
| ------------------------------- | ---------------------------------------- |
| `src/routes/+page.svelte`       | Überschreiben → Start-Menü               |
| `src/routes/+page.server.ts`    | Löschen (nicht mehr benötigt)            |
| `src/app.css`                   | Erweitern → Menu + Puzzle + Lesen Styles |
| `src/lib/stores/game.svelte.ts` | Refactoren → BaseGame extrahieren        |
| `src/lib/data/words.json`       | Unverändert, von allen Leveln genutzt    |

## Level-Details

### Buchstabieren (bestehend, Basis für alle)

- Keyboard-Eingabe der Buchstaben
- Nutzt: GameBoard, WordSlots, LetterSlot, ProgressBar, Keyboard
- Celebration-Animation bei Erfolg
- **Wird zur Vorlage für alle anderen Level**

### Buchstabenpuzzle (neu)

- Emoji + leere Slots anzeigen (nutzt GameBoard, WordSlots)
- Buchstaben des Wortes gemischt darunter (LetterPool)
- Kind zieht Buchstaben auf richtige Position (DraggableLetter)
- Visuelles Feedback bei richtig/falsch (nutzt bestehende CSS-Animationen)
- Celebration bei Erfolg (nutzt bestehende Celebration)

### Lese-Level (neu)

- Wort wird groß angezeigt
- 3 Emoji-Buttons darunter (1 richtig, 2 zufällig aus words.json)
- Kind klickt auf richtiges Emoji
- Grün bei richtig, Rot + Shake bei falsch (nutzt bestehende CSS)
- Celebration bei Erfolg (nutzt bestehende Celebration)
