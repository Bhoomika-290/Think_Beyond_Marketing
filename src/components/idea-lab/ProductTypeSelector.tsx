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

// Subtle per-category accent identity on a very light category wash.
// Accent is carried by the wash, icon chip, top rule, and selected state;
// the card body text stays dark navy. One coherent system, restrained saturation.
const TYPE_ACCENTS: Record<
  ProductType,
  { solid: string; softBg: string; softBorder: string; wash: string }
> = {
  physical: { solid: '#486581', softBg: 'rgba(72, 101, 129, 0.12)', softBorder: 'rgba(72, 101, 129, 0.45)', wash: '#E7EEF4' },
  saas: { solid: '#76658F', softBg: 'rgba(118, 101, 143, 0.12)', softBorder: 'rgba(118, 101, 143, 0.45)', wash: '#E8E3F0' },
  marketplace: { solid: '#A87932', softBg: 'rgba(168, 121, 50, 0.12)', softBorder: 'rgba(168, 121, 50, 0.45)', wash: '#F2E9D6' },
  service: { solid: '#A96555', softBg: 'rgba(169, 101, 85, 0.12)', softBorder: 'rgba(169, 101, 85, 0.45)', wash: '#EEDBD3' },
  community: { solid: '#4F8064', softBg: 'rgba(79, 128, 100, 0.12)', softBorder: 'rgba(79, 128, 100, 0.45)', wash: '#E5EEE7' },
  creator: { solid: '#96687F', softBg: 'rgba(150, 104, 127, 0.12)', softBorder: 'rgba(150, 104, 127, 0.45)', wash: '#EFE3E8' },
  other: { solid: '#62748A', softBg: 'rgba(98, 116, 138, 0.12)', softBorder: 'rgba(98, 116, 138, 0.45)', wash: '#EEE6D5' },
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
                  ? 'shadow-sm ring-1'
                  : 'hover:brightness-[0.985] border-[#DDD5C5] hover:border-[#C4B8A0]'
              }`}
              style={
                isSelected
                  ? { borderColor: accent.softBorder, backgroundColor: accent.softBg, ['--tw-ring-color' as string]: accent.softBorder }
                  : { backgroundColor: accent.wash, borderColor: '#DDD5C5' }
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
                        ? { backgroundColor: accent.solid, color: '#FDFCF8' }
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

                <div className="text-sm font-semibold text-[#2B3D4F] tracking-tight">
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
                <p className="text-xs text-[#4A5E73] mt-1 leading-relaxed">
                  {typeOption.tagline}
                </p>
              </div>

              {/* Downstream workflow preview */}
              <div className="mt-3 pt-2.5 border-t border-[#DDD5C5]">
                <div className="text-[10px] font-mono uppercase text-[#6B7D90] mb-1">
                  Downstream Focus
                </div>
                <div className="flex flex-wrap gap-1">
                  {typeOption.downstreamFocus.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                      style={
                        isSelected
                          ? { backgroundColor: '#FDFCF8', color: accent.solid, borderColor: accent.softBorder }
                          : { backgroundColor: accent.softBg, color: '#4A5E73', borderColor: '#DDD5C5' }
                      }
                    >
                      {item}
                    </span>
                  ))}
                  {typeOption.downstreamFocus.length > 3 && (
                    <span className="text-[10px] font-mono text-[#6B7D90] px-1 py-0.5">
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
