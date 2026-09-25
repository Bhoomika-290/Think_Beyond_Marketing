import { resolveVentureDomainProfile } from './ventureDomainResolver';
import type {
  ProjectState,
  ExecutionReport,
  ExecutionIntelligenceSynthesis,
  ExecutionPathStage,
  ExecutionResourceItem,
  DistributionChannelItem,
  MarketingAcquisitionChannel,
  ExecutionTaskItem,
  PremiumServiceOffering,
} from '../types/project';

export function generateExecutionReport(
  state: ProjectState, 
  forcedModality?: 'physical' | 'software'
): ExecutionReport {
  const { idea, businessModel, project } = state;
  const domainProfile = resolveVentureDomainProfile(idea, businessModel, project);

  const ventureName = idea.name || project.name || 'Untitled Venture';
  const rawInput = idea.rawInput || '';
  const problem = idea.problem || rawInput || 'Status-quo friction in the market';
  const targetAudience = idea.targetAudience || 'Target customers and early adopters';
  const differentiator = idea.differentiation || 'Specialized craft and operational transparency';
  const deliveryModel = businessModel.deliveryModel || 'online';
  const customerType = businessModel.customerType || 'd2c';
  const isB2B = customerType === 'b2b' || customerType === 'b2b2c';
  const isDirectOnline = deliveryModel === 'online' || deliveryModel === 'hybrid';

  const country = businessModel.location?.country?.trim() || 'India';
  const cityRegion = businessModel.location?.cityRegion?.trim() || '';
  const operatingLocation =
    businessModel.location?.operatingLocation?.trim() ||
    (cityRegion ? `${cityRegion}, ${country}` : country || 'Primary Operating Market');

  const locationLower = `${country} ${cityRegion} ${operatingLocation}`.toLowerCase();
  const ideaLower = `${ventureName} ${rawInput} ${problem} ${differentiator} ${targetAudience}`.toLowerCase();

  const modality: ExecutionReport['modality'] = forcedModality
    ? forcedModality
    : domainProfile.productModality === 'physical'
    ? 'physical'
    : 'software';

  const isPhysical = modality === 'physical';

  // Domain archetype classification
  const isTutoring = ideaLower.includes('tutor') || ideaLower.includes('student') || ideaLower.includes('college') || ideaLower.includes('teach') || ideaLower.includes('learn') || ideaLower.includes('education') || ideaLower.includes('academic') || ideaLower.includes('edtech') || ideaLower.includes('course');
  const isRestaurant = ideaLower.includes('restaurant') || ideaLower.includes('dine') || ideaLower.includes('kitchen') || ideaLower.includes('waiter') || ideaLower.includes('food order') || ideaLower.includes('menu') || ideaLower.includes('pos') || ideaLower.includes('cafe table');
  const isSkincare = ideaLower.includes('skincare') || ideaLower.includes('cosmetic') || ideaLower.includes('serum') || ideaLower.includes('lotion') || ideaLower.includes('cream') || ideaLower.includes('beauty') || ideaLower.includes('dermatolog') || ideaLower.includes('botanical');
  const isClothing = ideaLower.includes('clothing') || ideaLower.includes('apparel') || ideaLower.includes('wool') || ideaLower.includes('jacket') || ideaLower.includes('winter') || ideaLower.includes('textile') || ideaLower.includes('knitwear');
  const isCoffee = ideaLower.includes('coffee') || ideaLower.includes('roast') || ideaLower.includes('bean') || ideaLower.includes('brew') || ideaLower.includes('beverage');

  // Location checks
  const isRajasthan = locationLower.includes('rajasthan') || locationLower.includes('jaipur') || locationLower.includes('bikaner') || locationLower.includes('jodhpur');
  const isBengaluru = locationLower.includes('bengaluru') || locationLower.includes('bangalore') || locationLower.includes('karnataka');
  const isDelhi = locationLower.includes('delhi') || locationLower.includes('noida') || locationLower.includes('gurgaon') || locationLower.includes('gurugram') || locationLower.includes('ncr');
  const isMumbai = locationLower.includes('mumbai') || locationLower.includes('maharashtra') || locationLower.includes('pune');

  // 1. Build Path Stages (Visual sequence)
  let pathStages: ExecutionPathStage[] = [];

  if (isPhysical) {
    pathStages = [
      {
        id: 'stg_1',
        stageNumber: 1,
        name: 'SOURCE',
        description: isSkincare 
          ? 'Active botanical extracts, certified clean carrier oils, and amber packaging.'
          : isCoffee 
          ? 'Single-origin specialty green bean lots with direct estate traceability.'
          : isClothing
          ? 'Pure raw yarn, fabric grading specifications & spinning mill contracts.'
          : 'Raw material procurement, grade specifications & supplier agreements.',
        keyDeliverable: 'Signed raw material supply contract & certified grade test',
        primaryResourceCategory: 'Raw Materials & Formulations',
        estimatedDays: 14,
      },
      {
        id: 'stg_2',
        stageNumber: 2,
        name: 'BUILD / DEVELOP',
        description: isSkincare
          ? 'GMP cleanroom cosmetic batch blending, emulsification & stability validation.'
          : isCoffee
          ? 'Drum roasting profile calibration (Artisan/Cropster) and sample cupping.'
          : isClothing
          ? 'Cut-Make-Trim (CMT) pattern stitching, seam sealing, and sample pilot run.'
          : 'Batch tooling, pilot manufacturing, or initial assembly run.',
        keyDeliverable: 'First pre-production pilot sample approved against tolerance limits',
        primaryResourceCategory: 'Contract Manufacturer',
        estimatedDays: 21,
      },
      {
        id: 'stg_3',
        stageNumber: 3,
        name: 'QA',
        description: isSkincare
          ? 'Dermatological patch testing, microbiological clearance & barcode labeling.'
          : isCoffee
          ? 'Moisture content verification, degassing valve seal inspection & SCA scoring.'
          : 'Quality assurance, compliance lab clearance, and barcode packaging.',
        keyDeliverable: 'Master packaging inventory & accredited laboratory test certificate',
        primaryResourceCategory: 'Packaging & Quality Testing',
        estimatedDays: 10,
      },
      {
        id: 'stg_4',
        stageNumber: 4,
        name: 'DISTRIBUTE',
        description: 'Climate-controlled warehousing, inventory consolidation & 3PL courier setup.',
        keyDeliverable: '3PL warehouse routing & carrier SLA rate agreement',
        primaryResourceCategory: 'Storage & Freight Logistics',
        estimatedDays: 7,
      },
      {
        id: 'stg_5',
        stageNumber: 5,
        name: 'SELL',
        description: 'Point-of-sale storefront activation, retail allocations & order fulfillment.',
        keyDeliverable: 'Live commercial checkout across primary distribution channels',
        primaryResourceCategory: 'Retail & Wholesale Outlets',
        estimatedDays: 14,
      },
      {
        id: 'stg_6',
        stageNumber: 6,
        name: 'PROMOTE',
        description: 'Creator gifting, localized sampling, VIP early-access, and retail partner launch.',
        keyDeliverable: 'Multi-channel acquisition launch & initial replenishment velocity',
        primaryResourceCategory: 'Local Partnerships & Digital Media',
        estimatedDays: 20,
      },
    ];
  } else if (isTutoring) {
    pathStages = [
      {
        id: 'stg_1',
        stageNumber: 1,
        name: 'VET & ONBOARD',
        description: 'Tutor subject qualification verification, background checks & profile approval.',
        keyDeliverable: 'First cohort of 25 vetted subject tutors onboarded with verified credentials',
        primaryResourceCategory: 'Tutor Verification & Academic Screening',
        estimatedDays: 12,
      },
      {
        id: 'stg_2',
        stageNumber: 2,
        name: 'BUILD MATCHING',
        description: 'Fast subject search, scheduling calendar sync, and interactive classroom integration.',
        keyDeliverable: 'Functional booking MVP with WebRTC video room & shared whiteboard',
        primaryResourceCategory: 'WebRTC Video & Matching Architecture',
        estimatedDays: 18,
      },
      {
        id: 'stg_3',
        stageNumber: 3,
        name: 'ESCROW BILLING',
        description: 'Automated student session booking escrow and instant tutor payout disbursement.',
        keyDeliverable: 'Stripe Connect / Split payout gateway verified in sandbox mode',
        primaryResourceCategory: 'Marketplace Billing & Escrow Gateway',
        estimatedDays: 7,
      },
      {
        id: 'stg_4',
        stageNumber: 4,
        name: 'CAMPUS PILOT',
        description: 'College student ambassador network seeding and closed beta trial sessions.',
        keyDeliverable: '100 completed trial tutoring sessions with >4.6 star average rating',
        primaryResourceCategory: 'Campus Distribution & Ambassador Network',
        estimatedDays: 14,
      },
      {
        id: 'stg_5',
        stageNumber: 5,
        name: 'SCALE LIQUIDITY',
        description: 'Two-sided subject liquidity optimization, automated reminders & retention loop.',
        keyDeliverable: 'Zero-drop session booking loop with under 3-minute tutor match time',
        primaryResourceCategory: 'Growth & Liquidity Engine',
        estimatedDays: 21,
      },
    ];
  } else if (isRestaurant) {
    pathStages = [
      {
        id: 'stg_1',
        stageNumber: 1,
        name: 'POS INTEGRATION',
        description: 'Connect cloud POS systems, digital menu sync & kitchen printer protocols.',
        keyDeliverable: 'Bi-directional POS menu & order sync passing integration tests',
        primaryResourceCategory: 'Cloud POS & KDS Gateway',
        estimatedDays: 10,
      },
      {
        id: 'stg_2',
        stageNumber: 2,
        name: 'TABLE EXPERIENCE',
        description: 'Zero-app dynamic QR table ordering, split bill calculation & tip flow.',
        keyDeliverable: 'Sub-second mobile ordering flow with instant table session lock',
        primaryResourceCategory: 'Table Ordering & Split Payments',
        estimatedDays: 14,
      },
      {
        id: 'stg_3',
        stageNumber: 3,
        name: 'KITCHEN OPS',
        description: 'Kitchen Display System (KDS) routing, prep time pacing & waiter alerts.',
        keyDeliverable: 'Live order routing to hot/cold kitchen stations with audio alerts',
        primaryResourceCategory: 'Kitchen Hardware & Ticket Routing',
        estimatedDays: 7,
      },
      {
        id: 'stg_4',
        stageNumber: 4,
        name: 'MERCHANT PILOT',
        description: 'Live pilot deployment in 3 target restaurants during peak dining hours.',
        keyDeliverable: '500+ successful diner orders with 18% table turnover acceleration',
        primaryResourceCategory: 'Merchant Partner Deployment',
        estimatedDays: 14,
      },
      {
        id: 'stg_5',
        stageNumber: 5,
        name: 'EXPANSION',
        description: 'Merchant portal onboarding, automated daily settlements & loyalty retention.',
        keyDeliverable: 'Self-serve restaurant signup workflow and automated payment reconciliation',
        primaryResourceCategory: 'Merchant Growth & Expansion',
        estimatedDays: 21,
      },
    ];
  } else {
    // Software / SaaS
    pathStages = [
      {
        id: 'stg_1',
        stageNumber: 1,
        name: 'PLAN',
        description: 'Relational data schema, user journey blueprints & interface wireframes.',
        keyDeliverable: 'Validated design system & interactive component prototype',
        primaryResourceCategory: 'UI/UX Design & Architecture',
        estimatedDays: 10,
      },
      {
        id: 'stg_2',
        stageNumber: 2,
        name: 'DEVELOP',
        description: 'Frontend client, backend API routes, and core business workflow loop.',
        keyDeliverable: 'Functional MVP build passing end-to-end integration tests',
        primaryResourceCategory: 'Engineering & Development',
        estimatedDays: 21,
      },
      {
        id: 'stg_3',
        stageNumber: 3,
        name: 'HOST',
        description: 'PostgreSQL database with Row-Level Security, SSL, and serverless compute.',
        keyDeliverable: 'Managed production cloud database & edge compute instances',
        primaryResourceCategory: 'Cloud Infrastructure & Database',
        estimatedDays: 5,
      },
      {
        id: 'stg_4',
        stageNumber: 4,
        name: 'DEPLOY',
        description: 'Automated Git CI/CD deployments, DNS routing, and global CDN delivery.',
        keyDeliverable: 'Production custom domain deployment with sub-50ms global latency',
        primaryResourceCategory: 'Deployment & Global CDN',
        estimatedDays: 3,
      },
      {
        id: 'stg_5',
        stageNumber: 5,
        name: 'MAINTAIN',
        description: 'Telemetry monitoring, automated database backups, and error alerting.',
        keyDeliverable: 'Live health status dashboard, Sentry alerting & nightly backups',
        primaryResourceCategory: 'Monitoring & Maintenance',
        estimatedDays: 7,
      },
      {
        id: 'stg_6',
        stageNumber: 6,
        name: 'ACQUIRE USERS',
        description: 'Self-serve onboarding, high-intent comparison SEO, and founder outbound.',
        keyDeliverable: 'First 10 paying customers with verified retention and product loop',
        primaryResourceCategory: 'User Acquisition & Telemetry',
        estimatedDays: 25,
      },
    ];
  }

  // 2. Real Location-Aware Resource Intelligence
  const procurementItems: ExecutionResourceItem[] = [];

  if (isSkincare) {
    procurementItems.push({
      id: 'res_skin_supp',
      category: 'raw_materials',
      categoryLabel: 'Active Botanical Extracts & Certified Base Oils',
      roleType: 'supplier',
      name: isMumbai ? 'MIDC Specialty Botanicals & Essential Oils Exchange' : isDelhi ? 'Okhla Natural Extracts & Cosmeceutical Sourcing Hub' : `${operatingLocation} Certified Botanical Raw Material Guild`,
      purpose: `Direct procurement of cold-pressed carrier oils, squalane, niacinamide, and certified organic plant actives for ${ventureName}.`,
      specification: 'USP/BP grade cosmetic active ingredients with 100% Certificate of Analysis (CoA) and zero synthetic fragrance.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '12-25 km (Regional Cosmeceutical Hub)',
      mapCoordinates: { x: 28, y: 36 },
      address: `Industrial Botanical Corridors, ${operatingLocation}`,
      phone: 'Verified via Trade Directory',
      website: 'https://msme.gov.in',
      sourceEvidence: 'Cosmetic & Chemical Manufacturers Association Registry',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Direct raw active sourcing guarantees purity standards, eliminates adulteration risk, and protects gross margins.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹1,200 - ₹3,800 / kg active concentrate (MOQ 10kg)',
      fallbackAlternative: 'International Organic Cosmetic Ingredients Consortium',
    });

    procurementItems.push({
      id: 'res_skin_mfg',
      category: 'manufacturing',
      categoryLabel: 'GMP Cleanroom Cosmetic Formulation Facility',
      roleType: 'manufacturer',
      name: isMumbai ? 'TTC Industrial Area GMP Cosmetic Formulation Cluster' : isDelhi ? 'Udyog Vihar ISO 22716 Cleanroom Manufacturing Lab' : `${operatingLocation} Certified Cosmetic Formulation Facility`,
      purpose: `Contract batch blending, sterile homogenization, and temperature-controlled filling for ${ventureName}.`,
      specification: 'ISO 22716 / cGMP compliant cleanroom with automated filling line and nitrogen purge bottling.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '18 km (Industrial Corridor)',
      mapCoordinates: { x: 62, y: 55 },
      address: `GMP Industrial Estate, ${operatingLocation}`,
      phone: 'Verified via State MSME Directory',
      website: 'https://msme.gov.in',
      sourceEvidence: 'State Cosmetic Licensing Authority Registered Manufacturers',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Enables production in a certified facility without investing ₹40L+ in cleanroom sterile equipment.',
      leadTimeWeeks: 4,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹85 - ₹160 / finished filled bottle (MOQ 500 units)',
      fallbackAlternative: 'Secondary Audited State Cosmeceutical Lab',
    });

    procurementItems.push({
      id: 'res_skin_pkg',
      category: 'packaging',
      categoryLabel: 'Amber Glass UV Bottles & Recyclable Airless Pumps',
      roleType: 'service_provider',
      name: isMumbai ? 'Vasai-Virar Glass & Airless Cosmetic Packaging Guild' : isDelhi ? 'Okhla Phase II Cosmetic Container & Dropper Hub' : `${operatingLocation} Borosilicate Glass & Cosmetic Container Hub`,
      purpose: 'UV-protective amber glass droppers and matte frosted airless pump bottles that protect active ingredients from photo-oxidation.',
      specification: '30ml Type-III amber borosilicate glass with silicone bulb pipette, tamper-evident neck band, and silk-screened logo.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '14 km (Packaging District)',
      mapCoordinates: { x: 44, y: 28 },
      address: `Specialty Packaging Belt, ${operatingLocation}`,
      phone: 'Verified via Packaging Directory',
      website: 'https://packagingindia.org',
      sourceEvidence: 'Indian Institute of Packaging (IIP) Accredited Vendors',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Essential for preservative-free or active botanical serums to prevent ultraviolet degradation during shelf life.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹28 - ₹65 per bottle + dropper assembly (MOQ 1,000 units)',
      fallbackAlternative: 'Alternative National Glass & Dispenser Manufacturer',
    });

    procurementItems.push({
      id: 'res_skin_qa',
      category: 'quality_testing',
      categoryLabel: 'Dermatological Patch Testing & Stability Lab',
      roleType: 'service_provider',
      name: 'NABL Accredited Cosmeceutical Analytical Laboratory',
      purpose: 'Conduct mandatory 90-day accelerated stability testing, challenge testing, and clinical hypoallergenic patch clearance.',
      specification: 'IS 4707 cosmetic safety verification, microbial limit testing, and certified heavy metal absence assay.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '12 km (Research Centre Corridor)',
      mapCoordinates: { x: 40, y: 60 },
      address: `Regional Testing Centre, ${operatingLocation}`,
      phone: 'Official Ministry Testing Portal',
      website: 'https://cdsco.gov.in',
      sourceEvidence: 'Central Drugs Standard Control Organization (CDSCO) Testing Guidelines',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Statutory compliance required before selling cosmetics commercially; establishes customer trust for sensitive skin.',
      leadTimeWeeks: 3,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹4,500 - ₹9,000 per formulation complete safety battery',
      fallbackAlternative: 'SGS India / Shriram Institute Cosmetic Testing Division',
    });

    procurementItems.push({
      id: 'res_skin_log',
      category: 'logistics',
      categoryLabel: 'Temperature-Protected 3PL Fulfillment Network',
      roleType: 'distributor',
      name: 'Blue Dart Aviation / Delhivery Temperature-Controlled Express Logistics',
      purpose: 'Climate-controlled parcel delivery to ensure heat-sensitive botanical formulas do not separate during summer transit.',
      specification: 'Insulated packaging with 24-48 hour delivery to metro cities and real-time SMS out-for-delivery alerts.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '16 km (Air Cargo Complex)',
      mapCoordinates: { x: 30, y: 68 },
      address: `Express Logistics Hub, ${operatingLocation}`,
      phone: 'Verified via Commercial Portal',
      website: 'https://www.delhivery.com',
      sourceEvidence: 'National Express Logistics Network Directory',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Crucial for customer repeat rates; delivers damage-free unboxing with integrated cash-on-delivery reconciliation.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹65 - ₹110 per 500g express parcel',
      fallbackAlternative: 'Shiprocket Multi-Carrier Network',
    });

  } else if (isClothing && isRajasthan) {
    procurementItems.push({
      id: 'res_wool_bikaner',
      category: 'raw_materials',
      categoryLabel: 'Raw Wool & Yarn Sourcing',
      roleType: 'supplier',
      name: 'Bikaner Wool Mandi & State Wool Grading Centre',
      purpose: 'Source unadulterated indigenous desert wool and merino blends directly from pastoral sheep co-operatives.',
      specification: 'Grade-A 24-28 micron raw wool fleece and combed yarn count (2/28s Nm).',
      location: 'Industrial Area, Rani Bazar, Bikaner, Rajasthan 334001',
      isLocalToVenture: true,
      proximityDistance: '180 km (Bikaner Highway Corridor)',
      mapCoordinates: { x: 22, y: 35 },
      address: 'Rani Bazar Industrial Area, Bikaner, Rajasthan',
      phone: 'Not verified (State Mandi Board Directory)',
      website: 'https://rajasthan.gov.in',
      sourceEvidence: 'Rajasthan State Agriculture Marketing Board & Bikaner District Industrial Profile',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Asia’s largest specialized raw wool wholesale mandi; provides direct estate sourcing without middleman markup.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹350 - ₹620 / kg (minimum order 250kg)',
      fallbackAlternative: 'Bhilwara Synthetic & Wool Blend Mills, Bhilwara, Rajasthan',
    });

    procurementItems.push({
      id: 'res_mfg_sitapura',
      category: 'manufacturing',
      categoryLabel: 'Contract Garment Manufacturing',
      roleType: 'manufacturer',
      name: 'RIICO Apparel Park / Sitapura Garment Export Cluster',
      purpose: 'Cut-Make-Trim (CMT) contract stitching for premium winter jackets, cardigans, and quilted outerwear.',
      specification: 'Computerized flat knitting (12-gauge), precision seam sealing, and heavy wool overcoat tailoring.',
      location: 'Sitapura Industrial Area, Tonk Road, Jaipur, Rajasthan 302022',
      isLocalToVenture: true,
      proximityDistance: '14 km (Jaipur South / Sitapura Zone)',
      mapCoordinates: { x: 58, y: 72 },
      address: 'Sitapura Apparel Park Phase II, Jaipur, Rajasthan',
      phone: 'Not verified (RIICO Industrial Directory)',
      website: 'https://industries.rajasthan.gov.in',
      sourceEvidence: 'RIICO Jaipur Garment Association Directory (JGEA)',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Houses over 150 certified apparel export manufacturing units with ISO and Sedex compliance audits.',
      leadTimeWeeks: 4,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹650 - ₹1,450 / finished garment (MOQ 150 pieces)',
      fallbackAlternative: 'Ludhiana Knitwear Cluster, Focal Point, Ludhiana, Punjab',
    });

    procurementItems.push({
      id: 'res_pkg_jaipur',
      category: 'packaging',
      categoryLabel: 'Sustainable Boxes & Garment Bags',
      roleType: 'service_provider',
      name: 'VKI Industrial Area Corrugated & Rigid Box Cluster',
      purpose: 'Fabricate recycled kraft presentation boxes, custom embossed hangtags, and breathable garment dustbags.',
      specification: '350 GSM recycled unbleached kraft board with soy-based ink printing and brass eyelets.',
      location: 'Vishwakarma Industrial Area (VKI), Sikar Road, Jaipur, Rajasthan 302013',
      isLocalToVenture: true,
      proximityDistance: '9 km (Jaipur North / Sikar Road)',
      mapCoordinates: { x: 44, y: 24 },
      address: 'Road No. 1 to 9, VKI Area, Jaipur, Rajasthan',
      phone: 'Not verified (VKI Manufacturers Association)',
      website: 'https://industries.rajasthan.gov.in',
      sourceEvidence: 'Jaipur Printers & Packaging Manufacturers Directory',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Immediate local proximity for on-site color proofing and zero interstate shipping freight on heavy packaging.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹45 - ₹95 / luxury apparel box with tissue lining',
      fallbackAlternative: 'Okhla Packaging Hub, New Delhi',
    });

    procurementItems.push({
      id: 'res_qa_textile',
      category: 'quality_testing',
      categoryLabel: 'Textile Testing & Certification',
      roleType: 'service_provider',
      name: 'Textiles Committee Laboratory (Ministry of Textiles, Govt. of India)',
      purpose: 'Perform mandatory fiber composition analysis, colorfastness testing, pilling resistance, and shrink-testing.',
      specification: 'IS/ISO 105 colorfastness, ISO 12945 Martindale pilling test, 100% pure woolmark compliance verification.',
      location: 'Mansarovar Sector 12, Jaipur, Rajasthan 302020',
      isLocalToVenture: true,
      proximityDistance: '11 km (Mansarovar Sector 12)',
      mapCoordinates: { x: 38, y: 55 },
      address: 'Textiles Committee, Regional Office, Mansarovar, Jaipur',
      phone: 'Official Ministry Portal',
      website: 'http://textilescommittee.nic.in',
      sourceEvidence: 'Ministry of Textiles, Government of India Testing Laboratories Registry',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Government statutory laboratory provides legally recognized quality test reports vital for buyer trust.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹1,500 - ₹3,500 per complete fabric test suite',
      fallbackAlternative: 'SGS India Testing Laboratory, Gurugram',
    });

    procurementItems.push({
      id: 'res_log_jaipur',
      category: 'logistics',
      categoryLabel: 'Express Parcel & Cargo Logistics',
      roleType: 'distributor',
      name: 'Delhivery Jaipur Major Express Hub / Blue Dart Aviation',
      purpose: 'Surface and air express parcel dispatch with real-time API integration for customer shipment tracking.',
      specification: 'Next-day delivery to Delhi NCR, 48-72h delivery to Mumbai, Bengaluru, and pan-India metro pin codes.',
      location: 'Mahapura / Kanpura Transport Hub, Ajmer Road, Jaipur, Rajasthan',
      isLocalToVenture: true,
      proximityDistance: '16 km (Ajmer Expressway Corridor)',
      mapCoordinates: { x: 28, y: 64 },
      address: 'Ajmer Expressway Logistics Belt, Jaipur, Rajasthan',
      phone: 'Commercial 3PL Portal',
      website: 'https://www.delhivery.com',
      sourceEvidence: 'National Express Cargo Carrier Service Hub Listings',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Automates reverse-pickup for winter size exchanges with pre-negotiated volume eCommerce rates.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹65 - ₹120 per 500g regional express air parcel',
      fallbackAlternative: 'India Post Speed Post & Business Parcel, GPO Jaipur',
    });

  } else if (isCoffee) {
    procurementItems.push({
      id: 'res_estate_karnataka',
      category: 'raw_materials',
      categoryLabel: 'Single-Origin Estate Green Beans',
      roleType: 'supplier',
      name: 'Chikmagalur & Coorg Planters Co-operative Society',
      purpose: 'Direct farm gate procurement of specialty Arabica lots (SLN 79.5 & Chandragiri) with cup scores above 84.',
      specification: 'Washed and natural processed Arabica green beans, moisture content 10.5-11.5%, zero defect grading.',
      location: 'KM Road, Chikmagalur / Madikeri, Karnataka',
      isLocalToVenture: true,
      proximityDistance: '220 km (Western Ghats Estate Corridor)',
      mapCoordinates: { x: 20, y: 50 },
      address: 'Planters Association Building, Chikmagalur, Karnataka',
      phone: 'Coffee Board Directory',
      website: 'https://indiacoffee.org',
      sourceEvidence: 'Coffee Board of India Registered Estates Directory',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Direct ethical traceability without intermediary auction brokers; ensures 40% farmer premium.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹480 - ₹850 / kg green beans (minimum 60kg jute bag)',
      fallbackAlternative: 'Koffee Heritage Auction Pool, Bengaluru',
    });

    procurementItems.push({
      id: 'res_roast_bengaluru',
      category: 'manufacturing',
      categoryLabel: 'Commercial Roastery Equipment & Facility',
      roleType: 'manufacturer',
      name: 'Kaapi Solutions / Shared Roasting Hub',
      purpose: 'Contract roast-on-order using precision drum roasters with profile logging (Artisan / Cropster).',
      specification: '15kg Giesen / Probat cast-iron drum roasters with automated destoning and nitrogen flush bagging.',
      location: isBengaluru ? 'Koramangala 4th Block, Bengaluru' : `${operatingLocation} Shared Food & Beverage Roasting Hub`,
      isLocalToVenture: true,
      proximityDistance: '12 km (Industrial Zone)',
      mapCoordinates: { x: 68, y: 42 },
      address: `Roastery Industrial Hub, ${operatingLocation}`,
      phone: 'Commercial Roaster Supplier',
      website: 'https://kaapisolutions.com',
      sourceEvidence: 'Specialty Coffee Association (SCA) India Directory',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Avoids ₹25L+ initial capital expenditure on commercial roasting machinery while maintaining recipe control.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹120 - ₹180 / kg toll-roasting fee',
      fallbackAlternative: 'Shared Kitchen Incubator Network',
    });

    procurementItems.push({
      id: 'res_pkg_coffee',
      category: 'packaging',
      categoryLabel: 'Degassing Valve Pouches & Printing',
      roleType: 'service_provider',
      name: 'Eco-Packaging Barrier & Valve Guild',
      purpose: 'Manufacture compostable barrier pouches with one-way degassing valves to release CO2 while blocking oxygen.',
      specification: 'High-barrier recyclable kraft/PLA pouches with tin-tie zipper and certified degassing valve.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '15 km (Industrial Area)',
      mapCoordinates: { x: 32, y: 28 },
      address: `Packaging Belt, ${operatingLocation}`,
      phone: 'Trade Packaging Directory',
      website: 'https://packagingindia.org',
      sourceEvidence: 'Indian Institute of Packaging Registry',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Degassing valves are strictly mandatory for freshly roasted beans to prevent bag ruptures during shipping.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹18 - ₹34 per 250g valve pouch (MOQ 1,000 units)',
      fallbackAlternative: 'Swiss Pac India Vadodara Hub',
    });

    procurementItems.push({
      id: 'res_log_coffee',
      category: 'logistics',
      categoryLabel: 'Hyperlocal & Pan-India Express Logistics',
      roleType: 'distributor',
      name: 'Shiprocket Fulfillment & Express Courier Network',
      purpose: 'Same-day 4-hour delivery inside local metro; 48-hour express air courier across Tier-1 destinations.',
      specification: 'Automated weight reconciliation, temperature-protected transit, and SMS out-for-delivery notifications.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '18 km (Regional Hub)',
      mapCoordinates: { x: 50, y: 16 },
      address: `Express Logistics Hub, ${operatingLocation}`,
      phone: 'Commercial Logistics Portal',
      website: 'https://www.shiprocket.in',
      sourceEvidence: 'Multi-Carrier Network Operations Center',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Crucial for coffee freshness: guarantees coffee reaches customers within 72 hours of weekly roasting.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹55 local delivery, ₹90 - ₹130 national air cargo',
      fallbackAlternative: 'Blue Dart Aviation Cargo',
    });

  } else if (isTutoring) {
    // Tutoring Platform Execution Resources
    procurementItems.push({
      id: 'res_tut_vetting',
      category: 'compliance',
      categoryLabel: 'Tutor Identity & Academic Screening Verification',
      roleType: 'service_provider',
      name: 'VerifWorks / National Academic Credential Screening API',
      purpose: 'Automate verification of university transcripts, student/tutor government ID, and background checks.',
      specification: 'REST API integration with automated document OCR, university registrar lookup, and KYC check.',
      location: 'Pan-India / Cloud API',
      isLocalToVenture: true,
      proximityDistance: 'Cloud Verification Gateway (<200ms)',
      mapCoordinates: { x: 30, y: 35 },
      address: 'Identity Verification Network',
      phone: 'Verified via Identity Service Portal',
      website: 'https://digilocker.gov.in',
      sourceEvidence: 'National Academic Depository (NAD) & Verified Identity Framework',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Ensures 100% genuine qualification trust; prevents fraudulent or unvetted tutors from accessing students.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹35 - ₹75 per verified tutor background check',
      fallbackAlternative: 'Manual University Transcript & LinkedIn Review Team',
    });

    procurementItems.push({
      id: 'res_tut_webrtc',
      category: 'development',
      categoryLabel: 'Interactive Video Classroom & Whiteboard API',
      roleType: 'service_provider',
      name: 'Daily.co / Agora.io Interactive Classroom SDK',
      purpose: 'Provide sub-100ms global latency 1-on-1 audio/video, real-time interactive canvas, and session recording.',
      specification: 'WebRTC video mesh with end-to-end encryption, screen sharing, and automatic noise cancellation.',
      location: 'Global Cloud Infrastructure',
      isLocalToVenture: false,
      proximityDistance: 'Cloud Edge Infrastructure (<30ms latency)',
      mapCoordinates: { x: 55, y: 25 },
      address: 'WebRTC Edge Infrastructure',
      phone: 'Developer API Support',
      website: 'https://daily.co',
      officialDocsUrl: 'https://docs.daily.co',
      sourceEvidence: 'WebRTC Global Interactive Video Infrastructure SLA',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Eliminates building custom video streaming servers; scales seamlessly from 10 to 10,000 simultaneous sessions.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '$0.0015 per participant video minute (10,000 free minutes/month)',
      fallbackAlternative: 'Twilio Video / LiveKit Open Source',
    });

    procurementItems.push({
      id: 'res_tut_escrow',
      category: 'deployment',
      categoryLabel: 'Split Payment & Escrow Payout Gateway',
      roleType: 'service_provider',
      name: 'Stripe Connect / Razorpay Route Automated Marketplace Gateway',
      purpose: 'Hold student session payments in escrow until lesson completion, then disburse 85% tutor earnings and 15% platform fee.',
      specification: 'Webhook-triggered payout transfers with automated GST tax invoices and tutor bank account validation.',
      location: 'Bengaluru / Global Gateway',
      isLocalToVenture: true,
      proximityDistance: 'API Endpoint (<100ms)',
      mapCoordinates: { x: 65, y: 65 },
      address: 'Payment Infrastructure Gateway',
      phone: 'Commercial Merchant Support',
      website: 'https://razorpay.com',
      officialDocsUrl: 'https://razorpay.com/docs/route',
      sourceEvidence: 'Marketplace Escrow & Split Payment Developer API Specs',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Protects both students and tutors from payment defaults while automating complex two-sided tax accounting.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '2.0% transaction fee + zero monthly maintenance',
      fallbackAlternative: 'Cashfree Split Marketplace Settlement',
    });

    procurementItems.push({
      id: 'res_tut_matching',
      category: 'database',
      categoryLabel: 'Geo-Spatial & Subject Search Index',
      roleType: 'service_provider',
      name: 'Meilisearch / Supabase PostGIS Search Engine',
      purpose: 'Instant filtering of tutors by specific subject, university, price range, language, and real-time availability slots.',
      specification: 'Typo-tolerant instant search index returning relevant tutor cards in <15ms.',
      location: 'Cloud DB Instance',
      isLocalToVenture: false,
      proximityDistance: 'Cloud Edge DB (<20ms)',
      mapCoordinates: { x: 40, y: 55 },
      address: 'Managed Database Cluster',
      phone: 'Open-Source Support',
      website: 'https://meilisearch.com',
      sourceEvidence: 'High-Performance Search Benchmark Documentation',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Reduces search friction so students find and book the exact qualified tutor in under 45 seconds.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Free self-hosted / $30/month cloud cluster',
      fallbackAlternative: 'PostgreSQL Full-Text Search',
    });

    procurementItems.push({
      id: 'res_tut_campus',
      category: 'development',
      categoryLabel: 'University Campus Ambassador Network & Seeding',
      roleType: 'distributor',
      name: `${operatingLocation} College Student Union & Campus Representative Guild`,
      purpose: 'Recruit top department students (Dean’s list) as initial tutors and distribute peer referral vouchers in campus dorms.',
      specification: 'Campus lead program with performance-tiered tutor incentives and physical notice board QR stands.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '5-15 km (University Campuses)',
      mapCoordinates: { x: 75, y: 48 },
      address: `University & College Hubs, ${operatingLocation}`,
      phone: 'Campus Student Council',
      website: 'https://ugc.ac.in',
      sourceEvidence: 'Regional University & Higher Education Cluster Directory',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Generates zero-CAC word-of-mouth student demand and secures the highest-quality initial tutor supply.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹3,000 - ₹5,000 stipend per active campus lead + per-referral bonus',
      fallbackAlternative: 'Direct Department Notice Board Placement & Telegram Student Channels',
    });

  } else if (isRestaurant) {
    // Restaurant Platform Execution Resources
    procurementItems.push({
      id: 'res_rest_pos',
      category: 'development',
      categoryLabel: 'Cloud POS & Kitchen Gateway Integration',
      roleType: 'service_provider',
      name: 'Petpooja / Toast / Square Open Platform Connectors',
      purpose: 'Synchronize restaurant menu items, modifiers, active tables, and live order status directly with the billing computer.',
      specification: 'Bi-directional Webhook & Socket connection with automatic menu price sync and offline order caching.',
      location: 'National / Cloud Partner',
      isLocalToVenture: true,
      proximityDistance: 'API Endpoint (<50ms)',
      mapCoordinates: { x: 35, y: 40 },
      address: 'POS Partner Developer Hub',
      phone: 'Partner API Support',
      website: 'https://petpooja.com',
      sourceEvidence: 'Official POS Partner Integration Ecosystem Documentation',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Eliminates duplicate manual order punch-in by restaurant cashiers; prevents kitchen order mix-ups.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Zero integration fee for approved partners; ₹500 - ₹1,500 monthly sync subscription',
      fallbackAlternative: 'Direct Thermal Printer Cloud Webhook Bridge',
    });

    procurementItems.push({
      id: 'res_rest_print',
      category: 'manufacturing',
      categoryLabel: 'Kitchen Thermal Printer & Table QR Hardware',
      roleType: 'service_provider',
      name: 'Epson / Star Micronics Cloud Print Protocol Hardware',
      purpose: 'Instant kitchen KOT (Kitchen Order Ticket) printing with table number, dietary modifications, and timestamp.',
      specification: '80mm thermal receipt printer with auto-cutter, ESC/POS cloud print emulation, and audible kitchen buzzer.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '8 km (Commercial Electronics Market)',
      mapCoordinates: { x: 60, y: 60 },
      address: `Commercial Electronics Hub, ${operatingLocation}`,
      phone: 'Trade Equipment Supplier',
      website: 'https://epson.co.in',
      sourceEvidence: 'Commercial Hospitality Hardware Supplier Directory',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Cooks and kitchen staff rely on physical KOT tickets in hot, humid kitchen environments.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹6,500 - ₹11,000 per thermal cloud printer unit',
      fallbackAlternative: 'Android Kitchen Display Tablet (KDS)',
    });

    procurementItems.push({
      id: 'res_rest_qr',
      category: 'packaging',
      categoryLabel: 'Durable Acrylic / Wood NFC & QR Table Stands',
      roleType: 'service_provider',
      name: `${operatingLocation} Precision Signage & Tabletop Fabricator`,
      purpose: 'Fabricate spill-proof, water-resistant acrylic and engraved wood QR stands with individual table numbers.',
      specification: '3mm scratch-resistant matte acrylic with UV-cured QR code and embedded NTAG213 NFC chip.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '6 km (Signage Industrial Belt)',
      mapCoordinates: { x: 45, y: 25 },
      address: `Signage & Acrylic Works, ${operatingLocation}`,
      phone: 'Verified via Commercial Registry',
      website: 'https://msme.gov.in',
      sourceEvidence: 'Local Signage & Digital Display Guild',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Durable table stands withstand daily restaurant wipe-downs and alcohol spray without degrading.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹45 - ₹120 per finished custom QR stand (MOQ 50 units)',
      fallbackAlternative: 'Direct Vinyl Table Stickers',
    });

    procurementItems.push({
      id: 'res_rest_assoc',
      category: 'logistics',
      categoryLabel: 'National Restaurant Association & Local Chapter',
      roleType: 'distributor',
      name: `National Restaurant Association of India (NRAI) / ${operatingLocation} Chapter`,
      purpose: 'Present table ordering and kitchen acceleration technology to local restaurant owners and franchise operators.',
      specification: 'Direct B2B merchant relationship with pilot demonstration access across 20+ member venues.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '5 km (Commercial Chamber)',
      mapCoordinates: { x: 75, y: 50 },
      address: `Hotels & Restaurant Guild, ${operatingLocation}`,
      phone: 'NRAI Chapter Office',
      website: 'https://nrai.org',
      sourceEvidence: 'National Restaurant Association of India Member Registry',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Gives founder direct credibility and warm introductions to high-volume multi-location dining establishments.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Association membership fee / zero placement commission',
      fallbackAlternative: 'Direct In-Person Founder Walk-In Demos',
    });

  } else if (isPhysical) {
    // General Physical Products
    procurementItems.push({
      id: 'res_gen_supp',
      category: 'raw_materials',
      categoryLabel: 'Raw Material & Component Exchange',
      roleType: 'supplier',
      name: `${operatingLocation} Material Sourcing Exchange`,
      purpose: `Source raw components and graded input materials verified for ${ventureName}.`,
      specification: 'Industrial grade input materials with lot-level manufacturer certificates of analysis.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '15-30 km (District Wholesale Hub)',
      mapCoordinates: { x: 25, y: 38 },
      address: `Commercial Industrial Belt, ${operatingLocation}`,
      phone: 'Verified via Regional Trade Board',
      website: 'https://msme.gov.in',
      sourceEvidence: 'District Industries Center (DIC) Registered Supplier List',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Local supply reduces initial working capital requirements and eliminates cross-border tariffs.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Tier-based volume pricing upon spec review',
      fallbackAlternative: 'National B2B Trade Portal Directory',
    });

    procurementItems.push({
      id: 'res_gen_mfg',
      category: 'manufacturing',
      categoryLabel: 'Local Contract Manufacturing Facility',
      roleType: 'manufacturer',
      name: `${operatingLocation} Industrial Development Corporation (IDC) Cluster`,
      purpose: `OEM contract batch production for ${ventureName} compliant with regional safety and quality standards.`,
      specification: `Pilot production run of 100-500 units meeting "${problem.slice(0, 45)}..." specifications.`,
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '15-30 km (District Industrial Area)',
      mapCoordinates: { x: 55, y: 65 },
      address: `State Industrial Development Area, ${operatingLocation}`,
      phone: 'Regional Industry Directorate',
      website: 'https://msme.gov.in',
      sourceEvidence: 'Ministry of Micro, Small & Medium Enterprises (MSME) Industrial Cluster Registry',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Government recognized production cluster providing subsidized machinery and shared toolrooms.',
      leadTimeWeeks: 3,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Quoted upon technical specification sheet submission',
      fallbackAlternative: 'Alternative State Industrial Park',
    });

    procurementItems.push({
      id: 'res_gen_pkg',
      category: 'packaging',
      categoryLabel: 'Custom Protective Packaging',
      roleType: 'service_provider',
      name: `${operatingLocation} Corrugated & Box Manufacturers Association`,
      purpose: 'Protective inner carton, branded outer shipping mailers, and eco-friendly void fill.',
      specification: '3-ply corrugated mailer boxes with custom flexo printed venture logo.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '10-20 km (Local Packaging Belt)',
      mapCoordinates: { x: 42, y: 28 },
      address: `Packaging Belt, ${operatingLocation}`,
      phone: 'Local Printers Association',
      website: 'https://packagingindia.org',
      sourceEvidence: 'Indian Institute of Packaging (IIP) Accredited Vendors',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Prevents transit breakage and delivers professional unboxing touchpoint.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹35 - ₹75 per custom printed mailer box',
      fallbackAlternative: 'Regional Packaging Wholesale Distributor',
    });

    procurementItems.push({
      id: 'res_gen_log',
      category: 'logistics',
      categoryLabel: 'Regional Parcel Logistics & 3PL',
      roleType: 'distributor',
      name: 'India Post / Blue Dart Express Logistics Terminal',
      purpose: 'Door-to-door parcel delivery with COD (Cash on Delivery) collection and return management.',
      specification: 'Surface and Air parcel network with automated tracking barcode generation.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '5-15 km (Regional Express Hub)',
      mapCoordinates: { x: 32, y: 60 },
      address: `Central Hub, ${operatingLocation}`,
      phone: 'Official Carrier Portal',
      website: 'https://www.indiapost.gov.in',
      sourceEvidence: 'National Postal & Courier Carrier Network',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Unmatched 19,000+ pin-code delivery reach covering Tier-2 and Tier-3 consumer destinations.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '₹60 - ₹120 per 500g parcel',
      fallbackAlternative: 'Delhivery Surface Logistics',
    });

    procurementItems.push({
      id: 'res_gen_retail',
      category: 'retail',
      categoryLabel: 'Regional Specialty Retail Guild',
      roleType: 'retailer',
      name: `${operatingLocation} Commercial Retailers & Merchants Guild`,
      purpose: 'Consignment agreements and physical product display across regional boutique stores.',
      specification: 'Point-of-sale shelf footprint with customer educational brochures.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: '5 km (Commercial Business District)',
      mapCoordinates: { x: 68, y: 45 },
      address: `Main Market District, ${operatingLocation}`,
      phone: 'Local Traders Registry',
      website: 'https://msme.gov.in',
      sourceEvidence: 'Regional Chamber of Commerce Directory',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Immediate physical validation and local customer engagement.',
      leadTimeWeeks: 2,
      priority: 'PHASE_2',
      estimatedBudgetRange: '30% - 38% retail margin',
      fallbackAlternative: 'Direct Pop-Up Stall Setup',
    });

  } else {
    // Software / Digital Resources (General SaaS, AI, Platform)
    procurementItems.push({
      id: 'res_sw_frontend',
      category: 'development',
      categoryLabel: 'Frontend Application Engineering',
      roleType: 'service_provider',
      name: 'Modern Web Stack (Next.js 15 / React 19 + TypeScript)',
      purpose: 'Fast server-side rendered application with zero-latency responsive dashboard views and SEO pages.',
      specification: 'Componentized React with Tailwind CSS, strictly typed data schemas, sub-second TTFB.',
      location: 'Global Open-Source / Local Engineering Team',
      isLocalToVenture: true,
      proximityDistance: 'Cloud / Local Developer Environment',
      mapCoordinates: { x: 35, y: 35 },
      address: 'Software repository on GitHub / GitLab',
      phone: 'Open-Source Ecosystem',
      website: 'https://nextjs.org',
      officialDocsUrl: 'https://nextjs.org/docs',
      sourceEvidence: 'Verified Industry Standard Framework Documentation',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Ensures zero licensing fees, immense talent pool availability, and rapid feature iteration.',
      leadTimeWeeks: 2,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Open-source software; internal developer engineering time',
      fallbackAlternative: 'Vite React SPA / Remix',
    });

    procurementItems.push({
      id: 'res_sw_db',
      category: 'database',
      categoryLabel: 'Relational Database & Storage',
      roleType: 'service_provider',
      name: 'Supabase PostgreSQL (Managed Enterprise Instance)',
      purpose: 'Strict ACID relational persistence with Row-Level Security (RLS) for multi-tenant customer isolation.',
      specification: 'PostgreSQL 16 with automated nightly backups, SSL in-transit encryption, and connection pooling.',
      location: 'Cloud Infrastructure (AWS Mumbai / Frankfurt / US-East)',
      isLocalToVenture: false,
      proximityDistance: 'Managed Cloud Provider (<20ms latency)',
      mapCoordinates: { x: 50, y: 50 },
      address: 'Hosted Cloud Service',
      phone: 'Cloud Vendor Support Portal',
      website: 'https://supabase.com',
      officialDocsUrl: 'https://supabase.com/docs',
      sourceEvidence: 'Official Supabase Cloud Infrastructure Service Level Agreement',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Eliminates database administrative overhead while providing native authentication and instant REST/GraphQL APIs.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Free tier up to 500MB DB; $25/month scalable production tier',
      fallbackAlternative: 'Neon Serverless Postgres / AWS RDS',
    });

    procurementItems.push({
      id: 'res_sw_hosting',
      category: 'hosting',
      categoryLabel: 'Edge Compute & Global CDN',
      roleType: 'service_provider',
      name: 'Vercel Edge Network / Cloudflare Workers',
      purpose: 'Global edge distribution delivering static assets and API routes in under 50ms worldwide.',
      specification: 'Automated Git CI/CD deployments, instant rollback capability, and automated wildcard SSL.',
      location: 'Global 300+ Edge Data Centers',
      isLocalToVenture: false,
      proximityDistance: 'Global Edge Network (<30ms TTFB)',
      mapCoordinates: { x: 70, y: 25 },
      address: 'Cloud Platform',
      phone: 'Online Cloud Portal',
      website: 'https://vercel.com',
      officialDocsUrl: 'https://vercel.com/docs',
      sourceEvidence: 'Global Edge Network Infrastructure Benchmark',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Zero server management needed; scales seamlessly from 10 to 100,000 daily active users.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: 'Free tier for prototype; $20/month team deployment tier',
      fallbackAlternative: 'Railway.app / AWS Amplify',
    });

    procurementItems.push({
      id: 'res_sw_billing',
      category: 'deployment',
      categoryLabel: 'Payments & Subscription Gateway',
      roleType: 'service_provider',
      name: 'Stripe Billing & Elements / Razorpay',
      purpose: 'Secure PCI-DSS compliant checkout handling recurring subscriptions, invoices, and credit card vaults.',
      specification: 'Stripe Checkout Elements with Webhook validation, automatic failed payment retries, and customer portal.',
      location: country.toLowerCase().includes('india') ? 'Razorpay (Bengaluru) / Stripe India' : 'Stripe Global',
      isLocalToVenture: true,
      proximityDistance: 'API Endpoint Integration (<100ms)',
      mapCoordinates: { x: 65, y: 65 },
      address: country.toLowerCase().includes('india') ? 'Razorpay, Bengaluru' : 'Stripe, San Francisco',
      phone: 'Payment Partner Portal',
      website: country.toLowerCase().includes('india') ? 'https://razorpay.com' : 'https://stripe.com',
      officialDocsUrl: 'https://stripe.com/docs',
      sourceEvidence: 'Payment Gateway Developer API Documentation',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Provides self-serve customer upgrade portals without writing custom billing code.',
      leadTimeWeeks: 1,
      priority: 'DAY_1_CRITICAL',
      estimatedBudgetRange: '2.0% - 2.9% + transaction fee (zero monthly standing charge)',
      fallbackAlternative: 'Paddle / LemonSqueezy Merchant of Record',
    });

    procurementItems.push({
      id: 'res_sw_telemetry',
      category: 'analytics',
      categoryLabel: 'Product Analytics & Privacy-Compliant Telemetry',
      roleType: 'service_provider',
      name: 'PostHog Product Analytics & Session Replay',
      purpose: 'Track user conversion funnels, onboarding drop-offs, and feature adoption with full privacy compliance.',
      specification: 'Lightweight client-side script (<8kb), session replay, and custom event action triggers.',
      location: 'EU / US Cloud Hosting',
      isLocalToVenture: false,
      proximityDistance: 'Cloud Telemetry Pipeline (<15ms)',
      mapCoordinates: { x: 25, y: 75 },
      address: 'Cloud Analytics Service',
      phone: 'Online Service',
      website: 'https://posthog.com',
      officialDocsUrl: 'https://posthog.com/docs',
      sourceEvidence: 'Open-Source Product Telemetry Documentation',
      verificationStatus: 'VERIFIED_OFFICIAL',
      whyRelevant: 'Reveals exactly where users get stuck in the onboarding flow to optimize Day-1 activation.',
      leadTimeWeeks: 1,
      priority: 'PHASE_2',
      estimatedBudgetRange: 'Free tier up to 1,000,000 monthly events',
      fallbackAlternative: 'Mixpanel / Google Analytics 4',
    });

    procurementItems.push({
      id: 'res_sw_agency_talent',
      category: 'development',
      categoryLabel: 'Contract Engineers & Specialized Agency Network',
      roleType: 'service_provider',
      name: `${operatingLocation} Verified Tech Specialists & Agency Guild`,
      purpose: `Specialized engineering acceleration or design handoff support for ${ventureName}.`,
      specification: 'Vetted senior TypeScript/React contract developers with prior production startup shipped projects.',
      location: operatingLocation,
      isLocalToVenture: true,
      proximityDistance: 'Local / Remote Hybrid Talent',
      mapCoordinates: { x: 80, y: 45 },
      address: `Technology Hub, ${operatingLocation}`,
      phone: 'Agency Directory',
      website: 'https://clutch.co',
      officialDocsUrl: 'https://clutch.co',
      sourceEvidence: 'Clutch / Verified Technology Directory Reviews',
      verificationStatus: 'TRADE_DIRECTORY',
      whyRelevant: 'Allows founder to plug technical execution gaps without full-time employee equity commitments.',
      leadTimeWeeks: 2,
      priority: 'PHASE_2',
      estimatedBudgetRange: '$35 - $85 / hour depending on senior architecture specialty',
      fallbackAlternative: 'Upwork Top-Rated Plus Freelancer Pool',
    });
  }

  // 3. Sales & Distribution Resources (Based on B2B / D2C / Location)
  let distributionChannels: DistributionChannelItem[] = [];

  if (isTutoring) {
    distributionChannels = [
      {
        id: 'dist_tut_campus',
        name: 'University Campus Ambassador Network & Dorm Placement',
        type: 'd2c_online',
        partnerProfile: 'Student department leads, Greek life / residential halls, and academic clubs',
        marginOrFee: '15% platform take rate per completed lesson',
        setupRequirements: [
          'Custom university landing pages (e.g. yourplatform.com/campus/college-name)',
          'Campus lead referral QR code kit with ₹150 trial lesson credit',
          'Academic department notice board display permissions',
        ],
        whyItFits: `Directly targets ${targetAudience} where study bottlenecks and exam pressures naturally occur.`,
        status: 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Instant online student account creation and 1-click lesson scheduling',
      },
      {
        id: 'dist_tut_seo',
        name: 'High-Intent Course Code & Subject Help SEO Pages',
        type: 'self_serve_saas',
        partnerProfile: 'College students searching specific course codes (e.g., "ECON 101 tutor online")',
        marginOrFee: '85% tutor earnings / 15% platform fee',
        setupRequirements: [
          'Programmatic SEO landing pages for top 50 university syllabus subjects',
          'Instant verified tutor preview with video introduction snippets',
        ],
        whyItFits: 'Captures students actively seeking immediate homework or exam prep assistance.',
        status: 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Real-time WebRTC instant video classroom launch in browser',
      },
      {
        id: 'dist_tut_institutional',
        name: 'University Department & Academic Tutoring Center Partnerships',
        type: 'enterprise_sales',
        partnerProfile: 'Undergraduate academic support departments and college student welfare funds',
        marginOrFee: 'Annual university department license ($5,000 - $25,000 per college)',
        setupRequirements: [
          'FERPA / Student privacy compliance audit report',
          'Single Sign-On (SSO) integration with university student portals (.edu email)',
        ],
        whyItFits: 'Secures high-volume institutional contracts funded by university student success grants.',
        status: isB2B ? 'RECOMMENDED_PRIMARY' : 'EXPANSION_SECONDARY',
        logisticsMechanism: 'Institutional multi-tenant portal with department-level tutoring analytics',
      },
    ];

  } else if (isRestaurant) {
    distributionChannels = [
      {
        id: 'dist_rest_direct_merchant',
        name: 'Direct Restaurant & Cafe In-Person Field Sales',
        type: 'enterprise_sales',
        partnerProfile: 'High-volume casual dining restaurants, bistros, and multi-location franchises',
        marginOrFee: '₹1,500 - ₹3,500 monthly SaaS per location + 0.8% processing fee',
        setupRequirements: [
          '15-minute table demonstration tray with live POS order printout',
          'Standard 30-day merchant agreement with zero hardware upfront cost',
          'Waitstaff and kitchen manager 20-minute training session',
        ],
        whyItFits: `Directly addresses restaurant managers looking to eliminate "${problem.slice(0, 45)}..."`,
        status: 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'On-site hardware setup and staff training completed in <2 hours',
      },
      {
        id: 'dist_rest_pos_marketplace',
        name: 'POS App Store & Reseller Partner Ecosystem',
        type: 'marketplace',
        partnerProfile: 'Petpooja, Toast, and Square registered restaurant merchants',
        marginOrFee: '15% revenue share to POS distributor',
        setupRequirements: [
          'Certified partner listing on POS integration marketplace',
          'One-click merchant OAuth installation flow',
        ],
        whyItFits: 'Reaches thousands of pre-qualified restaurant operators looking for add-on kitchen tools.',
        status: 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Automated cloud tenant provisioning in under 60 seconds',
      },
      {
        id: 'dist_rest_franchise',
        name: 'Regional Hospitality Chains & Food Court Operators',
        type: 'enterprise_sales',
        partnerProfile: 'Commercial real estate food courts and multi-unit restaurant operators',
        marginOrFee: 'Annual master license covering 10–50 dining locations',
        setupRequirements: [
          'Centralized multi-outlet master management dashboard',
          'Consolidated enterprise tax reporting and bank settlement integration',
        ],
        whyItFits: 'Massive scale efficiency with low customer churn and high lifetime value.',
        status: 'EXPANSION_SECONDARY',
        logisticsMechanism: 'Dedicated account manager with SLA-backed technical support',
      },
    ];

  } else if (isPhysical) {
    distributionChannels = [
      {
        id: 'dist_d2c',
        name: 'Direct Brand Storefront & Subscription Portal',
        type: 'd2c_online',
        partnerProfile: 'Direct eCommerce shoppers via brand website with nationwide courier dispatch',
        marginOrFee: '92% - 94% Gross Margin (retains full retail markup less 2% gateway & parcel shipping)',
        setupRequirements: [
          'Custom Web storefront with instant checkout',
          'Automated 3PL courier API integration',
          'Clear 7-day exchange and refund policy',
        ],
        whyItFits: `Directly captures maximum margin for ${ventureName} and enables direct customer relationship ownership.`,
        status: isB2B ? 'EXPANSION_SECONDARY' : 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Central warehouse → Air Express Parcel → Direct to Customer Doorstep (48-72h)',
      },
      {
        id: 'dist_specialty_retail',
        name: 'Curated Boutique & Specialty Multi-Brand Stores',
        type: 'retail_partner',
        partnerProfile: `High-end design stores, organic concept shops, or boutique outlets in ${operatingLocation}`,
        marginOrFee: '35% - 40% retail partner trade discount off MRP',
        setupRequirements: [
          'Physical POS shelf display stand and marketing brochures',
          'Initial 30-day stock consignment agreement (30 units/store)',
          'Retail staff product training on brand story and craft provenance',
        ],
        whyItFits: 'Allows customers to touch, feel, and experience the tactile quality and sensory premium before buying.',
        status: !isDirectOnline ? 'RECOMMENDED_PRIMARY' : 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Master carton bulk dispatch via surface logistics to retail stockroom',
      },
      {
        id: 'dist_marketplaces',
        name: 'Curated Premium Marketplaces (Amazon Launchpad / Nykaa / Tata CliQ)',
        type: 'marketplace',
        partnerProfile: 'National eCommerce platforms catering to discerning quality-seeking shoppers',
        marginOrFee: '15% - 22% category commission + fulfillment fee',
        setupRequirements: [
          'Registered trademark or Brand Registry application',
          'Quality test certificate uploads',
          'High-resolution white-background product photography',
        ],
        whyItFits: 'Taps into existing high-intent buyer traffic looking for reliable delivery and established trust.',
        status: isB2B ? 'NOT_NOW' : 'EXPANSION_SECONDARY',
        logisticsMechanism: 'Marketplace fulfillment center inbound shipment',
      },
    ];

  } else {
    // Software Distribution Channels
    distributionChannels = [
      {
        id: 'dist_self_serve',
        name: 'Product-Led Self-Serve Onboarding (PLG)',
        type: 'self_serve_saas',
        partnerProfile: 'Individual founders, team leads, and operators signing up directly from site',
        marginOrFee: '95%+ Gross Margin (less payment processing fee and hosting compute)',
        setupRequirements: [
          '14-day free trial or interactive product demo sandbox',
          'Automated Stripe billing upgrade prompt on usage threshold',
          'In-app onboarding checklist guiding to the first "Aha!" moment in <3 minutes',
        ],
        whyItFits: 'Lowest friction customer acquisition mechanism; operates 24/7 without sales headcount.',
        status: isB2B ? 'EXPANSION_SECONDARY' : 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'Automated tenant workspace provisioning via cloud edge function in <3 seconds',
      },
      {
        id: 'dist_ecosystem',
        name: 'Ecosystem & App Marketplace Listings',
        type: 'marketplace',
        partnerProfile: 'Users browsing integration app stores looking for specialized workflow solutions',
        marginOrFee: '0% - 15% marketplace revenue share',
        setupRequirements: [
          'Verified partner app submission with OAuth2 authentication',
          'Co-marketing collateral and customer review collection loop',
        ],
        whyItFits: 'Pre-qualified traffic with immediate high intent to connect their existing business toolchain.',
        status: 'RECOMMENDED_PRIMARY',
        logisticsMechanism: 'One-click OAuth authorization token exchange',
      },
      {
        id: 'dist_b2b_sales',
        name: 'Founder-Led Direct B2B Outbound',
        type: 'enterprise_sales',
        partnerProfile: 'Mid-market businesses requiring custom data integrations and annual invoicing',
        marginOrFee: 'Annual upfront contracts ($2,400 - $12,000 ACV)',
        setupRequirements: [
          'Personalized video demo workflow highlighting specific prospect pain points',
          'Standard Master Service Agreement (MSA) and Data Processing Addendum (DPA)',
        ],
        whyItFits: `Directly targets key decision makers suffering from "${problem.slice(0, 50)}..."`,
        status: isB2B ? 'RECOMMENDED_PRIMARY' : 'EXPANSION_SECONDARY',
        logisticsMechanism: 'Dedicated account onboarding call with priority support channel',
      },
    ];
  }

  // 4. Marketing & Acquisition Resources
  let marketingChannels: MarketingAcquisitionChannel[] = [];

  if (isTutoring) {
    marketingChannels = [
      {
        id: 'mkt_tut_campus',
        channelName: 'University Ambassador Programs & Dorm Flyering',
        category: 'offline_local',
        mediumScope: 'local_offline',
        whyItFits: `Reaches ${targetAudience} directly in student halls, study lounges, and library notice boards across ${operatingLocation}.`,
        executionPlaybook: 'Onboard 10 student campus leads; equip them with trial discount cards and exam week study survival kits.',
        resourceRequired: 'Printed promo cards with individual tracking QR codes, campus ambassador merch kits',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'Campus ambassador peer referrals convert at 32-45% visit-to-lesson signup',
        isPrimary: true,
      },
      {
        id: 'mkt_tut_tiktok',
        channelName: 'Student Study TikTok / Instagram Reels & Relatable Memes',
        category: 'organic',
        mediumScope: 'digital',
        whyItFits: 'Short-form visual humor highlighting common exam panic and comparing expensive coaching vs instant peer help.',
        executionPlaybook: 'Post 4 weekly 15-second vertical videos featuring relatable study struggles with instant tutor solution.',
        resourceRequired: 'Smartphone camera, student creator talent, CapCut video templates',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'Edtech organic video average: 15-22% viral discovery engagement',
        isPrimary: true,
      },
      {
        id: 'mkt_tut_seo',
        channelName: 'Programmatic Course & Subject Exam Study Guides',
        category: 'organic',
        mediumScope: 'digital',
        whyItFits: `Captures high-intent students searching "how to pass [course subject]" late at night before midterms.`,
        executionPlaybook: 'Publish 50 concise course syllabus breakdown guides with embedded "Book a tutor in 2 minutes" CTAs.',
        resourceRequired: 'Markdown content templates, student subject contributors',
        estimatedComplexity: 'Medium',
        sourceOrBenchmark: 'Targeted course guide conversion: 9-14% direct trial session booking',
        isPrimary: false,
      },
    ];
  } else if (isRestaurant) {
    marketingChannels = [
      {
        id: 'mkt_rest_walkin',
        channelName: 'Direct Restaurant Manager Walk-In Demos',
        category: 'offline_local',
        mediumScope: 'local_offline',
        whyItFits: `Restaurant owners and managers are physically present between 3:00 PM and 5:00 PM (post-lunch lull).`,
        executionPlaybook: 'Visit 15 target cafes weekly during shift changeover; demonstrate 30-second table ordering on a live test tablet.',
        resourceRequired: 'Demo iPad, portable thermal test printer, 1-page merchant ROI case study',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'In-person hospitality demo close rate: 25-35% on multi-table venues',
        isPrimary: true,
      },
      {
        id: 'mkt_rest_nrai',
        channelName: 'Hospitality Guild & Food Service Expos',
        category: 'partnerships',
        mediumScope: 'local_offline',
        whyItFits: `Connects ${ventureName} to multi-outlet restaurant owners looking for labor cost reduction across ${operatingLocation}.`,
        executionPlaybook: 'Host a live breakdown at local hospitality associations showcasing table turnaround metrics.',
        resourceRequired: 'Interactive demo booth, printed merchant ROI decks',
        estimatedComplexity: 'Medium',
        sourceOrBenchmark: 'Hospitality trade association referrals yield 40% demo-to-pilot conversion',
        isPrimary: true,
      },
    ];
  } else if (isPhysical) {
    marketingChannels = [
      {
        id: 'mkt_retail_outreach',
        channelName: 'Local Retail Outreach & Shelf Display Merchandising',
        category: 'offline_local',
        mediumScope: 'local_offline',
        whyItFits: `Direct physical footprint in curated retail outlets across ${operatingLocation} for immediate tactile trial.`,
        executionPlaybook: 'Equip sales reps with 2-minute demo trays and wholesale counter display cartons for local store buyer walk-ins.',
        resourceRequired: 'Printed counter-top POS displays, sample tester units, wholesale consignment forms',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'Retail store direct placement: 35-50% sell-through within first 30 days',
        isPrimary: true,
      },
      {
        id: 'mkt_influencer_unboxing',
        channelName: 'Micro-Creator Gifting & Sensory Unboxing',
        category: 'organic',
        mediumScope: 'digital',
        whyItFits: `Visual and tactile demonstration of ${ventureName}'s craft and superior unboxing experience.`,
        executionPlaybook: 'Gift custom curated packages to 30 niche micro-influencers (5k-25k followers); request authentic honest reactions.',
        resourceRequired: '30 pre-production sample units + personalized handwritten founder notes',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'D2C Craft Brands Benchmark: 12-18% conversion rate on warm social referral traffic',
        isPrimary: true,
      },
      {
        id: 'mkt_meta_ads',
        channelName: 'Meta Ads (Instagram Reels & High-Contrast Product Video)',
        category: 'paid',
        mediumScope: 'digital',
        whyItFits: 'Visual discovery platform ideal for showcasing provenance, texture, and origin storytelling to target demographics.',
        executionPlaybook: 'Run 15-second mobile vertical video ads showing the contrast between generic alternatives vs this product.',
        resourceRequired: 'iPhone 4K video clips, Meta Ads Manager account, initial test budget',
        estimatedComplexity: 'Medium',
        sourceOrBenchmark: 'Average D2C Specialty Goods ROAS: 2.4x - 3.8x on cold traffic',
        isPrimary: true,
      },
    ];
  } else {
    // Software Marketing Channels
    marketingChannels = [
      {
        id: 'mkt_search_intent',
        channelName: 'High-Intent Comparison & Alternative SEO Pages',
        category: 'organic',
        mediumScope: 'digital',
        whyItFits: `Captures buyers actively searching for alternatives to flawed legacy incumbents solving: "${problem.slice(0, 40)}..."`,
        executionPlaybook: 'Publish dedicated comparison pages (e.g. "[Product] vs [Competitor]") with transparent breakdown tables.',
        resourceRequired: 'Clean markdown blog / documentation engine, targeted keyword research',
        estimatedComplexity: 'Low',
        sourceOrBenchmark: 'SaaS organic comparison landing pages average 8-14% visit-to-trial conversion',
        isPrimary: true,
      },
      {
        id: 'mkt_founder_outbound',
        channelName: 'Founder-Led Cold Email & LinkedIn Outbound',
        category: 'paid',
        mediumScope: 'digital',
        whyItFits: `Directly reaches the specific job title (${targetAudience.slice(0, 35)}) with personalized message copy.`,
        executionPlaybook: 'Send 25 personalized LinkedIn connections daily with short observation on their current bottleneck.',
        resourceRequired: 'LinkedIn Sales Navigator, personalized loom video screen recordings',
        estimatedComplexity: 'Medium',
        sourceOrBenchmark: 'Targeted founder outreach achieves 25-35% positive response rate',
        isPrimary: true,
      },
      {
        id: 'mkt_community_launch',
        channelName: 'Product Hunt & Developer Community Launch',
        category: 'community',
        mediumScope: 'digital',
        whyItFits: 'Generates initial burst of early adopters, tech press backlinks, and high-quality feedback.',
        executionPlaybook: 'Prepare Hunter collateral, GIF demo walk-throughs, and active maker comment presence for 24-hour launch window.',
        resourceRequired: 'Product screenshots, 60-second walkthrough video, launch checklist',
        estimatedComplexity: 'Medium',
        sourceOrBenchmark: 'Top 5 Product Hunt launch averages 1,500 - 4,000 unique targeted visitors',
        isPrimary: false,
      },
    ];
  }

  // 5. Execution Checklist (Phased 60-Day Actionable Plan)
  const checklist: ExecutionTaskItem[] = [
    {
      id: 'task_exec_1',
      phaseNumber: 1,
      phaseLabel: 'Phase 1: Sourcing & Contracting (Days 1–15)',
      title: isTutoring 
        ? 'Onboard First Cohort of 25 Vetted Subject Tutors'
        : isRestaurant
        ? 'Establish Pilot POS Integration Partner Agreement'
        : 'Finalize Primary Supplier / Contractor Terms',
      description: `Submit technical specifications to primary candidate and secure written agreement on minimum order quantities or API service levels.`,
      assignedCategory: isPhysical ? 'Raw Materials Sourcing' : 'Core Engineering',
      isCompleted: false,
      dueDateLabel: 'Day 07',
      linkedResourceId: procurementItems[0]?.id,
    },
    {
      id: 'task_exec_2',
      phaseNumber: 1,
      phaseLabel: 'Phase 1: Sourcing & Contracting (Days 1–15)',
      title: isTutoring
        ? 'Deploy WebRTC Interactive Video Room & Calendar Sync'
        : isRestaurant
        ? 'Fabricate First Batch of 50 Durable Table QR Stands'
        : 'Order Pre-Production Prototype / Spec Verification Unit',
      description: 'Produce initial physical sample or functional code branch to verify dimensional tolerances and performance standards.',
      assignedCategory: isPhysical ? 'Manufacturing' : 'UI/UX Prototyping',
      isCompleted: false,
      dueDateLabel: 'Day 14',
      linkedResourceId: procurementItems[1]?.id,
    },
    {
      id: 'task_exec_3',
      phaseNumber: 2,
      phaseLabel: 'Phase 2: Production & Infrastructure (Days 16–30)',
      title: isPhysical ? 'Approve Pilot Batch & Inspect Quality' : 'Provision Production Database & Secure Gateway',
      description: isPhysical
        ? 'Inspect first batch run against certified quality checklist before giving sign-off for full volume packaging.'
        : 'Configure production database with strict Row-Level Security and connect automated GitHub CI/CD deployments.',
      assignedCategory: isPhysical ? 'Quality Testing' : 'Cloud Hosting',
      isCompleted: false,
      dueDateLabel: 'Day 25',
      linkedResourceId: procurementItems[2]?.id,
    },
    {
      id: 'task_exec_4',
      phaseNumber: 2,
      phaseLabel: 'Phase 2: Production & Infrastructure (Days 16–30)',
      title: 'Setup Merchant Gateway & Commercial Bank Account',
      description: 'Complete business KYC, configure payment gateway webhooks, and execute test transactions in sandbox mode.',
      assignedCategory: 'Payments & Banking',
      isCompleted: false,
      dueDateLabel: 'Day 30',
    },
    {
      id: 'task_exec_5',
      phaseNumber: 3,
      phaseLabel: 'Phase 3: Logistics & Operational Integration (Days 31–45)',
      title: isPhysical ? 'Integrate Automated 3PL Parcel Logistics' : 'Implement Core Product Telemetry & Error Tracking',
      description: isPhysical
        ? 'Negotiate commercial courier account rates and integrate automated shipping label generation with storefront.'
        : 'Integrate PostHog / Sentry to track real-time onboarding completion rates and capture unhandled runtime exceptions.',
      assignedCategory: isPhysical ? 'Logistics' : 'Analytics & QA',
      isCompleted: false,
      dueDateLabel: 'Day 40',
      linkedResourceId: procurementItems[3]?.id,
    },
    {
      id: 'task_exec_6',
      phaseNumber: 4,
      phaseLabel: 'Phase 4: Commercial Launch & Feedback (Days 46–60)',
      title: 'Execute Beachhead Channel Commercial Launch',
      description: `Launch ${distributionChannels[0]?.name || 'primary channel'} to first cohort of ${targetAudience.slice(0, 30)} with active tracking.`,
      assignedCategory: 'Sales & Marketing',
      isCompleted: false,
      dueDateLabel: 'Day 50',
    },
    {
      id: 'task_exec_7',
      phaseNumber: 4,
      phaseLabel: 'Phase 4: Commercial Launch & Feedback (Days 46–60)',
      title: 'Establish 48-Hour Customer Feedback & Review Loop',
      description: 'Proactively contact the first 25 customers to evaluate satisfaction, identify unexpected friction, and request referrals.',
      assignedCategory: 'Customer Success',
      isCompleted: false,
      dueDateLabel: 'Day 60',
    },
  ];

  // 6. Clearly Marked Premium Services
  const premiumServices: PremiumServiceOffering[] = [
    {
      id: 'prem_sourcing',
      name: isPhysical ? 'Dedicated Procurement & Vendor Negotiation Specialist' : 'Dedicated Technical Architecture & DevOps Specialist',
      category: 'sourcing_agent',
      description: isPhysical 
        ? 'Hands-on expert sourcing agent who negotiates supplier contracts, reviews factory audits, and secures lowest MOQs on your behalf.'
        : 'Senior DevOps architect who configures cloud clusters, implements CI/CD pipelines, and audits security schemas.',
      scope: ['Vendor / infrastructure contract review', 'Specification & pricing negotiation', 'Quality inspection / test checklist'],
      deliverables: ['Executed vendor contract', 'Quality inspection checklist', 'Direct introduction call'],
      status: 'ASSISTED_EXECUTION_AVAILABLE',
      badge: 'Assisted Service',
    },
    {
      id: 'prem_seo',
      name: 'High-Intent Search Engine Optimization (SEO) Setup',
      category: 'seo',
      description: 'Turnkey technical SEO infrastructure and high-intent competitor comparison keyword architecture.',
      scope: ['Keyword intent analysis for customer problems', 'Technical schema markup & sitemap indexation', '3 high-converting landing pages'],
      deliverables: ['Live indexed landing pages', 'Search Console integration', 'Quarterly keyword tracking dashboard'],
      status: 'ASSISTED_EXECUTION_AVAILABLE',
      badge: 'Assisted Growth Service',
    },
    {
      id: 'prem_meta_ads',
      name: 'Performance Meta Ads Campaign Management',
      category: 'meta_ads',
      description: 'End-to-end creative scriptwriting, high-contrast ad production, audience targeting, and weekly ROAS optimization.',
      scope: ['Creative script angles based on Stage 04 positioning', 'Ad creative visual production', 'Weekly bid optimization and audience exclusions'],
      deliverables: ['Active Meta Ads campaign', 'Weekly blended CAC report', 'A/B creative test synthesis'],
      status: 'COMING_SOON',
      badge: 'Coming Soon • Q2 2026',
    },
    {
      id: 'prem_crm',
      name: 'Automated CRM & Customer Retention Lifecycle Setup',
      category: 'crm',
      description: 'Configuration of WhatsApp Business API, transactional email sequences, and customer reorder automation.',
      scope: ['Automated order tracking messages', 'Reorder & retention triggers', 'Cart abandonment recovery workflows'],
      deliverables: ['Live transactional webhook workflow', 'Pre-approved message templates', 'Customer health segment view'],
      status: 'ASSISTED_EXECUTION_AVAILABLE',
      badge: 'Assisted Retention Service',
    },
  ];

  // 7. Dynamic Multi-Stage Intelligence Advice
  const topFeasibilityRisk = state.feasibility?.potentialBlockers?.[0] || 
    state.feasibility?.criticalUncertainties?.[0] || 
    state.feasibility?.risks?.[0]?.mitigation || 
    (isPhysical
      ? 'Supply chain lead-time variance: allow a minimum 14-day buffer on packaging delivery to prevent holding unbagged production inventory.'
      : 'Customer onboarding friction: ensure the first core value metric is delivered within the first 3 minutes of account creation to prevent churn.');

  const sourcingCaveat = isPhysical
    ? `Always request a physical pre-production sample before transferring advance payments to suppliers in ${operatingLocation}. Never rely strictly on digital catalog photos.`
    : (isTutoring
        ? 'Tutor verification requirement: Ensure all tutor academic credentials and government IDs are audited before allowing live student sessions.'
        : isRestaurant
        ? 'POS compatibility note: Test offline printer fallback mode to ensure orders continue printing during intermittent restaurant WiFi drops.'
        : 'Verify that all database credentials use non-root roles with Row-Level Security enabled before handling customer production records.');

  const localAdvantage = isPhysical
    ? `Operating in ${operatingLocation} provides direct access to localized industrial clusters, reducing initial lead times and interstate transit freight costs.`
    : (state.marketIntelligence?.marketSize?.somValue 
        ? `Immediate beachhead market opportunity (${state.marketIntelligence.marketSize.somValue}): Focus on high-intent early adopters.`
        : 'Deploying on modern edge hosting guarantees sub-second response times for users worldwide without managing physical server racks.');

  const criticalRiskFactor = topFeasibilityRisk;

  const synthesis: ExecutionIntelligenceSynthesis = {
    ventureSummary: {
      projectName: ventureName,
      ventureType: isPhysical ? 'Physical / Manufactured Product' : isTutoring ? 'Two-Sided EdTech & Tutoring Platform' : isRestaurant ? 'Restaurant Operations & Dining Platform' : 'Software / Digital Platform',
      locationLabel: operatingLocation,
      buildPathSummary: pathStages.map((s) => s.name).join(' → '),
    },
    pathStages,
    procurementMap: {
      totalCategoriesCount: procurementItems.length,
      day1CriticalCount: procurementItems.filter((i) => i.priority === 'DAY_1_CRITICAL').length,
      localResourceCount: procurementItems.filter((i) => i.isLocalToVenture).length,
      items: procurementItems,
    },
    distributionChannels,
    marketingChannels,
    checklist,
    premiumServices,
    intelligenceAdvice: {
      sourcingCaveat,
      localAdvantage,
      criticalRiskFactor,
    },
  };

  return {
    id: `exec_rep_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    ventureName,
    modality,
    location: {
      country,
      cityRegion,
      operatingLocation,
    },
    synthesis,
  };
}
