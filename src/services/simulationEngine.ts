import { resolveVentureDomainProfile } from './ventureDomainResolver';
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
  const domainProfile = resolveVentureDomainProfile(idea, businessModel, project);

  const ventureName = idea.name || project.name || 'Untitled Venture';
  const rawInput = idea.rawInput || '';
  const problem = idea.problem || rawInput || 'Status-quo friction in the market';
  const targetAudience = idea.targetAudience || 'Target customers and early adopters';
  const differentiator = idea.differentiation || 'Specialized craft and operational transparency';
  const customerType = businessModel.customerType || 'd2c';
  const isB2B = customerType === 'b2b' || customerType === 'b2b2c';

  const country = businessModel.location?.country?.trim() || 'India';
  const cityRegion = businessModel.location?.cityRegion?.trim() || '';
  const operatingLocation =
    businessModel.location?.operatingLocation?.trim() ||
    (cityRegion ? `${cityRegion}, ${country}` : country || 'Primary Operating Market');

  const ideaLower = `${ventureName} ${rawInput} ${problem} ${differentiator} ${targetAudience}`.toLowerCase();

  const modality: SimulationReport['modality'] = forcedModality
    ? forcedModality
    : domainProfile.productModality === 'physical'
    ? 'physical'
    : 'software';

  // Extract Brand & Build tokens if available, or determine authentic product palette
  let brandPrimaryColor =
    brandRoadmap?.colorSystem?.swatches?.find((s) => s.role === 'primary')?.hex;
  let brandAccentColor =
    brandRoadmap?.colorSystem?.swatches?.find((s) => s.role === 'accent')?.hex;

  if (!brandPrimaryColor) {
    if (ideaLower.includes('tutor') || ideaLower.includes('education') || ideaLower.includes('student')) {
      brandPrimaryColor = '#4F46E5'; // Indigo
    } else if (ideaLower.includes('restaurant') || ideaLower.includes('food') || ideaLower.includes('dine')) {
      brandPrimaryColor = '#EA580C'; // Warm Amber/Orange
    } else if (ideaLower.includes('skincare') || ideaLower.includes('cosmetic') || ideaLower.includes('beauty')) {
      brandPrimaryColor = '#0D9488'; // Botanical Teal / Sage
    } else if (ideaLower.includes('medical') || ideaLower.includes('health') || ideaLower.includes('diagnostic')) {
      brandPrimaryColor = '#0EA5E9'; // Sky Blue
    } else if (ideaLower.includes('shoe') || ideaLower.includes('sneaker') || ideaLower.includes('footwear')) {
      brandPrimaryColor = '#2563EB'; // Royal Blue
    } else if (ideaLower.includes('clothing') || ideaLower.includes('apparel') || ideaLower.includes('wool')) {
      brandPrimaryColor = '#92400E'; // Earth Ochre
    } else if (ideaLower.includes('coffee') || ideaLower.includes('roast') || ideaLower.includes('bean')) {
      brandPrimaryColor = '#5B2C10'; // Deep Roast Brown
    } else if (ideaLower.includes('device') || ideaLower.includes('hardware') || ideaLower.includes('sensor')) {
      brandPrimaryColor = '#334155'; // Slate
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
  if (ideaLower.includes('skincare') || ideaLower.includes('cosmetic') || ideaLower.includes('serum') || ideaLower.includes('lotion') || ideaLower.includes('cream') || ideaLower.includes('beauty') || ideaLower.includes('dermatolog')) {
    categoryType = 'skincare';
  } else if (ideaLower.includes('medical') || ideaLower.includes('health') || ideaLower.includes('diagnostic') || ideaLower.includes('oximeter') || ideaLower.includes('vital') || ideaLower.includes('patient') || ideaLower.includes('clinical') || ideaLower.includes('doctor')) {
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
  let signatureFeature = differentiator || 'Zero-tool assembly & modular component replacement';
  let formFactor = 'Ergonomic Precision Enclosure';
  let dimensionsOrGrade = 'Grade-A Industrial Tolerance';

  if (categoryType === 'skincare') {
    packagingStyle = 'FSC-certified unbleached rigid keepsake box with embossed blind stamp and custom mold pulp insert';
    materials = ['UV-Protective Type-III Amber Borosilicate Glass', 'Medical-Grade Silicone Pipette Bulb', 'Cold-Pressed Active Botanical Extract'];
    signatureFeature = differentiator || 'Active botanical bio-lipid barrier protection with zero synthetic fragrance';
    formFactor = '30ml Precision Apothecary Dropper Vessel';
    dimensionsOrGrade = 'ISO 22716 / cGMP Cosmetic Stability Standard';
    sensoryProfile = {
      tactileFeel: 'Cool, heavy borosilicate glass in hand with ultra-smooth velvety serum absorption.',
      visualAesthetic: 'Deep amber luminescence with crisp minimalist white typography and calibrated volume markings.',
      acousticOrScentNote: 'Subtle natural botanical aroma with zero artificial masking perfume.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.7, 0.3], screenPercent: { x: 50, y: 20 }, label: 'Calibrated Precision Pipette', category: 'component', detail: 'Single-dose 0.5ml bulb drawing exact required application without skin contact contamination.', metric: '0.5ml Dose' },
      { id: 'spot_2', position: [0, 0.1, 0.4], screenPercent: { x: 50, y: 48 }, label: 'UV-Shielding Amber Glass', category: 'material', detail: 'Blocks 99.2% of photolytic wavelength degradation to preserve unstable botanical antioxidants.', metric: '99.2% UV Block' },
      { id: 'spot_3', position: [-0.6, -0.3, 0.3], screenPercent: { x: 26, y: 65 }, label: 'Clean Bio-Lipid Emulsion', category: 'finish', detail: 'Rapidly absorbed lipid matrix that mimics natural epidermal barrier proteins.', metric: 'Non-Comedogenic' },
      { id: 'spot_4', position: [0.6, -0.6, 0.3], screenPercent: { x: 74, y: 80 }, label: 'Batch Traceability QR Base', category: 'sensor', detail: 'Laser-etched QR code linking directly to third-party NABL safety and heavy metal test assays.', metric: '100% Tested' },
    ];
  } else if (categoryType === 'medical') {
    packagingStyle = 'Sterile medical-grade thermoformed blister pack in an antimicrobial presentation carton';
    materials = ['Medical-Grade Polycarbonate Shell', 'Antimicrobial Silicone Tactile Grip', 'Optical Biosensor Probe Array'];
    signatureFeature = differentiator || 'Continuous sub-second non-invasive physiological telemetry with clinical accuracy';
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
    signatureFeature = differentiator || 'Dynamic energy-return supercritical foam delivering 78% mechanical rebound';
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
    signatureFeature = differentiator || 'Micro-climate adaptive natural lanolin moisture and thermal regulation';
    formFactor = 'Sculpted Tailored Outerwear Silhouette';
    dimensionsOrGrade = 'ISO 12945 Martindale 50,000 Rub Abrasion Grade';
    sensoryProfile = {
      tactileFeel: 'Dense, substantial wool drape with silky smooth interior friction-free lining.',
      visualAesthetic: 'Rich raw earth tonality with matte horn hardware and precision contrast edge-stitching.',
      acousticOrScentNote: 'Deep, comforting organic wool scent; zero synthetic chemical off-gassing.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.6, 0.3], screenPercent: { x: 50, y: 22 }, label: '480 GSM Desert Wool Outer', category: 'material', detail: 'Dense natural wool weave providing windproof thermal barrier without synthetic fibers.', metric: '100% Biodegradable' },
      { id: 'spot_2', position: [0, 0, 0.4], screenPercent: { x: 50, y: 50 }, label: 'Reinforced Tailored Seams', category: 'component', detail: 'Double-needle bonded seam construction rated for 10+ years of winter wear.', metric: '50k Rub Tested' },
      { id: 'spot_3', position: [-0.6, -0.4, 0.3], screenPercent: { x: 25, y: 70 }, label: 'Deep Fleece-Lined Pockets', category: 'finish', detail: 'Micro-fleece hand-warmer pockets with reinforced bartack stress points.', metric: 'Thermal Core' },
      { id: 'spot_4', position: [0.6, -0.4, 0.3], screenPercent: { x: 75, y: 70 }, label: 'Ethical Provenance QR Tag', category: 'packaging', detail: 'Individual batch tag linking directly to the pastoral pastoral co-operative harvest lot.', metric: 'Direct Sourced' },
    ];
  } else if (categoryType === 'coffee') {
    packagingStyle = 'Recycled craft paper bag with one-way degassing valve and resealable tin-tie seal';
    materials = ['Specialty Grade-A Arabica Beans', 'Bio-Barrier Compostable Pouch', 'One-Way Degassing Valve'];
    signatureFeature = differentiator || 'Direct-trade estate lot roasted to order with transparent farmer payout metrics';
    formFactor = '250g / 1kg Nitrogen-Sealed Valve Pouch';
    dimensionsOrGrade = 'Specialty Coffee Association (SCA) 86+ Cup Score';
    sensoryProfile = {
      tactileFeel: 'Matte textured compostable pouch with satisfying crackle of freshly roasted whole beans.',
      visualAesthetic: 'Clean typographic origin cards with roast elevation, process, and tasting notes.',
      acousticOrScentNote: 'Intense aroma burst of dark cocoa, toasted hazelnut, and sweet berry upon valve press.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.5, 0.4], screenPercent: { x: 50, y: 28 }, label: 'One-Way Degassing Valve', category: 'sensor', detail: 'Releases natural carbon dioxide while completely preventing oxygen ingress.', metric: 'Zero Oxidation' },
      { id: 'spot_2', position: [0, -0.2, 0.4], screenPercent: { x: 50, y: 58 }, label: 'Hand-Selected Estate Arabica', category: 'material', detail: 'Zero primary defects with consistent screen size 18+ roasting profile.', metric: '86+ SCA Score' },
      { id: 'spot_3', position: [-0.7, -0.6, 0.3], screenPercent: { x: 22, y: 75 }, label: 'Compostable PLA Barrier', category: 'packaging', detail: 'Multi-layer renewable barrier keeping whole beans fresh for up to 90 days.', metric: '100% Compostable' },
      { id: 'spot_4', position: [0.7, 0.2, 0.3], screenPercent: { x: 78, y: 44 }, label: 'Estate Traceability Stamp', category: 'finish', detail: 'Individual roast date and elevation (1,400m MSL) laser-printed on each bag.', metric: 'Farm Gate Provenance' },
    ];
  } else {
    // Hardware / Connected Device
    packagingStyle = 'Matte black architectural rigid box with molded recycled EVA cradle and foil logo';
    materials = ['CNC Anodized 6061 Aerospace Aluminum', 'Gorilla Glass Front Shield', 'Gold-Plated Sensor Contacts'];
    signatureFeature = differentiator || 'Sub-millisecond real-time edge processing with 45-day rechargeable battery life';
    formFactor = 'Precision Beveled Enclosure';
    dimensionsOrGrade = 'IP68 Water & Dust Resistant Industrial Grade';
    sensoryProfile = {
      tactileFeel: 'Cold, satisfying metallic density with chamfered smooth diamond-cut edges.',
      visualAesthetic: 'Stealth matte dark gray finish with micro-etched precision port indicators.',
      acousticOrScentNote: 'Clean tactile snap on magnetic dock engagement; zero rattling components.',
    };
    physicalHotspots = [
      { id: 'spot_1', position: [0, 0.5, 0.4], screenPercent: { x: 50, y: 30 }, label: 'Anodized Aluminum Shell', category: 'material', detail: 'CNC machined unibody casing dissipating heat without noisy cooling fans.', metric: 'IP68 Certified' },
      { id: 'spot_2', position: [0, -0.3, 0.4], screenPercent: { x: 50, y: 60 }, label: 'High-Speed Edge Microcontroller', category: 'component', detail: 'Ultra-low power ARM processor executing edge inference in real time.', metric: '<15ms Response' },
      { id: 'spot_3', position: [-0.7, 0, 0.3], screenPercent: { x: 24, y: 50 }, label: 'Magnetic Docking Array', category: 'button', detail: 'Self-aligning neodymium magnets securing device into dock in <0.5s.', metric: 'Zero-Play Lock' },
      { id: 'spot_4', position: [0.7, -0.6, 0.3], screenPercent: { x: 76, y: 78 }, label: 'Micro-LED Telemetry Ring', category: 'sensor', detail: 'RGB indicator showing real-time connectivity, battery health, and operational mode.', metric: 'Ambient Dimming' },
    ];
  }

  // 7-Step Physical Storyboard
  const physical3DStages: Physical3DSequenceStep[] = [
    {
      id: 'package_closed',
      stepNumber: 1,
      stageName: '1. ARRIVAL & PACKAGING',
      title: 'First Unboxing Touchpoint',
      shortLabel: '1. Unboxing',
      description: `Delivery arrives in ${packagingStyle}. Customers inspect tamper-evident provenance seals.`,
      actionPrompt: 'Click "Open Package" to break seal and reveal outer architecture.',
      cameraPosition: [0, 1.8, 3.8],
      cameraTarget: [0, 0, 0],
      animationPhase: 0,
      delightMoment: 'Tactile textured packaging and verified tamper-evident security seal.',
    },
    {
      id: 'package_open',
      stepNumber: 2,
      stageName: '2. UNBOXING EXPERIENCE',
      title: 'Precision Nesting & Certificate',
      shortLabel: '2. Reveal',
      description: 'Lid lifts to reveal product cradled in precision molded insert with quick-start card.',
      actionPrompt: 'Observe internal nesting and provenance certificate card.',
      cameraPosition: [0, 2.2, 2.8],
      cameraTarget: [0, 0, 0],
      animationPhase: 1,
      delightMoment: 'Magnetic snap and perfectly calibrated friction-fit reveal.',
    },
    {
      id: 'product_reveal',
      stepNumber: 3,
      stageName: '3. HERO PRODUCT INSPECTION',
      title: 'Form Factor & Design Details',
      shortLabel: '3. Inspection',
      description: `Full visual inspection of ${materials[0]} and signature silhouette.`,
      actionPrompt: 'Explore interactive hotspots to inspect materials and engineering tolerances.',
      cameraPosition: [1.8, 0.5, 3.0],
      cameraTarget: [0, 0, 0],
      animationPhase: 2,
      delightMoment: `${dimensionsOrGrade} certified finish with zero visible tooling flaws.`,
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
      description: 'Hardware LEDs glow, aroma valves vent, or botanical active layers absorb smoothly.',
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
      description: `Active deployment in ${operatingLocation} environment under daily conditions.`,
      actionPrompt: 'Switch environment between Studio, Field Use, and Macro Spec.',
      cameraPosition: [1.2, 0.6, 3.5],
      cameraTarget: [0, 0, 0],
      animationPhase: 5,
      delightMoment: `Solves "${problem.slice(0, 45)}..." on the very first use.`,
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
      context: `Operating in ${operatingLocation} seeking authentic, verified solutions.`,
      keyPainRelieved: `Permanently solves: ${problem.slice(0, 75)}...`,
      initialReaction: `“The difference in build density and tactile finishing is obvious the second you hold it. It feels completely distinct from generic mass-market alternatives.”`,
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
  const primaryFeatureName = buildFeatures[0]?.name || differentiator || 'Automated Intelligence Engine';

  let archetype: SoftwareVentureArchetype = 'general_saas';
  if (ideaLower.includes('tutor') || ideaLower.includes('student') || ideaLower.includes('college') || ideaLower.includes('teach') || ideaLower.includes('education') || ideaLower.includes('edtech') || ideaLower.includes('academic') || ideaLower.includes('course')) {
    archetype = 'tutoring_edtech';
  } else if ((ideaLower.includes('corporate') || ideaLower.includes('office') || ideaLower.includes('lunch') || ideaLower.includes('meal') || ideaLower.includes('catering')) && (ideaLower.includes('restaurant') || ideaLower.includes('food') || ideaLower.includes('kitchen') || ideaLower.includes('order'))) {
    archetype = 'meal_delivery_service';
  } else if (ideaLower.includes('waste') || (ideaLower.includes('restaurant') && ideaLower.includes('food')) || ideaLower.includes('spoilage') || ideaLower.includes('surplus')) {
    archetype = 'food_waste_prediction';
  } else if (ideaLower.includes('restaurant') || ideaLower.includes('dine') || ideaLower.includes('kitchen') || ideaLower.includes('waiter') || ideaLower.includes('pos') || ideaLower.includes('table qr')) {
    archetype = 'restaurant_hospitality';
  } else if (ideaLower.includes('meal') || ideaLower.includes('lunch delivery') || ideaLower.includes('food delivery') || ideaLower.includes('tiffin')) {
    archetype = 'meal_delivery_service';
  } else if (ideaLower.includes('repair') || ideaLower.includes('handyman') || ideaLower.includes('plumber') || ideaLower.includes('electrician') || ideaLower.includes('home service') || ideaLower.includes('technician')) {
    archetype = 'local_home_repair';
  } else if (ideaLower.includes('marketplace') || ideaLower.includes('freelance') || ideaLower.includes('two-sided') || ideaLower.includes('escrow') || ideaLower.includes('peer-to-peer')) {
    archetype = 'marketplace_platform';
  } else if (ideaLower.includes('ad') || ideaLower.includes('market') || ideaLower.includes('roas') || ideaLower.includes('attribution') || ideaLower.includes('campaign')) {
    archetype = 'marketing_attribution';
  } else if (ideaLower.includes('dev') || ideaLower.includes('code') || ideaLower.includes('api') || ideaLower.includes('infra') || ideaLower.includes('query')) {
    archetype = 'developer_tool';
  } else if (ideaLower.includes('ai') || ideaLower.includes('agent') || ideaLower.includes('prompt') || ideaLower.includes('llm') || ideaLower.includes('copilot')) {
    archetype = 'ai_workspace';
  } else if (ideaLower.includes('fintech') || ideaLower.includes('bank') || ideaLower.includes('pay') || ideaLower.includes('invoice') || ideaLower.includes('ledger') || ideaLower.includes('tax')) {
    archetype = 'fintech';
  } else if (ideaLower.includes('health') || ideaLower.includes('clinic') || ideaLower.includes('patient') || ideaLower.includes('doctor') || ideaLower.includes('bio')) {
    archetype = 'healthcare';
  } else if (ideaLower.includes('shop') || ideaLower.includes('store') || ideaLower.includes('cart') || ideaLower.includes('commerce') || ideaLower.includes('checkout')) {
    archetype = 'ecommerce';
  } else if (ideaLower.includes('task') || ideaLower.includes('project') || ideaLower.includes('work') || ideaLower.includes('team') || ideaLower.includes('notion')) {
    archetype = 'productivity';
  }

  let dataSources: SimulatedDataSource[] = [];
  let sampleRecords: SimulatedRecordItem[] = [];
  let insightAction: SimulatedInsightAction = {
    id: 'act_1',
    headline: 'High-Impact Optimization Identified',
    quantitativeImpact: '24.6% Efficiency Acceleration',
    recommendedAction: 'Automate one-click workflow re-allocation across live data channels.',
    actionButtonLabel: 'Execute Automated Fix',
    successOutcome: 'Optimization rules applied successfully. 14.8h manual triage eliminated.',
  };

  if (archetype === 'tutoring_edtech') {
    dataSources = [
      { id: 'src_tutors', name: 'Verified Subject Tutor Pool', type: 'Active Directory', recordCount: 142, isConnected: true, iconName: 'User', latencyMs: 12 },
      { id: 'src_sessions', name: 'Live Video Classroom Sessions', type: 'WebRTC Mesh', recordCount: 38, isConnected: true, iconName: 'Activity', latencyMs: 24 },
      { id: 'src_escrow', name: 'Student Booking Escrow Ledger', type: 'Stripe Connect', recordCount: 680, isConnected: true, iconName: 'CreditCard', latencyMs: 18 },
      { id: 'src_requests', name: 'Urgent Homework & Exam Queries', type: 'Real-Time Queue', recordCount: 94, isConnected: true, iconName: 'Zap', latencyMs: 8 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Calculus II: Multivariable Derivatives (Alex M.)', category: 'Live Session', metricA: '₹450 / Hr', metricB: '4.9 ★ (88 Lessons)', status: 'optimal', flagReason: 'High Student Satisfaction' },
      { id: 'rec_2', title: 'Organic Chemistry: Reaction Mechanisms (Priya S.)', category: 'Urgent Match', metricA: 'Starts in 10m', metricB: 'Exam Prep', status: 'optimal', flagReason: 'Instant Match Available' },
      { id: 'rec_3', title: 'Macroeconomics: Fiscal Policy Analysis (David R.)', category: 'Escrow Review', metricA: '₹600 Held', metricB: 'Session Completed', status: 'synced', flagReason: 'Ready for 85% Auto-Disbursement' },
      { id: 'rec_4', title: 'Intro to Python & Data Structures (Pending Tutor)', category: 'Unmatched Query', metricA: 'Budget ₹350/hr', metricB: '3 Requests Open', status: 'warning', flagReason: 'Supply Bottleneck in CS Section', actionRecommendation: 'Ping top 5 verified CS tutors with 15% surge bonus' },
    ];
    insightAction = {
      id: 'act_tutoring',
      headline: 'Unmatched Student Queries in Computer Science',
      quantitativeImpact: '3 Students Waiting (>12 min wait time)',
      recommendedAction: 'Dispatch instant WhatsApp notification to 5 offline verified CS tutors with guaranteed surge rate.',
      actionButtonLabel: 'Broadcast Tutor Surge Notification',
      successOutcome: 'Surge broadcast sent. 2 tutors accepted within 42 seconds. Zero dropped student bookings.',
    };
  } else if (archetype === 'food_waste_prediction') {
    dataSources = [
      { id: 'src_pos_waste', name: 'Petpooja / POS Sales Feed', type: 'Webhook API', recordCount: 840, isConnected: true, iconName: 'CreditCard', latencyMs: 14 },
      { id: 'src_prep', name: 'Morning Kitchen Prep Schedule', type: 'Kitchen KDS', recordCount: 32, isConnected: true, iconName: 'Utensils', latencyMs: 8 },
      { id: 'src_inventory', name: 'Perishable Walk-In Inventory', type: 'Stock Ledger', recordCount: 114, isConnected: true, iconName: 'Layers', latencyMs: 16 },
      { id: 'src_weather', name: 'Local Footfall & Weather Predictor', type: 'Telemetry Feed', recordCount: 24, isConnected: true, iconName: 'Globe', latencyMs: 22 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Prep Batch: Marinated Paneer & Tikka Sauce', category: 'Prep Sheet', metricA: 'Rec: 14.5 kg (was 22kg)', metricB: '-34% Surplus', status: 'optimal', flagReason: 'Calibrated to Wednesday Forecast' },
      { id: 'rec_2', title: 'Perishable Stock: Fresh Dairy & Heavy Cream', category: 'Expiry Risk', metricA: '3.2 L Surplus', metricB: '48h Expiry', status: 'anomaly', flagReason: 'Spoilage Hazard Detected', actionRecommendation: 'Trigger automated dinner special special dessert feature' },
      { id: 'rec_3', title: 'End-of-Day Food Waste Log: Station 02', category: 'Evening Waste', metricA: '1.4 kg Total', metricB: '₹420 Lost', status: 'synced', flagReason: '62% Below Historic Baseline' },
      { id: 'rec_4', title: 'Automated Supplier Re-Order: Fresh Herbs', category: 'Auto-Order', metricA: 'Scheduled 06:00 AM', metricB: '₹1,850 PO', status: 'optimal', flagReason: 'Dynamic Par Level Applied' },
    ];
    insightAction = {
      id: 'act_waste',
      headline: 'Surplus Cream Spoilage Risk (₹2,400 Loss)',
      quantitativeImpact: '3.2L Perishable Dairy Expiring in 48h',
      recommendedAction: 'Apply automated dinner special promotion rule to POS menu to liquidate surplus before expiry.',
      actionButtonLabel: 'Activate Chef Special Discount on POS',
      successOutcome: 'Special activated on POS. 14 orders sold in 3 hours. 100% surplus converted to ₹3,800 gross revenue with 0 waste.',
    };
  } else if (archetype === 'meal_delivery_service') {
    dataSources = [
      { id: 'src_subscribers', name: 'Active Office Lunch Subscribers', type: 'Subscription API', recordCount: 412, isConnected: true, iconName: 'User', latencyMs: 10 },
      { id: 'src_kitchen', name: 'Central Cloud Kitchen Assembly', type: 'Assembly Line', recordCount: 580, isConnected: true, iconName: 'Utensils', latencyMs: 12 },
      { id: 'src_routes', name: 'Office Tower Route Fleet GPS', type: 'Dispatch Telemetry', recordCount: 18, isConnected: true, iconName: 'Globe', latencyMs: 15 },
      { id: 'src_feedback', name: 'Daily Macro & Taste Ratings', type: 'Survey Stream', recordCount: 290, isConnected: true, iconName: 'Activity', latencyMs: 20 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Tower A (Cyber City): 48 Thermal Lunch Packs', category: 'Desk Delivery', metricA: 'ETA 12:22 PM', metricB: '100% On-Time', status: 'optimal', flagReason: 'Driver Dispatched via Route 01' },
      { id: 'rec_2', title: 'Menu Item: Grilled Harissa Chicken & Quinoa', category: 'Chef Macro Prep', metricA: '42g Protein / 520 Cal', metricB: '184 Boxes Packed', status: 'optimal', flagReason: '98% Customer Satisfaction' },
      { id: 'rec_3', title: 'Tower C (Prestige Tech): High Traffic Delay', category: 'Route Alert', metricA: 'ETA 12:44 PM', metricB: '+12m Delay', status: 'warning', flagReason: 'Elevator Bottleneck', actionRecommendation: 'Re-assign building runner to lower lobby' },
      { id: 'rec_4', title: 'Subscription Pauses: Friday Hybrid Work', category: 'Calendar Sync', metricA: '64 Pauses Handled', metricB: 'Zero Food Waste', status: 'synced', flagReason: 'Kitchen Prep Batch Auto-Adjusted' },
    ];
    insightAction = {
      id: 'act_meal',
      headline: 'Tower C Lunch Rush Elevator Bottleneck',
      quantitativeImpact: '14 Deliveries Risk 12:30 PM SLA Breach',
      recommendedAction: 'Dispatch dedicated runner to Tower C lobby with pre-sorted desk bag codes.',
      actionButtonLabel: 'Dispatch Lobby Express Runner',
      successOutcome: 'Lobby runner deployed. All 14 boxes delivered to desk by 12:28 PM. 100% SLA preserved.',
    };
  } else if (archetype === 'local_home_repair') {
    dataSources = [
      { id: 'src_technicians', name: 'Vetted Master Technician Pool', type: 'KYC Dispatch', recordCount: 86, isConnected: true, iconName: 'User', latencyMs: 12 },
      { id: 'src_jobs', name: 'Active Emergency & Scheduled Repairs', type: 'Job Pipeline', recordCount: 42, isConnected: true, iconName: 'Activity', latencyMs: 16 },
      { id: 'src_escrow_repair', name: 'Customer Repair Escrow Vault', type: 'Settlement Ledger', recordCount: 310, isConnected: true, iconName: 'CreditCard', latencyMs: 18 },
      { id: 'src_warranty', name: '90-Day Workmanship Warranty Log', type: 'Quality Database', recordCount: 520, isConnected: true, iconName: 'Layers', latencyMs: 25 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Job #408: Main Kitchen Drain Leakage Repair', category: 'Active Dispatch', metricA: '₹850 Rate Card', metricB: 'Tech ETA 18m', status: 'optimal', flagReason: 'Master Plumber Dispatched' },
      { id: 'rec_2', title: 'Job #402: Circuit Breaker Tripping Diagnostic', category: 'Escrow Approval', metricA: '₹1,200 Held', metricB: 'Work Verified', status: 'synced', flagReason: 'Customer Signed Off • Ready for Release' },
      { id: 'rec_3', title: 'Job #415: AC Gas Leakage (High Temp Day)', category: 'Emergency Queue', metricA: '3 Techs Contacted', metricB: '12m Wait', status: 'anomaly', flagReason: 'Technician Supply Shortage in North Ward', actionRecommendation: 'Trigger ₹200 surge incentive to nearby technicians' },
      { id: 'rec_4', title: 'Warranty Claim: Bathroom Valve Seal', category: 'Warranty Service', metricA: '0 Charge to Customer', metricB: 'Resolved in 24h', status: 'optimal', flagReason: 'Covered under 90-Day Guarantee' },
    ];
    insightAction = {
      id: 'act_repair',
      headline: 'Emergency AC Repair Dispatch Gap (North Ward)',
      quantitativeImpact: 'Customer Waiting >12m for Technician Confirmation',
      recommendedAction: 'Broadcast ₹200 rapid-dispatch bonus to 4 verified HVAC technicians within 3km.',
      actionButtonLabel: 'Broadcast Rapid Dispatch Surge',
      successOutcome: 'Surge broadcast accepted in 32 seconds by Master Technician Rajesh K. Arrival ETA 22 minutes.',
    };
  } else if (archetype === 'restaurant_hospitality') {
    dataSources = [
      { id: 'src_tables', name: 'Active Dining Table Sessions', type: 'Table Realtime', recordCount: 24, isConnected: true, iconName: 'Layers', latencyMs: 10 },
      { id: 'src_kds', name: 'Kitchen Display System (KDS Queue)', type: 'Thermal Socket', recordCount: 18, isConnected: true, iconName: 'Activity', latencyMs: 14 },
      { id: 'src_pos', name: 'Petpooja / POS Ledger Sync', type: 'POS Webhook', recordCount: 420, isConnected: true, iconName: 'CreditCard', latencyMs: 28 },
      { id: 'src_diner_qr', name: 'Diner Digital Menu Interactions', type: 'Browser Session', recordCount: 88, isConnected: true, iconName: 'Globe', latencyMs: 16 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Table #04: 2x Smoked Truffle Burger + IPA', category: 'Kitchen Prep', metricA: 'Prep Time 8m', metricB: 'KOT #104', status: 'optimal', flagReason: 'On Schedule (Target <12m)' },
      { id: 'rec_2', title: 'Table #12: Split Bill Payment via UPI / Card', category: 'Settlement', metricA: '₹2,480 Total', metricB: '3 Diners Split', status: 'synced', flagReason: 'Zero Waiter Delay' },
      { id: 'rec_3', title: 'Table #08: Bar Cocktail Round (4 Drinks)', category: 'Bar Station', metricA: 'Wait Time 14m', metricB: 'Bottleneck', status: 'anomaly', flagReason: 'Bar Station Overloaded', actionRecommendation: 'Re-route ice prep to station assistant' },
      { id: 'rec_4', title: 'Table #02: Reorder Dessert & Espresso', category: 'Table Reorder', metricA: '₹620 Add-on', metricB: 'Direct QR', status: 'optimal', flagReason: '+25% Average Order Value' },
    ];
    insightAction = {
      id: 'act_rest',
      headline: 'Bar Station Peak Delay on Table #08',
      quantitativeImpact: 'Table turnover slowed by 6.5 minutes',
      recommendedAction: 'Trigger automated bartender prep alert and send complimentary beverage notification to table.',
      actionButtonLabel: 'Expedite Bar Ticket & Notify Table',
      successOutcome: 'Ticket expedited to senior mixologist. Cocktails dispatched in 2.1m. Diner satisfaction preserved.',
    };
  } else if (archetype === 'marketplace_platform') {
    dataSources = [
      { id: 'src_providers', name: 'Verified Service Provider Network', type: 'KYC Directory', recordCount: 310, isConnected: true, iconName: 'User', latencyMs: 15 },
      { id: 'src_escrow', name: 'Two-Sided Escrow Vault', type: 'Settlement API', recordCount: 940, isConnected: true, iconName: 'CreditCard', latencyMs: 22 },
      { id: 'src_orders', name: 'Live Active Work Orders', type: 'Order Pipeline', recordCount: 76, isConnected: true, iconName: 'Activity', latencyMs: 18 },
      { id: 'src_disputes', name: 'Dispute & Resolution Center', type: 'Moderation Queue', recordCount: 3, isConnected: true, iconName: 'Zap', latencyMs: 30 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Order #802: Enterprise Delivery Sprint', category: 'Active Order', metricA: '$1,800 Vault', metricB: '95% Complete', status: 'optimal', flagReason: 'Deliverable Verified' },
      { id: 'rec_2', title: 'Provider KYC: Identity & Bank Account', category: 'Onboarding', metricA: 'ID Verified', metricB: 'Tax Compliant', status: 'synced', flagReason: 'Approved for Live Bidding' },
      { id: 'rec_3', title: 'Order #794: Scope Revision Request', category: 'Dispute Queue', metricA: '$450 Disputed', metricB: '2 Flags', status: 'anomaly', flagReason: 'Milestone Discrepancy', actionRecommendation: 'Trigger automated 50/50 mediation split' },
      { id: 'rec_4', title: 'Escrow Payout Batch: 28 Providers', category: 'Settlement', metricA: '$24,600 Total', metricB: '0% Failure', status: 'optimal', flagReason: 'Processed via Automated Webhook' },
    ];
    insightAction = {
      id: 'act_market',
      headline: 'Automated Mediation Available for Order #794',
      quantitativeImpact: '$450 Disputed Capital Locked',
      recommendedAction: 'Execute milestone mediation rule based on verified chat deliverables.',
      actionButtonLabel: 'Apply Automated Mediation Settlement',
      successOutcome: 'Mediation executed successfully. Escrow unlocked and disbursed with both parties accepting terms.',
    };
  } else if (archetype === 'marketing_attribution') {
    dataSources = [
      { id: 'src_shopify', name: 'Storefront Orders (Live Stream)', type: 'Storefront API', recordCount: 1420, isConnected: true, iconName: 'ShoppingBag', latencyMs: 18 },
      { id: 'src_meta', name: 'Meta Ads Manager (Campaigns)', type: 'Marketing API', recordCount: 86, isConnected: true, iconName: 'TrendingUp', latencyMs: 34 },
      { id: 'src_stripe', name: 'Stripe Ledger (Settled Net Rev)', type: 'Billing API', recordCount: 955, isConnected: true, iconName: 'CreditCard', latencyMs: 22 },
      { id: 'src_ga4', name: 'Google Analytics 4 (Web Traffic)', type: 'Telemetry Stream', recordCount: 28400, isConnected: false, iconName: 'Globe', latencyMs: 45 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Campaign #04: High-Intent Search Conversion', category: 'Paid Search', metricA: '$4,280 Spend', metricB: '3.82x ROAS', status: 'optimal', flagReason: 'High Net Margin Per Conversion' },
      { id: 'rec_2', title: 'Ad Set #12: Broad Audience Social Discovery', category: 'Meta Ads', metricA: '$8,940 Spend', metricB: '1.14x ROAS (Blended: 2.8x)', status: 'anomaly', flagReason: 'Attribution Mismatch in iOS 14+', actionRecommendation: 'Re-route $2,400 to retargeting' },
      { id: 'rec_3', title: 'Organic Search: Problem Comparison Landing Page', category: 'Direct Traffic', metricA: '4,120 Visits', metricB: '6.4% Conversion', status: 'synced', flagReason: 'Top Performing Landing Page' },
      { id: 'rec_4', title: 'Ad Set #09: Low-Intent Display Ads', category: 'Display Network', metricA: '$3,100 Spend', metricB: '0.78x ROAS', status: 'warning', flagReason: 'Negative ROI on Low-Intent Clicks', actionRecommendation: 'Pause keyword match query' },
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
      { id: 'src_vector', name: 'Vector DB Index (1.2M Embeddings)', type: 'Vector DB', recordCount: 1200000, isConnected: true, iconName: 'Cpu', latencyMs: 14 },
      { id: 'src_llm', name: 'Anthropic & OpenAI Edge Gateways', type: 'Model Inference', recordCount: 4200, isConnected: true, iconName: 'Zap', latencyMs: 85 },
      { id: 'src_docs', name: 'Enterprise Document Knowledge Store', type: 'Blob Ingestion', recordCount: 840, isConnected: true, iconName: 'Layers', latencyMs: 30 },
      { id: 'src_eval', name: 'Real-Time Hallucination Guardrail', type: 'Eval Stream', recordCount: 19400, isConnected: true, iconName: 'Activity', latencyMs: 10 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: 'Agent Prompt: Multi-Modal Context Extraction', category: 'Agent Task', metricA: '1.2s Duration', metricB: '0.02% Hallucination', status: 'optimal', flagReason: 'High Semantic Consistency' },
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
    // General SaaS
    dataSources = [
      { id: 'src_primary', name: 'Primary Core Ingestion Stream', type: 'REST / WebSocket', recordCount: 1820, isConnected: true, iconName: 'Activity', latencyMs: 16 },
      { id: 'src_customers', name: 'Customer User Profile Graph', type: 'Data Store', recordCount: 450, isConnected: true, iconName: 'User', latencyMs: 24 },
      { id: 'src_telemetry', name: 'System Performance Telemetry', type: 'Real-Time Edge', recordCount: 12400, isConnected: true, iconName: 'Zap', latencyMs: 9 },
      { id: 'src_external', name: 'Third-Party Partner Feed', type: 'Webhook API', recordCount: 890, isConnected: false, iconName: 'Globe', latencyMs: 38 },
    ];
    sampleRecords = [
      { id: 'rec_1', title: `Workflow: ${primaryFeatureName} Run #104`, category: 'Core Workflow', metricA: '99.4% Match', metricB: '14 Flags Raised', status: 'anomaly', flagReason: 'Unoptimized Bottleneck Detected', actionRecommendation: 'Trigger automated resolution pipeline' },
      { id: 'rec_2', title: 'Module: Real-Time User Ingestion', category: 'Data Pipeline', metricA: 'Sub-50ms', metricB: '0 Drop Rate', status: 'optimal', flagReason: 'Live Sync Active' },
      { id: 'rec_3', title: 'Tenant Settings: Security & RBAC', category: 'Auth & Roles', metricA: 'SOC2 Ready', metricB: '4 Active Seats', status: 'synced', flagReason: 'Enterprise Compliance Guard Active' },
      { id: 'rec_4', title: 'Export: Scheduled Executive Digest', category: 'Reporting', metricA: 'Weekly PDF', metricB: 'Automated', status: 'optimal', flagReason: 'Dispatches Every Monday 09:00 AM' },
    ];
    insightAction = {
      id: 'act_general',
      headline: `Operational Bottleneck in ${primaryFeatureName}`,
      quantitativeImpact: '3.4x Velocity Acceleration',
      recommendedAction: `Execute automated optimization engine to resolve identified workflow friction.`,
      actionButtonLabel: 'Run Automated Optimization',
      successOutcome: `Workflow executed in 48ms. Target outcome achieved with zero manual intervention.`,
    };
  }

  const softwareWalkthrough: SoftwareInteractivePrototype = {
    appName,
    archetype,
    categoryTag: isB2B ? 'B2B Intelligence Platform' : archetype === 'tutoring_edtech' ? 'Two-Sided EdTech Platform' : archetype === 'restaurant_hospitality' ? 'Restaurant Operations Platform' : 'Cloud Interactive Web App',
    primaryFeatureName,
    workflowGoal: `Solve "${problem.slice(0, 60)}..." through live automated execution.`,
    activeScreenTitle: `${appName} // Operational Command Center`,
    dataSources,
    sampleRecords,
    insightAction,
    summaryMetrics: [
      { label: 'Data Processing Speed', value: '38ms Real-Time', badge: 'Sub-50ms Edge', trend: 'up' },
      { label: 'Identified Efficiency Gain', value: '+24.6% Margin', badge: 'Verified', trend: 'up' },
      { label: 'Manual Work Eliminated', value: '14.2 Hrs / Wk', badge: 'Automated', trend: 'up' },
      { label: 'System Accuracy SLA', value: '99.8% Match', badge: 'Audit Grade', trend: 'neutral' },
    ],
    outcomeSummary: {
      timeSavedOrBenefit: 'Saves 10–15 founder hours weekly previously lost to manual data wrangling and spreadsheets.',
      coreValueDelivered: `Transforms "${problem.slice(0, 75)}..." into an automated, single-click solution.`,
      expansionTrigger: 'Self-serve customer expansion and high-margin referral loops.',
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
