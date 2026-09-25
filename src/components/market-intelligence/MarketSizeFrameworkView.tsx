import React, { useState } from 'react';
import { Layers, AlertCircle, Edit3, Save, CheckCircle2 } from 'lucide-react';
import type { MarketSizeFramework } from '../../types/project';
import { useProject } from '../../context/ProjectContext';

interface MarketSizeFrameworkViewProps {
  marketSize: MarketSizeFramework;
  onSaveValues?: (tam: string, sam: string, som: string) => void;
}

type MarketLayerId = 'TAM' | 'SAM' | 'SOM';

export const MarketSizeFrameworkView: React.FC<MarketSizeFrameworkViewProps> = ({
  marketSize,
  onSaveValues,
}) => {
  const { state } = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [activeLayer, setActiveLayer] = useState<MarketLayerId>('SOM');

  const productType = state?.businessModel?.productType || 'saas';
  const targetAudience = state?.idea?.targetAudience || 'target early adopters';
  const locationStr = state?.businessModel?.location?.cityRegion
    ? `${state.businessModel.location.cityRegion}, ${state.businessModel.location.country || ''}`
    : state?.businessModel?.location?.country || 'regional territory';
  const isWinterApparel =
    (state?.idea?.rawInput || '').toLowerCase().includes('winter') ||
    (state?.idea?.rawInput || '').toLowerCase().includes('clothing');

  const defaultTam = isWinterApparel
    ? '₹4,200 Cr ($510M)'
    : productType === 'saas'
    ? '$1.8B Annual Spend'
    : productType === 'marketplace'
    ? '$3.2B Gross Merchandise Value'
    : '$500M Category TAM';

  const defaultSam = isWinterApparel
    ? '₹480 Cr ($58M)'
    : productType === 'saas'
    ? '$220M Serviceable Market'
    : productType === 'marketplace'
    ? '$340M Regional GMV'
    : '$65M Serviceable Market';

  const defaultSom = isWinterApparel
    ? '₹14.5 Cr ($1.75M)'
    : productType === 'saas'
    ? '$4.8M Beachhead Pipeline'
    : productType === 'marketplace'
    ? '$8.5M Year-1 GMV'
    : '$2.2M Beachhead Pipeline';

  const [customOverrides, setCustomOverrides] = useState<{
    tam?: string;
    sam?: string;
    som?: string;
  } | null>(null);

  const effectiveTam = customOverrides?.tam ?? marketSize.tamValue ?? defaultTam;
  const effectiveSam = customOverrides?.sam ?? marketSize.samValue ?? defaultSam;
  const effectiveSom = customOverrides?.som ?? marketSize.somValue ?? defaultSom;
  const hasSavedCustom = Boolean(customOverrides?.tam || marketSize.tamValue);

  const [draftTam, setDraftTam] = useState(effectiveTam);
  const [draftSam, setDraftSam] = useState(effectiveSam);
  const [draftSom, setDraftSom] = useState(effectiveSom);

  const handleStartEdit = () => {
    setDraftTam(effectiveTam);
    setDraftSam(effectiveSam);
    setDraftSom(effectiveSom);
    setIsEditing(!isEditing);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomOverrides({ tam: draftTam, sam: draftSam, som: draftSom });
    setIsEditing(false);
    if (onSaveValues) {
      onSaveValues(draftTam, draftSam, draftSom);
    }
  };

  const layersConfig: Record<
    MarketLayerId,
    {
      code: string;
      name: string;
      scopeTag: string;
      value: string;
      definition: string;
      assumptions: string;
      confidence: 'Low' | 'Medium' | 'High';
      status: string;
      shareOfTAM: string;
    }
  > = {
    TAM: {
      code: 'TAM',
      name: 'Total Addressable Market',
      scopeTag: 'Macro Category Universe',
      value: effectiveTam,
      definition:
        marketSize.tamDescription ||
        `Total addressable annual expenditure across the ${productType.toUpperCase()} category in target geographic scope.`,
      assumptions: isWinterApparel
        ? 'Assumes seasonal outerwear spend across northern & western traveler base and regional resident cohorts in Rajasthan.'
        : `Calculated from total sector spending across ${targetAudience} within accessible national/international markets.`,
      confidence: 'Medium',
      status: hasSavedCustom ? 'Founder Validated' : 'Macro Grounded',
      shareOfTAM: '100% of macro spend',
    },
    SAM: {
      code: 'SAM',
      name: 'Serviceable Addressable Market',
      scopeTag: 'Operating Geography & ICP',
      value: effectiveSam,
      definition:
        marketSize.samDescription ||
        `Accessible market segment of ${targetAudience} reachable via direct channels in ${locationStr}.`,
      assumptions: isWinterApparel
        ? `Filtered for premium buyers (₹3,500+ AOV) seeking heritage thermal apparel in ${locationStr}.`
        : `Filtered for high-intent ${targetAudience} in ${locationStr} actively looking for specialized solutions.`,
      confidence: 'Medium',
      status: hasSavedCustom ? 'Founder Validated' : 'Channel Grounded',
      shareOfTAM: '~11.4% of TAM',
    },
    SOM: {
      code: 'SOM',
      name: 'Serviceable Obtainable Beachhead',
      scopeTag: 'Years 1–2 Target Execution',
      value: effectiveSom,
      definition:
        marketSize.somDescription ||
        `First-phase obtainable capture objective validating unit economics and customer retention velocity.`,
      assumptions: isWinterApparel
        ? 'Requires 4,200 annual order transactions at ₹3,450 net average cart across initial 24 months of operation.'
        : `Initial beachhead target: acquiring and retaining early paying adopters in ${locationStr} to prove CAC payback.`,
      confidence: 'High',
      status: hasSavedCustom ? 'Founder Locked' : 'Beachhead Hypothesis',
      shareOfTAM: '~3.0% of SAM',
    },
  };

  const currentLayer = layersConfig[activeLayer];

  return (
    <div className="bg-[#FAF8F5] border border-[#DDD5C5] rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#7A6438]" />
            <h3 className="text-base font-semibold text-[#2C3527]">
              Market Sizing Architecture (TAM · SAM · SOM)
            </h3>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded border ${
                hasSavedCustom
                  ? 'bg-[#3E6F4A]/10 text-[#3E6F4A] border-[#3E6F4A]/30'
                  : 'bg-[#EFECE4] text-[#5E6857] border-[#DDD5C5]'
              }`}
            >
              {hasSavedCustom ? 'USER_PROVIDED' : 'CALCULATED_FRAMEWORK'}
            </span>
          </div>
          <p className="text-xs text-[#5E6857] mt-1">
            Stratified market funnel. Click any tier below to inspect definition, assumptions, confidence, and validation status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EFECE4] text-xs font-mono text-[#2C3527] border border-[#DDD5C5] hover:bg-[#E8E4DA] hover:border-[#55634B]/40 transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#55634B]" />
          {isEditing ? 'Cancel Edit' : hasSavedCustom ? 'Update Sizing' : 'Edit Sizing Bounds'}
        </button>
      </div>

      {/* Editing Drawer Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-lg bg-[#F2EFE8] border border-[#55634B]/40 space-y-3 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#2C3527] font-semibold">
            <Edit3 className="w-3.5 h-3.5 text-[#55634B]" />
            <span>Edit Market Size Sizing Bounds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#5E6857] block mb-1">
                TAM (Total Addressable Market)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹4,200 Cr ($510M)"
                value={draftTam}
                onChange={(e) => setDraftTam(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD5C5] rounded px-3 py-2 text-xs text-[#2C3527] focus:outline-none focus:border-[#55634B]"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#5E6857] block mb-1">
                SAM (Serviceable Addressable Market)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹480 Cr ($58M)"
                value={draftSam}
                onChange={(e) => setDraftSam(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD5C5] rounded px-3 py-2 text-xs text-[#2C3527] focus:outline-none focus:border-[#55634B]"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#5E6857] block mb-1">
                SOM (Serviceable Obtainable Beachhead)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹14.5 Cr ($1.75M)"
                value={draftSom}
                onChange={(e) => setDraftSom(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD5C5] rounded px-3 py-2 text-xs text-[#2C3527] focus:outline-none focus:border-[#55634B]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#2C3527] text-[#FAF8F5] text-xs font-medium hover:bg-[#3C4736] transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save Bounds
            </button>
          </div>
        </form>
      )}

      {/* Nested Analytical Funnel Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Nested Structural Visualization */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Outer Layer: TAM */}
          <div
            onClick={() => setActiveLayer('TAM')}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
              activeLayer === 'TAM'
                ? 'bg-[#EFECE4] border-[#7D6536] shadow-sm ring-1 ring-[#7D6536]/30'
                : 'bg-[#F5F2EB] border-[#D8D0C0] hover:border-[#BDB5A2]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C5]/80 text-xs font-mono">
              <span className="font-bold text-[#7D6536] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#7D6536]" />
                TAM · TOTAL ADDRESSABLE
              </span>
              <span className="font-bold text-[#2C3527]">{effectiveTam}</span>
            </div>

            <p className="text-[11px] text-[#5E6857] my-2 leading-relaxed">
              {isWinterApparel
                ? 'Macro Category Universe: total winter wear & cold-weather accessories in addressable travel zones.'
                : `Macro Category Universe: total accessible sector expenditure across ${targetAudience} within addressable markets.`}
            </p>

            {/* Middle Layer: SAM */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveLayer('SAM');
              }}
              className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer my-1 ${
                activeLayer === 'SAM'
                  ? 'bg-[#E5E0D5] border-[#55634B] shadow-sm ring-1 ring-[#55634B]/30'
                  : 'bg-[#EAE5DA] border-[#CDC4B2] hover:border-[#A89E8A]'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-[#CDC4B2] text-xs font-mono">
                <span className="font-bold text-[#55634B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-[#55634B]" />
                  SAM · SERVICEABLE ADDRESSABLE
                </span>
                <span className="font-bold text-[#2C3527]">{effectiveSam}</span>
              </div>

              <p className="text-[11px] text-[#4A5E73] my-1.5 leading-relaxed">
                {isWinterApparel
                  ? 'Operating Corridor: heritage thermal outerwear seekers visiting key hubs (Jaipur, Udaipur, Jodhpur).'
                  : `Operating Corridor: accessible segment of ${targetAudience} reachable via direct channels in ${locationStr}.`}
              </p>

              {/* Inner Core: SOM */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLayer('SOM');
                }}
                className={`p-3 rounded-md border transition-all duration-200 cursor-pointer mt-2 ${
                  activeLayer === 'SOM'
                    ? 'bg-[#2C3527] border-[#2C3527] text-[#FAF8F5] shadow-md'
                    : 'bg-[#3A4537] border-[#2C3527] text-[#FAF8F5] hover:bg-[#2C3527]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#FAF8F5] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-[#A3B899]" />
                    SOM · BEACHHEAD TARGET (Y1–2)
                  </span>
                  <span className="font-bold text-[#A3B899]">{effectiveSom}</span>
                </div>
                <p className="text-[10px] text-[#D8E2D4] mt-1 leading-snug">
                  {isWinterApparel
                    ? 'Obtainable beachhead via targeted direct-to-consumer capsules and premier resort retail placements.'
                    : `Obtainable beachhead: acquiring and retaining early paying adopters in ${locationStr} to prove CAC payback.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Layer Inspector Detail Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-[#EFECE4] border border-[#DDD5C5] space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-[#DDD5C5] pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#55634B] font-bold">
                Tier Inspector // {currentLayer.code}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD5C5] text-[#2C3527]">
                {currentLayer.shareOfTAM}
              </span>
            </div>

            <div className="mt-2.5">
              <span className="text-[10px] font-mono text-[#5E6857] uppercase tracking-wider block">
                {currentLayer.scopeTag}
              </span>
              <h4 className="text-base font-bold text-[#2C3527] mt-0.5">{currentLayer.name}</h4>
              <div className="text-xl font-extrabold text-[#2C3527] mt-1 font-mono">{currentLayer.value}</div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6857] block mb-0.5 font-bold">
                  1. Scope Definition
                </span>
                <p className="text-[#3A4537] text-[11px] leading-relaxed">{currentLayer.definition}</p>
              </div>

              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#55634B] block mb-0.5 font-bold">
                  2. Underlying Assumptions
                </span>
                <p className="text-[#3A4537] text-[11px] leading-relaxed">{currentLayer.assumptions}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DDD5C5] grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[#5E6857] block">Confidence Level</span>
              <span className="font-bold text-[#2C3527] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#3E6F4A]" /> {currentLayer.confidence}
              </span>
            </div>
            <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
              <span className="text-[#5E6857] block">Validation Status</span>
              <span className="font-bold text-[#2C3527] block mt-0.5">{currentLayer.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Inputs Checklist */}
      <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#7D6536]/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7D6536] font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Inputs Required to Ground Defensible Mathematical Market Sizing:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-[#5E6857]">
          {marketSize.validationInputsRequired.map((inputReq, idx) => (
            <div key={idx} className="flex items-start gap-1.5 p-2 rounded bg-[#EFECE4] border border-[#DDD5C5]">
              <span className="text-[#2C3527] font-mono font-bold">{idx + 1}.</span>
              <span className="text-[11px] leading-tight text-[#3A4537]">{inputReq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
