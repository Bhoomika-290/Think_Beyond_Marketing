import React from 'react';
import { useProject } from '../../context/ProjectContext';
import type { DeliveryModel, CustomerType } from '../../types/project';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Badge } from '../common/Badge';
import { MapPin, Globe, Store, Laptop } from 'lucide-react';

export const LocationContext: React.FC = () => {
  const {
    state,
    setLocation,
    setDeliveryModel,
    setCustomerType,
  } = useProject();

  const { location, deliveryModel, customerType } = state.businessModel;

  const deliveryOptions: { id: DeliveryModel; label: string; icon: React.ElementType }[] = [
    { id: 'online', label: 'Online / Digital', icon: Laptop },
    { id: 'offline', label: 'Offline / Physical', icon: Store },
    { id: 'hybrid', label: 'Hybrid / Omnichannel', icon: Globe },
  ];

  const customerOptions: { id: CustomerType; label: string; sub: string }[] = [
    { id: 'b2c', label: 'B2C', sub: 'Direct to individual consumer' },
    { id: 'd2c', label: 'D2C', sub: 'Direct-to-consumer brand' },
    { id: 'b2b', label: 'B2B', sub: 'Enterprise & business clients' },
    { id: 'b2b2c', label: 'B2B2C', sub: 'Intermediary channel model' },
  ];

  return (
    <Card
      title="Geographic & Operational Footprint"
      subtitle="Establish operating boundaries and distribution channel dynamics. No fabricated local supplier data."
      badge={<Badge variant="outline">Context Vectors</Badge>}
    >
      <div className="space-y-6">
        {/* Geographic inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Country"
            placeholder="e.g. India, United States, Germany"
            value={location.country}
            onChange={(e) => setLocation({ country: e.target.value })}
            icon={<Globe className="w-4 h-4" />}
          />

          <Input
            label="City / State / Region"
            placeholder="e.g. Rajasthan, Jaipur, San Francisco"
            value={location.cityRegion}
            onChange={(e) => setLocation({ cityRegion: e.target.value })}
            icon={<MapPin className="w-4 h-4" />}
          />

          <Input
            label="Operating Scope / Radius"
            placeholder="e.g. Domestic pan-India, Global export"
            value={location.operatingLocation}
            onChange={(e) => setLocation({ operatingLocation: e.target.value })}
            helperText="Defines regulatory scope"
          />
        </div>

        {/* Operational / Delivery Model */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#AAB4C3] font-medium mb-2">
            Delivery & Presence Model
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {deliveryOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = deliveryModel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDeliveryModel(opt.id)}
                  className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-[rgba(77,141,255,0.12)] border-[#4D8DFF] text-[#F3F4F6] ring-1 ring-[#4D8DFF]/40'
                      : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] text-[#AAB4C3]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-[#151E2B] text-[#738095]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer Type */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#AAB4C3] font-medium mb-2">
            Primary Customer Archetype
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {customerOptions.map((opt) => {
              const isSelected = customerType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCustomerType(opt.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-[rgba(77,141,255,0.12)] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/40'
                      : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244]'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-[#F3F4F6]">
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-[#738095] mt-0.5 truncate">
                    {opt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
