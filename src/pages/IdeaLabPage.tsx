import React, { useState } from 'react';
import { HeroTransformation } from '../components/idea-lab/HeroTransformation';
import { FAQEntryPrompts } from '../components/idea-lab/FAQEntryPrompts';
import { InterviewerChat } from '../components/idea-lab/InterviewerChat';
import { ProductTypeSelector } from '../components/idea-lab/ProductTypeSelector';
import { LocationContext } from '../components/idea-lab/LocationContext';
import { DiscoveryFlow } from '../components/idea-lab/DiscoveryFlow';
import { IdeaSnapshot } from '../components/idea-lab/IdeaSnapshot';

export const IdeaLabPage: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | undefined>(undefined);

  const handleSelectPrompt = (promptText: string) => {
    setSelectedPrompt(promptText);
  };

  return (
    <div className="pb-16 space-y-8 animate-fade-in">
      {/* Hero Visual Transformation Flow */}
      <HeroTransformation />

      {/* FAQ Founder Dilemma Entry Prompts */}
      <FAQEntryPrompts onSelectPrompt={handleSelectPrompt} />

      {/* Main Workspace Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business AI Interviewer (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-theme-secondary font-semibold">
                01 // Intelligence Interviewer
              </h2>
              <span className="text-[11px] text-theme-muted font-mono">
                Real-time capture
              </span>
            </div>

            <InterviewerChat
              externalPrompt={selectedPrompt}
              onClearExternalPrompt={() => setSelectedPrompt(undefined)}
            />
          </div>

          {/* Right Column: Structured Vectors (Product Type, Location, Discovery) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-theme-secondary font-semibold">
                02 // Structured Vectors
              </h2>
              <span className="text-[11px] text-theme-muted font-mono">
                Stage 01 Grounding
              </span>
            </div>

            {/* Product Type Classification */}
            <ProductTypeSelector />

            {/* Location & Operating Scope */}
            <LocationContext />

            {/* Step-by-Step Discovery Interview */}
            <DiscoveryFlow />
          </div>
        </div>

        {/* Live Idea Snapshot & Stage Transition */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-theme-secondary font-semibold">
              03 // Synthesized Stage Output
            </h2>
            <span className="text-[11px] text-theme-muted font-mono">
              Live Project State
            </span>
          </div>

          <IdeaSnapshot />
        </div>
      </div>
    </div>
  );
};
