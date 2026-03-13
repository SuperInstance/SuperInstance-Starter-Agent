# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build      # Compile TypeScript to dist/
npm test           # Run Jest tests
npm run lint       # ESLint on src/**/*.ts
```

To run a single test file:
```bash
npx jest path/to/file.test.ts
```

## Architecture

This is a TypeScript library (`@superinstance/starter-agent`) implementing an **Origin-Centric Data Systems** agent framework. The core idea: agents start minimal and self-equip capabilities based on task requirements.

### Key Concepts

- **OriginCore**: The main agent class. Maintains a provenance chain (immutable/append-only), tracks history with confidence scores, and manages up to 10 equipment slots.
- **Equipment**: Modular capabilities plugged into named slots (MEMORY, REASONING, CONSENSUS, SPREADSHEET, etc.). Agents auto-select equipment based on task type.
- **Confidence Zones**: GREEN (0.9–1.0), YELLOW (0.6–0.9), RED (0.0–0.6) — used to gate task outcomes.
- **Tile Algebra**: Typed computation units (`Tile`/`TileGrid`) used internally by equipment for structured data processing.

### Source Layout

- `src/index.ts` — Public API exports (OriginCore, BaseEquipment, EquipmentRegistry, all types)
- `src/types.ts` — All shared types: `ReferenceFrame`, `ProvenanceChain`, `OriginState`, `Equipment`, `Task`, `TaskResult`, `Tile`, `TileGrid`, `ConfidenceZone`, `AgentConfig`
- `src/OriginCore.ts` — Main agent: `processTask()`, `registerEquipment()`, `equip()`, `unequipSlot()`, `optimize()`
- `src/core/OriginCore.ts` — Alternate implementation (same class, different directory)
- `src/equipment/BaseEquipment.ts` — Abstract base all equipment must extend; includes lifecycle hooks (`equip`, `unequip`) and tile computation interface
- `src/equipment/Equipment.ts` — Built-in equipment: `HierarchicalMemoryEquipment` (4-tier cognitive memory), `EscalationEngineEquipment` (Bot→Brain→Human LLM routing), `TripartiteConsensusEquipment` (3-agent deliberation), `POLLNInterfaceEquipment` (tile-based spreadsheet interface). Also exports `createEquipment()` and `createDefaultEquipment()` factory functions.
- `src/equipment/EquipmentRegistry.ts` — Singleton registry; `register()`, `create()`, `listAll()`, `listForSlot()`, `equipDefaults()` (auto-equips based on task type)

### Design Patterns

- **Singleton**: `EquipmentRegistry`
- **Factory**: Equipment creation via registry
- **Strategy**: Equipment as swappable strategies per slot
- **Immutable provenance**: All operations append to a chain; nothing is overwritten

### Build

- TypeScript target: ES2022, CommonJS modules, strict mode
- Output: `dist/` (includes `.d.ts` declarations and inline source maps)
- Entry: `dist/index.js` / `dist/index.d.ts`
