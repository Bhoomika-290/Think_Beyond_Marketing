import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { PRODUCT_TYPES } from '../../types/project';

// Compact live investigation board for the left interviewer column.
// Read-only: every row derives from existing project state, unknowns render
// honestly as "Not yet defined" — never invented.
export const VentureSignalBoard: React.FC = () => {
  const { state } = useProject();
  const { idea, businessModel } = state;

  const productLabel =
    PRODUCT_TYPES.find((t) => t.id === businessModel.productType)?.label ?? null;
  const geo = [businessModel.location.cityRegion, businessModel.location.country]
    .filter(Boolean)
    .join(', ');
  const modelBits = [
    businessModel.customerType ? businessModel.customerType.toUpperCase() : null,
    businessModel.deliveryModel ? `${businessModel.deliveryModel} presence` : null,
  ].filter(Boolean);

  const hasRaw = Boolean(idea.rawInput && idea.rawInput.trim().length > 3);
  const rawPreview = hasRaw
    ? idea.rawInput.slice(0, 28).trim() + (idea.rawInput.length > 28 ? '...' : '')
    : 'Listening…';

  const rows: {
    label: string;
    value: string;
    known: boolean;
    accent: string;
    status: 'CONFIRMED' | 'COUNCIL PROPOSAL' | 'NEEDS VALIDATION';
  }[] = [
    {
      label: 'IDEA SIGNAL',
      value: rawPreview,
      known: hasRaw,
      accent: '#486581',
      status: hasRaw ? 'CONFIRMED' : 'NEEDS VALIDATION',
    },
    {
      label: 'CUSTOMER',
      value: idea.targetAudience.trim() || 'Not yet defined',
      known: Boolean(idea.targetAudience.trim()),
      accent: '#4F8064',
      status: idea.targetAudience.trim() ? 'CONFIRMED' : 'NEEDS VALIDATION',
    },
    {
      label: 'PRODUCT TYPE',
      value: productLabel ?? 'Assessing...',
      known: Boolean(businessModel.productType),
      accent: '#76658F',
      status: businessModel.productType ? 'CONFIRMED' : 'COUNCIL PROPOSAL',
    },
    {
      label: 'GEOGRAPHY',
      value: geo || 'Not yet defined',
      known: geo.length > 0,
      accent: '#A87932',
      status: geo.length > 0 ? 'CONFIRMED' : 'NEEDS VALIDATION',
    },
    {
      label: 'MODEL',
      value: modelBits.length > 0 ? modelBits.join(' · ') : 'Assessing...',
      known: modelBits.length > 0,
      accent: '#A96555',
      status: modelBits.length > 0 ? 'COUNCIL PROPOSAL' : 'NEEDS VALIDATION',
    },
    {
      label: 'OPEN QUESTIONS',
      value: `${idea.openQuestions.length} recorded`,
      known: idea.openQuestions.length > 0,
      accent: '#62748A',
      status: 'NEEDS VALIDATION',
    },
  ];

  const journey: { label: string; state: 'identified' | 'partial' | 'downstream' }[] = [
    { label: 'RAW IDEA', state: idea.rawInput.trim() ? 'identified' : 'partial' },
    { label: 'PRODUCT', state: businessModel.productType ? 'identified' : 'partial' },
    { label: 'CUSTOMER', state: idea.targetAudience || businessModel.customerType ? 'identified' : 'partial' },
    { label: 'PROBLEM', state: idea.problem ? 'identified' : 'partial' },
    { label: 'MODEL', state: modelBits.length > 0 ? 'identified' : 'partial' },
    { label: 'MARKET', state: 'downstream' },
    { label: 'POSITIONING', state: 'downstream' },
  ];

  return (
    <div className="bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl overflow-hidden shadow-intel-card">
      <div className="px-4 py-2.5 bg-[#ECE6DA] border-b border-[#DDD5C5] flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#2B3D4F] font-semibold">
          Intelligence Snapshot
        </span>
        <span className="text-[10px] font-mono text-[#6B7D90]">Live · session state</span>
      </div>

      <div className="p-4 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B7D90] flex items-center gap-1.5 shrink-0">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: row.known ? row.accent : '#DDD5C5' }}
              />
              {row.label}
            </span>
            <span
              className={`font-medium text-right truncate ${row.known ? 'text-[#2B3D4F]' : 'text-[#6B7D90] italic'}`}
              title={`${row.value} — ${row.status}`}
            >
              {row.value}
            </span>
            <span
              className={`text-[8px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                row.status === 'CONFIRMED'
                  ? 'text-[#4A7C59] bg-[#4A7C59]/10 border-[#4A7C59]/30'
                  : row.status === 'COUNCIL PROPOSAL'
                    ? 'text-[#76658F] bg-[#76658F]/10 border-[#76658F]/30'
                    : 'text-[#8A6D2B] bg-[#8A6D2B]/10 border-[#8A6D2B]/30'
              }`}
              title={
                row.status === 'CONFIRMED'
                  ? 'Grounded in direct founder input'
                  : row.status === 'COUNCIL PROPOSAL'
                    ? 'Derived strategic proposal by AI Council'
                    : 'Requires validation or further input'
              }
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3.5">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1" aria-label="Discovery journey">
          {journey.map((node, idx) => (
            <React.Fragment key={node.label}>
              <div className="flex flex-col items-center gap-1 shrink-0" title={node.label}>
                <span
                  className={`w-2.5 h-2.5 rounded-full border ${
                    node.state === 'identified'
                      ? 'bg-[#4A7C59] border-[#4A7C59]'
                      : node.state === 'partial'
                        ? 'bg-[#F5F1EB] border-[#C4B8A0]'
                        : 'bg-transparent border-[#DDD5C5] border-dashed'
                  }`}
                />
                <span className="text-[8px] font-mono text-[#6B7D90] whitespace-nowrap">
                  {node.label}
                </span>
              </div>
              {idx < journey.length - 1 && (
                <span className="text-[#C4B8A0] text-[10px] shrink-0 -mt-4">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-[10px] text-[#6B7D90] mt-1">
          MARKET and POSITIONING unlock in later stages — nothing fabricated here.
        </p>
      </div>
    </div>
  );
};
