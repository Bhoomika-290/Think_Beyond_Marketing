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
} from 'lucide-react';

export const IdeaSnapshot: React.FC = () => {
  const { state, hasMinimumDiscovery, markStageCompleted } = useProject();
  const navigate = useNavigate();

  const { idea, businessModel } = state;

  const handleContinue = () => {
    markStageCompleted('idea-lab');
    navigate('/feasibility');
  };

  // Safe display helper: only shows actual user input or explicit "Not provided" / "Needs validation"
  const displayVal = (value: string | undefined | null, fallback: string = 'Not provided') => {
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
          <FileText className="w-4 h-4 text-[#4D8DFF]" />
          <span className="font-semibold text-sm text-[#F3F4F6]">Initial Idea Snapshot</span>
        </div>
      }
      subtitle="Structured synthesis of Discovery Stage 01. Feeds directly into Stage 02 (Feasibility)."
      badge={
        hasMinimumDiscovery ? (
          <Badge variant="success" size="sm">
            Validation Ready
          </Badge>
        ) : (
          <Badge variant="warning" size="sm">
            Discovery Incomplete
          </Badge>
        )
      }
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            <span className="text-[#738095]">
              Data Integrity Guarantee: Strictly user-grounded inputs. No fabricated analytics.
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
        {/* Minimum criteria warning banner if incomplete */}
        {!hasMinimumDiscovery && (
          <div className="p-3.5 rounded-lg bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.30)] text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#F59E0B]" />
            <div>
              <span className="font-semibold text-[#F3F4F6]">Minimum Discovery Required:</span>
              <p className="text-[#AAB4C3] mt-0.5 leading-relaxed">
                To unlock Stage 02 (Feasibility), provide at minimum: (1) Raw idea in interviewer, (2) Product type classification, and (3) Target audience, problem, or location.
              </p>
            </div>
          </div>
        )}

        {/* Structured Snapshot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Idea */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              IDEA CONCEPT
            </div>
            <div className="text-sm font-medium text-[#F3F4F6]">
              {displayVal(idea.rawInput, 'Awaiting raw idea input')}
            </div>
          </div>

          {/* Product Type */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              PRODUCT TYPE
            </div>
            <div className="text-sm font-medium text-[#F3F4F6] capitalize">
              {displayVal(businessModel.productType, 'Needs classification')}
            </div>
          </div>

          {/* Customer */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              CUSTOMER / AUDIENCE
            </div>
            <div className="text-sm font-medium text-[#F3F4F6]">
              {displayVal(idea.targetAudience, 'Needs validation')}
            </div>
          </div>

          {/* Problem */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              CORE PROBLEM
            </div>
            <div className="text-sm font-medium text-[#F3F4F6]">
              {displayVal(idea.problem, 'Needs validation')}
            </div>
          </div>

          {/* Business Model */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              BUSINESS MODEL & DELIVERY
            </div>
            <div className="text-sm font-medium text-[#F3F4F6]">
              {modelSummary || 'Not provided'}
            </div>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
            <div className="text-[11px] font-mono uppercase text-[#738095] mb-1">
              GEOGRAPHIC FOOTPRINT
            </div>
            <div className="text-sm font-medium text-[#F3F4F6]">
              {locationSummary || 'Not provided'}
            </div>
          </div>
        </div>

        {/* Open Questions / Uncertainties */}
        <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244]">
          <div className="text-[11px] font-mono uppercase text-[#738095] mb-1.5 flex items-center justify-between">
            <span className="text-[#AAB4C3] font-medium">OPEN QUESTIONS TO TEST</span>
            <span className="text-[#738095]">
              {idea.openQuestions.length} recorded
            </span>
          </div>
          {idea.openQuestions.length === 0 ? (
            <p className="text-xs text-[#738095] italic">
              None explicitly recorded. Will default to standard category feasibility checks in Stage 02.
            </p>
          ) : (
            <ul className="space-y-1.5 pt-1">
              {idea.openQuestions.map((q, i) => (
                <li key={i} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-[#4D8DFF] font-mono text-[10px] mt-0.5">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};
