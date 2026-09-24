import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

import type { ExecutionReport, PremiumServiceOffering } from '../../types/project';

interface PremiumServicesSectionProps {
  report: ExecutionReport;
}

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
    <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              Assisted Execution & Specialized Services
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              Assisted Founder Desk
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Direct assisted execution with vetted industry operators. No simulated automated APIs where physical verification, specialized negotiation, or creative agency oversight is required.
          </p>
        </div>

        <div className="text-[11px] font-mono text-[#065F46] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#A7F3D0] self-start sm:self-center">
          Transparent Scope & Pricing
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((svc: PremiumServiceOffering) => {
          const isAvailable = svc.status === 'ASSISTED_EXECUTION_AVAILABLE';

          return (
            <div
              key={svc.id}
              className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 flex flex-col justify-between hover:border-[#1E40AF]/40 transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-1 pb-2 border-b border-[#E8E2D8]">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                    {svc.badge}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded ${
                      isAvailable
                        ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
                        : 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
                    }`}
                  >
                    {isAvailable ? 'AVAILABLE' : 'COMING SOON'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#1E293B] mt-2.5">
                  {svc.name}
                </h3>

                <p className="text-xs text-[#64748B] mt-1 leading-snug">
                  {svc.description}
                </p>

                {/* Scope */}
                <div className="mt-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-semibold mb-1">
                    Hands-On Scope
                  </div>
                  <ul className="space-y-1">
                    {svc.scope.map((item, idx) => (
                      <li key={idx} className="text-[11px] text-[#334155] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#1E40AF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="mt-3 pt-2 border-t border-[#E8E2D8]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-semibold mb-1">
                    Key Deliverables
                  </div>
                  <div className="text-[11px] text-[#475569] space-y-0.5">
                    {svc.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="truncate" title={del}>
                        • {del}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => handleOpenEnquiry(svc)}
                  className="w-full py-1.5 rounded-lg text-xs font-medium text-center bg-[#FAF8F5] hover:bg-[#EFF6FF] text-[#1E40AF] hover:text-[#1D4ED8] border border-[#E5DFD5] hover:border-[#BFDBFE] transition-colors"
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
          <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#1E40AF] font-bold">
                  Assisted Execution Request
                </span>
                <h3 className="text-base font-bold text-[#1E293B]">
                  {enquiryModalService.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnquiryModalService(null)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enquirySubmitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#065F46] flex items-center justify-center mx-auto border border-[#A7F3D0]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[#1E293B]">
                  Scope Request Logged
                </div>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  Your requirements for <span className="font-semibold text-[#1E293B]">{enquiryModalService.name}</span> have been attached to your project docket ({ventureName}). Our assisted execution desk reviews venture specs within 1 business day.
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
                  <span className="font-semibold text-[#334155]">Project:</span> {ventureName}
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">
                    Specific Operational Focus or Constraints
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryNotes}
                    onChange={(e) => setEnquiryNotes(e.target.value)}
                    placeholder="e.g. Need factory inspection in Jaipur within 14 days, target order of 500 units..."
                    className="w-full p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] text-[#1E293B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#1E40AF]"
                  />
                </div>

                <div className="text-[11px] text-[#64748B] bg-[#FAF8F5] p-2 rounded border border-[#E8E2D8]">
                  <span className="font-semibold text-[#334155]">Scope Overview:</span> {enquiryModalService.description}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    onClick={() => setEnquiryModalService(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#64748B] hover:bg-[#FAF8F5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#1E40AF] text-white text-xs font-medium hover:bg-[#1D4ED8]"
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
