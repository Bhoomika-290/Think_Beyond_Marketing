import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Phone, 
  CheckCircle2, 
  Compass, 
  Building2, 
  Truck, 
  Store, 
  Wrench, 
  Boxes, 
  Navigation,
  AlertCircle
} from 'lucide-react';
import type { 
  ExecutionReport, 
  ExecutionResourceItem, 
  LocationPinRole 
} from '../../types/project';

interface NearbyResourcesMapViewProps {
  report: ExecutionReport;
  onSelectResource?: (resource: ExecutionResourceItem) => void;
}

export const NearbyResourcesMapView: React.FC<NearbyResourcesMapViewProps> = ({ 
  report,
  onSelectResource
}) => {
  const { synthesis, location } = report;
  const items = synthesis.procurementMap.items;

  // Filter only items with coordinates or local relevance
  const nearbyItems = useMemo(() => {
    return items.filter(item => item.isLocalToVenture || item.mapCoordinates);
  }, [items]);

  const [activeRoleFilter, setActiveRoleFilter] = useState<'all' | LocationPinRole>('all');
  const [selectedItemId, setSelectedItemId] = useState<string>(nearbyItems[0]?.id || items[0]?.id || '');

  const filteredItems = useMemo(() => {
    if (activeRoleFilter === 'all') return nearbyItems;
    return nearbyItems.filter(item => item.roleType === activeRoleFilter);
  }, [nearbyItems, activeRoleFilter]);

  const selectedItem = useMemo(() => {
    return items.find(i => i.id === selectedItemId) || filteredItems[0] || items[0];
  }, [items, selectedItemId, filteredItems]);

  const handleOpenMap = (item: ExecutionResourceItem) => {
    const q = encodeURIComponent(`${item.name} ${item.address || item.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = (item: ExecutionResourceItem) => {
    if (item.phone && item.phone !== 'Not verified' && !item.phone.toLowerCase().includes('unavailable')) {
      window.location.href = `tel:${item.phone.replace(/[^0-9+]/g, '')}`;
    } else {
      alert(`Direct telephone contact for "${item.name}" is unlisted in the public registry. Direct portal enquiry required.`);
    }
  };

  const getRoleIcon = (role?: LocationPinRole) => {
    switch (role) {
      case 'supplier': return Boxes;
      case 'manufacturer': return Building2;
      case 'distributor': return Truck;
      case 'retailer': return Store;
      case 'service_provider': return Wrench;
      default: return MapPin;
    }
  };

  const getRoleColor = (role?: LocationPinRole) => {
    switch (role) {
      case 'supplier': return { bg: 'bg-[#EFF6FF]', text: 'text-[#1E40AF]', border: 'border-[#BFDBFE]', dot: '#2563EB' };
      case 'manufacturer': return { bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]', border: 'border-[#A7F3D0]', dot: '#059669' };
      case 'distributor': return { bg: 'bg-[#FFFBEB]', text: 'text-[#D97706]', border: 'border-[#FDE68A]', dot: '#D97706' };
      case 'retailer': return { bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]', dot: '#16A34A' };
      case 'service_provider': return { bg: 'bg-[#F5F3FF]', text: 'text-[#7C3AED]', border: 'border-[#DDD6FE]', dot: '#7C3AED' };
      default: return { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]', border: 'border-[#CBD5E1]', dot: '#64748B' };
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E293B] font-mono">
              Nearby / Relevant Resource Intelligence
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              {location.cityRegion ? `${location.cityRegion} Cluster` : location.country}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Grounded local facilities & partners within operating reach of <strong className="text-[#1E293B]">{location.operatingLocation}</strong>. Zero fabricated contacts.
          </p>
        </div>

        {/* Role Type Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveRoleFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-colors ${
              activeRoleFilter === 'all'
                ? 'bg-[#1E40AF] text-white'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#E5DFD5]'
            }`}
          >
            All Pins ({nearbyItems.length})
          </button>
          {(['supplier', 'manufacturer', 'distributor', 'retailer', 'service_provider'] as LocationPinRole[]).map(role => {
            const count = nearbyItems.filter(i => i.roleType === role).length;
            if (count === 0) return null;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRoleFilter(role)}
                className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium capitalize transition-colors flex items-center gap-1 ${
                  activeRoleFilter === role
                    ? 'bg-[#1E40AF] text-white'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#E5DFD5]'
                }`}
              >
                <span>📍</span>
                <span>{role.replace('_', ' ')}</span>
                <span className="opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Selected Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive Cluster Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Canvas Header & Cluster Tags */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#E5DFD5] shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span className="text-[11px] font-mono font-semibold text-[#1E293B]">
                {location.cityRegion || location.country} Regional Production Grid
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] bg-[#FFFFFF]/90 px-2 py-0.5 rounded border border-[#E5DFD5]">
              Real-time Geocoded Indices
            </span>
          </div>

          {/* SVG Map Grid Background with Radar Rings */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3,3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Radar Rings */}
              <circle cx="50%" cy="50%" r="90" fill="none" stroke="#94A3B8" strokeWidth="0.8" opacity="0.5" />
              <circle cx="50%" cy="50%" r="150" fill="none" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.3" />
              {/* Central Crosshair */}
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CBD5E1" strokeWidth="0.8" opacity="0.4" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#CBD5E1" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>

          {/* Center Hub Marker (Operating Location) */}
          <div 
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="w-4 h-4 rounded-full bg-[#1E40AF] ring-4 ring-[#1E40AF]/20 flex items-center justify-center text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </div>
            <span className="text-[9px] font-mono font-bold bg-[#1E293B] text-white px-1.5 py-0.5 rounded shadow-xs mt-1 whitespace-nowrap">
              HQ: {location.cityRegion || location.country}
            </span>
          </div>

          {/* Plotted Resource Pins */}
          <div className="relative z-10 w-full h-[240px] my-auto">
            {filteredItems.map((item, idx) => {
              const coords = item.mapCoordinates || { 
                x: 20 + ((idx * 17) % 65), 
                y: 20 + ((idx * 23) % 65) 
              };
              const isSelected = selectedItem?.id === item.id;
              const roleColors = getRoleColor(item.roleType);
              const RoleIcon = getRoleIcon(item.roleType);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedItemId(item.id);
                    if (onSelectResource) onSelectResource(item);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-20'
                  }`}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  title={`${item.name} (${item.proximityDistance || item.location})`}
                >
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-all ${
                      isSelected 
                        ? 'bg-[#1E40AF] text-white ring-4 ring-[#BFDBFE]' 
                        : `${roleColors.bg} ${roleColors.text} border ${roleColors.border}`
                    }`}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                  </div>
                  <span 
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded shadow-2xs mt-0.5 whitespace-nowrap max-w-[130px] truncate transition-colors ${
                      isSelected
                        ? 'bg-[#1E40AF] text-white font-bold'
                        : 'bg-[#FFFFFF] text-[#1E293B] border border-[#E5DFD5]'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Canvas Bottom Legend */}
          <div className="flex flex-wrap items-center gap-3 z-10 pt-2 border-t border-[#E8E2D8] bg-[#FFFFFF]/80 backdrop-blur-xs p-2 rounded-lg">
            <span className="text-[10px] font-mono text-[#64748B] font-semibold uppercase">Pins:</span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#1E40AF]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> Supplier
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#065F46]">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span> Manufacturer
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#D97706]">
              <span className="w-2 h-2 rounded-full bg-[#D97706]"></span> Distributor
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span> Retailer
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#7C3AED]">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Service Provider
            </div>
          </div>
        </div>

        {/* Selected Pin Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          {selectedItem ? (
            <div className="space-y-3.5">
              {/* Badge & Role Type */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E8E2D8]">
                <span className="text-[10px] font-mono uppercase font-bold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                  📍 {selectedItem.roleType?.replace('_', ' ') || selectedItem.category.replace('_', ' ')}
                </span>
                {selectedItem.verificationStatus === 'VERIFIED_OFFICIAL' ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#BBF7D0]">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED REGISTRY
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                    TRADE DIRECTORY
                  </span>
                )}
              </div>

              {/* Business Name */}
              <div>
                <h3 className="text-sm font-bold text-[#1E293B] leading-tight">
                  {selectedItem.name}
                </h3>
                <div className="text-[11px] font-medium text-[#1E40AF] mt-0.5 flex items-center gap-1 font-mono">
                  <Navigation className="w-3 h-3 shrink-0" />
                  <span>{selectedItem.proximityDistance || 'Within Operating District'}</span>
                </div>
              </div>

              {/* What They Provide */}
              <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DFD5]">
                <div className="text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                  What They Provide
                </div>
                <div className="text-xs text-[#334155] font-medium mt-1 leading-snug">
                  {selectedItem.purpose}
                </div>
                <div className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                  {selectedItem.specification}
                </div>
              </div>

              {/* Verified Contact Details Grid */}
              <div className="space-y-2 text-xs">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block">Physical Address</span>
                    <span className="text-[#1E293B] font-medium text-[11px]">
                      {selectedItem.address || selectedItem.location || 'Direct industrial zone registry'}
                    </span>
                  </div>
                </div>

                {/* Phone / Contact */}
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#64748B] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block">Phone / Public Registry</span>
                    <span className="text-[#1E293B] font-mono text-[11px]">
                      {selectedItem.phone && selectedItem.phone !== 'Not verified' && !selectedItem.phone.toLowerCase().includes('unavailable')
                        ? selectedItem.phone
                        : 'Data unavailable / verification required'}
                    </span>
                  </div>
                </div>

                {/* Source Evidence */}
                <div className="bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0] text-[10px] font-mono text-[#475569]">
                  <strong className="text-[#1E293B]">Verification Source:</strong> {selectedItem.sourceEvidence}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenMap(selectedItem)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F1F5F9] border border-[#E5DFD5] text-[#1E293B] text-xs font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#1E40AF]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#64748B]" />
                </button>

                {selectedItem.website && (
                  <a
                    href={selectedItem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleCall(selectedItem)}
                  className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F1F5F9] border border-[#E5DFD5] text-[#1E293B] transition-colors"
                  title="Call contact"
                >
                  <Phone className="w-3.5 h-3.5 text-[#065F46]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#64748B]">
              <AlertCircle className="w-6 h-6 text-[#94A3B8] mx-auto mb-2" />
              Select a pin on the regional map to view verified contact & location intelligence.
            </div>
          )}
        </div>
      </div>

      {/* Compact Location Resource Table */}
      <div className="overflow-x-auto border border-[#E5DFD5] rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#E5DFD5] text-[10px] font-mono uppercase text-[#64748B]">
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Real Business Name</th>
              <th className="py-2.5 px-3">What They Provide</th>
              <th className="py-2.5 px-3">Locality / Proximity</th>
              <th className="py-2.5 px-3">Phone / Contact</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E2D8]">
            {filteredItems.map(item => {
              const isSelected = selectedItem?.id === item.id;
              const RoleIcon = getRoleIcon(item.roleType);
              const roleColors = getRoleColor(item.roleType);

              return (
                <tr 
                  key={item.id} 
                  className={`hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#EFF6FF]/40' : ''
                  }`}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border capitalize ${roleColors.bg} ${roleColors.text} ${roleColors.border}`}>
                      <RoleIcon className="w-3 h-3" />
                      {item.roleType?.replace('_', ' ') || 'Partner'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#1E293B]">
                    <div className="flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.verificationStatus === 'VERIFIED_OFFICIAL' && (
                        <span title="Verified Registry">
                          <CheckCircle2 className="w-3 h-3 text-[#15803D] shrink-0" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[#475569] max-w-[240px] truncate" title={item.purpose}>
                    {item.purpose}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#1E40AF] whitespace-nowrap">
                    {item.proximityDistance || item.location}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                    {item.phone && item.phone !== 'Not verified' && !item.phone.toLowerCase().includes('unavailable')
                      ? item.phone
                      : 'Data unavailable / verification required'}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemId(item.id);
                        handleOpenMap(item);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-[#1E40AF] hover:underline font-semibold"
                    >
                      <MapPin className="w-3 h-3" />
                      Map
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
