# Refactoring Plan: Letter-Lerner

**Erstellt:** 2025-12-19
**Scope:** Mittel (~1h, aufgeteilt in Sessions)
**Philosophie:** Lesbarkeit > DRY. Code-Duplikation ist akzeptabel wenn sie Verständlichkeit erhöht.

---

## Point of Truth: `dev/ARCHITECTURE.md`

Dieser Plan etabliert `dev/ARCHITECTURE.md` als **Single Source of Truth** für die Systemarchitektur. Jede Session startet mit dem Lesen dieses Dokuments.

### Workflow für jede Session

```
1. Lese dev/ARCHITECTURE.md (Point of Truth)
2. Prüfe git status
3. Führe geplante Änderungen durch
4. Aktualisiere dev/ARCHITECTURE.md falls nötig
5. git checkpoint mit aussagekräftiger Message
```

---

## Phase 1: Dokumentation als Point of Truth (Session 1)

**Ziel:** Saubere, aktuelle Dokumentation als Basis für alle weiteren Änderungen.

### 1.1 ARCHITECTURE.md überarbeiten

**Datei:** `dev/ARCHITECTURE.md`

**Aktuelle Probleme:**

- Referenziert `LevelCard.svelte` und `LevelGrid.svelte` (existieren nicht)
- Tatsächlich: `MenuScene.svelte` und `LevelItem.svelte`
- State Management Beispiele unvollständig

**Änderungen:**

- Komponenten-Struktur aktualisieren (menu/ Sektion)
- Vollständige Store-Übersicht mit allen Properties
- File-Tree aktualisieren

### 1.2 ROADMAP.md aufräumen

**Datei:** `dev/ROADMAP.md`

**Änderungen:**

- Erledigte Refactoring-Notizen entfernen (Animation-Timing, falls erledigt)
- Phase 7 als vollständig markieren
- Veraltete "Bei Phase X" Referenzen aktualisieren

### 1.3 UEBERGABE.md aktualisieren

**Datei:** `dev/UEBERGABE.md`

**Änderungen:**

- Refactoring-Notizen Tabelle aktualisieren
- Veraltete Komponenten-Namen korrigieren

### Git Checkpoint

```bash
git add -A && git commit -m "docs: 📝 aktualisiere dev-docs als Point of Truth"
```

**Session 1 Ende** - Neue Session starten

---

## Phase 2: Code-Hygiene (Session 2)

**Voraussetzung:** Lese `dev/ARCHITECTURE.md` zuerst

### 2.1 Type-Duplikation bereinigen

**Problem:** `WordItem` doppelt definiert

**Dateien:**

- `src/lib/types.ts` - Interface (behalten)
- `src/lib/data.ts` - Type Alias (entfernen, import nutzen)

**Aktion:**

```typescript
// data.ts - VORHER
export type WordItem = { word: string; emoji: string };

// data.ts - NACHHER
import type { WordItem } from './types';
// WordItem export entfernen, nur KEYBOARD_ROWS bleibt
```

### 2.2 Unused Dependencies entfernen

**Datei:** `package.json`

**Zu prüfen und entfernen:**

- `clsx` - nicht verwendet
- `tailwind-merge` - nicht verwendet
- `autoprefixer` - Tailwind CSS 4 braucht es nicht mehr

**Aktion:**

```bash
# Erst prüfen ob wirklich nicht verwendet
rg "clsx|tailwind-merge" src/
# Dann entfernen
bun remove clsx tailwind-merge autoprefixer
```

### 2.3 CSS-Utility konsolidieren (optional)

**Datei:** `src/app.css`

**Entscheidung:** Nur konsolidieren wenn es die Lesbarkeit VERBESSERT.

Die 3 "Glassmorphic Container" Patterns (Lines ~151, ~559, ~630) sind ähnlich aber kontextspezifisch. Duplikation hier ist OK weil:

- Jeder Container hat spezifische gap/padding Werte
- Komponenten-spezifische Styles bleiben lokal verständlich
- Änderung an einem soll nicht andere beeinflussen

**Keine Änderung empfohlen** - Lesbarkeit hat Priorität.

### Git Checkpoint

```bash
git add -A && git commit -m "chore: 🧹 bereinige types und entferne unused deps"
bun check && bun lint
```

**Session 2 Ende** - Neue Session starten

---

## Phase 3: Store-Architektur Review (Session 3)

**Voraussetzung:** Lese `dev/ARCHITECTURE.md` zuerst

### 3.1 Store-Duplikation analysieren

Die 3 Game-Stores (`game.svelte.ts`, `puzzle.svelte.ts`, `reading.svelte.ts`) teilen gemeinsame Patterns:

**Gemeinsam (~40 Zeilen pro Store):**

- `index`, `celebrationPhase` state
- `currentLevel`, `word`, `emoji`, `progress`, `totalWords` getters
- `startCelebration()`, `endCelebration()`, `nextLevel()` methods
- Context Pattern (`setXxxContext`, `getXxxContext`)

### 3.2 Entscheidung: KEINE BaseClass

**Begründung (Best Practice Svelte 5):**

1. **Lesbarkeit**: Jeder Store ist in sich vollständig verständlich
2. **Svelte 5 Empfehlung**: Klassen mit `$state` direkt in Class Fields
3. **Wartbarkeit**: Änderung an einem Store beeinflusst nicht die anderen
4. **Debugging**: Stack Traces zeigen direkt zur richtigen Datei
5. **KISS**: Inheritance für 3 ähnliche Klassen ist Overengineering

**Die Duplikation bleibt bestehen** - sie erhöht die Code-Verständlichkeit.

### 3.3 Types konsolidieren (falls sinnvoll)

**Zu prüfen:**

- `PuzzleLetter` in `puzzle.svelte.ts` - lokal lassen (nur dort verwendet)
- `EmojiOption` in `reading.svelte.ts` - lokal lassen (nur dort verwendet)
- `Level` in `levels.ts` - lokal lassen (nur dort verwendet)

**Keine Änderung** - Typen bleiben bei ihren Stores für Kohäsion.

### Git Checkpoint

```bash
git add -A && git commit -m "docs: 📝 dokumentiere Store-Architektur Entscheidung"
```

**Session 3 Ende** - Refactoring abgeschlossen

---

## Zusammenfassung: Betroffene Dateien

| Datei                 | Aktion                         |
| --------------------- | ------------------------------ |
| `dev/ARCHITECTURE.md` | Aktualisieren (Point of Truth) |
| `dev/ROADMAP.md`      | Aufräumen                      |
| `dev/UEBERGABE.md`    | Aktualisieren                  |
| `src/lib/data.ts`     | Type-Import ändern             |
| `package.json`        | Dependencies entfernen         |

---

## Was NICHT geändert wird (und warum)

| Item                                   | Begründung                                   |
| -------------------------------------- | -------------------------------------------- |
| BaseGameStore extrahieren              | Lesbarkeit > DRY, 3 Stores sind überschaubar |
| CSS .glass-container                   | Kontext-spezifische Styles bleiben lesbar    |
| PuzzleLetter/EmojiOption nach types.ts | Kohäsion: Typen bleiben bei ihrem Store      |
| Celebration Hooks extrahieren          | Overkill für 3 identische Zeilen             |

---

## Validierung nach Refactoring

```bash
bun check   # TypeScript
bun lint    # ESLint + Prettier
bun dev     # Manueller Test
```

- [ ] Buchstabieren funktioniert (Eingabe, Celebration, nächstes Wort)
- [ ] Puzzle funktioniert (Drag-Drop, Shake, Celebration)
- [ ] Lesen funktioniert (Emoji-Auswahl, Shake, Celebration)
- [ ] Startmenü funktioniert (alle 3 Level erreichbar)
