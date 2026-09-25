import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  FileText,
  ArrowRight,
  Lock,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const IdeaSnapshot: React.FC<{ onSelectQuestion?: (question: string) => void }> = ({
  onSelectQuestion,
}) => {
  const { state, hasMinimumDiscovery, markStageCompleted } = useProject();
  const navigate = useNavigate();

  const { idea, businessModel } = state;

  const handleContinue = () => {
    markStageCompleted('idea-lab');
    navigate('/feasibility');
  };

  const displayVal = (value: string | undefined | null, fallback: string = 'Not provided yet') => {
    if (value && value.trim()) return value.trim();
    return fallback;
  };

  const modelSummary = [
    businessModel.customerType?.toUpperCase() || null,
    businessModel.deliveryModel ? `${businessModel.deliveryModel} presence` : null,
  ]
    .filter(Boolean)
    .join(' / ');

  const locationSummary = [
    businessModel.location.cityRegion,
    businessModel.location.country,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#2B3D4F]" />
          <span className="font-semibold text-sm text-[#2B3D4F]">Venture Discovery Snapshot</span>
        </div>
      }
      subtitle="Clean distinction between user-provided facts and council inferences. Feeds directly into Feasibility & Strategy."
      badge={
        hasMinimumDiscovery ? (
          <Badge variant="success" size="sm">
            Discovery Ready
          </Badge>
        ) : (
          <Badge variant="warning" size="sm">
            Awaiting Idea
          </Badge>
        )
      }
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59] shrink-0" />
            <span className="text-[#6B7D90]">
              Integrity Guarantee: Strategic differentiation and constraints will be derived by the Council, never forced onto the founder.
            </span>
          </div>

          <div>
            {hasMinimumDiscovery ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleContinue}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Continue to Feasibility
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  disabled
                  icon={<Lock className="w-4 h-4" />}
                >
                  Continue to Feasibility
                </Button>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Minimum criteria notice */}
        {!hasMinimumDiscovery && (
          <div className="p-3.5 rounded-lg bg-[rgba(138,109,43,0.12)] border border-[rgba(138,109,43,0.30)] text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#8A6D2B]" />
            <div>
              <span className="font-semibold text-[#2B3D4F]">Discovery in Progress:</span>
              <p className="text-[#4A5E73] mt-0.5 leading-relaxed">
                Provide your rough idea in the chat or discovery flow above to unlock Stage 02 (Feasibility). You do not need to know your differentiation or business model yet.
              </p>
            </div>
          </div>
        )}

        {/* Section 1: User-Provided Facts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-[#2B3D4F] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59]" />
              USER-PROVIDED FACTS (CONFIRMED)
            </span>
            <span className="text-[10px] font-mono text-[#6B7D90]">Direct Founder Context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* 01 Idea */}
            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                01 RAW IDEA CONCEPT
              </div>
              <div className="text-xs font-medium text-[#2B3D4F]">
                {displayVal(idea.rawInput, 'Awaiting idea input')}
              </div>
            </div>

            {/* 02 Customer */}
            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                02 TARGET USER / PERSONA
              </div>
              <div className="text-xs font-medium text-[#2B3D4F]">
                {displayVal(idea.targetAudience, 'Awaiting customer description')}
              </div>
            </div>

            {/* 03 Problem */}
            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                03 PROBLEM / FRUSTRATION
              </div>
              <div className="text-xs font-medium text-[#2B3D4F]">
                {displayVal(idea.problem, 'Awaiting problem description')}
              </div>
            </div>

            {/* 04 Context & Situation */}
            <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                04 SITUATION & CONTEXT
              </div>
              <div className="text-xs font-medium text-[#2B3D4F]">
                {displayVal(idea.context || locationSummary, 'Awaiting context description')}
              </div>
            </div>

            {/* 05 Desired Outcome */}
            {idea.outcome && (
              <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] md:col-span-2">
                <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                  05 DESIRED OUTCOME
                </div>
                <div className="text-xs font-medium text-[#2B3D4F]">
                  {idea.outcome}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Council Inferences & Strategic Discoveries */}
        <div className="pt-2 border-t border-[#DDD5C5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-[#8A6D2B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8A6D2B]" />
              SYSTEM &amp; COUNCIL PROPOSALS (INITIAL ASSESSMENT — NEEDS VALIDATION)
            </span>
            <span className="text-[10px] font-mono text-[#8A6D2B] bg-[#8A6D2B]/10 px-2 py-0.5 rounded border border-[#8A6D2B]/30">
              Council Derived
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Classified Archetype */}
            <div className="p-3 rounded-lg bg-[#ECE6DA]/60 border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                INFERRED PRODUCT VEHICLE
              </div>
              <div className="text-xs font-medium text-[#2B3D4F] capitalize">
                {businessModel.productType ? `${businessModel.productType} Model` : 'Assessing from idea...'}
              </div>
              <div className="text-[10px] text-[#6B7D90] mt-1">
                {modelSummary ? `Delivery: ${modelSummary}` : 'Delivery model will be analyzed in Feasibility'}
              </div>
            </div>

            {/* Proposed Differentiation Territory */}
            <div className="p-3 rounded-lg bg-[#ECE6DA]/60 border border-[#DDD5C5]">
              <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-0.5">
                PROPOSED DIFFERENTIATION WEDGE
              </div>
              <div className="text-xs font-medium text-[#2B3D4F]">
                {idea.differentiation ? idea.differentiation : 'Market Intelligence specialist will propose strategic differentiation in Stage 03.'}
              </div>
              <div className="text-[10px] text-[#6B7D90] mt-1">
                Proposed by Council · Editable by founder anytime
              </div>
            </div>
          </div>
        </div>

        {/* Open Inquiries / Uncertainties */}
        <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
          <div className="text-[11px] font-mono uppercase text-[#6B7D90] mb-1.5 flex items-center justify-between">
            <span className="text-[#4A5E73] font-medium flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#2B3D4F]" />
              KEY UNCERTAINTIES TO STRESS-TEST IN STAGE 02
            </span>
            <span className="text-[#6B7D90]">
              {idea.openQuestions.length} recorded
            </span>
          </div>
          {idea.openQuestions.length === 0 ? (
            <p className="text-xs text-[#6B7D90] italic">
              Stage 02 (Feasibility) will automatically audit regulatory, economic, and operational assumptions.
            </p>
          ) : (
            <ul className="space-y-1.5 pt-1">
              {idea.openQuestions.map((q, i) => (
                <li key={i} className="text-xs text-[#2B3D4F] flex items-start gap-2">
                  <span className="text-[#2B3D4F] font-mono text-[10px] mt-0.5">•</span>
                  {onSelectQuestion ? (
                    <button
                      type="button"
                      onClick={() => onSelectQuestion(q)}
                      className="text-left hover:text-[#2B3D4F] hover:underline underline-offset-2 transition-colors"
                      title="Ask the interviewer about this question"
                    >
                      {q}
                    </button>
                  ) : (
                    <span>{q}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};
