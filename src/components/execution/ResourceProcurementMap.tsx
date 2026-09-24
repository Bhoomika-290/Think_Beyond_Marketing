import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  LayoutGrid, 
  Table as TableIcon 
} from 'lucide-react';

import type { 
  ExecutionReport, 
  ExecutionResourceItem, 
  ExecutionSpecialistMessage 
} from '../../types/project';
import { ContextualIntelligenceModal } from './ContextualIntelligenceModal';

interface ResourceProcurementMapProps {
  report: ExecutionReport;
  onToggleSave: (resourceId: string) => void;
  onAddToPlan: (resourceId: string) => void;
  messages: ExecutionSpecialistMessage[];
  onSendQuery: (query: string, resourceId?: string) => void;
}

export const ResourceProcurementMap: React.FC<ResourceProcurementMapProps> = ({
  report,
  onToggleSave,
  onAddToPlan,
  messages,
  onSendQuery,
}) => {
  const { synthesis, modality, location } = report;
  const items = synthesis.procurementMap.items;
  const isPhysical = modality === 'physical' || modality === 'hybrid';

  const [activeFilter, setActiveFilter] = useState<'all' | 'day1' | 'local'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [expandedResourceId, setExpandedResourceId] = useState<string | null>(null);
  const [auditTargetResource, setAuditTargetResource] = useState<ExecutionResourceItem | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => set.add(item.categoryLabel));
    return Array.from(set);
  }, [items]);

  // Filtered resources
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter tab
      if (activeFilter === 'day1' && item.priority !== 'DAY_1_CRITICAL') return false;
      if (activeFilter === 'local' && !item.isLocalToVenture) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.categoryLabel !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.purpose.toLowerCase().includes(q) ||
          item.specification.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [items, activeFilter, selectedCategory, searchQuery]);

  const handleOpenMap = (item: ExecutionResourceItem) => {
    const q = encodeURIComponent(`${item.name} ${item.address || item.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = (item: ExecutionResourceItem) => {
    if (item.phone && item.phone !== 'Not verified' && item.phone !== 'Contact information unavailable') {
      window.location.href = `tel:${item.phone.replace(/[^0-9+]/g, '')}`;
    } else {
      alert(`Contact information for "${item.name}" is unverified in official registries. Direct portal enquiry required.`);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              {isPhysical ? 'Physical Procurement & Sourcing Map' : 'Software Infrastructure & Services Map'}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              {filteredItems.length} of {items.length} mapped
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            {isPhysical
              ? `Audited suppliers, contract manufacturers, packaging, and testing facilities in ${location.cityRegion || location.country}.`
              : `Production-grade cloud, database, auth, hosting, and API infrastructure tailored to your build specifications.`}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <div className="flex items-center bg-[#FAF8F5] border border-[#E5DFD5] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#FFFFFF] text-[#1E40AF] shadow-2xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#FFFFFF] text-[#1E40AF] shadow-2xs'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#1E293B] text-white'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#E5DFD5]'
            }`}
          >
            All Resources ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('day1')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'day1'
                ? 'bg-[#B91C1C] text-white'
                : 'bg-[#FAF8F5] text-[#B91C1C] hover:bg-[#FEF2F2] border border-[#FEE2E2]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Day 1 Critical ({synthesis.procurementMap.day1CriticalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('local')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'local'
                ? 'bg-[#15803D] text-white'
                : 'bg-[#FAF8F5] text-[#15803D] hover:bg-[#F0FDF4] border border-[#DCFCE7]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Local to Cluster ({synthesis.procurementMap.localResourceCount})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource or spec..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#FAF8F5] border border-[#E5DFD5] text-[#1E293B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#1E40AF]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-[#FAF8F5] border border-[#E5DFD5] text-[#334155] focus:outline-hidden focus:border-[#1E40AF]"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-lg border border-[#E8E2D8]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E8E2D8] text-[10px] font-mono uppercase text-[#64748B]">
              <tr>
                <th className="py-2.5 px-3">Resource & Category</th>
                <th className="py-2.5 px-3">Specification & Purpose</th>
                <th className="py-2.5 px-3">Location / Cluster</th>
                <th className="py-2.5 px-3">Verification & Contact</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8] bg-[#FFFFFF]">
              {filteredItems.map((item) => {
                const isExpanded = expandedResourceId === item.id;
                const isVerified = item.verificationStatus === 'VERIFIED_OFFICIAL';
                const isTrade = item.verificationStatus === 'TRADE_DIRECTORY';

                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      {/* Column 1: Resource & Category */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-start gap-2">
                          {item.priority === 'DAY_1_CRITICAL' && (
                            <span 
                              className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0 mt-1" 
                              title="Day 1 Launch Critical"
                            />
                          )}
                          <div>
                            <div className="font-bold text-[#1E293B]">
                              {item.name}
                            </div>
                            <span className="inline-block mt-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Specification & Purpose */}
                      <td className="py-3 px-3 align-top max-w-xs">
                        <div className="text-[#334155] font-medium leading-snug">
                          {item.purpose}
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                          {item.specification}
                        </div>
                      </td>

                      {/* Column 3: Location / Cluster */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-1 text-[#1E293B] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#1E40AF] shrink-0" />
                          <span>{item.location}</span>
                        </div>
                        {item.isLocalToVenture && (
                          <span className="inline-block mt-1 text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                            LOCAL CLUSTER
                          </span>
                        )}
                        <div className="text-[10px] font-mono text-[#64748B] mt-0.5">
                          Lead: ~{item.leadTimeWeeks}w
                        </div>
                      </td>

                      {/* Column 4: Verification & Contact */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                            isVerified
                              ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                              : isTrade
                              ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                              : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                          }`}>
                            <ShieldCheck className="w-3 h-3" />
                            {item.verificationStatus.replace(/_/g, ' ')}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="mt-1.5 space-y-0.5 text-[11px]">
                          {item.phone && item.phone !== 'Not verified' && !item.phone.toLowerCase().includes('unavailable') ? (
                            <div className="text-[#334155] font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#64748B]" />
                              <span>{item.phone}</span>
                            </div>
                          ) : (
                            <div className="text-[#94A3B8] italic font-mono text-[10px]">
                              Data unavailable / verification required
                            </div>
                          )}

                          {item.website ? (
                            <a
                              href={item.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1E40AF] hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <div className="text-[#94A3B8] italic text-[10px]">
                              Direct portal enquiry
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 5: Actions */}
                      <td className="py-3 px-3 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* Ask Intelligence */}
                          <button
                            type="button"
                            onClick={() => setAuditTargetResource(item)}
                            className="p-1.5 rounded-md text-[#1E40AF] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] transition-colors"
                            title="Contextual Intelligence Audit"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          {/* Map Pin */}
                          <button
                            type="button"
                            onClick={() => handleOpenMap(item)}
                            className="p-1.5 rounded-md text-[#475569] bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                            title="Open Google Maps"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </button>

                          {/* Call / Contact */}
                          {item.phone && item.phone !== 'Not verified' && (
                            <button
                              type="button"
                              onClick={() => handleCall(item)}
                              className="p-1.5 rounded-md text-[#065F46] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] transition-colors"
                              title="Call Provider"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Save Resource */}
                          <button
                            type="button"
                            onClick={() => onToggleSave(item.id)}
                            className={`p-1.5 rounded-md border transition-colors ${
                              item.isSaved
                                ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                                : 'bg-[#FFFFFF] text-[#64748B] hover:text-[#1E293B] border-[#E2E8F0]'
                            }`}
                            title={item.isSaved ? 'Remove from Saved' : 'Save Resource'}
                          >
                            {item.isSaved ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Add to Plan */}
                          <button
                            type="button"
                            onClick={() => onAddToPlan(item.id)}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-colors flex items-center gap-1 ${
                              item.addedToPlan
                                ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                                : 'bg-[#FFFFFF] text-[#334155] hover:bg-[#F8FAFC] border-[#CBD5E1]'
                            }`}
                          >
                            {item.addedToPlan ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-[#065F46]" />
                                <span>In Plan</span>
                              </>
                            ) : (
                              <>
                                <PlusCircle className="w-3 h-3 text-[#64748B]" />
                                <span>Add to Plan</span>
                              </>
                            )}
                          </button>

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedResourceId(isExpanded ? null : item.id)}
                            className="p-1.5 rounded-md text-[#64748B] hover:text-[#1E293B] bg-[#FAF8F5] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                            title="Expand Details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <tr className="bg-[#FDFBF7]">
                        <td colSpan={5} className="py-3 px-4 border-t border-[#E8E2D8]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="bg-[#FFFFFF] p-2.5 rounded-md border border-[#E8E2D8]">
                              <div className="text-[10px] font-mono uppercase text-[#64748B] font-bold">
                                Why Relevant to Venture
                              </div>
                              <p className="text-[#334155] mt-1 leading-relaxed">
                                {item.whyRelevant}
                              </p>
                            </div>

                            <div className="bg-[#FFFFFF] p-2.5 rounded-md border border-[#E8E2D8]">
                              <div className="text-[10px] font-mono uppercase text-[#64748B] font-bold">
                                Source Verification & Address
                              </div>
                              <p className="text-[#334155] mt-1 leading-relaxed">
                                <span className="font-semibold">Evidence:</span> {item.sourceEvidence}
                              </p>
                              {item.address && (
                                <p className="text-[#64748B] mt-1 text-[11px]">
                                  <span className="font-semibold text-[#334155]">Address:</span> {item.address}
                                </p>
                              )}
                            </div>

                            <div className="bg-[#FFFFFF] p-2.5 rounded-md border border-[#E8E2D8]">
                              <div className="text-[10px] font-mono uppercase text-[#64748B] font-bold">
                                Fallback Alternative & Budget
                              </div>
                              <p className="text-[#334155] mt-1 leading-relaxed">
                                <span className="font-semibold">Alternative:</span> {item.fallbackAlternative || 'Regional trade council directory'}
                              </p>
                              <p className="text-[#065F46] mt-1 font-mono text-[11px]">
                                <span className="font-semibold text-[#334155]">Est. Budget:</span> {item.estimatedBudgetRange || 'Order quantity dependent'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isVerified = item.verificationStatus === 'VERIFIED_OFFICIAL';
            const isTrade = item.verificationStatus === 'TRADE_DIRECTORY';

            return (
              <div
                key={item.id}
                className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4 flex flex-col justify-between hover:border-[#1E40AF]/40 transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E8E2D8]">
                    <div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-sm font-bold text-[#1E293B] mt-1.5">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.priority === 'DAY_1_CRITICAL' && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]">
                          CRITICAL
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#334155] mt-2 font-medium">
                    {item.purpose}
                  </p>

                  <div className="text-[11px] text-[#64748B] mt-1 bg-[#FFFFFF] p-2 rounded border border-[#E8E2D8]">
                    <span className="font-semibold text-[#334155]">Spec:</span> {item.specification}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-[#1E293B] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#1E40AF]" />
                      {item.location}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      Lead: ~{item.leadTimeWeeks}w
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isVerified
                        ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                        : isTrade
                        ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                        : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                    }`}>
                      {item.verificationStatus.replace(/_/g, ' ')}
                    </span>
                    {item.isLocalToVenture && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                        LOCAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAuditTargetResource(item)}
                      className="p-1.5 rounded-md text-[#1E40AF] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] transition-colors"
                      title="Contextual Intelligence Audit"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-[#475569] bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                        title="Open Official Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleOpenMap(item)}
                      className="p-1.5 rounded-md text-[#475569] bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
                      title="Open Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </button>
                    {item.phone && item.phone !== 'Not verified' && (
                      <button
                        type="button"
                        onClick={() => handleCall(item)}
                        className="p-1.5 rounded-md text-[#065F46] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] transition-colors"
                        title="Call Provider"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleSave(item.id)}
                      className={`p-1.5 rounded-md border transition-colors ${
                        item.isSaved
                          ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                          : 'bg-[#FFFFFF] text-[#64748B] hover:text-[#1E293B] border-[#E2E8F0]'
                      }`}
                      title={item.isSaved ? 'Remove from Saved' : 'Save Resource'}
                    >
                      {item.isSaved ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToPlan(item.id)}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-colors flex items-center gap-1 ${
                        item.addedToPlan
                          ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                          : 'bg-[#FFFFFF] text-[#334155] hover:bg-[#F8FAFC] border-[#CBD5E1]'
                      }`}
                    >
                      {item.addedToPlan ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#065F46]" />
                          <span>In Plan</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3 h-3 text-[#64748B]" />
                          <span>Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contextual Intelligence Audit Modal */}
      <ContextualIntelligenceModal
        resource={auditTargetResource}
        isOpen={Boolean(auditTargetResource)}
        onClose={() => setAuditTargetResource(null)}
        messages={messages}
        onSendQuery={onSendQuery}
      />
    </div>
  );
};
