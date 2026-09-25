# Think Beyond Marketing

Think Beyond Marketing is an AI-powered business and brand intelligence workspace designed to progressively transform an early-stage founder's rough concept into a structured, validated, and launch-ready brand system.

The product does not operate as a generic conversational chatbot or logo generator. Instead, it provides a staged, state-driven reasoning workspace where each phase of venture definition produces structured intelligence consumed by subsequent analytical stages.

---

## Problem

Early-stage founders often struggle to convert raw, unstructured intuition into an actionable business and brand system. Traditional AI tools tend to process a founder's idea in a single, unstructured prompt, producing generic advice, superficial marketing copy, or hallucinated market figures without contextual depth.

Think Beyond Marketing solves this by enforcing staged reasoning:
1. Deconstructing raw intuition into structured business vectors.
2. Grounding subsequent analytical and brand stages in persistent project state.
3. Preventing generic outputs by requiring concrete discovery inputs before proceeding to feasibility, market research, and brand architecture.

---

## Application Shell & Information Architecture

The application is structured as a dedicated intelligence workspace consisting of three primary zones:

```
┌──────────────────────────────────────────────────────────┐
│ TOP APPLICATION HEADER                                   │
│ Brand Identity • Project Context • Status • Theme Toggle │
├───────────────┬──────────────────────────────────────────┤
│               │                                          │
│ LEFT SIDEBAR  │          PRIMARY PAGE WORKSPACE          │
│               │                                          │
│ 01 Idea Lab   │  (Active Stage 01 Discovery Canvas or    │
│ 02 Feasibility│   Dignified Downstream Stage Staging)    │
│ 03 Market     │                                          │
│ 04 Roadmap    │                                          │
│ 05 Build      │                                          │
│ 06 Execution  │                                          │
│ 07 Simulation │                                          │
│ 08 Growth     │                                          │
│ 09 Report     │                                          │
│               │                                          │
└───────────────┴──────────────────────────────────────────┘
```

### Top Application Header
- **Brand Identity**: `Think Beyond Marketing` with workspace badge.
- **Active Project Context**: Displays the current project name (e.g., `Untitled Venture`).
- **Discovery Status Badge**: Visual indicator of stage readiness (`In Discovery` vs. `Discovery Ready`).
- **Canvas Reset**: Provides a guarded action to clear the active project session.

### Left Sidebar Navigation
- **Persistent on Desktop**: Fixed left sidebar displaying all 9 product stages with real-time status.
- **Responsive on Tablet/Mobile**: Collapses into an accessible drawer with backdrop overlay, never consuming the full viewport.
- **Visual State Indicators**:
  - `● Active`: The current route being viewed.
  - `✓ Done`: Completed stage milestones.
  - `○ Ready`: Unlocked downstream stages whose prerequisites are met.
  - `○ Locked`: Future stages requiring prior stage completion.

---

## Product Workflow & Route Architecture

Each major phase in the founder's journey is mapped to a distinct URL route:

| Stage | Route | Status | Description |
| :--- | :--- | :--- | :--- |
| **01. Idea Lab** | `/idea-lab` | **IMPLEMENTED** | Active discovery workspace with founder interview, venture classification, footprint capture, and idea snapshot synthesis. |
| **02. Feasibility & Viability** | `/feasibility` | **IMPLEMENTED** | Staged decision-support engine evaluating 9 feasibility dimensions, categorized risks, assumptions, open questions, validation plan, and Stage 03 handoff. |
| **03. Market Intelligence** | `/market-intelligence` | **IMPLEMENTED** | Visual macro intelligence command center with dynamic 2-axis positioning matrix, real competitor verification, customer clusters, opportunity whitespace map, zero-fake TAM/SAM/SOM sizing, 3x3 risk heatmap, AI Council synthesis, Business Specialist chatbot, and Stage 04 Brand Brief handoff. |
| **04. Brand Roadmap** | `/brand-roadmap` | **IMPLEMENTED** | Visual Brand Intelligence Workspace featuring 7-node Brand Strategy Pipeline, Market Whitespace Map, 6-node Causal Chain Differentiator, Cross-Orbit Brand DNA Diagram, 6-step Positioning Builder, Voice Spectrums, Parametric Logo Generator, Color & Typography Systems, 7-Stage Customer Journey Line, Milestone Timeline, Decision Board, and Stage 05 Build Dossier Handoff. |
| **05. Build & Architecture** | `/build` | **IMPLEMENTED** | Product Architecture Command Center: Build Readiness Overview with SVG circular dials, Product Blueprint Causal Chain, MVP Scope Prioritization Matrix (MoSCoW with 2D Value vs Complexity Canvas), Feature Tree, Multi-Tier System Architecture Visualizer, Tech Stack Builder, Data Entity Model (ERD), User Flow Specs, Screen Sitemap, API Integration Network, 8-Stage AI Cognitive Loop, 5-Stage Multi-Agent Build Council, Build Dependency Graph (DAG), 3-Phase Roadmap, 2D Visual Build Risk Matrix (Probability × Impact), Brand → Product Consistency Bridge, Architecture Challenger Stress Tests, Specialist Chat, and Stage 06 Handoff Dossier. |
| **06. Execution Intelligence** | `/execution` | **IMPLEMENTED** | Operational execution command center supporting both Physical & Software pathways: Supply chain relationship flow, nearby geographic/regional procurement mapping, software execution workspace (cloud architecture, dev roadmap, CI/CD), sales & distribution channels, marketing acquisition loops, execution checklists, and contextual intelligence modals. |
| **07. Experience Simulation** | `/simulation` | **IMPLEMENTED** | Dynamic dual-modality venture simulation: 3D physical product viewport & unboxing canvas (materials, lighting, exploded view), interactive clickable software prototype view, dynamic appearance controls (theme, style, accent), underlying assumption ledger, and 5-role simulation agent feedback bar. |
| **08. Launch & Growth** | `/launch-growth` | **IMPLEMENTED** | Go-to-market execution and monitoring hub: Live launch control card with readiness scores, brand monitoring radar (sentiment analysis, competitor watching, review tracking), video reels canvas player for social promotional assets, referral & affiliate growth tools, and PR distribution workflows. |
| **09. Brand Intelligence Report** | `/report` | **IMPLEMENTED** | Comprehensive multi-page Executive Brand Intelligence Report (accessible via Launch & Growth or modal): Consolidates all 9 stages into an exportable, investor-grade executive dossier featuring radar charts, strategic takeaways, AI council synthesis, unit economics, risk register, and brand book. |

---

## Visual Theme System (Permanent Dark Workspace)

*Think Beyond Marketing* uses a single, permanent dark visual system specifically tailored for an AI-powered business and brand intelligence workspace:

- **Deep Foundation**: Main background (`#080B10`), header & sidebar background (`#0B1017`).
- **Architectural Surfaces**: Deep slate cards (`#111823`) and elevated surfaces (`#151E2B`) for clear layer differentiation.
- **Structural Borders**: Precision slate borders (`#263244` / `#34445A`) providing clean structural delineation.
- **High-Contrast Typography**:
  - Primary: Off-white (`#F3F4F6`, WCAG AAA compliant)
  - Secondary: Muted slate (`#AAB4C3`, WCAG AA compliant)
  - Muted: Subdued slate (`#738095`, accessible metadata & captions)
- **Restrained Accents**: Primary blue (`#4D8DFF`), bright blue (`#6EA8FF`), and cyan accent (`#45D4E8`).
- **Data Grounding Badges**: Strict evidence distinction between `VERIFIED / USER INPUT`, `AI INFERENCE`, `ASSUMPTION`, and `NEEDS VALIDATION`.

---

## Completed Implementations

### Stage 01 — Idea Lab (`/idea-lab`)
- **Transformation Pipeline**: Hero visualization mapping the venture journey (`Raw Idea` -> `Understand` -> `Validate` -> `Differentiate` -> `Build` -> `Launch`).
- **Founder Dilemma Entry Points**: Interactive dilemma triggers (Viability, Audience, Competition, Positioning, Brand System) that dynamically populate the interviewer.
- **Business Intelligence Interviewer**: Specialized conversational interface capturing the founder's raw intuition.
- **Venture & Product Classification**: Categorization across 7 models (Physical Product, Software / SaaS, Marketplace, Service, Community, Creator Brand, Other).
- **Geographic & Operational Footprint**: Explicit capture of location, delivery presence (`Online`, `Offline`, `Hybrid`), and customer archetype (`B2C`, `D2C`, `B2B`, `B2B2C`).
- **Adaptive Discovery Flow**: Progressive interview tabs covering persona, core pain points, differentiation/moats, constraints, and open founder questions.
- **Initial Idea Snapshot**: Real-time summary consolidating user-provided inputs into an inspectable stage output with an unlocking CTA for Stage 02.

### Stage 02 — Feasibility & Viability Engine (`/feasibility`)
- **Core Decision Question**: *"Is this business idea realistically worth pursuing, and what could prevent it from succeeding?"*
- **Continuous Data Flow (Stage 01 → Stage 02)**: Directly consumes the structured project state produced by Idea Lab without asking the founder to re-enter information.
- **9 Structured Assessment Dimensions**:
  1. *Market Feasibility*: Problem-solution fit, audience clarity, demand urgency.
  2. *Customer Feasibility*: Reachability, adoption friction, switching costs.
  3. *Business Model Feasibility*: Revenue mechanics, gross margin dynamics, unit contribution logic.
  4. *Operational Feasibility*: People, processes, fulfillment logistics, supplier dependencies.
  5. *Technical Feasibility*: Contextualized software/cloud or physical manufacturing constraints (zero forced irrelevant criteria).
  6. *Financial / Economic Feasibility*: Cost structures, CAC payback sensitivities, working capital realities (zero fake revenue claims).
  7. *Location / Geographic Feasibility*: Local compliance, domestic shipping, regional carrier realities, and explicit missing-location warnings.
  8. *Competitive Feasibility*: Based strictly on known differentiation; flags unknown competitors as *"Needs validation in Market Intelligence"*.
  9. *Execution Feasibility*: Core team capabilities, MVP scoping constraints, velocity blockers.
- **Transparent Assessment Model**:
  - Ratings: `Strong`, `Moderate`, `Weak`, `Needs Validation`.
  - Confidence: `High`, `Medium`, `Low`.
  - Mandatory Evidence Classification: Explicitly flags each data point as `VERIFIED / USER INPUT`, `AI INFERENCE`, `ASSUMPTION`, or `NEEDS VALIDATION`.
- **Categorized Risk Analysis**: Prioritized failure modes with impact rationale, empirical validation/falsification tests, and recommended mitigations.
- **Assumptions & Strategic Open Questions**: Separates unverified business assumptions from empirical facts and highlights questions to answer before capital commitment.
- **Founder Validation Action Plan**: Interactive checklist with low-cost validation experiments, completion tracking, progress bar, and ability to add custom validation tasks.
- **Stage 02 → Stage 03 Handoff Dossier**: Synthesizes what looks promising, critical uncertainties, potential fatal blockers, and structures competitor and pricing research objectives for Stage 03 (Market Intelligence).
- **Seed Venture Test Cases**: One-click loaders for Coffee D2C (Physical Goods) and Attribution SaaS (Digital/B2B) for end-to-end evaluation testing.

### Stage 03 — Market Intelligence (`/market-intelligence`)
- **Core Decision Question**: *"Now that we know what the business is and whether the concept is feasible, what does the actual market look like?"*
- **Visual-First Command Center**: 80% visual / 20% text density with scannable charts, interactive node canvas, and filter view pills (`[All Views] [Positioning] [Segments] [Whitespace] [Risks] [AI Council & Chat]`).
- **Continuous Grounding (Stages 01 + 02 → 03)**: Consumes structured idea definitions, category models, problem/audience alignment, feasibility scores, and open validation questions.
- **Zero-Fake Data Integrity**: Zero fabricated competitors, TAM/SAM/SOM dollar figures, or growth statistics. Every data point carries explicit provenance (`USER_PROVIDED`, `VERIFIED_SOURCE`, `AI_INFERENCE`, `ASSUMPTION`, or `NEEDS_VALIDATION`).
- **Dynamic 2-Axis Positioning Matrix**:
  - Category-tailored dynamic axes (Price/Value, Domain Specialization, Delivery Model Mechanics, Sourcing Transparency).
  - Dynamic axis selectors allowing founders to switch X and Y dimensions in real-time.
  - Interactive competitor nodes with detailed inspection drawers.
  - "Add Real Competitor" inline modal saving verified market players as `USER_PROVIDED`.
- **Competitor Comparative Profiles**: Compact visual comparison cards with price tiers, core positioning, verified strengths, and vulnerable gaps.
- **Customer Segmentation & Audience Signals**: 3 dynamic customer clusters (Beachhead, Secondary, Expansion) with derived 0–100 relevance score bars, pain intensity ratings, buying triggers, adoption barriers, and validation interview prompts.
- **Market Opportunity & Whitespace Gap Analysis**:
  - 4-quadrant demand vs. competition map (Prime Opportunity, Crowded, Specialized Niche, Low Priority).
  - Visual contrast bars: Unmet Customer Need vs. Current Solutions vs. Open Whitespace Gap.
- **TAM / SAM / SOM Sizing Framework**: Concentric layer visualization with mathematical formula requirements and inline founder input drawer (marked `NEEDS_VALIDATION` until verified by founder).
- **Market Forces & Vector Signals**: Trend vector cards with direction indicators (rising, emerging, stable, declining, uncertain), confidence, and verified sources.
- **3×3 Risk Heatmap Matrix**: Likelihood (L, M, H) vs. Impact (L, M, H) heatmap with color-coded severity cells and interactive drill-down inspector.
- **AI Strategic Council**: Multi-agent consensus synthesis (Consensus, Critical Divergence, Founder Action Directive) with expandable debate inspection across 6 council roles.
- **Market Intelligence Business Specialist Chatbot**: Grounded conversational specialist with 8 quick-action prompts (`Analyze Market`, `Compare Competitors`, `Find Market Gaps`, `Customer Segments`, `Challenge Positioning`, `Explain Market Risk`, `Missing Evidence`, `Prepare Brand Inputs`).
- **Stage 03 → Stage 04 Handoff**: Synthesizes a structured `MarketIntelligenceBrief` persisted directly into `state.workflow.stageOutputs.marketIntelligence` with one-click transition to Stage 04 (Brand Roadmap).

### Stage 04 — Brand Roadmap & Visual Identity System (`/brand-roadmap`)
- **Core Decision Question**: *"How do we turn this validated business idea and market intelligence into a distinctive, recognizable, and strategic brand system?"*
- **Visual-First Strategy Operating System**: Node diagrams, 2D positioning map, causal flows, parametric SVG logo generator, color swatches with contrast ratings, typography specimen scale, mini brand identity board, customer journey map, and roadmap timeline with view switcher filter pills.
- **Continuous Grounding (Stages 01 + 02 + 03 → 04)**: Directly synthesizes inputs from Idea Lab (problem, target audience, differentiators), Feasibility (validated moats, unit constraints), and Market Intelligence (competitor landscape, audience clusters, market gaps).
- **16 Connected Strategic & Visual Modules**:
  1. **Brand DNA Node Map**: 9 interconnected strategic nodes (Problem, Customer, Need, Purpose, Promise, Core Value, Differentiator, Market Gap, Perception) with an interactive inspection drawer detailing provenance, originating stage, and concrete brand impact.
  2. **Market Gap → Brand Differentiator Flow**: Visual causal flow ("What are competitors doing?" → "What are they missing?" → "What gap exists?" → "What can MY brand do differently?") with interactive candidate selection and inline custom differentiator editing.
  3. **Dynamic Brand Positioning Map**: 2D coordinate matrix plotting competitors from Stage 03 against the focal venture with dynamic X/Y axis selection (e.g., Price vs. Specialization, Tech vs. Human) and custom competitor addition.
  4. **Live Positioning Statement Builder**: Geoffrey Moore formula (*For [Audience] who [Need], [Brand] is a [Category] that [Benefit] because [Reason], unlike [Alternative], we [Differentiator]*) with interactive component editing and live compiled pitch card.
  5. **Brand Personality Spectrum**: 7 calibrated dimensional sliders (Professional vs. Playful, Minimal vs. Expressive, Premium vs. Accessible, Bold vs. Calm, Traditional vs. Modern, Technical vs. Human, Serious vs. Energetic) with real-time AI baseline comparisons.
  6. **Dynamic Brand Voice System**: Selected voice traits, DO guidelines, DON'T pitfalls, and an interactive Before/After copy transformation editor demonstrating generic vs. brand voice execution.
  7. **Tagline Workspace**: 6 strategic angles (Benefit-Led, Emotional, Challenger, Premium, Functional, Aspirational) with deterministic regeneration, inline copy editing, and active selection.
  8. **Parametric SVG Logo Generator**: Real SVG vector generator producing distinct geometric and typographic concepts based on venture identity with zero external API dependencies or fake claims.
  9. **Interactive Logo Customizer**: Live fine-tuning of layout (stacked, horizontal, icon-only, wordmark-only), symbol scale, primary/secondary colors, background, corner radius, and font treatment with instant visual re-rendering.
  10. **Tokenized Color System**: 8 semantic color swatches (Primary, Secondary, Accent, Background, Surface, Text, Success, Warning) with interactive hex color pickers, WCAG contrast ratios, and continuous color strip.
  11. **Typography Specimen Scale**: 4-tier typographic preview (Display, Heading, Body, Caption/UI) rendering actual brand name, active tagline, and sample marketing copy.
  12. **Unified Brand Identity Board**: A cohesive mini brand board consolidating Logo, Name, Tagline, Color Swatches, Typography, Personality, Voice, Positioning, and Differentiator into a presentation-ready identity artifact.
  13. **Customer Experience Map**: 7 customer journey stages (Discover, Consider, Sign Up/Buy, Onboard, Use, Retain, Advocate) with expandable cards detailing customer expectation, brand touchpoint, desired emotion, brand behavior, and growth opportunity.
  14. **Brand Roadmap Timeline**: 6 phased implementation milestones (Foundation, Positioning, Identity, Touchpoints, Launch, Optimization) with deliverables and status indicators.
  15. **Brand Decision Board**: Transparent 4-quadrant tracking matrix categorizing choices into *Decided*, *Needs Review*, *Open Question*, and *Validation Required*.
  16. **Stage 05 Build Dossier Handoff**: Comprehensive 10-point audit checklist summarizing transferred brand decisions and providing a direct unlocking link to Stage 05 (Build & Architecture).

### Stage 05 — Build & Architecture Intelligence System (`/build`)
- **Core Decision Question**: *"We have validated the idea, understood the market, and established the brand. Now exactly what are we building, how will it work, what belongs in the Day-1 MVP, what technology stack will support it, and what is the execution roadmap?"*
- **Visual-First Command Center**: Highly visual workspace featuring architecture flow diagrams, 2D MoSCoW scatter matrix, entity relationship diagrams (ERD), hierarchical feature trees, directed acyclic dependency graphs (DAG), implementation phase timelines, 8-dimension risk matrices, 4-quadrant decision boards, and brand-product UI token bridges.
- **Continuous Cross-Stage Grounding (Stages 01 + 02 + 03 + 04 → 05)**: Dynamically synthesizes inputs from Idea Lab (core problem, target persona, venture classification), Feasibility (technical, financial, and operational risks), Market Intelligence (differentiation factors, whitespace gaps, customer expectations), and Brand Roadmap (colors, typography pairs, voice profiles, positioning statements).
- **Zero-Fake Data Integrity**: Zero placeholder mockups or hardcoded generic SaaS templates. Automatically tailors architecture to the venture archetype (e.g. physical coffee e-commerce vs. high-throughput SaaS attribution), marking any unresolved prerequisites as `NEEDS_INPUT` or `NEEDS_VALIDATION`.
- **20 Connected Engineering & Technical Modules**:
  1. **Build Readiness Overview**: 9 derived maturity indicators (Product, Customer, Market, Differentiation, Brand, Technical, Operational, Data, MVP) with an overall maturity score and status badges.
  2. **Product Blueprint**: Visual 6-node causal pipeline (`Problem` → `Target User` → `Core Job to be Done` → `Core Solution` → `Product Experience` → `Business Outcome`) with deep-dive inspection drawer.
  3. **Interactive MVP Scope Engine & MoSCoW Matrix**: Interactive 2D scatter matrix (Customer Value vs. Technical Complexity) with MoSCoW tier filtering (`Must Have`, `Should Have`, `Could Have`, `Not Now`), priority mutators, and modal for adding verified custom features.
  4. **Feature Architecture Tree**: Hierarchical component tree mapping feature requirements to dependent UI components, database schemas, and external APIs.
  5. **System Architecture Visualizer**: Multi-tier visualizer (`Presentation Tier`, `API / Edge Ingestion`, `Data & Storage Tier`, `External Services`) with architecture layer inspection.
  6. **Dynamic Technology Stack Builder**: 10 categorized technology selectors (Frontend, Backend, Database, Auth, Storage, Analytics, Billing, Communications, Deployment, Monitoring) with alternative dropdown selectors, lock-in evaluations, and cloud cost estimations.
  7. **Data & Entity Relational Model (ERD)**: Interactive entity schemas detailing primary/foreign keys, attribute data types, and referencing features.
  8. **Product User Flow / Lifecycle Journey**: 8-step lifecycle journey (`Discover`, `Landing Page`, `Sign Up`, `Onboarding`, `Core Value Action`, `Value Moment`, `Retention`, `Advocacy`) with required screens, backend tasks, and telemetry triggers.
  9. **Screen Architecture & Route Sitemap**: Complete route sitemap with component dependencies, MVP flags, and target user personas.
  10. **API & External Integration Map**: Audit of all third-party integrations with data exchanged, vendor lock-in risks, and fallback architectural mitigations.
  11. **AI / Intelligence Architecture Pipeline**: Multi-step structured pipeline for AI-centric ventures or craft automation justification for physical goods.
  12. **Build & Architecture Specialist Chat**: Dedicated conversational advisor with complete venture awareness across Stages 01–05 and 8 quick-action prompts.
  13. **Multi-Agent AI Council (Build Edition)**: 6 specialist perspectives (Product Strategist, Technical Architect, Business Specialist, UX Specialist, Security Specialist, Growth Specialist) with unanimous consensus, key divergence, and founder action directives.
  14. **Architecture Challenger & Stress Tests**: Production failure mode evaluations grounded in Stage 02 feasibility risks with engineering mitigations and validation experiments.
  15. **Build Dependency Graph (DAG)**: Blockers and prerequisite graph highlighting the critical path sequence from foundation to production cutover.
  16. **Build Implementation Roadmap Board**: 6 execution phases (`Foundation`, `Core MVP`, `Advanced Intelligence`, `QA & Testing`, `Launch Preparation`, `Post-Launch Optimization`) with interactive task checkboxes and custom task creator.
  17. **Build Risk Matrix (8 Dimensions)**: Comprehensive risk matrix spanning Technical, Product, Data, Security, Operational, Financial, Dependency, and Scalability dimensions with interactive filters.
  18. **Build Decision Board**: 4-quadrant certainty board (`Decided`, `Needs Review`, `Open Question`, `Validation Required`) with interactive quadrant move controls.
  19. **Brand → Product Consistency Bridge**: Visual design token bridge translating Stage 04 brand colors, typography, voice tone, and differentiators directly into UI classes, button states, and microcopy samples.
  20. **Stage 06 Execution Handoff**: 12-point audit dossier that evaluates genuine venture readiness and unlocks Stage 06 (`/execution`).

### Stage 06 — Execution Intelligence (`/execution`)
- **Core Decision Question**: *"How do we operationally execute this venture, source suppliers, establish logistics or software infrastructure, and acquire our first customers?"*
- **Dual-Modality Architecture (Physical vs. Software Pathway)**:
  - Dynamically detects the venture modality (e.g., Physical Goods vs. SaaS / Software / Marketplace) with a persistent pathway switcher to compare and customize operational models.
- **Physical Modality Capabilities**:
  - **Supply Chain Relationship Flow**: Interactive multi-tier operational visualizer tracing the complete lineage: raw material / ingredient suppliers → primary manufacturing & packaging → regional warehouse consolidation → 3PL fulfillment → end-customer delivery.
  - **Resource Procurement Map**: Multi-category sourcing dashboard (Packaging, Ingredients, Machinery, Logistics) with supplier tiers, MOQs, unit pricing models, and lead time tracking.
  - **Nearby Resources Map View**: Geographic regional supplier explorer providing realistic regional supplier discovery, contact protocols, and direct integration into the active procurement plan.
- **Software Modality Capabilities**:
  - **Software Execution Workspace**: Multi-tier cloud architecture diagram, repository setup, database schema migrations, CI/CD pipeline definition, third-party API integration secrets, and sprint milestones.
- **Shared Cross-Modality Execution Systems**:
  - **Sales & Distribution Channels**: Primary sales channel strategy (D2C e-commerce, wholesale accounts, self-serve PLG, enterprise outreach) with target conversion benchmarks.
  - **Marketing & Customer Acquisition View**: Organic vs. paid acquisition loops, beachhead traction channels, CAC targets, and conversion funnel milestones.
  - **Interactive Execution Checklist**: Comprehensive task tracker grouped by urgency (Week 1–2, Month 1, Month 2–3) with custom task addition and persistent completion state.
  - **Premium Services Section & Contextual Intelligence**: Vetted operational partner categories (legal compliance, packaging design, performance marketing) with deep-dive intelligence modals.

### Stage 07 — Experience Simulation (`/simulation`)
- **Core Decision Question**: *"What does the actual customer experience look, feel, and function like before we manufacture a physical unit or write production code?"*
- **Dual-Modality Experience Engine**:
  - **Physical 3D Experience Canvas**: High-fidelity 3D product visualization and unboxing simulator. Features interactive camera rotation, exploded view disassembly, material surface customization, lighting conditions (Studio, Daylight, Moody), and packaging unboxing step-through.
  - **Interactive Software Prototype View**: Clickable web and mobile application simulation rendering realistic interactive UI screens, navigation flows, data state transitions, and core user delight moments.
- **Simulation Appearance Customizer**: Real-time appearance engine allowing founders to toggle UI/product theme (`Light`, `Dark`, `System`), design style (`Minimal`, `Expressive`, `Compact`), accent palette, and surface elevation (`Soft`, `Elevated`, `Flat`).
- **Underlying Assumptions Ledger**: Direct connection to Stage 02 feasibility assumptions, testing customer perception, sensory expectations, and usability friction against empirical criteria.
- **Multi-Role Simulation Agent Feedback Bar**: Real-time evaluation strip with 5 automated specialist critique agents (Product Strategist, UX Designer, Packaging Engineer, Production Specialist, Target Customer Archetype) providing instant ratings, friction warnings, and improvement directives.

### Stage 08 — Launch & Growth (`/launch-growth`)
- **Core Decision Question**: *"How do we orchestrate a high-velocity launch, track market reception in real-time, generate promotional creative, and scale our initial customer base?"*
- **Launch Control Center**:
  - **Real-Time Launch Readiness Score**: 0–100 composite index calculated across all prior stages with critical path blockers and launch checklist.
  - **Launch Timeline & Playbook**: T-minus 30-day, Launch Day, and Post-Launch 60-day operational playbooks.
- **Brand Monitoring Radar**:
  - Live social sentiment tracking, brand mention volume radar, competitor launch tracking, customer review sentiment categorizer, and reputation crisis detection triggers.
- **Reel Video Canvas Player & Creative Studio**:
  - Interactive short-form social video canvas (9:16 aspect ratio) rendering motion templates, customizable hook copy, product showcases, and call-to-action overlays tailored directly to the venture's brand DNA.
- **Growth Tools Suite**:
  - Referral loop architects, viral mechanics calculator, influencer/press outreach kit, SEO/ASO target keywords, and automated customer onboarding nurture flows.

### Stage 09 — Executive Brand Intelligence Report (`/report` & Executive Dossier Modal)
- **Core Value**: Complete consolidation of the founder's entire venture journey into an investor-grade, presentation-ready executive briefing document.
- **Direct Access**: Accessible from the Launch & Growth workspace or anywhere in the application via the Stage 09 Dossier modal.
- **Comprehensive Dossier Contents**:
  - Executive Venture Summary, Brand Identity Specimen, and Positioning Narrative.
  - Visual 9-Dimension Feasibility Radar and Risk Ledger.
  - Market Whitespace Map, Competitor Matrix, and TAM/SAM/SOM Breakdown.
  - Product Architecture, MoSCoW MVP Scope, and Technical Stack.
  - Physical/Software Execution Plan, Supply Chain Map, and Operational Milestones.
  - Multi-Agent Business Council Synthesis, Consensus Directives, and Open Uncertainties.
  - One-click print-ready formatting and local state export for pitch decks and investor review.

### Cross-Stage Dynamic Business Council & Intelligence Engine
- **Universal Multi-Agent Council (`src/services/businessCouncilEngine.ts`)**:
  - 6 persistent specialist agents (Product Strategist, Technical Architect, Business Specialist, UX Specialist, Security/Compliance Specialist, Growth Marketer).
  - Grounded across all active stages, responding dynamically to founder queries, assessing trade-offs, recording explicit venture decisions (`VentureDecision`), and surfacing consensus vs. divergence.

---

## Source Architecture

The repository enforces a clean separation of concerns:

```
src/
├── components/
│   ├── common/             # Stateless UI primitives (Button, Card, Badge, Input, Textarea)
│   ├── layout/             # Shell components (AppShell, AppHeader, AppSidebar, StagePlaceholder)
│   ├── idea-lab/           # Stage 01 modules (HeroTransformation, FAQEntryPrompts,
│   │                       # InterviewerChat, ProductTypeSelector, LocationContext,
│   │                       # DiscoveryFlow, IdeaSnapshot)
│   ├── feasibility/        # Stage 02 modules (FeasibilityHeader, FeasibilityOverview,
│   │                       # FeasibilityMatrix, RiskMatrix, AssumptionsAndQuestions,
│   │                       # ValidationPlan, DecisionAndHandoff)
│   ├── market-intelligence/# Stage 03 modules (MarketHeader, PositioningMatrix,
│   │                       # CompetitorComparisonView, CustomerSegmentsView,
│   │                       # OpportunityWhitespaceMap, MarketSizeFrameworkView,
│   │                       # MarketTrendsView, MarketRiskHeatmap, AICouncilPanel,
│   │                       # MarketSpecialistChat, MarketDecisionAndHandoff)
│   ├── brand-roadmap/      # Stage 04 modules (BrandRoadmapHeader, BrandDNAMap,
│   │                       # MarketGapDifferentiator, BrandPositioningMap,
│   │                       # PositioningStatementBuilder, BrandPersonality,
│   │                       # BrandVoice, TaglineBuilder, LogoGenerator,
│   │                       # LogoCustomizer, LogoConceptCard, ColorSystem,
│   │                       # TypographySystem, BrandIdentityBoard,
│   │                       # CustomerExperienceMap, BrandRoadmapTimeline,
│   │                       # BrandDecisionBoard, BrandHandoff)
│   ├── build-architecture/ # Stage 05 modules (BuildHeader, BuildReadinessOverview,
│   │                       # ProductBlueprint, MVPScopeMatrix, FeatureArchitectureTree,
│   │                       # SystemArchitectureVisualizer, TechStackBuilder, DataEntityModel,
│   │                       # ProductUserFlow, ScreenArchitecture, APIIntegrationMap,
│   │                       # AIArchitectureDiagram, BuildSpecialistChat, AICouncilBuildPanel,
│   │                       # ArchitectureChallenger, BuildDependencyGraph, BuildRoadmapBoard,
│   │                       # BuildRiskMatrix, BuildDecisionBoard, BrandProductConsistency,
│   │                       # BuildHandoff)
│   ├── execution/          # Stage 06 modules (ExecutionHeader, ExecutionOverview,
│   │                       # SupplyChainRelationshipFlow, ResourceProcurementMap,
│   │                       # NearbyResourcesMapView, SoftwareExecutionWorkspace,
│   │                       # SalesDistributionView, MarketingAcquisitionView,
│   │                       # ExecutionChecklist, PremiumServicesSection,
│   │                       # ContextualIntelligenceModal)
│   ├── simulation/         # Stage 07 modules (SimulationHeader, PhysicalSimulationViewport,
│   │                       # Physical3DExperienceCanvas, SoftwareInteractivePrototypeView,
│   │                       # SimulationAppearanceControls, SimulationAssumptionsCard,
│   │                       # SimulationAgentBar)
│   └── growth/             # Stage 08 & 09 modules (LaunchControlCard, BrandMonitoringCenter,
│                           # ReelVideoCanvasPlayer, GrowthPremiumToolsView,
│                           # ExecutiveBrandIntelligenceReportModal)
├── context/                # Centralized project state (ProjectContext.tsx)
├── pages/                  # Route views (IdeaLabPage, FeasibilityPage, MarketIntelligencePage,
│                           # BrandRoadmapPage, BuildPage, ExecutionPage, SimulationPage,
│                           # LaunchGrowthPage, NotFoundPage)
├── routes/                 # Client-side router configuration (AppRouter.tsx)
├── services/               # Analytical & simulation engines (feasibilityEngine.ts,
│                           # marketIntelligenceEngine.ts, brandRoadmapEngine.ts,
│                           # buildArchitectureEngine.ts, executionEngine.ts,
│                           # simulationEngine.ts, growthEngine.ts,
│                           # intelligenceReportEngine.ts, businessCouncilEngine.ts,
│                           # ideaLabInterviewEngine.ts)
└── types/                  # Domain TypeScript interfaces (project.ts, feasibility.ts,
                            # marketIntelligence.ts, brandRoadmap.ts, buildArchitecture.ts,
                            # execution.ts, simulation.ts, growth.ts, executiveReport.ts,
                            # council.ts)
```

---

## Project State

A centralized, strongly typed state model coordinates data across all stages:

```typescript
ProjectState
├── project
│   ├── id: string
│   ├── name: string
│   ├── category: string
│   ├── status: 'discovery' | 'feasibility_ready' | 'in_progress' | 'completed'
│   ├── createdAt: string
│   └── updatedAt: string
├── idea
│   ├── rawInput: string
│   ├── name: string
│   ├── problem: string
│   ├── targetAudience: string
│   ├── context: string
│   ├── goals: string
│   ├── constraints: string
│   ├── differentiation: string
│   └── openQuestions: string[]
├── businessModel
│   ├── productType: ProductType | null
│   ├── deliveryModel: DeliveryModel | null
│   ├── customerType: CustomerType | null
│   └── location: { country: string; cityRegion: string; operatingLocation: string }
├── feasibility?
│   ├── id: string
│   ├── generatedAt: string
│   ├── overallStatus: string
│   ├── overallScoreExplanation: string
│   ├── dimensions: Record<FeasibilityDimensionId, FeasibilityDimensionResult>
│   ├── risks: FeasibilityRisk[]
│   ├── assumptions: FeasibilityAssumption[]
│   ├── openQuestions: FeasibilityOpenQuestion[]
│   ├── validationTasks: FeasibilityValidationTask[]
│   ├── promisingAspects: string[]
│   ├── criticalUncertainties: string[]
│   ├── potentialBlockers: string[]
│   └── handoffToMarketIntelligence: MarketIntelligenceHandoff
├── marketIntelligence?
│   ├── id: string
│   ├── generatedAt: string
│   ├── signals: { marketSignal; customerSignal; competitiveSignal; opportunitySignal }
│   ├── competitors: CompetitorItem[]
│   ├── availableAxes: PositioningAxis[]
│   ├── selectedAxes: { xAxis: PositioningAxis; yAxis: PositioningAxis }
│   ├── customerSegments: CustomerSegment[]
│   ├── opportunityGaps: MarketOpportunityGap[]
│   ├── marketSize: MarketSizeFramework
│   ├── trends: MarketTrendSignal[]
│   ├── riskHeatmap: MarketRiskItem[]
│   ├── aiCouncil: AICouncilSynthesis
│   └── brief: MarketIntelligenceBrief
├── brandReport?
│   ├── id: string
│   ├── generatedAt: string
│   ├── dnaNodes: BrandDNANode[]
│   ├── gapDifferentiatorChain: DifferentiatorChainSystem
│   ├── positioningMap: { competitors; focalPosition; availableAxes; selectedAxes }
│   ├── positioningStatement: PositioningStatement
│   ├── personality: BrandPersonalityTrait[]
│   ├── voice: BrandVoiceSystem
│   ├── taglines: TaglineWorkspace
│   ├── logoGenerator: LogoGeneratorSystem
│   ├── colors: ColorPaletteSystem
│   ├── typography: TypographySystem
│   ├── brandBoard: VisualBrandBoard
│   ├── customerExperience: CustomerTouchpoint[]
│   ├── roadmapTimeline: RoadmapMilestone[]
│   ├── decisionBoard: BrandDecisionBoardSystem
│   └── handoff: Stage05HandoffDossier
├── buildArchitecture?
│   ├── id: string
│   ├── generatedAt: string
│   ├── readinessOverview: BuildReadinessOverview
│   ├── blueprint: ProductBlueprint
│   ├── mvpScope: MVPScopeSystem
│   ├── featureTree: FeatureArchitectureTree
│   ├── systemArchitecture: SystemArchitectureSystem
│   ├── techStack: TechStackSystem
│   ├── dataModel: DataModelSystem
│   ├── userJourney: ProductJourneySystem
│   ├── screenArchitecture: ScreenArchitectureSystem
│   ├── apiIntegrations: APIIntegrationMap
│   ├── aiArchitecture: AIArchitectureSystem
│   ├── councilDiscussion: AICouncilBuildSynthesis
│   ├── challengerTests: ChallengerEvaluatorSystem
│   ├── dependencyGraph: BuildDependencyGraphSystem
│   ├── roadmap: BuildRoadmapSystem
│   ├── riskMatrix: BuildRiskMatrixSystem
│   ├── decisionBoard: BuildDecisionBoardSystem
│   ├── brandConsistency: BrandProductConsistencySystem
│   └── handoff: BuildHandoffDossier
└── workflow
    ├── currentStage: StageId
    ├── completedStages: StageId[]
    └── stageOutputs: Record<string, unknown>
```

State is synchronized to browser `localStorage` (`think_beyond_marketing_project_state_v1`), persisting across reloads and route navigation.

---

## Tech Stack

- **Core**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript 6
- **Build Tool**: Vite 6 (`vite`, `@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v3 (`tailwindcss`, `postcss`, `autoprefixer`) with semantic theme custom properties
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React (`lucide-react`)
- **Linter**: Oxlint (`oxlint`, `@oxlint/binding-win32-x64-msvc`)

---

## Development

### Prerequisites
- Node.js (v20+ recommended; verified on v22.19.0)
- npm (v10+)

### Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript compilation and build production bundle
npm run build

# Preview production build locally
npm run preview

# Run Oxlint static analysis
npm run lint
```

---

## AI Architecture — Multi-Agent Intelligence System

The application features a staged, continuous AI orchestration and reasoning architecture:
- **Specialized Multi-Agent Business Council (`businessCouncilEngine.ts`)**: 6 persistent specialist agents (Product Strategist, Technical Architect, Business Specialist, UX Specialist, Security/Compliance Specialist, Growth Marketer) evaluating cross-stage trade-offs.
- **Dynamic Debate & Consensus Engine**: Automatically computes unanimous consensus points, critical strategic divergence, and concrete founder action directives from across council perspectives.
- **Contextual Interview & Discovery Engines**: Conversational specialist bots grounded in Stage 01–08 state, answering founder inquiries with deterministic domain rules and zero hallucinations.
- **Structured Schema Enforcers**: All stage outputs and synthesized dossiers update `workflow.stageOutputs` with strict TypeScript typing and evidence provenance.

---

## Data Integrity Principle

- **No Fabricated Market Data**: No synthetic TAM figures or arbitrary market percentages.
- **No Fabricated Competitors**: No placeholder competitor rosters.
- **No Fabricated Suppliers or Contacts**: No fake phone numbers or addresses.
- **Explicit Unknown States**: Unprovided information strictly defaults to `"Not provided"` or `"Needs validation"`.

---

## Development Protocol

1. **Iterative Scrums**: Scoped deliveries without scope creep.
2. **Review Before Commit**: All changes must be manually reviewed by a human prior to committing to version control.
3. **No Automated Commits**: Automated tools and agents are strictly prohibited from executing `git commit` or `git push`.
4. **Validation Gates**: Every iteration must successfully pass `npm run build` and `npm run lint`.

---

## Current Status

**All 9 Stages Implemented & Operational (Stages 01 through 09).**
Stage 01 (Idea Lab), Stage 02 (Feasibility & Viability Engine), Stage 03 (Market Intelligence), Stage 04 (Brand Roadmap & Visual Identity System), Stage 05 (Build & Architecture Intelligence), Stage 06 (Execution Intelligence & Supply Chain), Stage 07 (Dual-Modality Experience Simulation), Stage 08 (Launch & Growth), and Stage 09 (Executive Brand Intelligence Report & AI Council Dossier) are fully implemented, connected via continuous reactive state flow in `ProjectContext`, and rendered in an accessible, permanent dark workspace. All TypeScript types, Oxlint static analysis rules, and Vite production builds pass cleanly with 0 errors and 0 warnings.
