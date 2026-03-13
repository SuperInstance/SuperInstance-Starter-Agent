/**
 * SuperInstance Starter Agent
 * 
 * A minimal Origin-Centric agent with modular equipment system.
 * 
 * Key concepts:
 * - Origin-Centric: Every computation tracks provenance, transformations, and local state
 * - Equipment System: Modular capabilities that can be equipped/unequipped dynamically
 * - Self-Optimizing: Equipment can be removed once muscle memory/triggers are established
 * - Spreadsheet-Ready: Operates within the POLLN tile-based paradigm
 */

// Core
export { OriginCore } from './core/OriginCore';
export type {
  OriginCore as IOriginCore,
  OriginNode,
  OriginState,
  ProvenanceChain,
  ProvenanceEntry,
  RateBasedUpdate,
  ReferenceFrame,
  InformationHistory,
  HistoryEntry,
  CellPosition,
} from './types';

// Tile Algebra
export type {
  Tile,
  TypeSchema,
  ComputeFunction,
  ConfidenceFunction,
  TraceFunction,
  ConfidenceZone,
  TileComposition,
} from './types';
export { getConfidenceZone } from './types';

// Equipment System
export { 
  BaseEquipment,
  HierarchicalMemoryEquipment,
  EscalationEngineEquipment,
  TripartiteConsensusEquipment,
  POLLNInterfaceEquipment,
  createEquipment,
  createDefaultEquipment,
} from './equipment/Equipment';
export type {
  Equipment,
  EquipmentSlot,
  CostMetrics,
  BenefitMetrics,
  TriggerThresholds,
  EquipmentDescription,
} from './types';

// Task Processing
export type {
  Task,
  TaskType,
  TaskResult,
} from './types';

// Triggers
export type {
  TriggerRegistry,
  ThresholdConfig,
  TriggerMonitor,
  EquipmentRecommendation,
  Condition,
  DeadbandRange,
} from './types';

// Agent Configuration
export type { AgentConfig } from './types';

// Spreadsheet Integration
export type {
  SpreadsheetTile,
  TileType,
  SpreadsheetState,
} from './types';

// ============================================
// Main Agent Class
// ============================================

import { OriginCore } from './core/OriginCore';
import { createDefaultEquipment } from './equipment/Equipment';
import type { AgentConfig, Equipment, EquipmentSlot, Task, TaskResult } from './types';

/**
 * SuperInstance Starter Agent
 * 
 * A minimal agent that can equip/unequip equipment based on task demands.
 * 
 * @example
 * ```typescript
 * // Create a minimal agent
 * const agent = new SuperInstanceAgent({ debug: true });
 * 
 * // Register available equipment
 * agent.registerDefaultEquipment();
 * 
 * // Process a task - agent auto-equips what it needs
 * const result = await agent.processTask({
 *   id: 'task_1',
 *   type: 'decision',
 *   query: 'Should I approve this request?',
 *   stakes: 0.8,
 * });
 * 
 * console.log(result.output);
 * console.log(`Confidence: ${result.confidence}`);
 * console.log(`Equipment used: ${result.equipmentUsed.join(', ')}`);
 * ```
 */
export class SuperInstanceAgent extends OriginCore {
  constructor(config: AgentConfig = {}) {
    super(config);
    
    // Auto-register default equipment if requested
    if (config.initialEquipment !== undefined) {
      this.registerDefaultEquipment();
    }
  }
  
  /**
   * Register all default equipment modules
   */
  registerDefaultEquipment(): void {
    const equipment = createDefaultEquipment();
    for (const equip of equipment) {
      this.registerEquipment(equip);
    }
  }
  
  /**
   * Quick task processing with auto-setup
   */
  async ask(query: string, options?: Partial<Task>): Promise<string> {
    const result = await this.processTask({
      id: `quick_${Date.now()}`,
      type: options?.type ?? 'decision',
      query,
      ...options,
    });
    
    return typeof result.output === 'string' 
      ? result.output 
      : JSON.stringify(result.output);
  }
  
  /**
   * Equip specific equipment by name
   */
  async equipEquipment(name: string): Promise<boolean> {
    return this.equip(name);
  }
  
  /**
   * Unequip equipment from a slot
   */
  async unequipEquipment(slot: EquipmentSlot): Promise<boolean> {
    return this.unequipSlot(slot);
  }
  
  /**
   * Get current state
   */
  getStatus(): {
    id: string;
    equipment: { slot: EquipmentSlot; name: string }[];
    confidence: number;
    recommendations: any[];
  } {
    const state = this.getState();
    return {
      ...state,
      recommendations: this.triggers.recommendations,
    };
  }
  
  /**
   * Optimize by removing unused equipment
   */
  async streamline(): Promise<void> {
    await this.optimize();
  }
}

// Default export
export default SuperInstanceAgent;
