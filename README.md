# @superinstance/starter-agent

> **Minimal Origin-Centric Agent with Modular Equipment System**

A self-optimizing agent that operates within the SuperInstance spreadsheet paradigm. The agent starts minimal and equips only what it needs, removing equipment once "muscle memory" (triggers) are established.

[![npm version](https://badge.fury.io/js/%40superinstance%2Fstarter-agent.svg)](https://www.npmjs.com/package/@superinstance/starter-agent)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## Core Concepts

### Origin-Centric Computation

Based on the mathematical framework from [Origin-Centric Data Systems](https://github.com/SuperInstance/SuperInstance-papers/tree/main/papers/01-origin-centric-data-systems):

```
Origin Node o_i = (id, R, S, H)

Where:
- id = unique identifier
- R  = local reference frame
- S  = local state (provenance, data, transformations)
- H  = history of received information

Key Theorem: Convergence in O(log n) without global state coordination.
```

### Equipment System

The agent has 6 equipment slots, each representing a capability domain:

```
┌─────────────────────────────────────────────────────────────────┐
│                    EQUIPMENT SLOTS                               │
│                                                                  │
│  [MEMORY]     [REASONING]     [CONSENSUS]     [SPREADSHEET]     │
│      │            │               │               │              │
│      ▼            ▼               ▼               ▼              │
│  Hierarchical  Escalation    Tripartite      POLLN              │
│  Memory        Engine        Consensus       Interface          │
│                                                                  │
│  [DISTILLATION]              [PERCEPTION]                       │
│       │                          │                               │
│       ▼                          ▼                               │
│  Model Distiller            Text/Vision Processor               │
└─────────────────────────────────────────────────────────────────┘
```

### Self-Optimization

When an agent "matures into its cell":

1. **Equipment Used** → Extract triggers (muscle memory)
2. **Triggers Register** → Deadband controllers
3. **Equipment Removed** → Streamlined performance
4. **Triggers Call Teacher** → When outside deadband range

## Installation

```bash
npm install @superinstance/starter-agent
# or
bun add @superinstance/starter-agent
```

## Quick Start

```typescript
import { SuperInstanceAgent } from '@superinstance/starter-agent';

// Create minimal agent
const agent = new SuperInstanceAgent({ debug: true });

// Register available equipment
agent.registerDefaultEquipment();

// Process a task - agent auto-equips what it needs
const result = await agent.processTask({
  id: 'task_1',
  type: 'decision',
  query: 'Should I approve this $10,000 budget request?',
  stakes: 0.8,        // High stakes
  urgencyMs: 5000,    // 5 second deadline
});

console.log(result.output);
// { tier: 'human', reason: 'High stakes threshold exceeded' }

console.log(`Confidence: ${result.confidence}`);
// Confidence: 0.5

console.log(`Equipment used: ${result.equipmentUsed.join(', ')}`);
// Equipment used: REASONING, CONSENSUS

// Check what's equipped
console.log(agent.getStatus());
// { id: 'origin_...', equipment: [...], confidence: 0.85, recommendations: [] }

// Optimize (remove unused equipment)
await agent.streamline();
```

## Equipment Modules

### Core Equipment (Always Available)

| Equipment | Slot | Description |
|-----------|------|-------------|
| **HierarchicalMemory** | MEMORY | 4-tier cognitive memory (Working, Episodic, Semantic, Procedural) |
| **EscalationEngine** | REASONING | Bot→Brain→Human routing (40x cost reduction) |
| **TripartiteConsensus** | CONSENSUS | 3-agent deliberation (Pathos, Logos, Ethos) |
| **POLLNInterface** | SPREADSHEET | Tile-based spreadsheet visualization |

### Equipment Lifecycle

```typescript
// Register custom equipment
import { Equipment, EquipmentSlot } from '@superinstance/starter-agent';

class MyCustomEquipment implements Equipment {
  name = 'MyCustom';
  slot: EquipmentSlot = 'MEMORY';
  version = '1.0.0';
  // ... implement interface
}

agent.registerEquipment(new MyCustomEquipment());

// Manually equip
await agent.equipEquipment('MyCustom');

// Manually unequip
await agent.unequipEquipment('MEMORY');

// Auto-optimize
await agent.streamline();
```

## Confidence Zones

Following [Tile Algebra Formalization](https://github.com/SuperInstance/SuperInstance-papers/blob/main/white-papers/06-Tile-Algebra-Formalization.md):

```
           GREEN ZONE (0.9 - 1.0)
           │    High confidence
           │    Auto-process
           │    No escalation
           │
           ├───────────────────────
           │
           YELLOW ZONE (0.6 - 0.9)
           │    Medium confidence  
           │    Flag for review
           │    Consider equipping
           │
           ├───────────────────────
           │
           RED ZONE (0.0 - 0.6)
           │    Low confidence
           │    Request input
           │    Call teacher
           │    Equip new equipment
           │
           ▼
```

## Spreadsheet Integration

The agent operates within the POLLN spreadsheet paradigm. Each "cell" decomposes into Named Tiles:

```
┌─────────────────────────────────────────────────────────┐
│                    AGENT CELL                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ DATA ORIGIN  │  │   DECISION   │  │TRANSFORMATION│  │
│  │     TILE     │  │   LOGIC TILE │  │     TILE     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────────────────────────┐│
│  │ CONFIDENCE   │  │      NAMED INTERFACE TILE        ││
│  │    TILE      │  │  Why I exist / What I provide    ││
│  └──────────────┘  └──────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

## API Reference

### SuperInstanceAgent

```typescript
const agent = new SuperInstanceAgent(config?: AgentConfig);

// Task processing
await agent.processTask(task: Task): Promise<TaskResult>
await agent.ask(query: string, options?: Partial<Task>): Promise<string>

// Equipment management
agent.registerEquipment(equipment: Equipment): void
agent.registerDefaultEquipment(): void
await agent.equipEquipment(name: string): Promise<boolean>
await agent.unequipEquipment(slot: EquipmentSlot): Promise<boolean>

// Optimization
await agent.streamline(): Promise<void>
await agent.reset(): Promise<void>

// Status
agent.getStatus(): AgentStatus
agent.getEquippedEquipment(): { slot: EquipmentSlot; name: string }[]
```

### Task

```typescript
interface Task {
  id: string;
  type: 'decision' | 'analysis' | 'generation' | 'distillation' | 'coordination' | 'learning' | 'visualization';
  query: string;
  context?: Record<string, any>;
  stakes?: number;        // 0-1, importance
  urgencyMs?: number;     // Time constraint
  requiredCapabilities?: EquipmentSlot[];
}
```

### TaskResult

```typescript
interface TaskResult {
  taskId: string;
  output: any;
  confidence: number;
  zone: 'GREEN' | 'YELLOW' | 'RED';
  equipmentUsed: EquipmentSlot[];
  processingTimeMs: number;
  provenance: ProvenanceChain;
  calledTeacher: boolean;
}
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full design documentation.

## Related Projects

- [**SuperInstance-SDK1**](https://github.com/SuperInstance/SuperInstance-SDK1) - Core agent library
- [**POLLN**](https://github.com/SuperInstance/POLLN) - Spreadsheet platform
- [**SuperInstance-papers**](https://github.com/SuperInstance/SuperInstance-papers) - Research papers

## License

MIT © SuperInstance
