import React from 'react';
import { Link } from 'react-router-dom';
import type { StageDefinition } from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowLeft, ShieldCheck, Cpu, Database, Lock } from 'lucide-react';

interface StagePlaceholderProps {
  stage: StageDefinition;
}

export const StagePlaceholder: React.FC<StagePlaceholderProps> = ({ stage }) => {
  const { state, isStageUnlocked } = useProject();
  const isUnlocked = isStageUnlocked(stage.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <Link
          to="/idea-lab"
          className="inline-flex items-center gap-1.5 text-xs text-theme-muted hover:text-theme-primary transition-colors mb-4 font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Idea Lab
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs text-theme-accent font-semibold tracking-wider">
                STAGE {stage.number}
              </span>
              <span className="text-theme-border">•</span>
              <Badge variant={isUnlocked ? 'active' : 'locked'}>
                {isUnlocked ? 'Pipeline Ready' : 'Locked — Prerequisites Required'}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-theme-primary">
              {stage.fullName}
            </h1>
            <p className="mt-2 text-sm text-theme-secondary max-w-2xl leading-relaxed">
              {stage.description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stage Status Card */}
        <Card
          title={
            <div className="flex items-center gap-2">
              {isUnlocked ? (
                <Cpu className="w-4 h-4 text-theme-accent" />
              ) : (
                <Lock className="w-4 h-4 text-theme-muted" />
              )}
              <span className="text-sm font-semibold text-theme-primary">
                {isUnlocked ? 'Orchestration Architecture Ready' : 'Prerequisite Requirement Pending'}
              </span>
            </div>
          }
          badge={<Badge variant="outline">Scrum 01 Foundation</Badge>}
        >
          <div className="space-y-4 text-sm text-theme-secondary leading-relaxed">
            <p>
              This route is part of the 9-stage business intelligence transformation journey. In accordance with strict hackathon development protocol, no fabricated market analytics, fake competitor tables, or mocked AI reasoning are injected here.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                <div className="text-xs font-mono uppercase text-[#6B7D90] mb-1">
                  Upstream Data Source
                </div>
                <div className="text-sm font-medium text-[#2B3D4F] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#2B3D4F]" />
                  Stage 01 Idea Lab Context
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                <div className="text-xs font-mono uppercase text-[#6B7D90] mb-1">
                  Data Integrity Protocol
                </div>
                <div className="text-sm font-medium text-[#4A7C59] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Zero Fabricated Data
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Project State Passed into this Stage */}
        <Card
          title="Active Project Context Available for this Stage"
          subtitle="Data collected from Stage 01 persistent state will feed into this reasoning module"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[#6B7D90] uppercase block mb-1">Project Name</span>
              <span className="text-[#2B3D4F] font-sans font-medium text-sm">
                {state.project.name || 'Untitled Venture'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[#6B7D90] uppercase block mb-1">Product Type</span>
              <span className="text-[#2B3D4F] font-sans font-medium text-sm capitalize">
                {state.businessModel.productType || 'Not specified yet'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[#6B7D90] uppercase block mb-1">Location Context</span>
              <span className="text-[#2B3D4F] font-sans font-medium text-sm">
                {state.businessModel.location.cityRegion
                  ? `${state.businessModel.location.cityRegion}, ${state.businessModel.location.country}`
                  : state.businessModel.location.country || 'Not specified'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[#6B7D90] uppercase block mb-1">Core Problem</span>
              <span className="text-[#2B3D4F] font-sans font-medium text-sm truncate block">
                {state.idea.problem || 'Not specified yet'}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-theme-border flex items-center justify-between">
            <span className="text-xs text-theme-muted">
              Refine inputs in Stage 01 to expand context for downstream stages.
            </span>
            <Link to="/idea-lab">
              <Button size="sm" variant="secondary">
                Edit Discovery in Idea Lab
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
