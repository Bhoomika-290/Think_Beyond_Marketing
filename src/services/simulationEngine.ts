import type { ProjectState } from '../types/project';
import type {
  SimulationReport,
  PhysicalExperienceStoryboard,
  PhysicalCategoryType,
  PhysicalSimulationHotspot,
  Physical3DSequenceStep,
  ProductVisualProfile,
  SoftwareInteractivePrototype,
  SoftwareVentureArchetype,
  SimulatedDataSource,
  SimulatedRecordItem,
  SimulatedInsightAction,
} from '../types/simulation';

export function generateSimulationReport(
  state: ProjectState,
  forcedModality?: 'physical' | 'software'
): SimulationReport {
  const { idea, businessModel, project, brandRoadmap, buildArchitecture } = state;

  const ventureName = idea.name || project.name || 'Untitled Venture';
  const rawInput = idea.rawInput || '';
  const problem = idea.problem || rawInput || 'Status-quo friction in the market';
  const targetAudience = idea.targetAudience || 'Target customers and early adopters';
  const differentiator = idea.differentiation || 'Specialized craft and operational transparency';
  const productType = businessModel.productType || 'physical';
  const customerType = businessModel.customerType || 'd2c';
  const isB2B = customerType === 'b2b' || customerType === 'b2b2c';

  const country = businessModel.location?.country?.trim() || 'India';
  const cityRegion = businessModel.location?.cityRegion?.trim() || '';
  const operatingLocation =
    businessModel.location?.operatingLocation?.trim() ||
    `${cityRegion ? `${cityRegion}, ` : ''}${country}`;

  const ideaLower = `${ventureName} ${rawInput} ${problem} ${differentiator}`.toLowerCase();

  // Modality classification
  const isPhysical = forcedModality
    ? forcedModality === 'physical'
    : productType === 'physical' ||
      ideaLower.includes('clothing') ||
      ideaLower.includes('apparel') ||
      ideaLower.includes('coffee') ||
      ideaLower.includes('hardware') ||
      ideaLower.includes('textile') ||
      ideaLower.includes('device') ||
      ideaLower.includes('wear') ||
      ideaLower.includes('goods');

  const modality: SimulationReport['modality'] = forcedModality
    ? forcedModality
    : isPhysical
    ? 'physical'
    : 'software';

  // Extract Brand & Build tokens if available, or determine authentic product palette
  let brandPrimaryColor =
    brandRoadmap?.colorSystem?.swatches?.find((s) => s.role === 'primary')?.hex;
  let brandAccentColor =
    brandRoadmap?.colorSystem?.swatches?.find((s) => s.role === 'accent')?.hex;

  if (!brandPrimaryColor) {
    if (ideaLower.includes('medical') || ideaLower.includes('health') || ideaLower.includes('diagnostic')) {
      brandPrimaryColor = '#0EA5E9';
    } else if (ideaLower.includes('shoe') || ideaLower.includes('sneaker') || ideaLower.includes('footwear')) {
      brandPrimaryColor = '#2563EB';
    } else if (ideaLower.includes('clothing') || ideaLower.includes('apparel') || ideaLower.includes('wool')) {
      brandPrimaryColor = '#92400E';
    } else if (ideaLower.includes('coffee') || ideaLower.includes('roast') || ideaLower.includes('bean')) {
      brandPrimaryColor = '#5B2C10';
    } else if (ideaLower.includes('device') || ideaLower.includes('hardware') || ideaLower.includes('sensor')) {
      brandPrimaryColor = '#334155';
    } else {
      brandPrimaryColor = '#2563EB';
    }
  }

  if (!brandAccentColor) {
    brandAccentColor = '#10B981';
  }

  // =========================================================================
  // 1. PHYSICAL 3D PRODUCT LAB SYNTHESIS
  // =========================================================================
  let categoryType: PhysicalCategoryType = 'general_goods';
  if (ideaLower.includes('medical') || ideaLower.includes('health') || ideaLower.includes('diagnostic') || ideaLower.includes('oximeter') || ideaLower.includes('vital') || ideaLower.includes('patient') || ideaLower.includes('clinical') || ideaLower.includes('doctor') || ideaLower.includes('insulin')) {
    categoryType = 'medical';
  } else if (ideaLower.includes('shoe') || ideaLower.includes('sneaker') || ideaLower.includes('footwear') || ideaLower.includes('runner') || ideaLower.includes('sole')) {
    categoryType = 'footwear';
  } else if (ideaLower.includes('clothing') || ideaLower.includes('apparel') || ideaLower.includes('wool') || ideaLower.includes('winter') || ideaLower.includes('jacket')) {
    categoryType = 'apparel';
  } else if (ideaLower.includes('coffee') || ideaLower.includes('roast') || ideaLower.includes('bean') || ideaLower.includes('brew') || ideaLower.includes('beverage')) {
    categoryType = 'coffee';
  } else if (ideaLower.includes('device') || ideaLower.includes('hardware') || ideaLower.includes('sensor') || ideaLower.includes('iot') || ideaLower.includes('gadget') || ideaLower.includes('electronics')) {
    categoryType = 'hardware';
  }

  let physicalHotspots: PhysicalSimulationHotspot[] = [];
  let sensoryProfile = {
    tactileFeel: 'Substantial, balanced density with premium matte finishing.',
    visualAesthetic: 'Clean geometric lines with minimal brand embellishment.',
    acousticOrScentNote: 'Subtle mechanical click or organic aroma upon first touch.',
  };
  let packagingStyle = 'Custom rigid craft box with magnetic flap and embossed branding';
  let materials = ['Recycled High-Density Alloy', 'Organic Cellulose Core'];
  let signatureFeature = 'Zero-tool assembly & modular component replacement';
  let formFactor = 'Ergonomic Precision Enclosure';
  let dimensionsOrGrade = 'Grade-A Industrial Tolerance';

  if (categoryType === 'medical') {
    packagingStyle = 'Sterile medical-grade thermoformed blister pack in an antimicrobial presentation carton';
    materials = ['Medical-Grade Polycarbonate Shell', 'Antimicrobial Silicone Tactile Grip', 'Optical Biosensor Probe Array'];
    signatureFeature = 'Continuous sub-second non-invasive physiological telemetry with clinical accuracy';
    formFactor = 'Sterile Ergonomic Diagnostic Unit';
    dimensionsOrGrade = 'ISO 13485 / FDA Class-II Medical Standard';
    sensoryProfile = {
      tactileFeel: 'Smooth non-slip antimicrobial silicone with balanced clinical heft.',
      visualAesthetic: 'Sterile medical white finish with crisp cyan telemetry display.',
      acousticOrScentNote: 'Calibrated acoustic confirmation chime upon valid sensor contact.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.6, 0.4], screenPercent: { x: 50, y: 25 }, label: 'Optical Biosensor Array', category: 'sensor', detail: 'Multispectral photodiode reading blood oxygenation and pulse transit time.', metric: '<1s Sampling' },
      { id: 'spot_2', position: [-0.8, 0, 0.3], screenPercent: { x: 22, y: 50 }, label: 'Antimicrobial Polycarbonate Body', category: 'material', detail: 'Chemical-resistant medical casing rated for hospital-grade isopropyl wipe-down.', metric: 'ISO 10993' },
      { id: 'spot_3', position: [0.8, 0, 0.3], screenPercent: { x: 78, y: 50 }, label: 'Diagnostic Trigger Button', category: 'button', detail: 'Single-touch immediate clinical reading initiation.', metric: 'Instant Scan' },
      { id: 'spot_4', position: [0, -0.8, 0.3], screenPercent: { x: 50, y: 82 }, label: 'Contactless Magnetic Base', category: 'component', detail: 'Inductive charging dock maintaining continuous sterility without exposed pins.', metric: 'Inductive Qi' },
    ];
  } else if (categoryType === 'footwear') {
    packagingStyle = 'Recycled molded pulp presentation box with organic cotton pull strap';
    materials = ['Engineered Breathable Recycled Knit', 'Supercritical Nitrogen-Foam Midsole', 'Natural Bio-Rubber Outsole'];
    signatureFeature = 'Dynamic energy-return supercritical foam delivering 78% mechanical rebound';
    formFactor = 'High-Performance Sculpted Athletic Silhouette';
    dimensionsOrGrade = 'Biomechanically Tested 1,000km Durability Benchmark';
    sensoryProfile = {
      tactileFeel: 'Plush adaptive knit upper with instantaneous step-in rebound cushioning.',
      visualAesthetic: 'Sculpted organic foam geometry with bold contrasting outsole accent.',
      acousticOrScentNote: 'Crisp ground-contact sound with zero synthetic rubber adhesive odor.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.5, 0.4], screenPercent: { x: 50, y: 30 }, label: 'Engineered Recycled Knit Upper', category: 'material', detail: 'Seamless zonal compression mesh eliminating hotspots and foot friction.', metric: '100% Recycled' },
      { id: 'spot_2', position: [0, -0.4, 0.4], screenPercent: { x: 50, y: 65 }, label: 'Supercritical Nitrogen Midsole', category: 'component', detail: 'Ultra-lightweight gas-infused micro-foam providing maximum shock dispersion.', metric: '78% Energy Return' },
      { id: 'spot_3', position: [-0.7, -0.7, 0.3], screenPercent: { x: 25, y: 78 }, label: 'Bio-Rubber Traction Lug Array', category: 'finish', detail: 'Multi-directional wet-grip lugs molded from renewable FSC latex.', metric: 'Wet Traction A' },
      { id: 'spot_4', position: [0.7, 0.1, 0.3], screenPercent: { x: 75, y: 48 }, label: 'Anatomical Heel Cup Lock', category: 'component', detail: 'Deep heel cradle preventing pronation and stabilizing Achilles tendon.', metric: 'Zero Slip' },
    ];
  } else if (categoryType === 'apparel') {
    packagingStyle = 'Rigid unbleached kraft keepsake box with embossed linen pull ribbon and seed-paper tag';
    materials = ['480 GSM Pure Desert Camel Wool', 'Natural Horn / Brass Fasteners', 'Recycled Cupro Satin Lining'];
    signatureFeature = 'Micro-climate adaptive natural lanolin moisture and thermal regulation';
    formFactor = 'Sculpted Tailored Outerwear Silhouette';
    dimensionsOrGrade = 'Grade-A Artisan Loomed (Rajasthan Cluster)';
    sensoryProfile = {
      tactileFeel: 'Dense, natural loft with immediate warmth and zero synthetic scratchiness.',
      visualAesthetic: 'Rich earthen camel tone with subtle textural hand-loom grain.',
      acousticOrScentNote: 'Faint cedarwood and untreated wool scent, free of synthetic chemical dyes.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 1.2, 0.3], screenPercent: { x: 50, y: 22 }, label: 'Storm Collar & Neck Guard', category: 'component', detail: 'Articulated storm collar lined with soft-touch woven wool to eliminate cold drafts.', metric: '100% Draft-Proof' },
      { id: 'spot_2', position: [-0.6, 0.3, 0.4], screenPercent: { x: 30, y: 45 }, label: '480 GSM Desert Fleece', category: 'material', detail: 'Sourced from camel pastoralist herds; natural water-shedding lanolin barrier.', metric: '480 GSM Loft' },
      { id: 'spot_3', position: [0, -0.2, 0.5], screenPercent: { x: 50, y: 58 }, label: 'Concealed Magnetic Fasteners', category: 'button', detail: 'Rapid single-handed closure that snaps flush against high desert winds.', metric: 'N52 Snap' },
      { id: 'spot_4', position: [0.7, -0.6, 0.2], screenPercent: { x: 75, y: 76 }, label: 'Reinforced Saddle Seams', category: 'finish', detail: 'Double-needle bonded stitching resisting 150+ lbs of tensile pull.', metric: '150 lb Tensile' },
    ];
  } else if (categoryType === 'coffee') {
    packagingStyle = 'Matte textured aluminum foil bag with one-way degassing valve and tear-away laser strip';
    materials = ['100% Specialty Arabica Whole Bean', 'Zero-Gas Aluminum Barrier Pouch', 'Compostable Label Stock'];
    signatureFeature = 'Single-Estate Anaerobic Natural Fermentation (88.5 SCA Cup Score)';
    formFactor = '250g Nitrogen-Flushed Resealable Pouch';
    dimensionsOrGrade = 'Strictly High Grown (1,750m MSL, Chikmagalur / Coorg)';
    sensoryProfile = {
      tactileFeel: 'Crisp matte foil pouch with tactile relief typography and tactile bean grind resistance.',
      visualAesthetic: 'Even cinnamon-to-city roast development with glowing caramel crema extraction.',
      acousticOrScentNote: 'Intense burst of dried stone fruit, wild honey, and dark cocoa upon seal rupture.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 1.1, 0.3], screenPercent: { x: 50, y: 18 }, label: 'One-Way Aroma Valve', category: 'packaging', detail: 'Vents CO2 post-roasting while blocking oxygen ingress to preserve fragile aromatics.', metric: '0.0% O2 Entry' },
      { id: 'spot_2', position: [0, 0.1, 0.4], screenPercent: { x: 50, y: 48 }, label: 'Anaerobic Natural Beans', category: 'material', detail: 'Single plot harvest roasted in small 5kg micro-batches within 48h of dispatch.', metric: '88.5 SCA Score' },
      { id: 'spot_3', position: [-0.6, -0.7, 0.2], screenPercent: { x: 30, y: 72 }, label: 'Laser Perforated Pull Zipper', category: 'packaging', detail: 'Airtight re-lock zipper ensuring fresh cup extraction over 6 weeks.', metric: 'Airtight Lock' },
      { id: 'spot_4', position: [0.6, -0.8, 0.2], screenPercent: { x: 70, y: 82 }, label: 'Traceability QR Provenance', category: 'finish', detail: 'Direct farmer payout transparency and roast curve timestamp.', metric: '100% Direct Trade' },
    ];
  } else if (categoryType === 'hardware') {
    packagingStyle = 'Precision-milled pulp tray in an anodized aluminum slide-case with pull-tab';
    materials = ['CNC 6000-Series Anodized Aluminum', 'Gorilla Glass 5 Display', 'N52 Neodymium Magnetic Mounts'];
    signatureFeature = 'Sub-5ms on-device edge ML inference with 14-day ultra-low power standby';
    formFactor = 'Compact Milled Unibody Hardware Unit (68mm x 42mm x 11mm)';
    dimensionsOrGrade = 'IP67 Dust & Water Ingress Certified';
    sensoryProfile = {
      tactileFeel: 'Cool bead-blasted metal edges with subtle weighted center of gravity.',
      visualAesthetic: 'Stealth matte obsidian finish with micro-drilled status LED aperture.',
      acousticOrScentNote: 'Crisp haptic vibration motor feedback and solid magnetic snap lock.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.6, 0.4], screenPercent: { x: 50, y: 25 }, label: 'Ambient Optical Sensor Array', category: 'sensor', detail: 'Multispectral sensor calibrated for sub-millisecond environmental telemetry.', metric: '0.8ms Sampling' },
      { id: 'spot_2', position: [-0.8, 0, 0.3], screenPercent: { x: 22, y: 50 }, label: 'CNC Bead-Blasted Enclosure', category: 'material', detail: 'Unibody aerospace alloy acting as passive thermal heatsink without noisy fans.', metric: '6000 Alloy' },
      { id: 'spot_3', position: [0.8, 0, 0.3], screenPercent: { x: 78, y: 50 }, label: 'Tactile Haptic Button', category: 'button', detail: 'Subtle 120Hz physical pulse confirming user commands without glancing at screen.', metric: '120Hz Pulse' },
      { id: 'spot_4', position: [0, -0.8, 0.3], screenPercent: { x: 50, y: 82 }, label: 'Magnetic Fast-Charge Dock', category: 'component', detail: 'Self-aligning magnetic dock delivering 80% battery in 22 minutes.', metric: '22 Min Fast Charge' },
    ];
  } else {
    packagingStyle = 'Architectural dual-chamber presentation sleeve with custom security seal';
    materials = ['High-Grade Polymer Composite', 'Surgical Stainless Fasteners', 'Recycled Cork Base'];
    signatureFeature = 'Ergonomic quick-deploy mechanism engineered for 100,000 duty cycles';
    formFactor = 'Precision Handheld Functional Tool';
    dimensionsOrGrade = 'ISO 9001 Audited Production Batch';
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.8, 0.3], screenPercent: { x: 50, y: 25 }, label: 'Ergonomic Contact Surface', category: 'component', detail: 'Contoured touchpoint shaped to natural hand grip pressure points.', metric: 'Zero Pressure' },
      { id: 'spot_2', position: [-0.7, 0, 0.3], screenPercent: { x: 26, y: 50 }, label: 'Composite Shell Matrix', category: 'material', detail: 'Impact-resistant reinforced housing engineered for daily durability.', metric: 'Impact Grade' },
      { id: 'spot_3', position: [0.7, 0, 0.3], screenPercent: { x: 74, y: 50 }, label: 'Quick-Deploy Actuator', category: 'button', detail: 'Single-motion trigger unlocking instant utility without tools.', metric: '<1s Deploy' },
      { id: 'spot_4', position: [0, -0.8, 0.3], screenPercent: { x: 50, y: 80 }, label: 'Laser-Etched Serial Mark', category: 'finish', detail: 'Unique verification mark linking unit to its manufacturing quality batch.', metric: 'ISO 9001' },
    ];
  }

  const physical3DStages: Physical3DSequenceStep[] = [
    {
      id: 'package_closed',
      stepNumber: 1,
      stageName: '1. PACKAGING ARRIVAL',
      title: 'Sealed Presentation Packaging',
      shortLabel: '1. Package',
      description: 'The physical product arrives in custom architectural casing with tamper seal.',
      actionPrompt: 'Click open or trigger replay to inspect packaging structure.',
      cameraPosition: [0, 2, 5],
      cameraTarget: [0, 0, 0],
      animationPhase: 0,
      delightMoment: 'Zero single-use plastic with stamped regional artisan provenance.',
    },
    {
      id: 'package_open',
      stepNumber: 2,
      stageName: '2. UNBOXING REVEAL',
      title: 'Packaging Opens & Product Lifts',
      shortLabel: '2. Unbox',
      description: 'Lid lifts smoothly with magnetic damping, revealing the product in its custom cradle.',
      actionPrompt: 'Observe the unboxing reveal sequence.',
      cameraPosition: [0, 2.5, 4.2],
      cameraTarget: [0, 0.2, 0],
      animationPhase: 1,
      delightMoment: 'A numbered batch certificate details origin and craft cluster.',
    },
    {
      id: 'product_reveal',
      stepNumber: 3,
      stageName: '3. 3D PRODUCT REVEAL',
      title: 'Floating 3D Product Inspection',
      shortLabel: '3. Reveal',
      description: 'The product rises onto a floating pedestal with real specular lighting and reflections.',
      actionPrompt: 'Rotate 360° or click hotspot pins to inspect material and tolerances.',
      cameraPosition: [0, 0.5, 3.8],
      cameraTarget: [0, 0, 0],
      animationPhase: 2,
      delightMoment: 'Contoured lines and balanced weight distribution visible from all angles.',
    },
    {
      id: 'product_rotate',
      stepNumber: 4,
      stageName: '4. 360° MATERIAL ROTATION',
      title: '360° Material & Texture Orbit',
      shortLabel: '4. Materials',
      description: 'High-detail inspection of tactile materials, seams, and structural chamfers.',
      actionPrompt: 'Drag mouse over canvas or use rotation slider to orbit 360°.',
      cameraPosition: [2.5, 0.8, 3.2],
      cameraTarget: [0, 0, 0],
      animationPhase: 3,
      delightMoment: 'Substantial, balanced density that justifies premium market positioning.',
    },
    {
      id: 'component_active',
      stepNumber: 5,
      stageName: '5. COMPONENT ACTIVATION',
      title: 'Functional Activation & Indicators',
      shortLabel: '5. Activation',
      description: 'Hardware LEDs glow, aroma valves vent, or fabric thermal layers lock in.',
      actionPrompt: 'Trigger activation controls to observe operational responsiveness.',
      cameraPosition: [0, 0, 3.2],
      cameraTarget: [0, 0, 0],
      animationPhase: 4,
      delightMoment: signatureFeature,
    },
    {
      id: 'real_world_use',
      stepNumber: 6,
      stageName: '6. REAL-WORLD ENVIRONMENT',
      title: 'In-Use Performance Simulation',
      shortLabel: '6. Field Use',
      description: `Active deployment in ${operatingLocation} environment under daily stress conditions.`,
      actionPrompt: 'Switch environment between Studio, Field Use, and Macro Spec.',
      cameraPosition: [1.2, 0.6, 3.5],
      cameraTarget: [0, 0, 0],
      animationPhase: 5,
      delightMoment: 'Hydrophobic bead-off or sub-millisecond edge telemetry verification.',
    },
    {
      id: 'result_experience',
      stepNumber: 7,
      stageName: '7. CUSTOMER OUTCOME',
      title: 'Enduring Customer Satisfaction',
      shortLabel: '7. Outcome',
      description: 'Long-term satisfaction, repeat category purchase, and peer referral loops.',
      actionPrompt: 'Review customer emotional impact and verified retention loop.',
      cameraPosition: [0, 0.8, 4.0],
      cameraTarget: [0, 0, 0],
      animationPhase: 6,
      delightMoment: 'Customer voluntarily showcases product to peers and colleagues.',
    },
  ];

  const productMockup = {
    productName: ventureName,
    categoryType,
    formFactor,
    materials,
    packagingStyle,
    signatureFeature,
    primaryColor: brandPrimaryColor,
    accentColor: brandAccentColor,
    unboxingSequence: [
      'Break custom paper tamper seal',
      'Slide outer textured architectural sleeve',
      'Lift magnetic lid revealing product nestled in molded cradle',
      'Inspect provenance certificate and quick-start card',
    ],
    dimensionsOrGrade,
    hotspots: physicalHotspots,
    sensoryProfile,
  };

  const visualProfile: ProductVisualProfile = {
    category: categoryType,
    productName: ventureName,
    productForm: formFactor,
    primaryColor: brandPrimaryColor,
    secondaryColor: '#334155',
    accentColor: brandAccentColor,
    materials,
    components: physicalHotspots.map((h) => h.label),
    functionality: signatureFeature,
    environment: operatingLocation,
    customerContext: targetAudience,
    packagingStyle,
    visualDescription: `Authentic ${categoryType} product modeled for ${ventureName} in ${operatingLocation}.`,
  };

  const physicalStoryboard: PhysicalExperienceStoryboard = {
    productMockup,
    visualProfile,
    customerPersona: {
      personaTitle: targetAudience.slice(0, 38),
      context: `Operating in ${operatingLocation} seeking high-durability, authentic solutions.`,
      keyPainRelieved: `Permanently solves: ${problem.slice(0, 75)}...`,
      initialReaction: `“The difference in build density and tactile finishing is obvious the second you hold it. It feels completely distinct from mass-market plastic alternatives.”`,
      usageSetting: `Daily routine in ${operatingLocation} environment.`,
    },
    stages: physical3DStages,
    outcomeSummary: {
      emotionalBenefit: 'Confidence, aesthetic pride, and peace of mind through proven craft.',
      functionalBenefit: `Eliminates "${problem.slice(0, 45)}..." with zero maintenance overhead.`,
      retentionTrigger: 'High durability leading to organic word-of-mouth and repeat category purchases.',
    },
  };

  // =========================================================================
  // 2. SOFTWARE PROTOTYPE SYNTHESIS (Tailored to Venture Archetype)
  // =========================================================================
  const appName = brandRoadmap?.ventureName || ventureName;
  const buildFeatures = buildArchitecture?.mvpScope?.features || [];
  const primaryFeatureName = buildFeatures[0]?.name || 'Automated Intelligence Engine';

  let archetype: SoftwareVentureArchetype = 'general_saas';
  if (/\b(?:attribution|multi-touch|ad\s+spend|ad\s+tracking|roas|campaign\s+roi)\b/i.test(ideaLower)) {
    archetype = 'marketing_attribution';
  } else if (isPhysical || ideaLower.includes('apparel') || ideaLower.includes('clothing') || ideaLower.includes('wool') || ideaLower.includes('fashion') || ideaLower.includes('shop') || ideaLower.includes('store') || ideaLower.includes('cart') || ideaLower.includes('commerce') || ideaLower.includes('d2c') || ideaLower.includes('checkout')) {
    archetype = 'ecommerce';
  } else if (ideaLower.includes('dev') || ideaLower.includes('code') || ideaLower.includes('api') || ideaLower.includes('infra') || ideaLower.includes('query')) {
    archetype = 'developer_tool';
  } else if (ideaLower.includes('ai') || ideaLower.includes('agent') || ideaLower.includes('prompt') || ideaLower.includes('llm') || ideaLower.includes('copilot')) {
    archetype = 'ai_workspace';
  } else if (ideaLower.includes('fintech') || ideaLower.includes('bank') || ideaLower.includes('pay') || ideaLower.includes('invoice') || ideaLower.includes('ledger') || ideaLower.includes('tax')) {
    archetype = 'fintech';
  } else if (ideaLower.includes('health') || ideaLower.includes('clinic') || ideaLower.includes('patient') || ideaLower.includes('doctor') || ideaLower.includes('bio')) {
    archetype = 'healthcare';
  } else if (ideaLower.includes('task') || ideaLower.includes('project') || ideaLower.includes('work') || ideaLower.includes('team') || ideaLower.includes('notion')) {
    archetype = 'productivity';
  }

  let dataSources: SimulatedDataSource[] = [];
  let sampleRecords: SimulatedRecordItem[] = [];
  let insightAction: SimulatedInsightAction = {
    id: 'act_1',
    headline: 'High-Impact Anomaly Detected',
    quantitativeImpact: '23.4% Optimization Margin Identified',
    recommendedAction: 'Automate one-click workflow re-allocation across live data channels.',
    actionButtonLabel: 'Execute Automated Fix',
    successOutcome: 'Optimization rules applied successfully. 14.8h manual triage eliminated.',
  };

  if (archetype === 'ecommerce') {
    dataSources = [
      { id: 'src_orders', name: 'D2C Storefront Orders (Razorpay / Stripe)', type: 'Checkout Stream', recordCount: 184, isConnected: true, iconName: 'ShoppingBag', latencyMs: 24 },
      { id: 'src_cluster', name: 'Artisan Cluster & Loom Batches (Sitapura / Bikaner)', type: 'Inventory Ledger', recordCount: 42, isConnected: true, iconName: 'Layers', latencyMs: 38 },
      { id: 'src_logistics', name: 'Shiprocket Multi-Carrier Hub (Delhivery / Bluedart)', type: 'Dispatch API', recordCount: 162, isConnected: true, iconName: 'Activity', latencyMs: 45 },
      { id: 'src_exchanges', name: 'Doorstep Size Exchange Queue', type: 'Reverse Logistics', recordCount: 11, isConnected: true, iconName: 'RotateCw', latencyMs: 19 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Batch #BKN-24: 480 GSM Camel Wool Parka', category: 'Loom Allocation', metricA: '88/100 Pre-Sold', metricB: '12 Left in Reserve', status: 'optimal', flagReason: 'High Pre-Order Velocity from Northern Metros' },
      { id: 'rec_2', title: 'Order #ORD-8492: Jaipur Hand-Spun Overcoat (Size L)', category: 'Courier Dispatch', metricA: 'AWB #DL948271', metricB: 'In Transit (ETA 36h)', status: 'synced', flagReason: 'Direct Farm-to-Doorstep Tracking Verified' },
      { id: 'rec_3', title: 'Exchange #EX-104: Sizing Swap (M -> L) Bangalore', category: 'Reverse Pickup', metricA: 'Courier Slotted', metricB: 'Zero Customer Fee', status: 'anomaly', flagReason: 'Size M Chest Tolerance Tighter than Customer Spec', actionRecommendation: 'Adjust chest grading +1.5cm on next loom batch' },
      { id: 'rec_4', title: 'Inventory Alert: Merino & Camel Yarn Shearing Stock', category: 'Raw Fiber', metricA: '14 Days Buffer', metricB: 'Restock Slotted', status: 'warning', flagReason: 'Approaching Minimum Yarn Threshold for Winter Batch 3', actionRecommendation: 'Confirm shearing contract dispatch with Bikaner cooperative' },
    ];
    insightAction = {
      id: 'act_ecommerce',
      headline: 'Sizing Friction Pattern Detected on Batch 1',
      quantitativeImpact: '7.2% Return Rate Reduction Projected',
      recommendedAction: 'Apply recommended chest ease calibration (+1.5cm) to remaining loom cutting patterns and update digital fit guide.',
      actionButtonLabel: 'Sync Fit Specs & Lock Batch',
      successOutcome: 'Loom specifications updated. Doorstep exchange risk reduced by 64% across remaining winter inventory.',
    };
  } else if (archetype === 'marketing_attribution') {
    dataSources = [
      { id: 'src_shopify', name: 'Shopify Store (Live Orders)', type: 'Storefront API', recordCount: 1420, isConnected: true, iconName: 'ShoppingBag', latencyMs: 18 },
      { id: 'src_meta', name: 'Meta Ads Manager (Campaigns)', type: 'Marketing API', recordCount: 86, isConnected: true, iconName: 'TrendingUp', latencyMs: 34 },
      { id: 'src_stripe', name: 'Stripe Ledger (Settled Net Rev)', type: 'Billing API', recordCount: 955, isConnected: true, iconName: 'CreditCard', latencyMs: 22 },
      { id: 'src_ga4', name: 'Google Analytics 4 (Web Traffic)', type: 'Telemetry Stream', recordCount: 28400, isConnected: false, iconName: 'Globe', latencyMs: 45 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Ad Set #04: Search Intent Cluster', category: 'Paid Search', metricA: '$4,280 Spend', metricB: '2.84x Blended ROAS', status: 'anomaly', flagReason: 'Attribution Mismatch across channels', actionRecommendation: 'Re-route $1,400 to retargeting cluster' },
      { id: 'rec_2', title: 'Campaign #12: Direct Pre-Order Cohort', category: 'Direct Marketing', metricA: '$8,940 Spend', metricB: '4.82x ROAS', status: 'optimal', flagReason: 'High Net Margin Per Conversion' },
      { id: 'rec_3', title: 'Organic Search: Core Product Category', category: 'Direct Traffic', metricA: '4,120 Visits', metricB: '6.4% Conversion', status: 'synced', flagReason: 'Top Performing Landing Page' },
      { id: 'rec_4', title: 'Ad Set #09: Broad Awareness Campaign', category: 'Display', metricA: '$3,100 Spend', metricB: '0.88x ROAS', status: 'warning', flagReason: 'Negative ROI on Low-Intent Clicks', actionRecommendation: 'Pause keyword match query' },
    ];
    insightAction = {
      id: 'act_marketing',
      headline: 'Unresolved Attribution Leak Detected',
      quantitativeImpact: '$3,240 / Mo Capital Waste Identified',
      recommendedAction: `Apply deterministic server-side attribution graph to rebalance ad budget toward highest profit channels.`,
      actionButtonLabel: 'Rebalance Budget & Sync Rules',
      successOutcome: 'Ad budget rebalanced. $3,240 projected monthly ad spend waste eliminated.',
    };
  } else if (archetype === 'developer_tool') {
    dataSources = [
      { id: 'src_github', name: 'GitHub Enterprise (14 Repos)', type: 'Git Webhook', recordCount: 340, isConnected: true, iconName: 'Terminal', latencyMs: 12 },
      { id: 'src_aws', name: 'AWS CloudWatch (Production Cluster)', type: 'Metrics API', recordCount: 184000, isConnected: true, iconName: 'Cpu', latencyMs: 28 },
      { id: 'src_postgres', name: 'PostgreSQL RDS (Read Replica)', type: 'DB Connection', recordCount: 42000, isConnected: true, iconName: 'Layers', latencyMs: 8 },
      { id: 'src_datadog', name: 'Datadog APM (Traces)', type: 'Telemetry Stream', recordCount: 92000, isConnected: false, iconName: 'Activity', latencyMs: 50 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Query: /api/v1/auth/session/validate', category: 'API Route', metricA: '840ms Latency', metricB: 'p99 Bottleneck', status: 'anomaly', flagReason: 'Unindexed Table Scan on User Tenant ID', actionRecommendation: 'Generate composite index migration' },
      { id: 'rec_2', title: 'Worker: batch-ingestion-processor', category: 'Background Job', metricA: '24k ops/sec', metricB: '0.01% Error', status: 'optimal', flagReason: 'Throughput within SLA tolerance' },
      { id: 'rec_3', title: 'Cache: Redis Global Key Eviction', category: 'Memory Cache', metricA: '94% Hit Rate', metricB: '1.2 GB Usage', status: 'synced', flagReason: 'Optimal Key Eviction Policy' },
      { id: 'rec_4', title: 'Edge Lambda: geo-routing-middleware', category: 'Edge Function', metricA: '142ms Latency', metricB: 'Cold Start Spike', status: 'warning', flagReason: 'Exceeding 100ms Edge Target', actionRecommendation: 'Enable provisioned concurrency' },
    ];
    insightAction = {
      id: 'act_dev',
      headline: 'Critical Database Latency Anomaly',
      quantitativeImpact: '840ms → 12ms Latency Reduction',
      recommendedAction: 'Apply suggested zero-downtime PostgreSQL migration and composite index.',
      actionButtonLabel: 'Deploy Optimization Script',
      successOutcome: 'Index created in 1.4s. Average endpoint latency dropped from 840ms to 11.2ms.',
    };
  } else if (archetype === 'ai_workspace') {
    dataSources = [
      { id: 'src_vector', name: 'Pinecone Vector Index (1.2M Embeddings)', type: 'Vector DB', recordCount: 1200000, isConnected: true, iconName: 'Cpu', latencyMs: 14 },
      { id: 'src_llm', name: 'Anthropic & OpenAI Edge Gateways', type: 'Model Inference', recordCount: 4200, isConnected: true, iconName: 'Zap', latencyMs: 85 },
      { id: 'src_docs', name: 'Enterprise Document Knowledge Store', type: 'Blob Ingestion', recordCount: 840, isConnected: true, iconName: 'Layers', latencyMs: 30 },
      { id: 'src_eval', name: 'Real-Time Hallucination Guardrail', type: 'Eval Stream', recordCount: 19400, isConnected: true, iconName: 'Activity', latencyMs: 10 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Agent Prompt: Multi-Modal Brand Extraction', category: 'Agent Task', metricA: '1.2s Duration', metricB: '0.02% Hallucination', status: 'optimal', flagReason: 'High Semantic Consistency' },
      { id: 'rec_2', title: 'RAG Query: Complex Vendor Contract Term', category: 'Vector Search', metricA: '340ms Retrieval', metricB: 'Low Context Score (0.61)', status: 'anomaly', flagReason: 'Missing Document Section Chunk', actionRecommendation: 'Auto-rechunk semantic embeddings' },
      { id: 'rec_3', title: 'Tool Execution: SQL Schema Generator', category: 'Tool Call', metricA: '180ms Execution', metricB: '100% Valid SQL', status: 'optimal', flagReason: 'Zero Syntax Errors' },
      { id: 'rec_4', title: 'API Rate Guard: DeepSeek LLM Failover', category: 'Gateway', metricA: '3 Retries', metricB: 'Failover Triggered', status: 'warning', flagReason: 'Upstream Model 429 Throttle', actionRecommendation: 'Switch to Anthropic fallback endpoint' },
    ];
    insightAction = {
      id: 'act_ai',
      headline: 'Semantic Retrieval Gap Detected',
      quantitativeImpact: '+32% Context Relevance Score',
      recommendedAction: 'Re-index chunk boundaries using hierarchical parent-document retriever.',
      actionButtonLabel: 'Re-Index Chunk Topology',
      successOutcome: 'Topology optimized. Context relevance score improved from 0.61 to 0.94.',
    };
  } else {
    dataSources = [
      { id: 'src_primary', name: 'Primary Core Ingestion Stream', type: 'REST / WebSocket', recordCount: 1820, isConnected: true, iconName: 'Activity', latencyMs: 16 },
      { id: 'src_customers', name: 'Customer User Profile Graph', type: 'Data Store', recordCount: 450, isConnected: true, iconName: 'User', latencyMs: 24 },
      { id: 'src_telemetry', name: 'System Performance Telemetry', type: 'Real-Time Edge', recordCount: 12400, isConnected: true, iconName: 'Zap', latencyMs: 9 },
      { id: 'src_external', name: 'Third-Party Partner Feed', type: 'Webhook API', recordCount: 890, isConnected: false, iconName: 'Globe', latencyMs: 38 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: `Workflow: ${primaryFeatureName} Run #104`, category: 'Core Workflow', metricA: 'Near Real-Time', metricB: '14 Flags Evaluated', status: 'anomaly', flagReason: 'Unoptimized Bottleneck Detected', actionRecommendation: 'Trigger automated resolution pipeline' },
      { id: 'rec_2', title: 'Module: Real-Time User Ingestion', category: 'Data Pipeline', metricA: '<100ms', metricB: '0 Drop Rate', status: 'optimal', flagReason: 'Live Sync Active' },
      { id: 'rec_3', title: 'Tenant Settings: Security & RBAC', category: 'Auth & Roles', metricA: 'Role-Based', metricB: '4 Active Seats', status: 'synced', flagReason: 'Enterprise Compliance Guard Active' },
      { id: 'rec_4', title: 'Export: Scheduled Executive Digest', category: 'Reporting', metricA: 'Weekly PDF', metricB: 'Automated', status: 'optimal', flagReason: 'Dispatches Every Monday 09:00 AM' },
    ];
    insightAction = {
      id: 'act_general',
      headline: `Operational Bottleneck in ${primaryFeatureName}`,
      quantitativeImpact: 'Estimated 3.4x Velocity Acceleration',
      recommendedAction: `Execute automated optimization engine to resolve identified workflow friction.`,
      actionButtonLabel: 'Run Automated Optimization',
      successOutcome: `Workflow executed. Target outcome achieved with zero manual intervention.`,
    };
  }

  const categoryTag = archetype === 'ecommerce'
    ? 'D2C Craft Operations & Fulfillment Portal'
    : isB2B
    ? 'B2B SaaS Intelligence Platform'
    : 'Cloud Interactive Application';

  const summaryMetrics = archetype === 'ecommerce'
    ? [
        { label: 'Order Dispatch SLA', value: '<24h Target', badge: 'Projected SLA', trend: 'up' as const },
        { label: 'Direct Craft Gross Margin', value: '~68% Target', badge: 'Model Estimate', trend: 'up' as const },
        { label: 'Size Exchange Frequency', value: '5.8% Projected', badge: 'Cluster Benchmark', trend: 'neutral' as const },
        { label: 'Artisan Batch Provenance', value: '100% Traceable', badge: 'Founder Standard', trend: 'up' as const },
      ]
    : archetype === 'developer_tool'
    ? [
        { label: 'Endpoint P99 Latency', value: '<50ms Target', badge: 'Target SLA', trend: 'up' as const },
        { label: 'Triage Overhead Saved', value: '~10h / Week', badge: 'Model Estimate', trend: 'up' as const },
        { label: 'Error Rate Threshold', value: '<0.05%', badge: 'Telemetry Target', trend: 'neutral' as const },
        { label: 'Data Isolation Guard', value: 'ACID Strict', badge: 'Architectural Spec', trend: 'up' as const },
      ]
    : [
        { label: 'Data Ingestion Latency', value: 'Near Real-Time', badge: 'Target SLA', trend: 'up' as const },
        { label: 'Identified Efficiency Gain', value: '+18-24% Margin', badge: 'Model Estimate', trend: 'up' as const },
        { label: 'Manual Work Saved', value: '~10-14 Hrs / Wk', badge: 'Founder Estimate', trend: 'up' as const },
        { label: 'Attribution Fidelity', value: 'Deterministic Graph', badge: 'Architectural Spec', trend: 'neutral' as const },
      ];

  const softwareWalkthrough: SoftwareInteractivePrototype = {
    appName,
    archetype,
    categoryTag,
    primaryFeatureName,
    workflowGoal: `Solve "${problem.slice(0, 60)}..." through live automated execution.`,
    activeScreenTitle: `${appName} // Operational Command Center`,
    dataSources,
    sampleRecords,
    insightAction,
    summaryMetrics,
    outcomeSummary: {
      timeSavedOrBenefit: 'Saves 10–15 founder hours weekly previously lost to manual data wrangling and spreadsheets.',
      coreValueDelivered: `Transforms "${problem.slice(0, 75)}..." into an automated, single-click solution.`,
      expansionTrigger: 'Self-serve seat expansion and multi-brand enterprise workspace upgrades.',
    },
  };

  const simulationAssumptions: string[] = [
    `Experience simulation is generated directly from Stage 01–06 discovery and architectural tokens for ${ventureName}.`,
    `Physical product 3D geometry and tactile materials are calibrated to regional supply chain capabilities in ${operatingLocation}.`,
    `Software workflows reflect strictly typed MVP feature scope (${primaryFeatureName}) defined in Stage 05 Build Architecture.`,
    'Metrics and records displayed in this laboratory represent interactive simulated states for preview, not audited retrospective financials.',
  ];

  return {
    id: `sim_rep_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    ventureName,
    modality,
    physicalStoryboard,
    softwareWalkthrough,
    simulationAssumptions,
  };
}
