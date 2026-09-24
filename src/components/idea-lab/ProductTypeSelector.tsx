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

          return (
            <button
              key={typeOption.id}
              type="button"
              onClick={() => setProductType(typeOption.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[rgba(77,141,255,0.12)] border-[#4D8DFF] shadow-sm ring-1 ring-[#4D8DFF]/50'
                  : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] hover:border-[#34445A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#151E2B] text-[#738095] group-hover:text-[#F3F4F6]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] shrink-0" />
                  )}
                </div>

                <div className="text-sm font-semibold text-[#F3F4F6] tracking-tight">
                  {typeOption.label}
                </div>
                <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
                  {typeOption.tagline}
                </p>
              </div>

              {/* Downstream workflow preview */}
              <div className="mt-3 pt-2.5 border-t border-[#263244]">
                <div className="text-[10px] font-mono uppercase text-[#738095] mb-1">
                  Downstream Focus
                </div>
                <div className="flex flex-wrap gap-1">
                  {typeOption.downstreamFocus.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#151E2B] text-[#AAB4C3] border border-[#263244]"
                    >
                      {item}
                    </span>
                  ))}
                  {typeOption.downstreamFocus.length > 3 && (
                    <span className="text-[10px] font-mono text-[#738095] px-1 py-0.5">
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
