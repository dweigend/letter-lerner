# Development Workflow

Standard-Workflow für die Entwicklung an Letter-Lerner.

## Workflow-Schritte

### 1. Git Checkpoint

Vor risikoreichen Änderungen einen sicheren Checkpoint erstellen:

```bash
git add -A
git commit -m "checkpoint: vor [beschreibung]"
```

### 2. Research

Bei Unklarheiten oder neuen Technologien:

- **Context7**: Aktuelle Framework-Dokumentation abrufen
  - Svelte 5 Runes, SvelteKit Routing, etc.
- **Web Search**: Externe Ressourcen recherchieren
  - Best Practices, Beispiele, Problemlösungen

### 3. Plan

Vor der Implementierung:

- Anforderungen klären
- Betroffene Dateien identifizieren
- Reihenfolge der Änderungen festlegen
- Plan in `dev/PLAN.md` dokumentieren

### 4. Implement

Code schreiben:

- Kleine, fokussierte Änderungen
- Ein Feature/Fix pro Commit
- Bestehende Patterns befolgen (siehe CLAUDE.md)

### 5. Test

Änderungen testen:

```bash
bun dev          # Manuell im Browser testen
bun check        # TypeScript + Svelte Typen prüfen
```

### 6. Debug

Bei Fehlern:

- Browser DevTools (Console, Network)
- Svelte DevTools Extension
- `console.log` für schnelles Debugging
- `$inspect()` für reaktive Werte

### 7. Lint & Refactor

Code-Qualität sicherstellen:

```bash
bun lint         # ESLint + Prettier prüfen
bun format       # Automatisch formatieren
```

Refactoring:

- Duplikate entfernen
- Funktionen aufteilen wenn > 20 Zeilen
- Naming verbessern

### 8. Update Docs

Dokumentation aktualisieren:

- `dev/UEBERGABE.md` - Aktueller Stand für nächste Session
- `dev/PLAN.md` - Fortschritt markieren
- `README.md` - Bei neuen Features/Commands

### 9. Git Commit

Änderungen committen:

```bash
git add -A
git commit -m "type: emoji beschreibung"
```

**Commit-Typen:**

- `feat:` - Neues Feature
- `fix:` - Bugfix
- `refactor:` - Code-Umbau ohne Funktionsänderung
- `style:` - Formatierung, CSS
- `docs:` - Dokumentation
- `chore:` - Build, Dependencies

**Beispiele:**

```bash
git commit -m "feat: add start menu with level selection"
git commit -m "fix: correct drag-drop on touch devices"
git commit -m "refactor: extract PuzzleGame class"
```

### 10. Abschluss

Session beenden:

1. Alle Änderungen committen
2. `dev/UEBERGABE.md` aktualisieren
3. Branch pushen (optional):
   ```bash
   git push -u origin feature/game-levels
   ```

## Quick Reference

```bash
# Entwicklung starten
bun dev

# Vor Änderungen
git add -A && git commit -m "checkpoint: vor xyz"

# Nach Änderungen
bun check && bun lint
git add -A && git commit -m "feat: xyz"

# Session beenden
# -> UEBERGABE.md aktualisieren
```

## Wichtige Regeln

1. **Keine Erwähnung von KI-Tools in Commits**
2. **Kleine, atomare Commits**
3. **Immer testen vor Commit**
4. **Dokumentation aktuell halten**
5. **Bei Unsicherheit: Research zuerst**
