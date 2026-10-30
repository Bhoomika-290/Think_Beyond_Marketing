import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { PRODUCT_TYPES, type ProductType } from '../../types/project';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  Package,
  Code2,
  Store,
  Briefcase,
  Users2,
  Video,
  Layers,
  CheckCircle2,
} from 'lucide-react';

const TYPE_ICONS: Record<ProductType, React.ElementType> = {
  physical: Package,
  saas: Code2,
  marketplace: Store,
  service: Briefcase,
  community: Users2,
  creator: Video,
  other: Layers,
};

// Restrained pastel category accents inspired by the light SaaS reference.
// Subtle per-category accent identity on a very light wash; card body text stays deep navy.
const TYPE_ACCENTS: Record<
  ProductType,
  { solid: string; softBg: string; softBorder: string; wash: string }
> = {
  physical: { solid: '#2684F7', softBg: '#E8F2FF', softBorder: '#B9D7FB', wash: '#F5F9FE' },
  saas: { solid: '#9272DB', softBg: '#F2EDFF', softBorder: '#D8C9FA', wash: '#F9F7FE' },
  marketplace: { solid: '#F29A42', softBg: '#FFF3E7', softBorder: '#FCD6AF', wash: '#FEF9F4' },
  service: { solid: '#E46D68', softBg: '#FFF0EF', softBorder: '#F9C2C0', wash: '#FEF7F6' },
  community: { solid: '#19A875', softBg: '#E8F8F1', softBorder: '#A9E8CF', wash: '#F3FAF6' },
  creator: { solid: '#8B5CF6', softBg: '#F3E8FF', softBorder: '#DDC4FB', wash: '#FAF6FE' },
  other: { solid: '#60738F', softBg: '#EEF4FB', softBorder: '#C8D7E8', wash: '#F5F8FC' },
};

export const ProductTypeSelector: React.FC = () => {
  const { state, setProductType } = useProject();
  const selectedType = state.businessModel.productType;

  return (
    <Card
      title="Product & Venture Classification"
      subtitle="Select the primary vehicle you are building. This determines downstream architecture and supply chain requirements."
      badge={
        selectedType ? (
          <Badge variant="success">Classified</Badge>
        ) : (
          <Badge variant="warning">Required for Stage 02</Badge>
        )
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRODUCT_TYPES.map((typeOption) => {
          const isSelected = selectedType === typeOption.id;
          const Icon = TYPE_ICONS[typeOption.id];
          const accent = TYPE_ACCENTS[typeOption.id];

          return (
            <button
              key={typeOption.id}
              type="button"
              onClick={() => setProductType(typeOption.id)}
              aria-pressed={isSelected}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'shadow-xs ring-1'
                  : 'hover:brightness-[0.985] border-[#E2EAF4] hover:border-[#2684F7]/40'
              }`}
              style={
                isSelected
                  ? { borderColor: accent.softBorder, backgroundColor: accent.softBg, ['--tw-ring-color' as string]: accent.softBorder }
                  : { backgroundColor: accent.wash, borderColor: '#E2EAF4' }
              }
            >
              {/* Accent top rule */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: accent.solid, opacity: isSelected ? 1 : 0.45 }}
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={
                      isSelected
                        ? { backgroundColor: accent.solid, color: '#FFFFFF' }
                        : { backgroundColor: accent.softBg, color: accent.solid }
                    }
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: accent.solid }}
                    />
                  )}
                </div>

                <div className="text-sm font-semibold text-[#14213D] tracking-tight">
                  {typeOption.label}
                </div>
                {isSelected && (
                  <span
                    className="inline-block mt-1 text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: accent.softBg, color: accent.solid }}
                  >
                    Primary vehicle
                  </span>
                )}
                <p className="text-xs text-[#60738F] mt-1 leading-relaxed">
                  {typeOption.tagline}
                </p>
              </div>

              {/* Downstream workflow preview */}
              <div className="mt-3 pt-2.5 border-t border-[#E2EAF4]">
                <div className="text-[10px] font-mono uppercase text-[#8495AE] mb-1">
                  Downstream Focus
                </div>
                <div className="flex flex-wrap gap-1">
                  {typeOption.downstreamFocus.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                      style={
                        isSelected
                          ? { backgroundColor: '#FFFFFF', color: accent.solid, borderColor: accent.softBorder }
                          : { backgroundColor: accent.softBg, color: '#60738F', borderColor: '#E2EAF4' }
                      }
                    >
                      {item}
                    </span>
                  ))}
                  {typeOption.downstreamFocus.length > 3 && (
                    <span className="text-[10px] font-mono text-[#8495AE] px-1 py-0.5">
                      +{typeOption.downstreamFocus.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
