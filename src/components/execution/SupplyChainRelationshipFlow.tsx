import React from 'react';
import { 
  Boxes, 
  Factory, 
  ShieldCheck, 
  Truck, 
  Store, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import type { ExecutionReport } from '../../types/project';

interface SupplyChainRelationshipFlowProps {
  report: ExecutionReport;
}

export const SupplyChainRelationshipFlow: React.FC<SupplyChainRelationshipFlowProps> = ({ report }) => {
  const { synthesis, location } = report;
  const items = synthesis.procurementMap.items;

  // Find representative nodes from items
  const supplierItem = items.find(i => i.roleType === 'supplier' || i.category === 'raw_materials') || items[0];
  const manufacturerItem = items.find(i => i.roleType === 'manufacturer' || i.category === 'manufacturing') || items[1] || items[0];
  const packagingItem = items.find(i => i.category === 'packaging' || i.category === 'quality_testing') || items[2] || items[0];
  const distributorItem = items.find(i => i.roleType === 'distributor' || i.category === 'logistics') || items[3] || items[0];
  const retailerItem = items.find(i => i.roleType === 'retailer' || i.category === 'retail') || items[4] || items[0];

  const steps = [
    {
      id: 'step_supplier',
      stepNum: '01',
      role: 'SUPPLIER',
      roleBadge: 'Raw Material Feedstock',
      icon: Boxes,
      iconColor: 'text-[#1E40AF]',
      iconBg: 'bg-[#EFF6FF]',
      borderActive: 'border-[#BFDBFE]',
      entityName: supplierItem?.name || 'Primary Certified Raw Material Mandi / Co-op',
      location: supplierItem?.location || location.operatingLocation,
      distance: supplierItem?.proximityDistance || 'Regional Feedstock Hub',
      leadTime: supplierItem?.leadTimeWeeks ? `${supplierItem.leadTimeWeeks}w lead` : '2w lead',
      deliverable: supplierItem?.specification || 'Certified grade raw materials & batch certificate',
      verified: supplierItem?.verificationStatus === 'VERIFIED_OFFICIAL',
      connectorLabel: 'Inbound Transit',
    },
    {
      id: 'step_manufacturer',
      stepNum: '02',
      role: 'MANUFACTURER',
      roleBadge: 'Batch Production Run',
      icon: Factory,
      iconColor: 'text-[#065F46]',
      iconBg: 'bg-[#ECFDF5]',
      borderActive: 'border-[#A7F3D0]',
      entityName: manufacturerItem?.name || 'Contract Manufacturing Cluster',
      location: manufacturerItem?.location || location.operatingLocation,
      distance: manufacturerItem?.proximityDistance || 'District Industrial Zone',
      leadTime: manufacturerItem?.leadTimeWeeks ? `${manufacturerItem.leadTimeWeeks}w lead` : '3w lead',
      deliverable: manufacturerItem?.specification || 'Pilot run tolerance validation & finished units',
      verified: manufacturerItem?.verificationStatus === 'VERIFIED_OFFICIAL',
      connectorLabel: 'Sampling & QA Run',
    },
    {
      id: 'step_packaging_qa',
      stepNum: '03',
      role: 'PACKAGING & QA',
      roleBadge: 'Testing & Preservation',
      icon: ShieldCheck,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-[#F5F3FF]',
      borderActive: 'border-[#DDD6FE]',
      entityName: packagingItem?.name || 'Packaging & Accredited QA Lab',
      location: packagingItem?.location || location.operatingLocation,
      distance: packagingItem?.proximityDistance || 'Packaging & Lab Hub',
      leadTime: packagingItem?.leadTimeWeeks ? `${packagingItem.leadTimeWeeks}w lead` : '1w lead',
      deliverable: packagingItem?.specification || 'Barrier packaging, barcoding & lab compliance stamp',
      verified: packagingItem?.verificationStatus === 'VERIFIED_OFFICIAL',
      connectorLabel: 'Consolidation',
    },
    {
      id: 'step_distributor',
      stepNum: '04',
      role: 'DISTRIBUTOR',
      roleBadge: 'Freight & Warehouse Hub',
      icon: Truck,
      iconColor: 'text-[#D97706]',
      iconBg: 'bg-[#FFFBEB]',
      borderActive: 'border-[#FDE68A]',
      entityName: distributorItem?.name || 'Express Logistics Hub / 3PL Center',
      location: distributorItem?.location || location.operatingLocation,
      distance: distributorItem?.proximityDistance || 'Regional Transit Terminal',
      leadTime: distributorItem?.leadTimeWeeks ? `${distributorItem.leadTimeWeeks}w SLA` : '48h dispatch',
      deliverable: distributorItem?.specification || 'Climate warehouse staging & multi-carrier air routing',
      verified: distributorItem?.verificationStatus === 'VERIFIED_OFFICIAL',
      connectorLabel: 'Route to Market',
    },
    {
      id: 'step_retailer',
      stepNum: '05',
      role: 'RETAIL / CUSTOMER',
      roleBadge: 'Point of Sale / D2C',
      icon: Store,
      iconColor: 'text-[#0284C7]',
      iconBg: 'bg-[#F0F9FF]',
      borderActive: 'border-[#BAE6FD]',
      entityName: retailerItem?.name || 'Specialty Retail Guild / Brand Online Storefront',
      location: retailerItem?.location || location.operatingLocation,
      distance: retailerItem?.proximityDistance || 'Point of Sale Network',
      leadTime: retailerItem?.leadTimeWeeks ? `${retailerItem.leadTimeWeeks}w setup` : 'Immediate POS',
      deliverable: retailerItem?.specification || 'Retail shelf presence, unboxing experience & direct checkout',
      verified: retailerItem?.verificationStatus === 'VERIFIED_OFFICIAL',
      connectorLabel: 'Final Sale',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E293B] font-mono">
              Physical Supply Chain & Sourcing Relationship Flow
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              5-Node Interlock
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Operational handoff sequence from raw feedstock origin to finished customer handoff in {location.cityRegion || location.country}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>Verified Local Grounding</span>
        </div>
      </div>

      {/* Visual Horizontal Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div 
              key={step.id}
              className={`bg-[#FAF8F5] border ${step.borderActive} rounded-xl p-3.5 flex flex-col justify-between relative group hover:shadow-xs transition-all`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-1 pb-2 border-b border-[#E8E2D8]">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-md ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#1E40AF] block">
                        {step.stepNum} // {step.role}
                      </span>
                    </div>
                  </div>
                  {step.verified ? (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#BBF7D0]" title="Verified Official Entity">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      VERIFIED
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-[#B45309] bg-[#FEF3C7] px-1 py-0.5 rounded border border-[#FDE68A]">
                      DIRECTORY
                    </span>
                  )}
                </div>

                {/* Entity Name */}
                <h3 className="text-xs font-bold text-[#1E293B] mt-2.5 leading-snug line-clamp-2">
                  {step.entityName}
                </h3>

                {/* Sub Role Badge */}
                <span className="inline-block text-[10px] text-[#475569] font-medium bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E5DFD5] mt-1.5">
                  {step.roleBadge}
                </span>

                {/* Deliverable Pill */}
                <div className="mt-2.5 bg-[#FFFFFF] p-2 rounded-lg border border-[#E5DFD5]">
                  <div className="text-[9px] font-mono uppercase text-[#64748B] tracking-wider">
                    Handoff Requirement
                  </div>
                  <div className="text-[11px] text-[#334155] font-medium mt-0.5 line-clamp-2">
                    {step.deliverable}
                  </div>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="mt-3 pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <div className="flex items-center gap-1 truncate" title={step.distance}>
                  <MapPin className="w-3 h-3 text-[#1E40AF] shrink-0" />
                  <span className="truncate">{step.distance}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[#1E293B] font-semibold">
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span>{step.leadTime}</span>
                </div>
              </div>

              {/* Desktop Arrow Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/3 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#CBD5E1] items-center justify-center text-[#64748B] shadow-xs">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
