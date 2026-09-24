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
| **01. Idea Lab** | `/idea-lab` | **CURRENTLY IMPLEMENTED** | Active discovery workspace with founder interview, venture classification, footprint capture, and idea snapshot synthesis. |
| **02. Feasibility & Viability** | `/feasibility` | *LOCKED / UPCOMING* | Stage placeholder. Unlocks when Stage 01 discovery requirements are satisfied. |
| **03. Market Intelligence** | `/market-intelligence` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **04. Brand Roadmap** | `/brand-roadmap` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **05. Build & Architecture** | `/build` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **06. Execution Intelligence** | `/execution` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **07. Experience Simulation** | `/simulation` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **08. Launch & Growth** | `/launch-growth` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |
| **09. Brand Intelligence Report** | `/report` | *LOCKED / UPCOMING* | Architectural placeholder displaying incoming context from prior stages. |

---

## Visual Theme System (Permanent Dark Workspace)

*Think Beyond Marketing* uses a single, permanent dark visual system specifically tailored for an AI-powered business and brand intelligence workspace:

- **Deep Foundation**: Obsidian canvas (`#070A0F`) with subtle navy undertones.
- **Architectural Surfaces**: Deep slate cards (`#0C1017`) and elevated surfaces (`#121824`) for clear layer differentiation.
- **Structural Borders**: Precision slate borders (`#223047` / `#324666`) providing clean structural delineation.
- **High-Contrast Typography**:
  - Primary: Crisp soft white (`#F8FAFC`, 19:1 contrast ratio)
  - Secondary: Muted slate (`#CBD5E1`, 12:1 contrast ratio)
  - Tertiary: Subdued slate (`#94A3B8`, 6.8:1 contrast ratio)
- **Restrained Accents**: Electric blue (`#3B82F6`) and purposeful stage progression colors.
- **Subtle Architectural Grid**: Background grid overlay reinforcing the technical intelligence workspace aesthetic.

*Note: Ivory / light theme is not part of the product. Theme switching is intentionally not supported. The workspace is built around a single permanent dark identity.*

---

## Current Implementation (Scrum 01.2 — Dark Mode Only)

The current release delivers the complete application shell, navigation, the active Idea Lab experience, and a streamlined permanent dark visual system:

- **Permanent Dark Workspace**: High-contrast, WCAG AA/AAA-compliant design tokens (`--bg-primary`, `--bg-surface`, `--bg-surface-elevated`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--accent`) providing crisp legibility.
- **Single Visual System**: Ivory/light theme, theme toggle, and theme switching logic have been removed completely.
- **Hero Typography & Pipeline Visualization**: High-contrast headline rendering ("From a raw idea to a launch-ready brand.") and clear 6-step venture progression.
- **Sidebar & Shell Contrast Hierarchy**: Clear visual hierarchy for active and locked navigation states with visible lock indicators and legible requirements.
- **Idea Lab Workspace (`/idea-lab`)**:
  - **Transformation Pipeline**: Hero visualization mapping the venture journey (`Raw Idea` -> `Understand` -> `Validate` -> `Differentiate` -> `Build` -> `Launch`).
  - **Founder Dilemma Entry Points**: Interactive dilemma triggers (Viability, Audience, Competition, Positioning, Brand System) that dynamically populate the interviewer.
  - **Business Intelligence Interviewer**: Specialized conversational interface capturing the founder's raw intuition with voice UI placeholder.
  - **Venture & Product Classification**: Categorization across 7 models (Physical Product, Software / SaaS, Marketplace, Service, Community, Creator Brand, Other).
  - **Geographic & Operational Footprint**: Explicit capture of location, delivery presence (`Online`, `Offline`, `Hybrid`), and customer archetype (`B2C`, `D2C`, `B2B`, `B2B2C`).
  - **Adaptive Discovery Flow**: Progressive interview tabs covering persona, core pain points, differentiation/moats, constraints, and open founder questions.
  - **Initial Idea Snapshot**: Real-time summary consolidating user-provided inputs into an inspectable stage output with an unlocking CTA for Stage 02.
- **Downstream Placeholders (`/feasibility` to `/report`)**: Dignified staging views displaying active upstream context and prerequisite requirements without fabricated data.

---

## Source Architecture

The repository enforces a clean separation of concerns:

```
src/
├── components/
│   ├── common/         # Stateless UI primitives (Button, Card, Badge, Input, Textarea)
│   ├── layout/         # Shell components (AppShell, AppHeader, AppSidebar, StagePlaceholder)
│   └── idea-lab/       # Stage 01 modules (HeroTransformation, FAQEntryPrompts,
│                       # InterviewerChat, ProductTypeSelector, LocationContext,
│                       # DiscoveryFlow, IdeaSnapshot)
├── context/            # Centralized project state (ProjectContext.tsx)
├── pages/              # Route views (IdeaLabPage, StagePages, NotFoundPage)
├── routes/             # Client-side router configuration (AppRouter.tsx)
└── types/              # Domain TypeScript interfaces (project.ts)
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

## AI Architecture — Planned

In subsequent Scrums, the application will introduce an AI orchestration layer:
- **Specialized Multi-Agent Teams**: Independent agents evaluating technical feasibility, unit economics, and competitive landscapes.
- **Debate & Critique Engine**: Cross-agent critique validating assumptions before finalizing recommendations.
- **Structured Outputs**: Strict JSON schemas directly updating `workflow.stageOutputs`.

*Note: No active AI orchestration or live API keys are present in Scrum 01. All current interactions capture and organize user inputs.*

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

**Scrum 01.2 Complete.**
The application shell, persistent left sidebar, permanent dark visual workspace, and 9-stage route architecture are active, passing all lint and build checks, and awaiting human review.
