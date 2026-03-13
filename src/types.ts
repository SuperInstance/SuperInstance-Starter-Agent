/**
 * SuperInstance Starter Agent - Core Types
 * 
 * Based on Origin-Centric Data Systems and Tile Algebra formalization
 */

// ============================================
// Origin-Centric Types (from OCDS paper)
// ============================================

/**
 * An origin node is a computational unit characterized by:
 * - Unique identifier
 * - Local reference frame
 * - Local state
 * - History of received information
 */
export interface OriginNode {
  id: string;
  referenceFrame: ReferenceFrame;
  state: OriginState;
  history: InformationHistory;
}

/**
 * Reference frame transformation from node i to node j
 * R_{i→j} = T_{i→j} · R_j
 */
export interface ReferenceFrame {
  type: 'local' | 'relative' | 'global';
  transformation?: TransformationMatrix;
  parent?: string;  // Parent origin ID
}

/**
 * Origin-centric state at node i
 * S_i = (O_i, D_i, T_i, Φ_i)
 */
export interface OriginState {
  origin: ProvenanceChain;      // O_i - provenance chain
  data: DataPayload;             // D_i - data payload
  transformations: Transform[];  // T_i* - transformation history
  function: StateFunction;       // Φ_i - functional relationship
}

/**
 * Provenance chain - immutable, append-only
 * O = (o_0, t_1, o_1, t_2, ..., t_n, o_n)
 */
export interface ProvenanceChain {
  entries: ProvenanceEntry[];
  immutable: true;
}

export interface ProvenanceEntry {
  originId: string;
  transformation: Transform;
  timestamp: number;
  signature?: string;
}

/**
 * Rate-based update
 * Δ_i = (dD_i/dt, dT_i/dt, dΦ_i/dt)
 */
export interface RateBasedUpdate {
  dataRate: number;       // dD/dt
  transformRate: number;  // dT/dt
  functionRate: number;   // dΦ/dt
  lastUpdate: number;
}

// ============================================
// Tile Algebra Types (from Tile Algebra paper)
// ============================================

/**
 * A tile is a typed computational unit with explicit confidence tracking
 * Tile T = (I, O, f, c, τ)
 */
export interface Tile<I = any, O = any> {
  inputType: TypeSchema;
  outputType: TypeSchema;
  compute: ComputeFunction<I, O>;
  confidence: ConfidenceFunction<I>;
  trace: TraceFunction<I>;
}

export type TypeSchema = 
  | { type: 'primitive'; name: 'number' | 'string' | 'boolean' | 'null' }
  | { type: 'array'; element: TypeSchema }
  | { type: 'object'; properties: Record<string, TypeSchema> }
  | { type: 'union'; members: TypeSchema[] }
  | { type: 'tile'; tileId: string };

export type ComputeFunction<I, O> = (input: I) => O;
export type ConfidenceFunction<I> = (input: I) => number;
export type TraceFunction<I> = (input: I) => string;

/**
 * Confidence zones from Tile Algebra
 */
export type ConfidenceZone = 'GREEN' | 'YELLOW' | 'RED';

export function getConfidenceZone(confidence: number): ConfidenceZone {
  if (confidence >= 0.9) return 'GREEN';
  if (confidence >= 0.6) return 'YELLOW';
  return 'RED';
}

/**
 * Tile composition operators
 */
export interface TileComposition {
  type: 'sequential' | 'parallel' | 'conditional';
  tiles: Tile[];
  predicate?: (input: any) => boolean;  // For conditional
}

// ============================================
// Equipment System Types
// ============================================

/**
 * Equipment slots represent capability domains
 */
export type EquipmentSlot = 
  | 'MEMORY'
  | 'REASONING'
  | 'CONSENSUS'
  | 'SPREADSHEET'
  | 'DISTILLATION'
  | 'PERCEPTION'
  | 'COMMUNICATION'
  | 'COORDINATION';

/**
 * Equipment interface - all equipment must implement this
 */
export interface Equipment {
  // Identity
  readonly name: string;
  readonly slot: EquipmentSlot;
  readonly version: string;
  readonly description: string;
  
  // Lifecycle
  equip(agent: OriginCore): Promise<void>;
  unequip(agent: OriginCore): Promise<void>;
  
  // Performance metrics
  readonly cost: CostMetrics;
  readonly benefit: BenefitMetrics;
  
  // Trigger thresholds
  readonly triggerThresholds: TriggerThresholds;
  
  // Self-description
  describe(): EquipmentDescription;
  
  // Tile interface (equipment IS a tile)
  asTile(): Tile;
}

export interface CostMetrics {
  memoryBytes: number;
  cpuPercent: number;
  latencyMs: number;
  costPerUse: number;
}

export interface BenefitMetrics {
  accuracyBoost: number;
  speedMultiplier: number;
  confidenceBoost: number;
  capabilityGain: string[];
}

export interface TriggerThresholds {
  equipWhen: Condition[];
  unequipWhen: Condition[];
  callTeacher: DeadbandRange;
}

export interface Condition {
  metric: 'confidence' | 'load' | 'complexity' | 'memory' | 'error_rate';
  operator: '<' | '<=' | '>' | '>=' | '==' | '!=';
  value: number;
}

export interface DeadbandRange {
  low: number;
  high: number;
  teacherEndpoint?: string;
}

export interface EquipmentDescription {
  name: string;
  slot: EquipmentSlot;
  purpose: string;
  whenToUse: string[];
  whenToRemove: string[];
  dependencies: EquipmentSlot[];
  conflicts: string[];
}

// ============================================
// Origin Core Types
// ============================================

/**
 * The minimal agent core - an Origin Node with Equipment Registry
 */
export interface OriginCore {
  // From OriginNode
  id: string;
  referenceFrame: ReferenceFrame;
  state: OriginState;
  history: InformationHistory;
  
  // Rate-based updates
  rates: RateBasedUpdate;
  
  // Equipment system
  equipment: Map<EquipmentSlot, Equipment>;
  availableEquipment: Map<string, Equipment>;
  triggers: TriggerRegistry;
  
  // Spreadsheet integration
  cellPosition?: CellPosition;
  tiles: Map<string, Tile>;
}

export interface InformationHistory {
  entries: HistoryEntry[];
  maxSize: number;
}

export interface HistoryEntry {
  timestamp: number;
  type: 'input' | 'output' | 'transformation' | 'equipment_change';
  data: any;
  confidence: number;
  source: string;
}

export interface CellPosition {
  sheet: string;
  row: number;
  column: string;
  range?: string;
}

// ============================================
// Trigger System Types
// ============================================

export interface TriggerRegistry {
  thresholds: ThresholdConfig;
  monitors: TriggerMonitor[];
  recommendations: EquipmentRecommendation[];
}

export interface ThresholdConfig {
  confidence: { low: number; high: number };
  load: { low: number; high: number };
  complexity: { low: number; high: number };
  memory: { low: number; high: number };
}

export interface TriggerMonitor {
  metric: string;
  currentValue: number;
  threshold: number;
  action: 'equip' | 'unequip' | 'call_teacher' | 'alert';
  equipment?: string;
}

export interface EquipmentRecommendation {
  equipment: string;
  slot: EquipmentSlot;
  reason: string;
  confidence: number;
  autoEquip: boolean;
}

// ============================================
// Task Processing Types
// ============================================

export interface Task {
  id: string;
  type: TaskType;
  query: string;
  context?: Record<string, any>;
  stakes?: number;        // 0-1, importance of getting it right
  urgencyMs?: number;     // Time constraint
  requiredCapabilities?: EquipmentSlot[];
  preferredEquipment?: string[];
}

export type TaskType = 
  | 'decision'
  | 'analysis'
  | 'generation'
  | 'distillation'
  | 'coordination'
  | 'learning'
  | 'visualization';

export interface TaskResult {
  taskId: string;
  output: any;
  confidence: number;
  zone: ConfidenceZone;
  equipmentUsed: EquipmentSlot[];
  processingTimeMs: number;
  provenance: ProvenanceChain;
  calledTeacher: boolean;
}

// ============================================
// Spreadsheet Integration Types
// ============================================

export interface SpreadsheetTile {
  name: string;
  position: CellPosition;
  type: TileType;
  value: any;
  confidence: number;
  dependencies: string[];
  formula?: string;
}

export type TileType = 
  | 'data_origin'
  | 'decision_logic'
  | 'transformation'
  | 'confidence'
  | 'named_interface';

export interface SpreadsheetState {
  tiles: Map<string, SpreadsheetTile>;
  origin: string;
  lastUpdate: number;
}

// ============================================
// Agent Configuration
// ============================================

export interface AgentConfig {
  id?: string;
  initialEquipment?: EquipmentSlot[];
  thresholds?: Partial<ThresholdConfig>;
  historyMaxSize?: number;
  spreadsheet?: {
    enabled: boolean;
    sheetName?: string;
  };
  teacherEndpoint?: string;
  debug?: boolean;
}

// ============================================
// Transformation Types
// ============================================

export interface TransformationMatrix {
  data: number[][];
  dimensions: number;
}

export interface Transform {
  id: string;
  type: string;
  input: any;
  output: any;
  timestamp: number;
}

export type StateFunction = (origin: ProvenanceChain, transforms: Transform[]) => any;

export interface DataPayload {
  type: string;
  value: any;
  schema?: TypeSchema;
  metadata?: Record<string, any>;
}
