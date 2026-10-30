import React, { useState } from 'react';
import { CheckCircle2, X, Search, BarChart3, MessageCircle, Users, Truck } from 'lucide-react';

import type { ExecutionReport, PremiumServiceOffering } from '../../types/project';

interface PremiumServicesSectionProps {
  report: ExecutionReport;
}

const CATEGORY_STYLES: Record<string, {
  icon: React.ReactNode;
  dot: string;
  border: string;
  badge: string;
}> = {
  sourcing_agent: {
    icon: <Truck className="w-4 h-4" />,
    dot: 'bg-[#F29A42]',
    border: 'border-t-2 border-[#F29A42]/30',
    badge: 'bg-[#FEF3C7] text-[#F29A42] border-[#F29A42]/30',
  },
  seo: {
    icon: <Search className="w-4 h-4" />,
    dot: 'bg-[#19A875]',
    border: 'border-t-2 border-[#19A875]/30',
    badge: 'bg-[#DCFCE7] text-[#19A875] border-[#19A875]/30',
  },
  meta_ads: {
    icon: <BarChart3 className="w-4 h-4" />,
    dot: 'bg-[#9272DB]',
    border: 'border-t-2 border-[#9272DB]/30',
    badge: 'bg-[#EDE9FE] text-[#9272DB] border-[#9272DB]/30',
  },
  crm: {
    icon: <Users className="w-4 h-4" />,
    dot: 'bg-[#06B6D4]',
    border: 'border-t-2 border-[#06B6D4]/30',
    badge: 'bg-[#CFFAFE] text-[#083344] border-[#06B6D4]/30',
  },
  analytics: {
    icon: <BarChart3 className="w-4 h-4" />,
    dot: 'bg-[#2684F7]',
    border: 'border-t-2 border-[#2684F7]/30',
    badge: 'bg-[#E0F2FE] text-[#0C2D47] border-[#2684F7]/30',
  },
  growth: {
    icon: <MessageCircle className="w-4 h-4" />,
    dot: 'bg-[#F97316]',
    border: 'border-t-2 border-[#F97316]/30',
    badge: 'bg-[#FFEDD5] text-[#F29A42] border-[#F97316]/30',
  },
};

const getCategoryStyle = (category: string) => {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.analytics;
};

export const PremiumServicesSection: React.FC<PremiumServicesSectionProps> = ({ report }) => {
  const { synthesis, ventureName } = report;
  const services = synthesis.premiumServices;

  const [enquiryModalService, setEnquiryModalService] = useState<PremiumServiceOffering | null>(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryNotes, setEnquiryNotes] = useState('');

  const handleOpenEnquiry = (svc: PremiumServiceOffering) => {
    setEnquiryModalService(svc);
    setEnquirySubmitted(false);
    setEnquiryNotes('');
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-base font-bold text-[#14213D] tracking-tight">
              Assisted Execution & Specialized Services
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FEF3C7] text-[#F29A42] border border-[#FDE68A]">
              Assisted Founder Desk
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1 max-w-2xl leading-relaxed">
            Direct assisted execution with vetted industry operators. No simulated automated APIs where physical verification, specialized negotiation, or creative agency oversight is required.
          </p>
        </div>

        <div className="text-[11px] font-mono text-[#19A875] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#A7F3D0] self-start sm:self-center">
          Transparent Scope & Pricing
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((svc: PremiumServiceOffering) => {
          const isAvailable = svc.status === 'ASSISTED_EXECUTION_AVAILABLE';
          const catStyle = getCategoryStyle(svc.category);

          return (
            <div
              key={svc.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all duration-200 shadow-xs ${catStyle.border} ${
                isAvailable
                  ? 'bg-[#FFFFFF] hover:shadow-md hover:-translate-y-0.5'
                  : 'bg-[#FFFFFF]/60 hover:bg-[#FFFFFF]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-1 pb-2.5 border-b border-[#E2EAF4]">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center ${catStyle.dot}/15 border ${catStyle.dot}/30 text-xs`}>
                      {catStyle.icon}
                    </span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${catStyle.badge}`}>
                      {svc.badge}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded ${
                      isAvailable
                        ? 'bg-[#DCFCE7] text-[#19A875] border border-[#BBF7D0]'
                        : 'bg-[#F1F5F9] text-[#8495AE] border border-[#14213D]'
                    }`}
                  >
                    {isAvailable ? 'AVAILABLE' : 'COMING SOON'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#14213D] mt-2.5">
                  {svc.name}
                </h3>

                <p className="text-xs text-[#8495AE] mt-1 leading-snug">
                  {svc.description}
                </p>

                {/* Scope */}
                <div className="mt-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8495AE] font-semibold mb-1">
                    Hands-On Scope
                  </div>
                  <ul className="space-y-1">
                    {svc.scope.map((item, idx) => (
                      <li key={idx} className="text-[11px] text-[#14213D] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#2684F7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="mt-3 pt-2 border-t border-[#E2EAF4]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8495AE] font-semibold mb-1">
                    Key Deliverables
                  </div>
                  <div className="text-[11px] text-[#60738F] space-y-0.5">
                    {svc.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="truncate" title={del}>
                        • {del}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[#E2EAF4]">
                <button
                  type="button"
                  onClick={() => handleOpenEnquiry(svc)}
                  className="w-full py-1.5 rounded-lg text-xs font-medium text-center bg-[#FFFFFF] hover:bg-[#EFF6FF] text-[#2684F7] hover:text-[#2684F7] border border-[#E2EAF4] hover:border-[#BFDBFE] transition-colors"
                >
                  {isAvailable ? 'Request Assisted Scope' : 'Join Waitlist'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enquiry Modal */}
      {enquiryModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EAF4]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2684F7] font-bold">
                  Assisted Execution Request
                </span>
                <h3 className="text-base font-bold text-[#14213D]">
                  {enquiryModalService.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnquiryModalService(null)}
                className="p-1 rounded-lg text-[#8495AE] hover:text-[#14213D] hover:bg-[#FFFFFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enquirySubmitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#19A875] flex items-center justify-center mx-auto border border-[#A7F3D0]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[#14213D]">
                  Scope Request Logged
                </div>
                <p className="text-xs text-[#8495AE] max-w-sm mx-auto">
                  Your requirements for <span className="font-semibold text-[#14213D]">{enquiryModalService.name}</span> have been attached to your project docket ({ventureName}). Our assisted execution desk reviews venture specs within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setEnquiryModalService(null)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-[#1E40AF] text-white text-xs font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-[#14213D]">Project:</span> {ventureName}
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8495AE] mb-1">
                    Specific Operational Focus or Constraints
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryNotes}
                    onChange={(e) => setEnquiryNotes(e.target.value)}
                    placeholder="e.g. Need factory inspection in Jaipur within 14 days, target order of 500 units..."
                    className="w-full p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] text-[#14213D] placeholder-[#8495AE] focus:outline-hidden focus:border-[#1E40AF]"
                  />
                </div>

                <div className="text-[11px] text-[#8495AE] bg-[#FFFFFF] p-2 rounded border border-[#E2EAF4]">
                  <span className="font-semibold text-[#14213D]">Scope Overview:</span> {enquiryModalService.description}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2EAF4]">
                  <button
                    type="button"
                    onClick={() => setEnquiryModalService(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8495AE] hover:bg-[#FFFFFF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#1E40AF] text-white text-xs font-medium hover:bg-[#1769D2]"
                  >
                    Confirm Scope Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
