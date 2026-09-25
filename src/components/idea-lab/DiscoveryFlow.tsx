import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Card } from '../common/Card';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Lightbulb,
  Users,
  Target,
  Compass,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

export const DiscoveryFlow: React.FC = () => {
  const {
    state,
    updateIdea,
  } = useProject();

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'idea',
      num: '01',
      title: 'Idea Concept',
      tabLabel: '01 Idea',
      question: 'What are you thinking of building?',
      subtitle: 'Describe your concept in plain words. Even a rough one-sentence thought is enough to start.',
      helpText: 'No business jargon needed. Just tell us what you want to create.',
      icon: Lightbulb,
      field: 'rawInput',
      placeholder: 'e.g. I want to build an app that helps college students find affordable peer tutors...',
    },
    {
      id: 'customer',
      num: '02',
      title: 'Customer / User',
      tabLabel: '02 Customer',
      question: 'Who do you imagine using it?',
      subtitle: 'Who feels this need? If you are not completely sure, describe the person you think might need it.',
      helpText: 'Think about their daily life, school, work, or situation.',
      icon: Users,
      field: 'targetAudience',
      placeholder: 'e.g. College and university students struggling with difficult classes on a tight budget...',
    },
    {
      id: 'problem',
      num: '03',
      title: 'Problem / Need',
      tabLabel: '03 Problem',
      question: 'What problem or frustration are you trying to solve?',
      subtitle: 'What made you think this should exist? What feels broken, annoying, or overpriced today?',
      helpText: 'What are people doing right now instead, and why does it fail them?',
      icon: Target,
      field: 'problem',
      placeholder: 'e.g. Private tutors cost $40-60/hour, university tutoring centers have long waitlists, and free online videos lack 1-on-1 personalized guidance...',
    },
    {
      id: 'context',
      num: '04',
      title: 'Context / Situation',
      tabLabel: '04 Context',
      question: 'Where or in what situation would people use this?',
      subtitle: 'The setting, location, or daily moment when someone reaches for your solution.',
      helpText: 'Examples shown as guidance only (never inserted as data): on campus, during exam weeks, at work, at home, or on mobile.',
      icon: Compass,
      field: 'context',
      placeholder: 'e.g. On college campuses across the country, primarily during midterm and finals weeks, via mobile app or video chat...',
    },
    {
      id: 'outcome',
      num: '05',
      title: 'Desired Outcome',
      tabLabel: '05 Outcome',
      question: 'What would you want to be different for the customer if this worked?',
      subtitle: 'If this venture is successful, what tangible change does the customer experience?',
      helpText: 'Focus on the human benefit or relief you want to deliver.',
      icon: Award,
      field: 'outcome',
      placeholder: 'e.g. Students pass their exams with less stress and lower cost, while student tutors earn steady income helping their peers...',
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2B3D4F]" />
          <span className="font-semibold text-sm text-[#2B3D4F]">Founder Discovery Dimensions</span>
        </div>
      }
      subtitle="Answer simple questions about what you know. Our AI Business Council will derive differentiation, positioning, and strategy for you."
      badge={
        <Badge variant="active" size="sm">
          Dimension {activeStep + 1} of {steps.length}
        </Badge>
      }
    >
      {/* 5 Discovery Dimension Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-[#DDD5C5] no-scrollbar">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = activeStep === idx;
          const val =
            step.field === 'rawInput'
              ? state.idea.rawInput
              : step.field === 'targetAudience'
                ? state.idea.targetAudience
                : step.field === 'problem'
                  ? state.idea.problem
                  : step.field === 'context'
                    ? state.idea.context
                    : state.idea.outcome;
          const isFilled = Boolean(val && val.trim().length > 2);

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
              <span>{step.tabLabel}</span>
              {isFilled && <CheckCircle2 className="w-3 h-3 text-[#4A7C59]" />}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[200px] space-y-4 animate-fade-in">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#8A6D2B] px-1.5 py-0.5 rounded bg-[#8A6D2B]/10 border border-[#8A6D2B]/30">
              {currentStep.num}
            </span>
            <h4 className="text-sm font-semibold text-[#2B3D4F]">
              {currentStep.question}
            </h4>
          </div>
          <p className="text-xs text-[#6B7D90]">
            {currentStep.subtitle}
          </p>
        </div>

        <Textarea
          label={currentStep.title}
          placeholder={currentStep.placeholder}
          value={
            currentStep.field === 'rawInput'
              ? state.idea.rawInput
              : currentStep.field === 'targetAudience'
                ? state.idea.targetAudience
                : currentStep.field === 'problem'
                  ? state.idea.problem
                  : currentStep.field === 'context'
                    ? state.idea.context
                    : state.idea.outcome || ''
          }
          onChange={(e) => {
            const val = e.target.value;
            if (currentStep.field === 'rawInput') updateIdea({ rawInput: val });
            else if (currentStep.field === 'targetAudience') updateIdea({ targetAudience: val });
            else if (currentStep.field === 'problem') updateIdea({ problem: val });
            else if (currentStep.field === 'context') updateIdea({ context: val });
            else if (currentStep.field === 'outcome') updateIdea({ outcome: val });
          }}
          rows={3}
        />

        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#ECE6DA]/50 border border-[#DDD5C5]/60 text-[11px] text-[#5B6B7F]">
          <Info className="w-3.5 h-3.5 text-[#2B3D4F] shrink-0 mt-0.5" />
          <span>{currentStep.helpText}</span>
        </div>
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
          Previous
        </Button>

        <div className="text-xs font-mono text-[#6B7D90] hidden sm:block">
          Dimension {activeStep + 1} of {steps.length}
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
            Next Dimension
          </Button>
        ) : (
          <Badge variant="success" size="md">
            Discovery Dimensions Completed
          </Badge>
        )}
      </div>
    </Card>
  );
};
