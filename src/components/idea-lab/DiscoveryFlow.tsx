import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Users,
  Target,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const DiscoveryFlow: React.FC = () => {
  const {
    state,
    updateIdea,
    addOpenQuestion,
    removeOpenQuestion,
  } = useProject();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [newQuestionInput, setNewQuestionInput] = useState('');

  const steps = [
    {
      id: 'audience',
      title: 'Target Audience & Persona',
      subtitle: 'Who experiences the sharpest need for what you are building?',
      icon: Users,
    },
    {
      id: 'problem',
      title: 'Problem & Pain Point',
      subtitle: 'What specific friction, inadequacy, or cost currently exists?',
      icon: Target,
    },
    {
      id: 'differentiation',
      title: 'Differentiation & Edge',
      subtitle: 'What makes this distinctly better, faster, or culturally unique?',
      icon: Sparkles,
    },
    {
      id: 'constraints',
      title: 'Constraints & Ambitions',
      subtitle: 'What limitations (capital, tech, regulatory) and goals bound this venture?',
      icon: AlertTriangle,
    },
    {
      id: 'questions',
      title: 'Open Founder Inquiries',
      subtitle: 'What critical uncertainties or blind spots must subsequent stages resolve?',
      icon: HelpCircle,
    },
  ];

  const handleAddQuestion = () => {
    if (!newQuestionInput.trim()) return;
    addOpenQuestion(newQuestionInput.trim());
    setNewQuestionInput('');
  };

  const handleQuestionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddQuestion();
    }
  };

  return (
    <Card
      title="Adaptive Discovery Interview"
      subtitle="Progressively structure your intuition into quantifiable business intelligence vectors."
      badge={
        <Badge variant="active" size="sm">
          Step {activeStep + 1} of {steps.length}
        </Badge>
      }
    >
      {/* Step Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-[#DDD5C5] no-scrollbar">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = activeStep === idx;
          const isFilled =
            (idx === 0 && Boolean(state.idea.targetAudience)) ||
            (idx === 1 && Boolean(state.idea.problem)) ||
            (idx === 2 && Boolean(state.idea.differentiation)) ||
            (idx === 3 && Boolean(state.idea.constraints || state.idea.goals)) ||
            (idx === 4 && state.idea.openQuestions.length > 0);

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 select-none ${
                isCurrent
                  ? 'bg-[rgba(43,61,79,0.15)] text-[#2B3D4F] border border-[#2B3D4F] font-semibold'
                  : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] text-[#4A5E73] border border-[#DDD5C5]'
              }`}
            >
              <StepIcon className="w-3.5 h-3.5" />
              <span>{step.title.split(' ')[0]}</span>
              {isFilled && <CheckCircle2 className="w-3 h-3 text-[#4A7C59]" />}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[220px]">
        {/* Step 0: Audience */}
        {activeStep === 0 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2B3D4F]">
                Who is this product specifically for?
              </h4>
              <p className="text-xs text-[#6B7D90] mt-0.5">
                Define the primary persona who has urgency, budget, or emotional alignment.
              </p>
            </div>
            <Textarea
              label="Target Audience & Customer Profile"
              placeholder="e.g. Young urban professionals living in North India looking for aesthetic, lightweight winterwear suited for sudden cold snaps..."
              value={state.idea.targetAudience}
              onChange={(e) => updateIdea({ targetAudience: e.target.value })}
              rows={3}
            />
          </div>
        )}

        {/* Step 1: Problem */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2B3D4F]">
                What core problem or void does this address?
              </h4>
              <p className="text-xs text-[#6B7D90] mt-0.5">
                Explain what is broken, missing, or overpriced in existing alternatives.
              </p>
            </div>
            <Textarea
              label="Core Problem Hypothesis"
              placeholder="e.g. Most winter wear in hot/semi-arid states is imported heavy wool or cheap synthetic fast fashion with poor breathability and generic Western aesthetics..."
              value={state.idea.problem}
              onChange={(e) => updateIdea({ problem: e.target.value })}
              rows={3}
            />
          </div>
        )}

        {/* Step 2: Differentiation */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2B3D4F]">
                What makes this distinctly differentiated?
              </h4>
              <p className="text-xs text-[#6B7D90] mt-0.5">
                Your proprietary angle, craft, distribution shortcut, or cultural moat.
              </p>
            </div>
            <Textarea
              label="Value Proposition & Moat"
              placeholder="e.g. Blending traditional Rajasthani quilting (Jaipuri Razai craft) with contemporary weatherproof technical fabrics for high style and thermal regulation..."
              value={state.idea.differentiation}
              onChange={(e) => updateIdea({ differentiation: e.target.value })}
              rows={3}
            />
          </div>
        )}

        {/* Step 3: Constraints & Goals */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2B3D4F]">
                Operational Bounds & Milestones
              </h4>
              <p className="text-xs text-[#6B7D90] mt-0.5">
                Clarify known boundaries to anchor realistic downstream planning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Identified Constraints (Capital, Logistics, Time)"
                placeholder="e.g. Bootstrapped with ₹5 Lakhs, no in-house manufacturing, winter window is strictly Oct-Feb..."
                value={state.idea.constraints}
                onChange={(e) => updateIdea({ constraints: e.target.value })}
                rows={3}
              />
              <Textarea
                label="Target 12-Month Objective"
                placeholder="e.g. Launch a 400-piece limited capsule collection, reach ₹20L revenue in Year 1, 80% D2C website sales..."
                value={state.idea.goals}
                onChange={(e) => updateIdea({ goals: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 4: Open Questions */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2B3D4F]">
                Open Questions & Founder Doubts
              </h4>
              <p className="text-xs text-[#6B7D90] mt-0.5">
                List the exact critical uncertainties you need the AI workspace to stress-test in Stage 02 (Feasibility).
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add an inquiry (e.g. How to manage seasonal inventory during non-winter months?)"
                value={newQuestionInput}
                onChange={(e) => setNewQuestionInput(e.target.value)}
                onKeyDown={handleQuestionKeyDown}
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleAddQuestion}
                disabled={!newQuestionInput.trim()}
                icon={<Plus className="w-4 h-4" />}
              >
                Add
              </Button>
            </div>

            <div className="space-y-2 pt-2">
              {state.idea.openQuestions.length === 0 ? (
                <div className="text-xs text-[#6B7D90] italic p-3 bg-[#F5F1EB] rounded-lg border border-[#DDD5C5]">
                  No open inquiries recorded yet. Add specific dilemmas you want the feasibility agent to examine.
                </div>
              ) : (
                state.idea.openQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] text-xs text-[#2B3D4F]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-[#2B3D4F] font-semibold">
                        Q{idx + 1}
                      </span>
                      <span className="truncate">{q}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOpenQuestion(idx)}
                      className="text-[#6B7D90] hover:text-[#9E4A4A] p-1 transition-colors"
                      title="Remove question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation Controls */}
      <div className="mt-6 pt-4 border-t border-[#DDD5C5] flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
        >
          Previous Step
        </Button>

        <div className="text-xs font-mono text-[#6B7D90] hidden sm:block">
          {activeStep + 1} / {steps.length}
        </div>

        {activeStep < steps.length - 1 ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Next Step
          </Button>
        ) : (
          <Badge variant="success" size="md">
            All Discovery Vectors Addressed
          </Badge>
        )}
      </div>
    </Card>
  );
};
