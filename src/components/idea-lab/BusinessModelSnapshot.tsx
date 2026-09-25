import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { PRODUCT_TYPES } from '../../types/project';

// Compact business-model flow: CUSTOMER → VALUE → PRODUCT → DISTRIBUTION →
// REVENUE. Read-only; unknown nodes render "Not yet defined" honestly.
export const BusinessModelSnapshot: React.FC = () => {
  const { state } = useProject();
  const { idea, businessModel } = state;

  const productLabel =
    PRODUCT_TYPES.find((t) => t.id === businessModel.productType)?.label ?? null;
  const geo = [businessModel.location.cityRegion, businessModel.location.country]
    .filter(Boolean)
    .join(', ');
  const distribution = [
    businessModel.deliveryModel ? `${businessModel.deliveryModel} presence` : null,
    geo || null,
  ]
    .filter(Boolean)
    .join(' · ');

  const nodes: { label: string; value: string; known: boolean }[] = [
    {
      label: 'CUSTOMER',
      value: idea.targetAudience || (businessModel.customerType ? businessModel.customerType.toUpperCase() : 'Not yet defined'),
      known: Boolean(idea.targetAudience || businessModel.customerType),
    },
    {
      label: 'VALUE PROPOSITION',
      value: idea.differentiation || idea.problem || 'Not yet defined',
      known: Boolean(idea.differentiation || idea.problem),
    },
    {
      label: 'PRODUCT / SERVICE',
      value: productLabel ?? 'Not yet defined',
      known: productLabel !== null,
    },
    {
      label: 'DISTRIBUTION',
      value: distribution || 'Not yet defined',
      known: distribution.length > 0,
    },
    {
      label: 'REVENUE',
      value: idea.context || 'Not yet defined',
      known: idea.context.trim().length > 0,
    },
  ];

  return (
    <div className="bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl overflow-hidden shadow-intel-card">
      <div className="px-5 py-3.5 border-b border-[#DDD5C5]">
        <h3 className="text-sm font-semibold text-[#2B3D4F] tracking-tight">
          Business Model Snapshot
        </h3>
        <p className="text-xs text-[#6B7D90] mt-0.5">
          How value flows from customer to revenue — grounded only in what you have provided.
        </p>
      </div>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
          {nodes.map((node, idx) => (
            <React.Fragment key={node.label}>
              <div
                className={`flex-1 p-3 rounded-lg border text-center flex flex-col justify-center ${
                  node.known ? 'bg-[#F5F1EB] border-[#2B3D4F]/25' : 'bg-[#F5F1EB]/60 border-dashed border-[#DDD5C5]'
                }`}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#6B7D90]">
                  {node.label}
                </span>
                <span
                  className={`text-xs font-semibold mt-1 leading-snug line-clamp-3 ${
                    node.known ? 'text-[#2B3D4F]' : 'text-[#6B7D90] italic font-normal'
                  }`}
                  title={node.value}
                >
                  {node.value}
                </span>
              </div>
              {idx < nodes.length - 1 && (
                <span className="self-center text-[#C4B8A0] text-sm shrink-0 rotate-90 sm:rotate-0" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
