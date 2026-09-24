import React, { useState } from 'react';
import { Key, Link2, Table, ArrowRight, Database } from 'lucide-react';
import type { DataModelSystem, DataEntity } from '../../types/project';

interface DataEntityModelProps {
  dataModel: DataModelSystem;
}

export const DataEntityModel: React.FC<DataEntityModelProps> = ({ dataModel }) => {
  const { entities, storageParadigm } = dataModel;
  const [selectedEntity, setSelectedEntity] = useState<DataEntity | null>(entities[0] || null);

  // Group entities to show relational hierarchy (Core user/org -> primary domain -> child transactions/telemetry)
  const rootEntity = entities.find((e) => e.name.toLowerCase().includes('user') || e.name.toLowerCase().includes('account') || e.name.toLowerCase().includes('organization')) || entities[0];
  const domainEntities = entities.filter((e) => e.id !== rootEntity?.id);

  return (
    <div id="section-data" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 07 — Data &amp; Entity Relational Model (ERD)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              {entities.length} SCHEMAS
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{storageParadigm}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#738095] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <Database className="w-3.5 h-3.5 text-blue-400" />
          <span>PostgreSQL Relational Schema with RLS</span>
        </div>
      </div>

      {/* Visual ER-Style Relationship Diagram (Tree View) */}
      <div className="p-5 rounded-2xl bg-[#080B10] border border-[#263244] overflow-x-auto scrollbar-thin space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block font-bold">
          VISUAL SCHEMA TOPOLOGY &amp; FOREIGN KEY RELATIONSHIPS
        </span>

        <div className="flex items-start gap-8 min-w-[760px] p-2">
          {/* Root Entity (User / Org) */}
          {rootEntity && (
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedEntity(rootEntity)}
                className={`w-52 p-4 rounded-xl border transition-all cursor-pointer shadow-lg ${
                  selectedEntity?.id === rootEntity.id
                    ? 'bg-[#151E2B] border-blue-500 ring-2 ring-blue-500/40'
                    : 'bg-[#111823] border-[#263244] hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#1C2635] pb-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5" />
                    {rootEntity.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300">
                    ROOT
                  </span>
                </div>
                <div className="space-y-1 text-[11px] font-mono text-[#738095]">
                  {rootEntity.fields.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[#F3F4F6] truncate">
                        {f.isKey && <Key className="w-2.5 h-2.5 text-amber-400" />}
                        {f.name}
                      </span>
                      <span className="text-blue-400/80 text-[10px]">{f.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 mt-2">1 : N Relationships ↓</span>
            </div>
          )}

          {/* Child Domain Entities */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
            {domainEntities.map((entity) => {
              const isSelected = selectedEntity?.id === entity.id;

              return (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-[#151E2B] border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-[#111823] border-[#263244] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[#1C2635] pb-1.5 mb-2">
                    <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase flex items-center gap-1.5 truncate">
                      <Table className="w-3 h-3 text-[#738095]" />
                      {entity.name}
                    </span>
                    <span className="text-[9px] font-mono text-[#64748B]">
                      {entity.fields.length} cols
                    </span>
                  </div>

                  <div className="space-y-1 text-[10px] font-mono text-[#738095]">
                    {entity.fields.slice(0, 3).map((f, i) => {
                      const isFkField = !f.isKey && (f.name.endsWith('Id') || f.name.endsWith('_id'));
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[#CBD5E1] truncate">
                            {f.isKey && <Key className="w-2.5 h-2.5 text-amber-400" />}
                            {isFkField && <Link2 className="w-2.5 h-2.5 text-blue-400" />}
                            {f.name}
                          </span>
                          <span className="text-blue-400 text-[9px]">{f.type}</span>
                        </div>
                      );
                    })}
                    {entity.fields.length > 3 && (
                      <span className="text-[9px] text-[#64748B] block pt-0.5">
                        +{entity.fields.length - 3} more fields...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Entity Deep-Dive Schema Inspector */}
      {selectedEntity && (
        <div className="rounded-xl bg-[#111823] border border-[#263244] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-blue-400" />
              <div>
                <span className="text-[10px] font-mono uppercase text-[#738095] block">
                  SELECTED TABLE DEFINITION
                </span>
                <h3 className="text-sm font-bold font-mono text-[#F3F4F6]">
                  {selectedEntity.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#738095]">
                {selectedEntity.fields.length} Attributes Defined
              </span>
            </div>
          </div>

          <p className="text-xs text-[#CBD5E1] bg-[#080B10] p-3 rounded-lg border border-[#1C2635] leading-relaxed">
            {selectedEntity.purpose}
          </p>

          {/* Full Field Attributes Table */}
          <div className="overflow-x-auto rounded-lg border border-[#1C2635]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#080B10] text-[#738095] text-[10px] uppercase border-b border-[#1C2635]">
                <tr>
                  <th className="py-2.5 px-3">Column Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Key Type</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2635] text-[11px]">
                {selectedEntity.fields.map((f, i) => {
                  const isFkField = !f.isKey && (f.name.endsWith('Id') || f.name.endsWith('_id'));

                  return (
                    <tr key={i} className="hover:bg-[#151E2B]/50 transition-colors">
                      <td className="py-2 px-3 font-semibold text-[#F3F4F6] flex items-center gap-1.5">
                        {f.isKey && <Key className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                        {isFkField && <Link2 className="w-3 h-3 text-blue-400 flex-shrink-0" />}
                        <span>{f.name}</span>
                      </td>
                      <td className="py-2 px-3 text-blue-400">{f.type}</td>
                      <td className="py-2 px-3">
                        {f.isKey ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] border border-amber-500/30">
                            PRIMARY KEY
                          </span>
                        ) : isFkField ? (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/30">
                            FOREIGN KEY
                          </span>
                        ) : (
                          <span className="text-[#64748B]">ATTRIBUTE</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-[#AAB4C3]">{f.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Relational Foreign Keys & Referencing Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
            <div className="p-3 rounded-lg bg-[#080B10] border border-[#1C2635]">
              <span className="text-[10px] text-blue-400 uppercase font-bold block mb-1">
                Relational Entity Links:
              </span>
              {selectedEntity.relationships.length > 0 ? (
                <ul className="space-y-1 text-[#AAB4C3] text-[11px]">
                  {selectedEntity.relationships.map((r, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-[#738095]" />
                      <span>{r.type} → {r.targetEntity} ({r.description})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-[#738095] text-[11px]">Root entity with no outbound foreign keys</span>
              )}
            </div>

            <div className="p-3 rounded-lg bg-[#080B10] border border-[#1C2635]">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
                Referencing Features:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {(selectedEntity.featuresUsing || []).map((feat: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
