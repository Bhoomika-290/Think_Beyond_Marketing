import React, { useState } from 'react';
import { Video, BookOpen, Layers, Bookmark, ExternalLink, Sparkles, Filter } from 'lucide-react';
import type { FounderLearningResource } from '../../types/brandRoadmap';

interface FounderLearningResourcesProps {
  resources: FounderLearningResource[];
  category: string;
  ventureName: string;
}

export const FounderLearningResources: React.FC<FounderLearningResourcesProps> = ({
  resources,
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
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'case_study':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'framework':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'playbook':
        return <Bookmark className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTypeBadgeClass = (type: FounderLearningResource['type']) => {
    switch (type) {
      case 'video':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'case_study':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'framework':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'playbook':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div id="section-resources" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 03 — Founder Learning & Strategic Case Studies
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              CATEGORY INTELLIGENCE
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Curated playbooks, teardowns, and strategic frameworks relevant to scaling a <span className="text-[#F3F4F6] font-semibold">{category}</span> brand like <span className="text-blue-400 font-semibold">{ventureName}</span>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111823] rounded-xl border border-[#263244] text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-[#738095] ml-2 mr-1" />
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
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-[#738095] hover:text-[#AAB4C3]'
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
            className="flex flex-col justify-between p-5 rounded-xl bg-[#111823] border border-[#263244] hover:border-blue-500/50 hover:bg-[#151F2E] transition-all group shadow-sm"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getTypeBadgeClass(res.type)}`}>
                  {getTypeIcon(res.type)}
                  {res.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-[#738095]">
                  {res.durationOrReadTime}
                </span>
              </div>

              {/* Title & Source */}
              <h3 className="text-sm font-bold text-[#F3F4F6] group-hover:text-blue-400 transition-colors mb-1.5 leading-snug">
                {res.title}
              </h3>
              <div className="text-[11px] font-mono text-[#738095] mb-3">
                Source: <span className="text-[#AAB4C3]">{res.source}</span>
              </div>

              {/* Key Takeaway */}
              <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635] mb-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 mb-1 font-bold">
                  Strategic Founder Takeaway
                </div>
                <p className="text-xs text-[#E1E7EF] leading-relaxed">
                  {res.takeaway}
                </p>
              </div>
            </div>

            {/* Footer Tag & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1C2635] text-xs">
              <span className="text-[10px] font-mono text-[#738095] bg-[#0A0F16] px-2 py-0.5 rounded border border-[#1C2635]">
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
                className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-400 hover:text-blue-300 font-semibold transition-colors"
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
