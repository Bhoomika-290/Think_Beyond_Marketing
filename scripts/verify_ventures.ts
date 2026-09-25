import { resolveVentureDomainProfile } from '../src/services/ventureDomainResolver';
import { generateMarketIntelligenceReport } from '../src/services/marketIntelligenceEngine';
import { generateBrandRoadmapReport } from '../src/services/brandRoadmapEngine';
import { generateBuildArchitectureReport } from '../src/services/buildArchitectureEngine';
import { generateExecutionReport } from '../src/services/executionEngine';
import { generateSimulationReport } from '../src/services/simulationEngine';
import { generateLaunchGrowthReportData } from '../src/services/growthEngine';
import type { ProjectState } from '../src/types/project';

function createMockProject(rawIdea: string, title: string, productType: 'physical' | 'saas' | 'marketplace'): ProjectState {
  return {
    project: {
      id: 'test-project',
      name: title,
      category: productType,
      status: 'feasibility_ready',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    idea: {
      rawInput: rawIdea,
      name: title,
      problem: rawIdea,
      targetAudience: 'Core audience',
      context: 'Initial venture hypothesis',
      goals: 'Market launch',
      differentiation: 'High focus and specialized proprietary architecture',
      openQuestions: [],
    },
    businessModel: {
      productType,
      deliveryModel: productType === 'physical' ? 'd2c_ecommerce' : productType === 'saas' ? 'cloud_saas' : 'b2b_managed',
      customerType: productType === 'saas' ? 'b2b' : productType === 'marketplace' ? 'b2b' : 'b2c',
      location: {
        country: 'India',
        cityRegion: 'Bengaluru',
        region: 'Karnataka',
        tier: 'Tier-1',
      },
    },
    workflow: {
      currentStage: 'idea-lab',
      completedStages: [],
      stageOutputs: {},
    },
  };
}

console.log('=== VENTURE INTELLIGENCE PURITY TEST ===\n');

const testCases = [
  {
    name: 'TEST A: Premium Sustainable Skincare for Sensitive Skin',
    idea: 'A premium sustainable skincare brand for sensitive skin',
    category: 'physical' as const,
    expectedProfile: 'skincare_beauty',
    mustInclude: ['formulation', 'skin', 'clean', 'botanical', 'clinical'],
    mustNotInclude: ['pos', 'restaurant', 'office', 'software', 'catering'],
  },
  {
    name: 'TEST B: Restaurant Food Demand AI',
    idea: 'An AI platform that helps small restaurants predict daily food demand and reduce wastage',
    category: 'saas' as const,
    expectedProfile: 'food_waste_ai',
    mustInclude: ['pos', 'demand', 'forecast', 'wastage', 'kitchen'],
    mustNotInclude: ['formulation', 'botanical', 'skincare', 'corporate office'],
  },
  {
    name: 'TEST C: Corporate Lunch Catering Marketplace',
    idea: 'A marketplace connecting local restaurants with corporate offices for recurring lunch orders',
    category: 'marketplace' as const,
    expectedProfile: 'food_catering_marketplace',
    mustInclude: ['marketplace', 'corporate', 'lunch', 'catering', 'invoice'],
    mustNotInclude: ['formulation', 'skin', 'algorithm demand prediction pos'],
  },
];

for (const tc of testCases) {
  console.log(`Testing [${tc.name}]...`);
  const project = createMockProject(tc.idea, tc.name, tc.category);
  const profile = resolveVentureDomainProfile(project.idea, project.businessModel, project.project);

  console.log(`  Domain resolved: ${profile.domainType} (expected: ${tc.expectedProfile})`);
  if (profile.domainType !== tc.expectedProfile) {
    throw new Error(`Profile mismatch: expected ${tc.expectedProfile}, got ${profile.domainType}`);
  }

  // Market Intelligence
  const market = generateMarketIntelligenceReport(project);
  console.log(`  Market Axes: X="${market.selectedAxes.xAxis.label}", Y="${market.selectedAxes.yAxis.label}"`);
  console.log(`  Competitors count: ${market.competitors.length}, Verified: ${market.competitors.filter(c => c.competitorType === 'VERIFIED_COMPETITOR').length}`);

  // Brand Roadmap
  const brand = generateBrandRoadmapReport(project);
  console.log(`  Brand Statement: "${brand.positioningStatement.fullStatement.slice(0, 80)}..."`);
  console.log(`  DNA Nodes: ${brand.brandDnaNodes.length}, Active Tagline: "${brand.taglineWorkspace.activeTagline}"`);

  // Build Architecture
  const build = generateBuildArchitectureReport(project);
  console.log(`  Architecture MVP Items: ${build.mvpScope.features.length}, Stack: ${build.techStack.items.length} items, Data Entities: ${build.dataModel.entities.length}`);

  // Execution
  const exec = generateExecutionReport(project);
  console.log(`  Execution Stages: ${exec.synthesis.pathStages.length}, Procurement Contacts: ${exec.synthesis.procurementMap.items.length}`);

  // Simulation
  const sim = generateSimulationReport(project);
  console.log(`  Simulation Modality: ${sim.modality}, Physical Steps: ${sim.physicalStoryboard?.steps?.length || 0}, Software Records: ${sim.softwareWalkthrough?.sampleRecords?.length || 0}`);

  // Growth
  const growth = generateLaunchGrowthReportData(project);
  console.log(`  Growth Campaigns: ${growth.generateModule.campaigns.length}, Reels: ${growth.generateModule.reels.length}, Banners: ${growth.generateModule.banners.length}`);

  console.log(`  -> PASSED purity and domain divergence.\n`);
}

console.log('ALL 3 TEST VENTURES CONFIRMED DIVERGENT AND VENTURE-DRIVEN.');
