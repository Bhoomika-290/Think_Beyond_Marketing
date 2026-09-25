import React, { useState } from 'react';
import { 
  Sparkles, 
  Wrench, 
  Share2, 
  Search, 
  Mail, 
  Copy, 
  Check, 
  Film, 
  Layers, 
  Layout, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3,
  Lock,
  PlugZap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReelVideoCanvasPlayer } from './ReelVideoCanvasPlayer';
import type { 
  VisualReelConcept, 
  VisualCarouselConcept, 
  BannerAdConcept, 
  FullCampaignConcept,
  MetaCampaignWorkspace,
  SeoWorkspaceData,
  CrmWorkspaceData,
  CrmLeadRecord,
  LeadLifecycleStage,
  MaintainWorkspaceData
} from '../../types/growth';

interface GrowthPremiumToolsViewProps {
  reels: VisualReelConcept[];
  carousels: VisualCarouselConcept[];
  banners: BannerAdConcept[];
  campaigns: FullCampaignConcept[];
  meta: MetaCampaignWorkspace;
  seo: SeoWorkspaceData;
  crm: CrmWorkspaceData;
  maintain: MaintainWorkspaceData;
  ventureName: string;
}

export const GrowthPremiumToolsView: React.FC<GrowthPremiumToolsViewProps> = ({
  reels: initialReels,
  carousels: initialCarousels,
  banners: initialBanners,
  campaigns: initialCampaigns,
  meta: initialMeta,
  seo,
  crm: initialCrm,
  maintain: initialMaintain,
  ventureName,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'maintain' | 'meta' | 'seo' | 'crm'>('generate');
  
  // =========================================================================
  // 1. GENERATE MODULE STATE
  // =========================================================================
  const [generateFormat, setGenerateFormat] = useState<'reel' | 'carousel' | 'banner' | 'campaign'>('reel');
  const [reels, setReels] = useState<VisualReelConcept[]>(initialReels);
  const [activeReelIdx, setActiveReelIdx] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Carousel state
  const [carousels] = useState<VisualCarouselConcept[]>(initialCarousels);
  const [activeCarouselSlide, setActiveCarouselSlide] = useState<number>(0);

  // =========================================================================
  // 2. META WORKSPACE STATE
  // =========================================================================
  const [metaWorkspace, setMetaWorkspace] = useState<MetaCampaignWorkspace>(initialMeta);
  const [activeMetaVariantIdx, setActiveMetaVariantIdx] = useState<number>(0);
  const [isEditingAd, setIsEditingAd] = useState<boolean>(false);
  const [editedHeadline, setEditedHeadline] = useState<string>('');
  const [editedPrimaryText, setEditedPrimaryText] = useState<string>('');

  // =========================================================================
  // 3. CRM WORKSPACE STATE (Locked by default, zero fake records)
  // =========================================================================
  const [isCrmConnected, setIsCrmConnected] = useState<boolean>(false);
  const [crmLeads, setCrmLeads] = useState<CrmLeadRecord[]>(initialCrm.leads);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState<boolean>(false);
  const [newLeadName, setNewLeadName] = useState<string>('');
  const [newLeadRole, setNewLeadRole] = useState<string>('');
  const [newLeadEmail, setNewLeadEmail] = useState<string>('');
  const [newLeadNotes, setNewLeadNotes] = useState<string>('');

  // =========================================================================
  // 4. MAINTAIN WORKSPACE STATE
  // =========================================================================
  const [maintainIssues, setMaintainIssues] = useState(initialMaintain.issues);

  const activeReel = reels[activeReelIdx] || reels[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAdEdit = () => {
    const updatedVariants = [...metaWorkspace.variants];
    updatedVariants[activeMetaVariantIdx] = {
      ...updatedVariants[activeMetaVariantIdx],
      headline: editedHeadline || updatedVariants[activeMetaVariantIdx].headline,
      primaryText: editedPrimaryText || updatedVariants[activeMetaVariantIdx].primaryText,
    };
    setMetaWorkspace({ ...metaWorkspace, variants: updatedVariants });
    setIsEditingAd(false);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const newLead: CrmLeadRecord = {
      id: `lead_${Date.now()}`,
      name: newLeadName,
      companyOrRole: newLeadRole || 'Prospective Customer',
      email: newLeadEmail || 'contact@venture.com',
      stage: 'new_lead',
      source: 'Manual Entry',
      priority: 'High',
      notes: newLeadNotes || 'Entered via Stage 08 CRM Hub.',
      createdAt: 'Just now',
      lastActivity: 'Lead created',
    };

    setCrmLeads([newLead, ...crmLeads]);
    setNewLeadName('');
    setNewLeadRole('');
    setNewLeadEmail('');
    setNewLeadNotes('');
    setIsAddLeadOpen(false);
  };

  const handleMoveLeadStage = (leadId: string, newStage: LeadLifecycleStage) => {
    setCrmLeads(crmLeads.map((l) => (l.id === leadId ? { ...l, stage: newStage, lastActivity: `Moved to ${newStage.replace('_', ' ')}` } : l)));
  };

  const handleToggleMaintainIssue = (issueId: string) => {
    setMaintainIssues(maintainIssues.map((iss) => {
      if (iss.id === issueId) {
        return {
          ...iss,
          status: iss.status === 'resolved' ? 'attention' : 'resolved'
        };
      }
      return iss;
    }));
  };

  const activeAdVariant = metaWorkspace.variants[activeMetaVariantIdx] || metaWorkspace.variants[0];
  const activeCarousel = carousels[0];

  return (
    <div className="bg-[#0D121B] border border-[#263244] rounded-2xl p-5 shadow-xl space-y-5">
      {/* 1. Workspace Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1A2536]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#738095] font-bold">
              Brand Activation &amp; Growth Studio
            </div>
            <h3 className="text-base font-bold text-[#F3F4F6]">
              Creative &amp; Growth Engine
            </h3>
          </div>
        </div>

        {/* 5 Premium Module Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#111823] rounded-xl border border-[#263244]">
          <button
            type="button"
            onClick={() => setActiveTab('generate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'generate'
                ? 'bg-[#8B5CF6] text-white shadow-md'
                : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>GENERATE</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'meta'
                ? 'bg-[#4D8DFF] text-[#080B10] shadow-md'
                : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>META</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'seo'
                ? 'bg-[#38BDF8] text-[#080B10] shadow-md'
                : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>SEO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('crm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'crm'
                ? 'bg-[#F59E0B] text-[#080B10] shadow-md'
                : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('maintain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'maintain'
                ? 'bg-[#10B981] text-[#080B10] shadow-md'
                : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>MAINTAIN</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MODULE: GENERATE (Visual Reel Studio, Carousels, Banners, Campaigns)*/}
      {/* ===================================================================== */}
      {activeTab === 'generate' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Format Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#111823] rounded-xl border border-[#263244]">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-[#738095] uppercase font-bold">Creative Format:</span>
              <button
                type="button"
                onClick={() => setGenerateFormat('reel')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                  generateFormat === 'reel' ? 'bg-[#8B5CF6] text-white' : 'text-[#AAB4C3] hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" /> Short Video / Reel
              </button>
              <button
                type="button"
                onClick={() => setGenerateFormat('carousel')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                  generateFormat === 'carousel' ? 'bg-[#8B5CF6] text-white' : 'text-[#AAB4C3] hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" /> Visual Carousel
              </button>
              <button
                type="button"
                onClick={() => setGenerateFormat('banner')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                  generateFormat === 'banner' ? 'bg-[#8B5CF6] text-white' : 'text-[#AAB4C3] hover:text-white'
                }`}
              >
                <Layout className="w-3 h-3" /> Banner / Ad
              </button>
              <button
                type="button"
                onClick={() => setGenerateFormat('campaign')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                  generateFormat === 'campaign' ? 'bg-[#8B5CF6] text-white' : 'text-[#AAB4C3] hover:text-white'
                }`}
              >
                <Target className="w-3 h-3" /> Campaign Concept
              </button>
            </div>

            <span className="text-[10px] font-mono text-[#8B5CF6] font-bold">
              Dynamic to {ventureName}
            </span>
          </div>

          {/* Render Format 1: 9:16 SOCIAL REEL VIDEO STUDIO */}
          {generateFormat === 'reel' && (
            <div className="space-y-3">
              {reels.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {reels.map((r, rIdx) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setActiveReelIdx(rIdx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                        activeReelIdx === rIdx
                          ? 'bg-[#8B5CF6] text-white shadow-md'
                          : 'bg-[#111823] text-[#AAB4C3] hover:text-white border border-[#263244]'
                      }`}
                    >
                      Reel Concept 0{rIdx + 1}: {r.title}
                    </button>
                  ))}
                </div>
              )}

              <ReelVideoCanvasPlayer
                reel={activeReel}
                onUpdateReel={(updated) => {
                  const newReels = [...reels];
                  newReels[activeReelIdx] = updated;
                  setReels(newReels);
                }}
                ventureName={ventureName}
              />
            </div>
          )}

          {/* Render Format 2: VISUAL CAROUSEL SLIDES */}
          {generateFormat === 'carousel' && (
            <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1A2536]">
                <div>
                  <div className="text-xs font-bold text-white font-mono">{activeCarousel.title}</div>
                  <div className="text-[10px] font-mono text-[#738095]">
                    Theme: {activeCarousel.theme} • Target: {activeCarousel.targetPersona}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('carousel_copy', `CAROUSEL: ${activeCarousel.title}\n\n${activeCarousel.slides.map((s) => `[Slide ${s.slideNumber}] ${s.headline}\n${s.bodyCopy}`).join('\n\n')}`)}
                  className="px-2.5 py-1 rounded bg-[#1A2536] text-[10px] font-mono text-[#AAB4C3] hover:text-white flex items-center gap-1"
                >
                  {copiedId === 'carousel_copy' ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Slide Deck</span>
                </button>
              </div>

              {/* Visual Carousel Cards Deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {activeCarousel.slides.map((slide, idx) => (
                  <div
                    key={slide.slideNumber}
                    onClick={() => setActiveCarouselSlide(idx)}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                      activeCarouselSlide === idx
                        ? 'bg-gradient-to-b from-[#151E2B] to-[#0D121B] border-[#8B5CF6] ring-1 ring-[#8B5CF6]/40 shadow-lg'
                        : 'bg-[#0D121B] border-[#263244] hover:border-[#384860]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#738095]">
                        <span className="px-2 py-0.5 rounded bg-[#111823] text-white font-bold border border-[#263244]">
                          {slide.badgeOrNumber}
                        </span>
                        <span className="text-[#8B5CF6] font-bold uppercase">{ventureName}</span>
                      </div>
                      <div className="text-xs font-bold text-white leading-snug">{slide.headline}</div>
                      <p className="text-[11px] text-[#AAB4C3] leading-relaxed">{slide.bodyCopy}</p>
                    </div>

                    {slide.ctaButton ? (
                      <div className="pt-2 border-t border-[#1A2536]">
                        <span className="px-3 py-1.5 rounded bg-[#8B5CF6] text-white text-[10px] font-mono font-bold block text-center shadow-md">
                          {slide.ctaButton} →
                        </span>
                      </div>
                    ) : (
                      <div className="text-[9px] font-mono text-[#738095] italic pt-1">
                        Swipe for next →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Format 3: BANNERS */}
          {generateFormat === 'banner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialBanners.map((ban) => (
                <div key={ban.id} className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{ban.formatName} ({ban.dimensions})</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#8B5CF6]/20 text-[#A78BFA] font-bold">
                      {ban.badgeText}
                    </span>
                  </div>

                  {/* Rendered Banner Composition Card */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#0B1017] via-[#111823] to-[#151E2B] border border-[#263244] space-y-3 text-left shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                        {ventureName}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                        {ban.badgeText}
                      </span>
                    </div>

                    <div className="text-base font-bold text-white leading-tight">
                      {ban.headline}
                    </div>

                    <p className="text-xs text-[#AAB4C3] leading-relaxed">
                      {ban.subheadline}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-[#4D8DFF] text-[#080B10] font-mono text-xs font-bold shadow-md"
                      >
                        {ban.ctaText} →
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#738095]">
                    Composition: {ban.visualComposition}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Render Format 4: CAMPAIGN CONCEPTS */}
          {generateFormat === 'campaign' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {initialCampaigns.map((camp) => (
                <div key={camp.id} className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{camp.campaignTitle}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#4D8DFF]/20 text-[#60A5FA]">
                      {camp.funnelStage}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#38BDF8] font-mono">Objective: {camp.objective}</div>
                  <p className="text-[11px] text-[#AAB4C3] leading-relaxed">{camp.coreAngle}</p>

                  <div className="p-2.5 rounded-lg bg-[#0D121B] border border-[#263244] text-[10px] font-mono text-[#738095] space-y-1">
                    <div><span className="text-white font-bold">Target: </span>{camp.targetAudience}</div>
                    <div><span className="text-white font-bold">Channel: </span>{camp.primaryChannel}</div>
                    <div><span className="text-[#10B981] font-bold">Wedge: </span>{camp.keyDifferentiator}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. MODULE: META ADVERTISING WORKSPACE                                 */}
      {/* ===================================================================== */}
      {activeTab === 'meta' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Config Ribbon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#111823] rounded-xl border border-[#263244]">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">Campaign Strategy</div>
              <div className="text-xs font-bold text-white font-mono">{metaWorkspace.campaignName}</div>
              <div className="text-[11px] text-[#38BDF8]">Objective: {metaWorkspace.objective}</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">Target Audience</div>
              <div className="text-xs font-semibold text-white">{metaWorkspace.targetAudienceName}</div>
              <div className="text-[10px] font-mono text-[#738095] truncate">{metaWorkspace.demographicSummary}</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">Interest Stacks</div>
              <div className="text-xs text-[#AAB4C3] truncate">{metaWorkspace.suggestedInterests.join(', ')}</div>
              <div className="text-[10px] font-mono text-[#10B981]">Derived from venture niche</div>
            </div>
          </div>

          {/* Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Variant Selection and Inline Controls */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                <span>Ad Creative Variants ({metaWorkspace.variants.length})</span>
                <span className="text-[10px] text-[#738095]">Select variant to preview</span>
              </div>

              <div className="space-y-2">
                {metaWorkspace.variants.map((v, idx) => (
                  <div
                    key={v.id}
                    onClick={() => setActiveMetaVariantIdx(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeMetaVariantIdx === idx
                        ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/40 shadow-md'
                        : 'bg-[#111823] border-[#263244] hover:border-[#384860]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#4D8DFF]/20 text-[#60A5FA]">
                        Variant 0{idx + 1} • {v.placementType.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-[#738095]">{v.hookAngle}</span>
                    </div>

                    <div className="text-xs font-bold text-white leading-snug">{v.headline}</div>
                    <p className="text-[11px] text-[#AAB4C3] leading-relaxed line-clamp-2 pt-1">{v.primaryText}</p>
                  </div>
                ))}
              </div>

              {/* Edit Controls */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditedHeadline(activeAdVariant.headline);
                    setEditedPrimaryText(activeAdVariant.primaryText);
                    setIsEditingAd(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1A2536] hover:bg-[#263244] text-xs font-mono text-white flex items-center gap-1.5 border border-[#263244] transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Variant Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy('meta_full', `HEADLINE: ${activeAdVariant.headline}\nPRIMARY TEXT: ${activeAdVariant.primaryText}\nDESCRIPTION: ${activeAdVariant.descriptionText}\nCTA: ${activeAdVariant.ctaButton}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#1A2536] hover:bg-[#263244] text-xs font-mono text-white flex items-center gap-1.5 border border-[#263244] transition-colors"
                >
                  {copiedId === 'meta_full' ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Ad Spec</span>
                </button>
              </div>

              {/* Inline Edit Form */}
              {isEditingAd && (
                <div className="p-3.5 rounded-xl bg-[#111823] border border-[#4D8DFF] space-y-2.5 animate-fadeIn">
                  <div className="text-xs font-bold text-white font-mono">Edit Ad Copy</div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#738095]">Headline</label>
                    <input
                      type="text"
                      value={editedHeadline}
                      onChange={(e) => setEditedHeadline(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#738095]">Primary Text</label>
                    <textarea
                      rows={3}
                      value={editedPrimaryText}
                      onChange={(e) => setEditedPrimaryText(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveAdEdit}
                      className="px-3 py-1 rounded bg-[#4D8DFF] text-[#080B10] text-xs font-bold font-mono"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAd(false)}
                      className="px-3 py-1 rounded bg-[#1A2536] text-xs font-mono text-[#AAB4C3]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Authentic Social Ad Preview */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md bg-[#000000] border border-[#263244] rounded-2xl overflow-hidden shadow-2xl space-y-3 p-3">
                {/* Ad Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#4D8DFF] flex items-center justify-center font-mono text-xs font-bold text-[#080B10]">
                      {ventureName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{ventureName}</div>
                      <div className="text-[10px] text-[#738095]">Sponsored • Paid Partnership</div>
                    </div>
                  </div>
                  <div className="text-[#738095] text-xs">•••</div>
                </div>

                {/* Primary Text */}
                <div className="text-xs text-[#F3F4F6] px-1 leading-relaxed">
                  {activeAdVariant.primaryText}
                </div>

                {/* Media Creative Preview */}
                <div className="relative w-full aspect-video rounded-xl bg-gradient-to-br from-[#111823] via-[#1A2536] to-[#0D121B] border border-[#263244] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-[#4D8DFF]/20 border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF] mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-white font-mono uppercase tracking-wider">{ventureName}</div>
                  <div className="text-[10px] text-[#AAB4C3] max-w-xs mt-1">{activeAdVariant.visualAssetDescription}</div>
                </div>

                {/* Ad Bottom Bar */}
                <div className="p-3 bg-[#111823] rounded-xl flex items-center justify-between gap-3 border border-[#263244]">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">VENTURE.IO/LAUNCH</div>
                    <div className="text-xs font-bold text-white truncate max-w-[220px]">{activeAdVariant.headline}</div>
                    <div className="text-[10px] text-[#AAB4C3] truncate">{activeAdVariant.descriptionText}</div>
                  </div>

                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-[#4D8DFF] text-[#080B10] font-mono text-xs font-bold shadow-md shrink-0"
                  >
                    {activeAdVariant.ctaButton}
                  </button>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#738095] pt-2 text-center">
                * Creative generated from project intelligence • Connect Meta CAPI for live spend telemetry.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. MODULE: SEO STUDIO                                                 */}
      {/* ===================================================================== */}
      {activeTab === 'seo' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Search Intent Themes */}
          <div className="p-4 bg-[#111823] rounded-xl border border-[#263244] space-y-2">
            <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
              <span>Dynamic Search Themes for {ventureName}</span>
              <span className="text-[10px] text-[#38BDF8]">Derived from venture ICP &amp; problem</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {seo.searchThemes.map((thm, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#0D121B] border border-[#263244] text-xs font-mono text-[#AAB4C3]">
                  🔍 &ldquo;{thm}&rdquo;
                </span>
              ))}
            </div>
          </div>

          {/* Keyword Clusters with Live Google SERP Card Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seo.keywordClusters.map((cluster) => (
              <div key={cluster.id} className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">{cluster.clusterTheme}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0284C7]/20 text-[#38BDF8]">
                    {cluster.searchIntent}
                  </span>
                </div>

                {/* Google SERP Search Snippet Preview */}
                <div className="p-3.5 rounded-xl bg-[#0B1017] border border-[#263244] space-y-1 text-left font-sans">
                  <div className="text-[11px] text-[#9AA0A6] flex items-center gap-1 font-mono">
                    <span>https://{ventureName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com</span>
                    <span>›</span>
                    <span className="text-[#8AB4F8]">{cluster.targetSlug}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#8AB4F8] hover:underline cursor-pointer leading-tight">
                    {cluster.suggestedPageTitle}
                  </div>
                  <p className="text-xs text-[#BDC1C6] leading-relaxed pt-0.5">
                    {cluster.metaDescription}
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[10px] font-mono text-[#738095]">
                    Primary Search Query: <span className="text-white font-bold">&ldquo;{cluster.primaryKeyword}&rdquo;</span>
                  </div>
                  <p className="text-[11px] text-[#AAB4C3] leading-relaxed">{cluster.contentAngle}</p>
                </div>

                <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#10B981] font-bold">{cluster.contentPriority}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(cluster.id, `TARGET SLUG: ${cluster.targetSlug}\nTITLE: ${cluster.suggestedPageTitle}\nMETA DESC: ${cluster.metaDescription}\nKEYWORD: ${cluster.primaryKeyword}\nCONTENT ANGLE: ${cluster.contentAngle}`)}
                    className="hover:text-white flex items-center gap-1 text-[#738095]"
                  >
                    {copiedId === cluster.id ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3 text-xs" />}
                    <span>Copy SEO Blueprint</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Technical SEO Checklist */}
          <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2">
            <div className="text-xs font-mono font-bold text-white">Technical Search Foundations</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {seo.technicalAudit.map((tech) => (
                <div key={tech.id} className="p-2.5 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white font-bold">{tech.checkpoint}</span>
                    <span className="text-[#10B981] font-bold">{tech.status.toUpperCase()}</span>
                  </div>
                  <div className="text-[11px] text-[#AAB4C3] leading-snug">{tech.recommendation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. MODULE: CRM WORKSPACE (Zero fake customers - Connect state)        */}
      {/* ===================================================================== */}
      {activeTab === 'crm' && (
        <div className="space-y-4 animate-fadeIn">
          {!isCrmConnected && crmLeads.length === 0 ? (
            /* Premium Locked / Connect CRM State */
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#111823] to-[#0D121B] border border-[#263244] text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-bold text-white">
                  CRM &amp; Customer Telemetry Connection Required
                </h4>
                <p className="text-xs text-[#AAB4C3] leading-relaxed">
                  Connect your customer database (HubSpot, Attio, Salesforce, Stripe) or manually record active pipeline leads to unlock customer lifecycle tracking.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCrmConnected(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#080B10] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#F59E0B]/20"
                >
                  <PlugZap className="w-4 h-4" />
                  <span>Connect CRM Integration</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCrmConnected(true);
                    setIsAddLeadOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#1A2536] hover:bg-[#263244] text-white text-xs font-mono flex items-center gap-1.5 border border-[#263244] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Active Lead</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active CRM Pipeline Interface */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#111823] rounded-xl border border-[#263244]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">Lead &amp; Customer Pipeline</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F59E0B]/20 text-[#FBBF24]">
                    {crmLeads.length} Records
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#F59E0B] text-[#080B10] text-xs font-mono font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Lead</span>
                  </button>
                </div>
              </div>

              {/* Add Lead Form */}
              {isAddLeadOpen && (
                <form onSubmit={handleAddLead} className="p-4 rounded-xl bg-[#111823] border border-[#F59E0B] space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">Add New Real Lead</span>
                    <button
                      type="button"
                      onClick={() => setIsAddLeadOpen(false)}
                      className="text-xs font-mono text-[#738095] hover:text-white"
                    >
                      Close [×]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      className="px-3 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Role or Company"
                      value={newLeadRole}
                      onChange={(e) => setNewLeadRole(e.target.value)}
                      className="px-3 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="px-3 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Initial Lead Notes or Interest..."
                    value={newLeadNotes}
                    onChange={(e) => setNewLeadNotes(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#0D121B] border border-[#263244] text-xs text-white"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#F59E0B] text-[#080B10] text-xs font-bold font-mono"
                  >
                    Save Lead To Pipeline
                  </button>
                </form>
              )}

              {crmLeads.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-[#111823] border border-[#263244] text-xs text-[#738095]">
                  CRM connection active. No incoming customer records yet. Add a lead above to start tracking.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {crmLeads.map((lead) => (
                    <div key={lead.id} className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white">{lead.name}</div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#F59E0B]/20 text-[#FBBF24]">
                            {lead.stage.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#38BDF8] font-mono">{lead.companyOrRole} • {lead.email}</div>
                        <p className="text-[11px] text-[#AAB4C3] leading-relaxed pt-1">{lead.notes}</p>
                      </div>

                      <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between gap-2 text-[10px] font-mono">
                        <span className="text-[#738095]">Last: {lead.lastActivity}</span>
                        
                        <select
                          value={lead.stage}
                          onChange={(e) => handleMoveLeadStage(lead.id, e.target.value as LeadLifecycleStage)}
                          className="px-2 py-1 rounded bg-[#0D121B] border border-[#263244] text-[10px] font-mono text-white"
                        >
                          <option value="new_lead">New Lead</option>
                          <option value="engaged">Engaged</option>
                          <option value="trial_demo">Trial / Demo</option>
                          <option value="customer">Customer</option>
                          <option value="advocate">Advocate</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. MODULE: MAINTAIN (Brand Consistency & Project Health Engine)        */}
      {/* ===================================================================== */}
      {activeTab === 'maintain' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#111823] rounded-xl border border-[#263244]">
            <div className="text-xs text-[#AAB4C3]">
              <span className="text-white font-bold">Brand Consistency &amp; Project Health Monitor:</span> Scans all 7 upstream stages for missing data, logic gaps, or brand drift.
            </div>
            <span className="text-[10px] font-mono text-[#10B981] font-bold">
              {maintainIssues.length} Checkpoint(s)
            </span>
          </div>

          <div className="space-y-3">
            {maintainIssues.map((iss) => (
              <div key={iss.id} className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1E293B] text-[#AAB4C3]">
                      {iss.category}
                    </span>
                    <span className="text-xs font-bold text-white">{iss.touchpoint}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleMaintainIssue(iss.id)}
                    className="transition-colors"
                  >
                    {iss.status === 'resolved' ? (
                      <span className="text-[10px] font-mono text-[#10B981] font-bold flex items-center gap-1 hover:underline">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED ALIGNED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#F59E0B] font-bold flex items-center gap-1 hover:underline">
                        <AlertCircle className="w-3 h-3" /> ATTENTION REQUIRED
                      </span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                    <div className="text-[9px] font-mono text-[#738095] uppercase font-bold">What is Missing / Drifted</div>
                    <div className="text-[#F3F4F6]">{iss.whatChangedOrWrong}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                    <div className="text-[9px] font-mono text-[#738095] uppercase font-bold">Why It Matters</div>
                    <div className="text-[#AAB4C3]">{iss.whyItMatters}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-mono text-[#738095] uppercase font-bold">Action To Take</div>
                      <div className="text-[#38BDF8]">{iss.actionToTake}</div>
                    </div>

                    {iss.actionPath && (
                      <Link
                        to={iss.actionPath}
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#10B981] hover:underline pt-1"
                      >
                        <span>Fix in Stage →</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
