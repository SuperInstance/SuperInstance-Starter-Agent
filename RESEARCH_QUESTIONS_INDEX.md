# Research Questions Index

Advancement topics and integration questions for each SuperInstance repository. Use these as investigation guides, sprint planning inputs, or research prompts.

---

## CORE FRAMEWORK

### SuperInstance-Starter-Agent
**Advancement Topics:**
1. How does the provenance chain handle concurrent task execution—does ordering matter, and can it create conflicting provenance entries?
2. What is the performance ceiling for 10 equipment slots simultaneously active—is there resource contention and how should it be managed?
3. Can equipment slots be extended beyond 10? What architectural constraints exist?
4. How should confidence zones interact across equipment—if MEMORY is GREEN but REASONING is RED, what is the combined result?
5. Can OriginCore run in distributed mode with shared provenance across multiple agent instances?

**Integration Questions:**
1. Which equipment slots map to which POLLN cell types, and should there be a 1:1 mapping or many-to-many?
2. How does OriginCore.processTask() receive and pass tile algebra data between equipment?
3. Should the agent self-optimize() based on cell confidence history in POLLN spreadsheets?
4. What interface does OriginCore expose for external monitoring dashboards to subscribe to events?
5. How does the agent determine task type for auto-equipment selection—NLP classification or rule-based patterns?

---

### polln
**Advancement Topics:**
1. How does cell decomposition handle circular dependencies between named tiles?
2. What is the maximum tile grid dimension before GPU memory constraints impact performance?
3. Can confidence cascade propagate backwards (updating source cell confidence when derived cells fail)?
4. How do GPU tiles handle non-numeric data types (images, video, neural network weights)?
5. What consistency model does POLLN use for concurrent cell updates from multiple agents?
6. How does origin tracking scale as tile grids grow to millions of cells?

**Integration Questions:**
1. What API does POLLN expose for OriginCore to read/write cells programmatically?
2. How do Equipment modules map their outputs to specific cell types in POLLN?
3. Should confidence zones (GREEN/YELLOW/RED) in Starter-Agent map directly to POLLN's confidence cascade thresholds?
4. Can POLLN cells trigger equipment activation in Starter-Agent (reverse integration)?
5. What format do tiles use for cross-agent synchronization—JSON, binary, or CRDT-based?

---

### SuperInstance-papers
**Advancement Topics:**
1. Which of the 15 incomplete papers are blocking production implementations?
2. Do the simulation results match actual production behavior in deployed equipment?
3. How does the origin-centric paradigm prevent Byzantine faults in distributed settings?
4. What mathematical proofs exist for confidence zone boundaries (why 0.9, 0.6)?
5. Are there performance predictions in papers that haven't been validated against actual equipment?

**Integration Questions:**
1. Which paper formalizes the tile algebra and can it be used to generate equipment test suites?
2. Is there a paper describing how multiple equipment slots should interact during a single task?
3. Do papers define standard interfaces that all equipment must implement?
4. Which paper covers confidence propagation across chained equipment calls?

---

## EQUIPMENT SYSTEMS

### Equipment-Escalation-Router
**Advancement Topics:**
1. How does the router detect when a pattern becomes stale and needs re-routing (cache invalidation strategy)?
2. Can Bot→Brain→Human routing be bidirectional (Human tier providing feedback to improve Bot patterns)?
3. What happens when daily budget exhausts—does the agent stop or default to cheapest tier?
4. How is "complexity" quantified to route between tiers—token count, semantic complexity, or domain-specific rules?
5. Can the router learn from outcome-tracker feedback to improve routing accuracy over time?

**Integration Questions:**
1. How does this integrate with OriginCore's equipment slot system—does it occupy the REASONING slot?
2. Can multiple equipment modules share the same escalation router instance?
3. Should routing decisions appear in POLLN spreadsheet cells for transparency?
4. How does the router handle equipment-specific tasks (e.g., memory operations vs reasoning operations)?
5. Can Equipment-Self-Improvement modify the router's tier thresholds based on observed performance?

---

### Equipment-Memory-Hierarchy
**Advancement Topics:**
1. How does the Ebbinghaus forgetting curve interact with procedural memories—do skills decay differently than facts?
2. What triggers cross-tier consolidation (Working→Episodic→Semantic)—time, access frequency, or confidence?
3. Can two memory equipment instances share a semantic tier (shared knowledge base across agents)?
4. How does emotional context in episodic memory affect retrieval—can emotion-based queries work?
5. When Working Memory is full (7±2 items), what eviction strategy preserves most important context?

**Integration Questions:**
1. How does this map to hierarchical-memory Python repo—are they interchangeable or complementary?
2. Should POLLN spreadsheet cells read memory state directly, or only through the agent?
3. Can vector-search repo provide the embedding backbone for semantic memory retrieval?
4. How does Equipment-Teacher-Student extract procedural memories as distilled skills?
5. What format does memory use to persist across agent generations (compatible with Baton handoffs)?

---

### Equipment-Consensus-Engine
**Advancement Topics:**
1. How are domain weights calibrated—empirically, expert-defined, or learned from outcome data?
2. What happens when all 8 conflict resolution strategies fail—is there a fallback escalation?
3. Can consensus run asynchronously with agents that have different confidence levels?
4. How does Ethos (ethics) weighting differ across cultures or organizational contexts?
5. Can the engine detect manipulation—when one agent's Pathos argument unfairly dominates?

**Integration Questions:**
1. Should each equipment module in Starter-Agent produce Pathos/Logos/Ethos scores for consensus to aggregate?
2. How does consensus output integrate with the POLLN cell's final confidence score?
3. Can tripartite-rs (Rust implementation) serve as the production backend for this TypeScript interface?
4. How do audit trails export to POLLN for visualization as row-by-row deliberation history?
5. Does Equipment-Swarm-Coordinator call consensus before finalizing multi-agent decisions?

---

### Equipment-Swarm-Coordinator
**Advancement Topics:**
1. How does asymmetrical knowledge distribution prevent agents from duplicating each other's work?
2. What coordination overhead does the swarm add per agent—is it O(N), O(N log N), or O(N²)?
3. How do agents join/leave swarms mid-task without disrupting ongoing coordination?
4. Can swarms self-organize topology (mesh, star, ring) based on task type?
5. How does the coordinator handle agent failures during critical coordination phases?

**Integration Questions:**
1. How does SwarmMCP (100 parallel agents at lower cost) relate to this TypeScript coordinator?
2. Can Equipment-Consensus-Engine run within a swarm for distributed deliberation?
3. How does Equipment-Context-Handoff work within a swarm—do all agents handoff simultaneously?
4. Should POLLN show swarm topology as a visual graph alongside data cells?
5. Can agent-coordinator Python repo serve as the production orchestration backend?

---

### Equipment-Context-Handoff
**Advancement Topics:**
1. How does the handoff decide what to include vs compress vs discard in the state snapshot?
2. Can handoff be aborted mid-transfer if successor agent fails to initialize?
3. How does provenance chain merge if multiple predecessors hand off to a single successor?
4. What compression algorithm is best for different task types (text-heavy vs computation-heavy)?
5. Can partial handoffs occur (transfer memory but not reasoning state)?

**Integration Questions:**
1. How does this relate to Baton/Claude_Baton—are they the same concept in different environments?
2. Should POLLN cells snapshot their state during handoff as a recoverable checkpoint?
3. Can hierarchical-memory persist across handoffs with full tier preservation?
4. Does the successor agent need to explicitly acknowledge receipt before predecessor terminates?
5. How does training-data-collector capture handoff events as training examples?

---

### Equipment-Hardware-Scaler
**Advancement Topics:**
1. How does hardware capability detection run—OS-level APIs, WebGPU detection, or benchmarking?
2. Can the scaler predict when hardware will be insufficient before starting a task?
3. How does cloud overflow handle privacy requirements—can sensitive cells refuse cloud routing?
4. What latency penalty is acceptable before triggering cloud overflow vs queuing locally?
5. Can the scaler coordinate across multiple devices for distributed local compute?

**Integration Questions:**
1. How does hardware-capability-profiler repo provide detection inputs to this equipment?
2. Should POLLN GPU-accelerated tiles route through Hardware-Scaler for assignment?
3. Can realtime-core's scheduling interface be used for hard deadline guarantees?
4. How does webgpu-profiler provide utilization data for scaling decisions?
5. Does Hardware-Scaler expose an API for other equipment to declare compute requirements?

---

### Equipment-Monitoring-Dashboard
**Advancement Topics:**
1. What is the sampling rate for live monitoring—can sub-millisecond sampling support real-time trace?
2. How does the dashboard handle monitoring of 100+ concurrent agents without performance degradation?
3. Can historical monitoring data replay task execution step by step?
4. What alerting thresholds trigger notifications (confidence drop, equipment failure, budget breach)?
5. Can the dashboard expose metrics APIs for external monitoring systems (Prometheus, Grafana)?

**Integration Questions:**
1. Is this dashboard the POLLN spreadsheet view, or a separate monitoring interface alongside it?
2. Can jepa-sentiment analyze agent "emotional state" and display it in dashboard cells?
3. How does webgpu-profiler integrate to show GPU utilization per cell in the dashboard?
4. Should Equipment-NLP-Explainer generate text summaries visible in dashboard tooltip cells?
5. Can dashboard alerts trigger Equipment-Self-Improvement to auto-optimize problem areas?

---

### Equipment-NLP-Explainer
**Advancement Topics:**
1. How does the explainer maintain factual accuracy when translating complex formulas to prose?
2. Can explanation quality be measured and improved through feedback (human ratings or outcome correlation)?
3. How does the explainer handle recursive/nested logic without producing circular explanations?
4. Can explanations be generated in multiple languages or reading levels?
5. How does explanation generation scale—is O(N) tokens of explanation per O(N) computation practical?

**Integration Questions:**
1. Should every POLLN cell have auto-generated explanations, or only flagged/uncertain cells?
2. Can the explainer produce structured JSON explanations for downstream equipment to process programmatically?
3. How does Equipment-CellLogic-Distiller output feed into the explainer (distilled logic → readable prose)?
4. Can explanations be exported as training data via training-data-collector?
5. Does the explainer support interactive Q&A (human asks "why" and gets detailed breakdown)?

---

### Equipment-Teacher-Student
**Advancement Topics:**
1. How does the deadband threshold prevent premature skill extraction (overfitting early patterns)?
2. Can student agents extract skills from teacher agents with different equipment configurations?
3. How are extracted skills validated before being promoted to procedural memory?
4. Can skill extraction happen in reverse—student identifying gaps that teacher needs to address?
5. How does the system prevent skill ossification (old skills blocking learning of better approaches)?

**Integration Questions:**
1. How does this connect to Mycelium's Loom cells (learned routines)?
2. Can extracted skills be stored in Equipment-Memory-Hierarchy's procedural tier directly?
3. Should training-data-collector capture teacher-student interactions as fine-tuning examples?
4. Can POLLN visualize skill transfer as a flow from teacher cells to student cells?
5. How does outcome-tracker validate that transferred skills actually improve performance?

---

### Equipment-Self-Improvement
**Advancement Topics:**
1. What stability constraints prevent runaway self-modification (alignment constraints, performance floors)?
2. How does self-improvement distinguish between task-specific overfitting and general capability gain?
3. Can self-improvement apply to equipment it doesn't control (e.g., improving the Escalation Router's patterns)?
4. How are modifications rolled back if self-improvement worsens performance?
5. What is the self-improvement convergence criterion—does it eventually halt or run continuously?

**Integration Questions:**
1. Can this equipment modify OriginCore.processTask() itself—and should it be allowed to?
2. How does Equipment-Monitoring-Dashboard track self-improvement changes over time?
3. Should POLLN cells show "before/after" diffs when self-improvement modifies cell logic?
4. Can Mycelium's LOG structure record self-improvement decisions as experiences?
5. Does Equipment-Teacher-Student act as the evaluation mechanism for self-improvement candidates?

---

### Equipment-CellLogic-Distiller
**Advancement Topics:**
1. How does the distiller handle LLM hallucinations—does it validate decomposed logic against source?
2. Can distilled tiles be re-composed into different logic than the original (optimization via distillation)?
3. How granular can distillation go—individual token attention patterns or only semantic steps?
4. Does distillation preserve uncertainty (output cells with confidence intervals)?
5. How does the distiller handle multi-step reasoning with branching (if/else logic in tiles)?

**Integration Questions:**
1. Is this the primary bridge between raw LLM outputs and POLLN's structured tile format?
2. Can Equipment-NLP-Explainer take distilled tiles as input to generate explanations?
3. Should distilled cells automatically populate the POLLN spreadsheet during task execution?
4. How does Equipment-Monitoring-Dashboard visualize in-progress distillation vs completed cells?
5. Can vector-search index distilled cells for retrieval during future similar tasks?

---

## SPECIALIZED PERCEPTION

### jepa-sentiment
**Advancement Topics:**
1. How does JEPA (Joint Embedding Predictive Architecture) improve over simpler sentiment models for this use case?
2. Can the 10-emotion model be extended—what would the training requirement be for new emotion categories?
3. How does VAD scoring map to agent decision-making (high arousal = more urgent routing)?
4. Can sentiment track across a conversation for emotional trajectory detection (escalating anger)?
5. What is accuracy on domain-specific text (technical documentation vs. casual conversation)?

**Integration Questions:**
1. How does Equipment-Escalation-Router use emotion scores for routing decisions?
2. Should emotional state from long-running tasks persist in Equipment-Memory-Hierarchy's episodic tier?
3. Can Equipment-Monitoring-Dashboard display agent "mood" based on accumulated sentiment signals?
4. How does emotion data propagate into POLLN cells—as metadata columns or as first-class cell types?
5. Can Equipment-Consensus-Engine use Pathos (emotion) inputs from jepa-sentiment directly?

---

### vector-search
**Advancement Topics:**
1. How does WebGPU acceleration scale with concurrent search queries from multiple equipment modules?
2. Can hybrid search weights (semantic vs keyword) be learned from click-through data?
3. What embedding model performs best for agent reasoning data (vs general text)?
4. How does IndexedDB storage handle updates (upsert vs. rebuild index)?
5. Can vector-search handle multi-modal embeddings (text + code + image in same index)?

**Integration Questions:**
1. Should Equipment-Memory-Hierarchy's semantic tier use vector-search as its backend?
2. How does Murmur's TensorDB compare to vector-search—different use cases or redundant?
3. Can POLLN cells embed their content and become searchable via vector-search?
4. Should Baton handoffs include the vector search index for semantic continuity?
5. How does In-Browser-Vector-Search repo relate—is it a UI wrapper around this library?

---

## REAL-TIME NETWORKING

### websocket-fabric
**Advancement Topics:**
1. How does zero-copy messaging interact with equipment data that requires serialization/deserialization?
2. Can backpressure management trigger Equipment-Hardware-Scaler to add capacity?
3. How does the 10K connection limit scale with swarm sizes—is connection pooling implemented?
4. What happens to in-flight messages during equipment failover?
5. Can message priority queues ensure critical agent coordination messages preempt data messages?

**Integration Questions:**
1. Is this the transport for Equipment-Swarm-Coordinator's inter-agent messages?
2. How does websocket-fabric-v2 relate—successor or parallel implementation?
3. Can POLLN use this for real-time cell sync across distributed agent teams?
4. Should ws-fabric and ws-status-indicator repos integrate as client-side companions?
5. How does ws-fabric interact with quicunnel—are they alternative transports or layered?

---

### quicunnel
**Advancement Topics:**
1. How does mTLS certificate management work at scale (1000+ agent pairs requiring mutual auth)?
2. Can stream multiplexing prioritize certain equipment data streams over others?
3. How does automatic reconnection preserve stream state (is re-connection transparent to callers)?
4. What is the latency impact of QUIC handshake vs established connection for short bursts?
5. How does quicunnel handle NAT traversal for peer-to-peer agent communication?

**Integration Questions:**
1. Should quicunnel replace or complement websocket-fabric for different use cases?
2. Can Baton handoff packages transfer via quicunnel for guaranteed delivery?
3. How does token-vault provide certificate storage for quicunnel mTLS?
4. Should DeckBoss edge agents prefer quicunnel for agent-to-agent communication?
5. Can Equipment-Monitoring-Dashboard monitor quicunnel stream health per agent pair?

---

### webrtc-stream
**Advancement Topics:**
1. How does adaptive quality interact with Equipment-Hardware-Scaler's resource allocation?
2. Can WebRTC data channels replace websocket-fabric for agent coordination (lower latency)?
3. How does FEC (Forward Error Correction) interact with real-time confidence updates?
4. Can WebRTC support 100+ agents in a mesh topology without a media server?
5. How does the 2-second peer setup time affect time-sensitive agent coordination?

**Integration Questions:**
1. Is webrtc-stream intended for human-agent video interaction or agent-agent media sharing?
2. Can jepa-sentiment process audio streams from webrtc-stream in real time?
3. How does MineWright use webrtc-stream for visual agent coordination in Minecraft?
4. Should Equipment-Monitoring-Dashboard support screen share via webrtc-stream?
5. Can POLLN cells contain embedded webrtc streams as live media data types?

---

## CONTEXT & MEMORY MANAGEMENT

### Baton
**Advancement Topics:**
1. How does domain-aware compression determine which information compresses poorly (must be preserved verbatim)?
2. Can the Ed25519 cryptographic lineage prove continuity to external auditors?
3. What happens if the successor agent rejects the Baton package (incompatible context)?
4. How does the 82% capacity trigger adapt to agents with different context window sizes?
5. Can Baton handle bidirectional handoff (agent re-acquiring its own previous state)?

**Integration Questions:**
1. How does Baton differ from Equipment-Context-Handoff—same concept, different scope?
2. Should POLLN spreadsheet state be included in Baton packages for visual continuity?
3. Can Equipment-Memory-Hierarchy automatically export to Baton format for handoffs?
4. Does Claude_Baton use Baton's core compression or have its own implementation?
5. How do multiple Baton generations chain—is it a linked list or a tree (branching)?

---

### hierarchical-memory
**Advancement Topics:**
1. How does the 384-dim vector embedding compare to modern embedding models (1536-dim OpenAI, etc.)?
2. Can procedural memory levels (1-6 mastery) map to agent equipment proficiency?
3. How does the system prevent semantic memory from growing unboundedly?
4. Can emotion/arousal metadata from episodic memory influence semantic retrieval weighting?
5. How do consolidation decisions happen—rule-based (frequency), model-based, or hybrid?

**Integration Questions:**
1. Is this a Python backend for Equipment-Memory-Hierarchy's TypeScript interface?
2. Can vector-search replace the current semantic search implementation for 10-100x speedup?
3. Should POLLN cells reference memory cells by ID to create transparent memory access logs?
4. How does this integrate with ai-character-sdk's 6-tier memory system (difference in tier counts)?
5. Can Mycelium's experience compression (64-1024 dims) feed into this memory system?

---

## SAFETY & SECURITY

### ToolGuardian
**Advancement Topics:**
1. How does execution sandboxing prevent equipment from accessing unauthorized resources?
2. Can ToolGuardian validate tool calls against a policy engine (what tools are allowed in what contexts)?
3. How does the retry mechanism handle idempotency for non-idempotent operations?
4. Can dependency management detect circular tool dependencies before execution?
5. How does natural language intent parsing handle ambiguous or adversarial inputs?

**Integration Questions:**
1. Should every equipment module in Starter-Agent route function calls through ToolGuardian?
2. How does ToolGuardian's monitoring integrate with Equipment-Monitoring-Dashboard?
3. Can ToolGuardian enforce Equipment-Escalation-Router tier limits (Bot tier can't call expensive APIs)?
4. Should POLLN cell executions be wrapped in ToolGuardian for validation and retry?
5. How does ToolGuardian integrate with token-vault for secure credential injection into tool calls?

---

### token-vault
**Advancement Topics:**
1. What are the security implications of 256MB RAM requirement for Argon2id key derivation in constrained environments?
2. How does session isolation work across equipment module boundaries?
3. Can audit logging detect credential access anomalies in real-time?
4. What is the recovery process if the vault becomes corrupted or key derivation fails?
5. Can role-based access control map to equipment slot permissions (only MEMORY equipment can access memory credentials)?

**Integration Questions:**
1. Should all equipment modules obtain credentials through token-vault rather than environment variables?
2. How does quicunnel's mTLS integrate with token-vault for certificate storage?
3. Can Equipment-Monitoring-Dashboard show credential access patterns for security visibility?
4. How does token-vault handle multi-agent shared secrets (all swarm agents need same API key)?
5. Should tripartite-rs's privacy proxy use token-vault for redaction key storage?

---

## EDGE & CLOUD

### DeckBoss
**Advancement Topics:**
1. How does Memory Weaver handle conflicts when multiple edge locations update the same memory concurrently?
2. Can the 4 Squadron Router agents (Archivist/Scout/Machinist/Sentry) be extended or replaced?
3. What happens when Cloudflare D1 (5GB) reaches capacity—graceful degradation or hard failure?
4. How does DeckBoss handle Cloudflare free tier limits during traffic spikes (10k inferences/day)?
5. Can DeckBoss self-replicate to multiple Cloudflare accounts for higher limits?

**Integration Questions:**
1. How does DeckBoss integrate with Starter-Agent—does the agent run inside DeckBoss, or call it?
2. Can POLLN spreadsheets persist in DeckBoss's 5GB D1 storage?
3. How does cocapn relate to DeckBoss—same purpose, different implementation?
4. Should Baton handoffs use DeckBoss for persistent package storage?
5. How does Equipment-Monitoring-Dashboard visualize DeckBoss edge locations and agent distribution?

---

### cocapn
**Advancement Topics:**
1. How does the Atabey Awards community system incentivize contribution from developers?
2. Can code indexing handle large monorepos (100K+ files) within Cloudflare's compute limits?
3. How does semantic search accuracy compare to traditional code search (grep/AST analysis)?
4. What happens when MCP protocol version mismatches occur between Claude Code and Cocapn?
5. Can the 4 core agents be specialized per-repository (different routing for frontend vs backend)?

**Integration Questions:**
1. Is cocapn the Claude Code companion for Starter-Agent during development?
2. How does vector-search provide the semantic search backend for code indexing?
3. Can Equipment-Monitoring-Dashboard display cocapn agent activity during Claude Code sessions?
4. Should cocapn use Equipment-Escalation-Router for code query routing (simple→Bot, complex→Brain)?
5. How does cocapn's Navigator relate to agent-coordinator's task distribution?

---

### SwarmMCP
**Advancement Topics:**
1. How does smart routing decide which Chinese AI provider handles which request type?
2. Can quota management combine multiple organization accounts per provider for higher limits?
3. How does fallback chain ordering affect overall quality vs cost tradeoffs?
4. What latency overhead does provider switching add compared to single-provider routing?
5. Can SwarmMCP providers be extended to include other providers (Anthropic, OpenAI) alongside Chinese providers?

**Integration Questions:**
1. How does SwarmMCP integrate with Equipment-Escalation-Router (two different cost optimization systems)?
2. Can Starter-Agent use SwarmMCP for the REASONING slot while keeping other slots on premium providers?
3. Should POLLN cells show per-provider cost breakdown for each computation?
4. Can outcome-tracker compare quality metrics across providers to optimize routing decisions?
5. How does jepa-sentiment validate that responses from lower-cost providers maintain expected quality?

---

## KNOWLEDGE & LEARNING

### Murmur
**Advancement Topics:**
1. How do Knowledge Tensors differ from standard knowledge graphs in structure and query capability?
2. Can the self-populating wiki handle adversarial inputs (ensuring factual accuracy)?
3. What is the performance of TensorDB compared to vector databases for retrieval?
4. How does the bulletin board prevent information overload as the wiki scales?
5. Can Murmur knowledge be exported for training data (feeding back into model fine-tuning)?

**Integration Questions:**
1. Is TensorDB a replacement for vector-search or a higher-level abstraction on top of it?
2. Should Equipment-Memory-Hierarchy's semantic tier store in Murmur's TensorDB?
3. Can POLLN cells link to Murmur wiki articles as explanatory references?
4. How does Mycelium's LOG graph compare to Murmur's tensor representation?
5. Can Baton handoff packages reference Murmur for external knowledge without embedding it?

---

### Mycelium
**Advancement Topics:**
1. How does the Plinko decision layer prevent monopolization (one agent always winning bids)?
2. Can the Marketplace for Loom trading support pricing mechanisms (high-demand skills cost more)?
3. How does Pruning/Grafting avoid premature optimization (removing skills that appear unused but are critical)?
4. Can federated learning in Mycelium preserve individual agent specialization while sharing general skills?
5. What is the emergence vision—what properties should emerge from Mycelium at scale?

**Integration Questions:**
1. Can Mycelium's Looms become directly executable equipment in Starter-Agent's slots?
2. How does outcome-tracker's reward data feed into Mycelium's learning loop?
3. Should Equipment-Teacher-Student distillations be stored as Mycelium Looms?
4. Can POLLN cells represent Mycelium's graph structure visually?
5. How does Equipment-Self-Improvement relate to Mycelium's self-organization—complementary or redundant?

---

### Spreadsheet-ai
**Advancement Topics:**
1. How do SMPbots (Seed+Model+Prompt) differ from standard agent + prompt templates?
2. Can inductive ML programming within spreadsheets run inside browser WASM or requires server-side?
3. How does "visual logic reversal" work—can it reconstruct intent from observable outputs?
4. What relationship does this have with POLLN—same idea at different abstraction levels?
5. Can spreadsheet-ai cells compose into larger programs through cell dependency graphs?

**Integration Questions:**
1. Is spreadsheet-ai the human-facing UX layer while POLLN is the computation engine?
2. How do SMPbots map to equipment modules in Starter-Agent?
3. Can visual logic reversal debug Equipment-CellLogic-Distiller outputs?
4. How does this integrate with Murmur for knowledge-enriched spreadsheets?
5. Should Equipment-NLP-Explainer generate the "visual" explanations that spreadsheet-ai displays?

---

## AI CHARACTER & AGENTS

### ai-character-sdk
**Advancement Topics:**
1. How does personality trait management affect agent decision-making—quantitative or rule-based influence?
2. Can archetype templates be combined (e.g., Analyst + Empathetic hybrid)?
3. How does reinforcement learning converge—what reward signal guides character development?
4. Can personality drift occur (character changes over time from accumulated experiences)?
5. What prevents character from being manipulated by adversarial inputs (personality injection)?

**Integration Questions:**
1. Should each Starter-Agent equipment slot have a character archetype (logical REASONING slot, empathetic COMMUNICATION slot)?
2. Can ai-character-sdk's 6-tier memory use hierarchical-memory as its backend?
3. How do character personality traits influence Equipment-Consensus-Engine's Pathos/Logos/Ethos weighting?
4. Can jepa-sentiment influence character emotional state in real-time?
5. Should POLLN cells encode the character context that influenced each cell's computation?

---

### agent-coordinator
**Advancement Topics:**
1. Which load balancing strategies work best for different task types (compute-heavy vs IO-heavy vs reasoning-heavy)?
2. How does health monitoring handle false positive failure detection (jitter causing premature failover)?
3. Can the coordinator support task preemption (higher priority task interrupts lower priority)?
4. How does the coordinator manage state consistency when an agent is rebalanced mid-task?
5. Can agent-coordinator and Equipment-Swarm-Coordinator merge into a single unified system?

**Integration Questions:**
1. Is agent-coordinator the Python backend for Equipment-Swarm-Coordinator's TypeScript interface?
2. How does agent-coordinator integrate with SwarmMCP for multi-provider agent pools?
3. Can outcome-tracker data inform load balancing decisions (route to agents with better outcome history)?
4. Should DeckBoss use agent-coordinator for its Squadron Router management?
5. How does Equipment-Monitoring-Dashboard display agent-coordinator network topology?

---

## RESEARCH & INNOVATION

### SmartCRDT
**Advancement Topics:**
1. Which CRDT types (LWW-Register, OR-Set, G-Counter) are best suited for agent memory synchronization?
2. How do self-improving CRDTs differ from standard CRDTs—what aspect improves?
3. Can SmartCRDT handle schema evolution (memory structure changes across agent generations)?
4. What are the memory overhead costs of CRDT metadata compared to base data size?
5. Can SmartCRDT be used for POLLN cell synchronization across distributed agents?

**Integration Questions:**
1. Should Equipment-Memory-Hierarchy's shared semantic tier use SmartCRDT for multi-agent sync?
2. Can POLLN cell updates use CRDT semantics for conflict-free distributed spreadsheet editing?
3. How does Murmur's TensorDB compare to SmartCRDT for distributed knowledge storage?
4. Can CRDT-based sync replace websocket-fabric's synchronization protocol?
5. How does SmartCRDT relate to CRDT_Research's theoretical framework?

---

### tripartite-rs
**Advancement Topics:**
1. How do 18 redaction patterns cover the space of privacy requirements—what's missing?
2. Can the privacy proxy be per-agent or per-cell (finer granularity redaction)?
3. How does SQLite-VSS semantic search compare to vector-search in performance?
4. What is the planned Cloud Mesh (Phase 2) architecture for distributed consensus?
5. Can the Ethos dimension be extended to cover jurisdiction-specific ethical frameworks?

**Integration Questions:**
1. Is tripartite-rs the Rust production backend for Equipment-Consensus-Engine?
2. Should privacy proxy redact POLLN cells before they're shared with other agents?
3. How does token-vault provide encryption keys to tripartite-rs's privacy proxy?
4. Can tripartite-rs serve as the consensus mechanism for SwarmMCP provider decisions?
5. How does tripartite-rs's local-first processing align with DeckBoss/cocapn edge architecture?

---

### CognitiveEngine
**Advancement Topics:**
1. What are the 5 abstraction layers and how does information transform between them?
2. How does "Dream Mode" generate novel hypotheses—stochastic exploration or systematic gap-filling?
3. Can cognitive processing run incrementally (updating conclusions as new cells arrive)?
4. How does the engine validate generated insights—are they tested against data or only internally consistent?
5. Can the engine's highest abstraction layer (Abstract Principles) generate new equipment capabilities?

**Integration Questions:**
1. Should CognitiveEngine power the REASONING slot in Starter-Agent?
2. Can cognitive abstractions link to POLLN cells at corresponding complexity levels?
3. How does Equipment-NLP-Explainer explain cognitive engine outputs at each abstraction layer?
4. Can Murmur store cognitive engine's Abstract Principles as high-level wiki entries?
5. How does Equipment-Consensus-Engine integrate with CognitiveEngine's multi-perspective reasoning?

---

### CRDT_Research
**Advancement Topics:**
1. Can the 98.4% latency reduction translate from intra-chip to inter-agent network communication?
2. What CRDT types were used for each of the 10 AI workloads tested?
3. How does O(1) scaling hold under adversarial access patterns (hot spots)?
4. Can this research inform SmartCRDT's production implementation directly?
5. What hardware requirements does CRDT cache management impose (coherence protocol support)?

**Integration Questions:**
1. Should POLLN cell synchronization architecture be informed by CRDT_Research findings?
2. Can the 52% traffic reduction apply to agent swarm coordination overhead?
3. How does this research influence Equipment-Memory-Hierarchy's shared semantic tier design?
4. Are the 10 tested workloads (ResNet, BERT, GPT, Diffusion, LLaMA) relevant to equipment design?
5. Can CRDT_Research simulations be extended to model SuperInstance equipment interactions?

---

## PERFORMANCE & MONITORING

### webgpu-profiler
**Advancement Topics:**
1. How does shader performance analysis identify optimization opportunities in tile computation?
2. Can cross-device comparison automate hardware tier recommendations?
3. What profiler overhead is acceptable for production use—can it run always-on?
4. How does the profiler handle WebGPU feature availability gaps across browsers/platforms?
5. Can profiler data feed into Equipment-Hardware-Scaler's scaling decisions automatically?

**Integration Questions:**
1. Should POLLN cell execution show GPU utilization per cell via webgpu-profiler?
2. Can Equipment-Monitoring-Dashboard embed webgpu-profiler visualizations?
3. How does profiler data inform Equipment-Self-Improvement's optimization decisions?
4. Can webgpu-profiler compare polln's GPU acceleration across hardware configurations?
5. Should webgpu-profiler PRs (10 open) be prioritized for completion?

---

### realtime-core
**Advancement Topics:**
1. How does PREEMPT_RT patching interact with container/VM environments common in cloud deployments?
2. Can Tokio async runtime meet sub-2ms jitter requirements for agent coordination?
3. How does CPU isolation interact with Equipment-Hardware-Scaler's dynamic resource allocation?
4. What use cases in the SuperInstance ecosystem actually require hard real-time (<2ms jitter)?
5. Can realtime-core's timing primitives be used in WebAssembly for browser-based agents?

**Integration Questions:**
1. Which equipment modules actually require real-time guarantees vs best-effort timing?
2. Can realtime-core power Equipment-Monitoring-Dashboard's real-time update loop?
3. How does realtime-core integrate with websocket-fabric for jitter-sensitive message delivery?
4. Should DeckBoss edge deployment use realtime-core for consistent latency guarantees?
5. Is realtime-core relevant for jepa-sentiment's real-time audio stream analysis?

---

## LEARNING & OUTCOMES

### outcome-tracker
**Advancement Topics:**
1. How does causal chain analysis avoid spurious correlations in complex multi-agent outcomes?
2. Can outcome tracking run offline and sync when connectivity is restored?
3. How do the 5 domains (Combat/Social/Exploration/Resource/Strategic) map to agent task types?
4. Can outcome signals be compressed into a single reward scalar for RL training?
5. How does temporal classification handle delayed outcomes (long-term consequences)?

**Integration Questions:**
1. How does outcome-tracker feedback close the loop with Equipment-Self-Improvement?
2. Can outcome data train Equipment-Escalation-Router's tier selection model?
3. Should POLLN cells track their outcome history (did this cell's decision lead to good outcomes)?
4. Can training-data-collector export outcome-labeled examples for fine-tuning?
5. How does Mycelium use outcome signals for its Plinko decision-layer bidding?

---

### training-data-collector
**Advancement Topics:**
1. How does QLoRA format export handle multi-turn conversations with complex tool use?
2. What quality filtering criteria determine if an agent interaction is training-worthy?
3. Can training data collection maintain privacy (anonymizing or redacting sensitive context)?
4. How does multi-character support work—does each character produce a separate dataset?
5. Can collected data be directly used for RLHF or requires additional human annotation?

**Integration Questions:**
1. Can Equipment-Teacher-Student extractions automatically generate training examples?
2. Should Baton handoffs include the training data collector's session data?
3. How does tripartite-rs's privacy proxy protect sensitive training data before collection?
4. Can POLLN cell sequences become training sequences (observation → formula → outcome)?
5. How does outcome-tracker's outcome labels pair with training data for reward modeling?

---

## SPECIALIZED SYSTEMS

### MineWright
**Advancement Topics:**
1. How do script layers enable agents to learn new skills without retraining the base model?
2. What security policies govern agent actions in Minecraft (griefing prevention, resource limits)?
3. Can MineWright's construction coordination generalize to other simulation environments?
4. How does the agent onboarding system teach new agents the Minecraft world state efficiently?
5. Can MineWright serve as a benchmark environment for testing equipment integration?

**Integration Questions:**
1. Can MineWright use Equipment-Swarm-Coordinator for multi-agent construction crews?
2. Should Equipment-Memory-Hierarchy store Minecraft world knowledge in semantic tier?
3. Can webrtc-stream provide visual data (screen capture) to MineWright's perception system?
4. How does outcome-tracker measure construction quality/efficiency for MineWright agents?
5. Can training-data-collector capture Minecraft gameplay for learning new script layers?

---

### claudesclaude
**Advancement Topics:**
1. How does BitOrchestrator achieve 97% memory reduction—what information is compressed away?
2. Can BinaryOrchestrator's 100x serialization speedup be applied to Baton handoff packages?
3. How do 18+ orchestrators decide which one handles a given task?
4. Does Bun runtime provide meaningful advantages over Node.js for agent orchestration?
5. Can AtomicOrchestrator's lock-free operations handle the concurrency requirements of Equipment-Swarm-Coordinator?

**Integration Questions:**
1. Can claudesclaude orchestrators replace or enhance Equipment-Swarm-Coordinator?
2. How does WasmOrchestrator's WebAssembly acceleration complement polln's GPU acceleration?
3. Can BitOrchestrator's memory reduction extend Equipment-Memory-Hierarchy's working memory capacity?
4. Should PooledOrchestrator manage Equipment slot lifecycle in Starter-Agent?
5. How does claudesclaude's approach differ from SwarmMCP's multi-provider approach?

---

## UNDOCUMENTED REPOS - PRIORITY RESEARCH QUESTIONS

### Model Management (6 repos)
**Key Questions:**
1. What interface does `multi-provider-router` expose—is it compatible with Equipment-Escalation-Router?
2. Does `local-model-manager` support Ollama/LMStudio/vLLM or custom model servers?
3. Can `provider-abstraction-layer` unify OpenAI/Anthropic/Chinese providers behind one interface?
4. How does `llm-cost-calculator` integrate with outcome-tracker for per-task cost attribution?
5. Is `ai-token-counter` provider-agnostic or tied to specific tokenizers?

---

### Storage & Embedding (5 repos)
**Key Questions:**
1. Does `Automatic-Type-Safe-IndexedDB` auto-generate TypeScript types from schema or vice versa?
2. Can `Claude-prism-local-json` serve as Baton's local package storage backend?
3. How does `embedding-utils` normalize vectors across different embedding model dimensions?
4. Is `In-Browser-Vector-Search` a UI wrapper around vector-search or a separate implementation?
5. What `caching-service` eviction strategy is used, and does it support cache warming?

---

### Infrastructure & Utilities (6 repos)
**Key Questions:**
1. Does `conversation-toolkit` handle multi-turn context management or only single-turn formatting?
2. Can `streaming-response-handler` support server-sent events in addition to WebSocket streams?
3. How does `rate-limiting-service` coordinate across distributed agents (shared state or per-agent)?
4. Does `Central-Error-Manager` support error aggregation across equipment modules?
5. How does `health-monitoring-service` integrate with Equipment-Monitoring-Dashboard?

---

### Research & Experimental (7 repos)
**Key Questions:**
1. Does `Rubiks-Tensor-Transformer` use the Rubik's cube as a metaphor for tensor rotation operations?
2. What is `platonic-randomness`—randomness derived from Platonic solid geometry for unbiased sampling?
3. Can `voxel-logic` extend POLLN's tile algebra to 3D voxel grids for spatial reasoning?
4. What are `Ghost-tiles`—invisible computation cells or placeholder tiles with lazy evaluation?
5. How does `higher-abstraction-vocabularies` relate to CognitiveEngine's abstraction layers?

---

## CROSS-CUTTING RESEARCH QUESTIONS

### Architecture & Coherence
1. What is the canonical interface that all equipment must implement to be compatible with Starter-Agent?
2. How should confidence scores aggregate across multiple equipment modules (averaging, minimum, weighted)?
3. What is the standard data format for passing context between equipment (JSON, typed objects, binary)?
4. How does the system handle equipment version mismatches (e.g., Memory v1 ↔ Consensus v2)?
5. Should there be a central equipment registry shared across all SuperInstance repos?

### POLLN Integration
1. What is the minimum tile schema that all equipment outputs must conform to for POLLN compatibility?
2. How do equipment confidence scores map to POLLN's confidence cascade thresholds?
3. Can POLLN cells invoke equipment directly, or only via OriginCore.processTask()?
4. How does POLLN handle equipment that produces non-deterministic outputs for the same inputs?
5. Should POLLN be the primary debugging interface for all SuperInstance equipment?

### Security & Privacy
1. Which equipment modules access sensitive data and need token-vault credential injection?
2. How does the system prevent equipment from exfiltrating data through side channels?
3. Should tripartite-rs privacy proxy sit between all equipment modules and external APIs?
4. How does audit logging cover the full provenance chain from input to output across equipment?
5. Can the system enforce data residency (EU data stays in EU edge nodes)?

### Scaling & Performance
1. What is the performance bottleneck when all 10 equipment slots are simultaneously active?
2. How many active agents can a single DeckBoss/cocapn deployment support?
3. What is the expected end-to-end latency from task input to POLLN cell output across the full stack?
4. Can the SwarmMCP 12x cost savings combine with Equipment-Escalation-Router's 40x savings for 480x total?
5. At what point should a SuperInstance deployment transition from single-agent to swarm mode?

### Observability & Debugging
1. What tracing format (OpenTelemetry, Jaeger, custom) should span the full equipment call chain?
2. How can developers replay a failed task with identical inputs to reproduce equipment behavior?
3. Can Equipment-Monitoring-Dashboard expose metrics compatible with Prometheus/Grafana?
4. How should equipment logs be structured for automated anomaly detection?
5. What is the rollback procedure when self-improvement makes performance worse?
