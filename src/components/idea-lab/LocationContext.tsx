import React, { useState, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import type { DeliveryModel, CustomerType } from '../../types/project';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  Globe,
  Store,
  Laptop,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import {
  GEOGRAPHY_REGISTRY,
  validateGeographySelection,
  type OperatingScope,
} from '../../services/geographyRegistry';

export const LocationContext: React.FC = () => {
  const {
    state,
    setLocation,
    setDeliveryModel,
    setCustomerType,
  } = useProject();

  const { location, deliveryModel, customerType } = state.businessModel;

  const parsedGeo = useMemo(() => {
    const c = location.country || '';
    let st = '';
    let ci = '';
    if (location.cityRegion) {
      const parts = location.cityRegion.split(',').map((p) => p.trim());
      if (parts.length >= 2) {
        ci = parts[0];
        st = parts[1];
      } else {
        const matchingCountry = GEOGRAPHY_REGISTRY.find(
          (item) => item.name.toLowerCase() === c.toLowerCase()
        );
        const isState = matchingCountry?.states.some(
          (s) => s.name.toLowerCase() === location.cityRegion.toLowerCase()
        );
        if (isState) {
          st = location.cityRegion;
        } else {
          ci = location.cityRegion;
        }
      }
    }
    const scope = (location.operatingLocation as OperatingScope) || 'undecided';
    return { country: c, state: st, city: ci, scope };
  }, [location.country, location.cityRegion, location.operatingLocation]);

  // Selected Country, State, City derived from current Project State with local override capability
  const [selectedCountry, setSelectedCountry] = useState<string>(parsedGeo.country);
  const [selectedState, setSelectedState] = useState<string>(parsedGeo.state);
  const [selectedCity, setSelectedCity] = useState<string>(parsedGeo.city);
  const [operatingScope, setOperatingScope] = useState<OperatingScope>(parsedGeo.scope);

  // Sync state when incoming location changes from outside (e.g. sample venture load or reset)
  const [prevGeoKey, setPrevGeoKey] = useState<string>(`${parsedGeo.country}|${parsedGeo.state}|${parsedGeo.city}|${parsedGeo.scope}`);
  const currentGeoKey = `${parsedGeo.country}|${parsedGeo.state}|${parsedGeo.city}|${parsedGeo.scope}`;
  if (currentGeoKey !== prevGeoKey) {
    setPrevGeoKey(currentGeoKey);
    setSelectedCountry(parsedGeo.country);
    setSelectedState(parsedGeo.state);
    setSelectedCity(parsedGeo.city);
    setOperatingScope(parsedGeo.scope);
  }

  // Find country data from registry
  const countryObj = useMemo(() => {
    return GEOGRAPHY_REGISTRY.find(
      (c) => c.name.toLowerCase() === selectedCountry.trim().toLowerCase(),
    );
  }, [selectedCountry]);

  // Available states for selected country
  const availableStates = useMemo(() => {
    return countryObj ? countryObj.states : [];
  }, [countryObj]);

  // Available cities for selected state
  const availableCities = useMemo(() => {
    if (!countryObj || !selectedState) return [];
    const st = countryObj.states.find(
      (s) => s.name.toLowerCase() === selectedState.trim().toLowerCase(),
    );
    return st ? st.cities : [];
  }, [countryObj, selectedState]);

  // Validation
  const validation = useMemo(() => {
    if (!selectedCountry || selectedCountry === 'Not specified') return { isValid: true };
    return validateGeographySelection(selectedCountry, selectedState, selectedCity);
  }, [selectedCountry, selectedState, selectedCity]);

  // Handlers that update ProjectContext only when valid
  const handleCountryChange = (cName: string) => {
    setSelectedCountry(cName);
    setSelectedState('');
    setSelectedCity('');
    if (!cName || cName === 'Not specified') {
      setLocation({ country: '', cityRegion: '', operatingLocation: operatingScope === 'undecided' ? '' : operatingScope });
    } else {
      setLocation({ country: cName, cityRegion: '', operatingLocation: operatingScope === 'undecided' ? '' : operatingScope });
    }
  };

  const handleStateChange = (sName: string) => {
    setSelectedState(sName);
    setSelectedCity('');
    const cityRegionStr = sName;
    setLocation({
      country: selectedCountry,
      cityRegion: cityRegionStr,
      operatingLocation: operatingScope === 'undecided' ? '' : operatingScope,
    });
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const valid = validateGeographySelection(selectedCountry, selectedState, cityName);
    if (valid.isValid) {
      const cityRegionStr = selectedState ? `${cityName}, ${selectedState}` : cityName;
      setLocation({
        country: selectedCountry,
        cityRegion: cityRegionStr,
        operatingLocation: operatingScope === 'undecided' ? '' : operatingScope,
      });
    }
  };

  const handleScopeChange = (scope: OperatingScope) => {
    setOperatingScope(scope);
    if (scope === 'international') {
      if (!selectedCountry) {
        setSelectedCountry('Global / Multiple Countries');
        setSelectedState('Worldwide / Cross-Border');
        setSelectedCity('Worldwide / Online');
        setLocation({
          country: 'Global / Multiple Countries',
          cityRegion: 'Worldwide / Cross-Border',
          operatingLocation: 'international',
        });
        return;
      }
    } else if (scope === 'national') {
      if (selectedCountry === 'India') {
        setSelectedState('All / Pan-India');
        setSelectedCity('Nationwide / Multiple Cities');
        setLocation({
          country: 'India',
          cityRegion: 'Pan-India',
          operatingLocation: 'national',
        });
        return;
      }
    }
    setLocation({
      country: selectedCountry,
      cityRegion: selectedCity && selectedState ? `${selectedCity}, ${selectedState}` : selectedState || selectedCity,
      operatingLocation: scope === 'undecided' ? '' : scope,
    });
  };

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

  const scopeOptions: { id: OperatingScope; label: string; sub: string }[] = [
    { id: 'local', label: 'Local Scope', sub: 'Specific city / neighborhood' },
    { id: 'regional', label: 'Regional Scope', sub: 'State or province level' },
    { id: 'national', label: 'National Scope', sub: 'Domestic countrywide reach' },
    { id: 'international', label: 'Global / Export', sub: 'Multi-country or worldwide' },
    { id: 'undecided', label: 'Location Undecided', sub: 'Not yet specified' },
  ];

  const isConfirmedGeo = Boolean(location.country || location.cityRegion);

  return (
    <Card
      title="Geographic & Operational Footprint"
      subtitle="Establish operating boundaries and distribution channel dynamics. Dependent validated selectors prevent geographic fabrication."
      badge={
        isConfirmedGeo ? (
          <Badge variant="success">Confirmed Fact</Badge>
        ) : (
          <Badge variant="warning">Location Not Specified</Badge>
        )
      }
    >
      <div className="space-y-6">
        {/* Operating Scope Selection */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#4A5E73] font-medium mb-2">
            Operating Scope & Footprint
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {scopeOptions.map((opt) => {
              const isSelected = operatingScope === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleScopeChange(opt.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                    isSelected
                      ? 'bg-[#2B3D4F] text-[#FDFCF8] border-[#2B3D4F] font-medium shadow-sm'
                      : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73]'
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-[#FDFCF8]/70' : 'text-[#6B7D90]'}`}>
                    {opt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dependent Structured Geographic Selectors */}
        <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#2B3D4F] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#2B3D4F]" />
              STRUCTURED LOCATION VECTORS
            </span>
            <span className="text-[10px] font-mono text-[#6B7D90]">Dependent validation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Country */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#4A5E73] font-medium mb-1">
                Country
              </label>
              <select
                aria-label="Country"
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD5C5] bg-[#FDFCF8] text-[#2B3D4F] focus:outline-none focus:ring-1 focus:ring-[#2B3D4F]"
              >
                <option value="">-- Not specified --</option>
                {GEOGRAPHY_REGISTRY.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. State / Region */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#4A5E73] font-medium mb-1">
                State / Region
              </label>
              <select
                aria-label="State / Region"
                value={selectedState}
                disabled={!selectedCountry || availableStates.length === 0}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD5C5] bg-[#FDFCF8] text-[#2B3D4F] focus:outline-none focus:ring-1 focus:ring-[#2B3D4F] disabled:opacity-50 disabled:bg-[#ECE6DA]"
              >
                <option value="">{availableStates.length === 0 ? '-- Select Country first --' : '-- All / Nationwide --'}</option>
                {availableStates.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. City */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#4A5E73] font-medium mb-1">
                City / Metropolitan Area
              </label>
              <select
                aria-label="City / Metropolitan Area"
                value={selectedCity}
                disabled={!selectedState || availableCities.length === 0}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD5C5] bg-[#FDFCF8] text-[#2B3D4F] focus:outline-none focus:ring-1 focus:ring-[#2B3D4F] disabled:opacity-50 disabled:bg-[#ECE6DA]"
              >
                <option value="">{availableCities.length === 0 ? '-- Select State first --' : '-- All Cities in Region --'}</option>
                {availableCities.map((ci) => (
                  <option key={ci} value={ci}>
                    {ci}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validation Warning Alert */}
          {!validation.isValid && validation.errorMessage && (
            <div className="p-2.5 rounded-lg bg-[rgba(169,101,85,0.12)] border border-[rgba(169,101,85,0.35)] flex items-start gap-2 text-xs text-[#A96555] animate-fade-in">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Geographic Inconsistency:</span> {validation.errorMessage}
              </div>
            </div>
          )}

          {/* Active Summary */}
          {isConfirmedGeo && validation.isValid && (
            <div className="flex items-center gap-2 text-xs text-[#4A7C59] pt-1 font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>
                Confirmed Operational Focus: {[selectedCity, selectedState, selectedCountry].filter(Boolean).join(' → ')}
              </span>
            </div>
          )}
        </div>

        {/* Operational / Delivery Model */}
        <div>
          <label className="block text-xs font-mono uppercase text-[#4A5E73] font-medium mb-2">
            Delivery &amp; Presence Model
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
