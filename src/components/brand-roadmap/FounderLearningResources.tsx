import React, { useState } from 'react';
import { Video, BookOpen, Layers, Bookmark, ExternalLink, Sparkles, Filter } from 'lucide-react';
import type { FounderLearningResource } from '../../types/brandRoadmap';

interface FounderLearningResourcesProps {
  resources: FounderLearningResource[];
  category: string;
  ventureName: string;
}

export const FounderLearningResources: React.FC<FounderLearningResourcesProps> = ({
  resources = [],
  category,
  ventureName,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredResources = filterType === 'all'
    ? resources
    : resources.filter((r) => r.type === filterType);

  const getTypeIcon = (type: FounderLearningResource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-[#9E4A4A]" />;
      case 'case_study':
        return <BookOpen className="w-4 h-4 text-[#4A7C59]" />;
      case 'framework':
        return <Layers className="w-4 h-4 text-[#2B3D4F]" />;
      case 'playbook':
        return <Bookmark className="w-4 h-4 text-[#8A6D2B]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#6B7D90]" />;
    }
  };

  const getTypeBadgeClass = (type: FounderLearningResource['type']) => {
    switch (type) {
      case 'video':
        return 'bg-[#9E4A4A]/10 text-[#9E4A4A] border-[#9E4A4A]/30';
      case 'case_study':
        return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30';
      case 'framework':
        return 'bg-[#2B3D4F]/10 text-[#2B3D4F] border-[#2B3D4F]/30';
      case 'playbook':
        return 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30';
      default:
        return 'bg-[#6B7D90]/10 text-[#6B7D90] border-[#6B7D90]/30';
    }
  };

  return (
    <div id="section-resources" className="rounded-2xl bg-[#FDFCF8] border border-[#2B3D4F]/25 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2B3D4F]/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F]" />
            <h2 className="text-base sm:text-lg font-bold font-serif tracking-tight text-[#2B3D4F]">
              Section 03 — Founder Learning & Strategic Case Studies
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#2B3D4F]/5 text-[#2B3D4F] border border-[#2B3D4F]/25">
              CATEGORY INTELLIGENCE
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Curated playbooks, teardowns, and strategic frameworks relevant to scaling a <span className="text-[#2B3D4F] font-semibold">{category}</span> brand like <span className="text-[#2B3D4F] font-semibold">{ventureName}</span>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3EA] rounded-xl border border-[#2B3D4F]/15 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-[#6B7D90] ml-2 mr-1" />
          {[
            { id: 'all', label: 'All' },
            { id: 'video', label: 'Videos' },
            { id: 'case_study', label: 'Case Studies' },
            { id: 'framework', label: 'Frameworks' },
            { id: 'playbook', label: 'Playbooks' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === tab.id
                  ? 'bg-[#2B3D4F] text-[#FDFCF8] font-bold'
                  : 'text-[#6B7D90] hover:text-[#2B3D4F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="flex flex-col justify-between p-5 rounded-xl bg-white border border-[#2B3D4F]/15 hover:border-[#2B3D4F]/40 transition-all group shadow-sm"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getTypeBadgeClass(res.type)}`}>
                  {getTypeIcon(res.type)}
                  {res.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-[#6B7D90]">
                  {res.durationOrReadTime}
                </span>
              </div>

              {/* Title & Source */}
              <h3 className="text-sm font-bold text-[#2B3D4F] group-hover:text-[#9E4A4A] transition-colors mb-1.5 leading-snug">
                {res.title}
              </h3>
              <div className="text-[11px] font-mono text-[#6B7D90] mb-3">
                Source: <span className="text-[#4A5E73]">{res.source}</span>
              </div>

              {/* Key Takeaway */}
              <div className="p-3 rounded-lg bg-[#F7F3EA] border border-[#2B3D4F]/15 mb-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F] mb-1 font-bold">
                  Strategic Founder Takeaway
                </div>
                <p className="text-xs text-[#4A5E73] leading-relaxed">
                  {res.takeaway}
                </p>
              </div>
            </div>

            {/* Footer Tag & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2B3D4F]/15 text-xs">
              <span className="text-[10px] font-mono text-[#6B7D90] bg-[#F7F3EA] px-2 py-0.5 rounded border border-[#2B3D4F]/15">
                {res.relevanceTag}
              </span>
              <a
                href={res.urlPlaceholder || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!res.urlPlaceholder || res.urlPlaceholder.startsWith('#')) {
                    e.preventDefault();
                    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(res.title + ' ' + res.source)}`, '_blank');
                  }
                }}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#2B3D4F] hover:text-[#9E4A4A] font-semibold transition-colors"
              >
                <span>View Resource</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
