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

  const deliveryOptions: { id: DeliveryModel; label: string; icon: React.ElementType; accent: string; wash: string }[] = [
    { id: 'online', label: 'Online / Digital', icon: Laptop, accent: '#486581', wash: '#DCEAF4' },
    { id: 'offline', label: 'Offline / Physical', icon: Store, accent: '#A96555', wash: '#F0DDD5' },
    { id: 'hybrid', label: 'Hybrid / Omnichannel', icon: Globe, accent: '#3E7A73', wash: '#DDEBE2' },
  ];

  const customerOptions: { id: CustomerType; label: string; sub: string; accent: string }[] = [
    { id: 'b2c', label: 'B2C', sub: 'Direct to individual consumer', accent: '#486581' },
    { id: 'd2c', label: 'D2C', sub: 'Direct-to-consumer brand', accent: '#4F8064' },
    { id: 'b2b', label: 'B2B', sub: 'Enterprise & business clients', accent: '#76658F' },
    { id: 'b2b2c', label: 'B2B2C', sub: 'Intermediary channel model', accent: '#A87932' },
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
          <label className="block text-xs font-mono uppercase text-[#4A5E73] font-medium mb-2">
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
                  aria-pressed={isSelected}
                  className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'text-[#2B3D4F] ring-1'
                      : 'hover:brightness-[0.985] border-[#DDD5C5] text-[#4A5E73]'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: opt.wash, borderColor: opt.accent, ['--tw-ring-color' as string]: opt.accent }
                      : { backgroundColor: '#F5F1EB' }
                  }
                >
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors"
                    style={
                      isSelected
                        ? { backgroundColor: opt.accent, color: '#FDFCF8' }
                        : { backgroundColor: opt.wash, color: opt.accent }
                    }
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
          <label className="block text-xs font-mono uppercase text-[#4A5E73] font-medium mb-2">
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
                  aria-pressed={isSelected}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected ? 'ring-1' : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] border-[#DDD5C5]'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: `${opt.accent}1F`, borderColor: opt.accent, ['--tw-ring-color' as string]: opt.accent }
                      : undefined
                  }
                >
                  <div
                    className="text-xs font-mono font-bold"
                    style={{ color: isSelected ? opt.accent : '#2B3D4F' }}
                  >
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-[#6B7D90] mt-0.5 truncate">
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
