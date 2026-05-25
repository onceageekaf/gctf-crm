//src/components/FunderRegister.jsx

import React, { useState } from 'react'
import { DONORS, TIER_COLORS, STAGE_COLORS, FUNDING_STAGES } from '../data/fundingData.js'

export default function FunderRegister() {
  const [tierFilter, setTierFilter]   = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [search, setSearch]           = useState('')

  const tiers  = ['all', 'anchor', 'forecast', 'illustrative']
  const stages = ['all', ...FUNDING_STAGES]

  const filtered = DONORS.filter(d => {
    if (tierFilter  !== 'all' && d.tier  !== tierFilter)  return false
    if (stageFilter !== 'all' && d.stage !== stageFilter) return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalFiltered = filtered.reduce((s, d) => s + d.pledge_m, 0)
  const YEARS = [2026, 2027, 2028, 2029, 2030]

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text" placeholder="Search donors…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-aris-aluminium rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aris-teal w-56"
        />
        <div className="flex gap-1">
          {tiers.map(t => (
            <button key={t} onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                tierFilter === t ? 'bg-aris-cobalt text-white' : 'bg-white border border-aris-aluminium text-aris-nickel hover:border-aris-teal'
              }`}>{t}
            </button>
          ))}
        </div>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)}
          className="border border-aris-aluminium rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-aris-teal">
          {stages.map(s => <option key={s} value={s}>{s === 'all' ? 'All Stages' : s}</option>)}
        </select>
        <span className="ml-auto text-sm font-medium text-aris-graphite">{filtered.length} donors · ${totalFiltered.toFixed(1)}M</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-aris-aluminium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-aris-white border-b border-aris-aluminium">
              <tr>
                {['Donor','Type','Tier','Pledge ($M)',...YEARS.map(String),'Total','Stage','Notes'].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-aris-nickel whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-aris-aluminium">
              {filtered.map(d => {
                const tc  = TIER_COLORS[d.tier]
                const sc  = STAGE_COLORS[d.stage] || 'bg-gray-100 text-gray-700'
                const tot = d.tranches.reduce((s,v)=>s+v,0)
                return (
                  <tr key={d.id} className="hover:bg-aris-white transition-colors">
                    <td className="px-3 py-3 font-medium text-aris-graphite whitespace-nowrap">{d.name}</td>
                    <td className="px-3 py-3 text-xs text-aris-nickel whitespace-nowrap">{d.type}</td>
                    <td className="px-3 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${tc.bg} ${tc.text}`}>{d.tier}</span></td>
                    <td className="px-3 py-3 font-medium">${d.pledge_m}M</td>
                    {d.tranches.map((t,i) => (
                      <td key={i} className="px-3 py-3 text-center text-xs">
                        {t > 0 ? <span className="font-medium">${t}M</span> : <span className="text-aris-aluminium">—</span>}
                      </td>
                    ))}
                    <td className="px-3 py-3 font-medium text-aris-teal">${tot}M</td>
                    <td className="px-3 py-3 whitespace-nowrap"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc}`}>{d.stage}</span></td>
                    <td className="px-3 py-3 text-xs text-aris-nickel max-w-xs">{d.notes || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="bg-aris-white border-t border-aris-aluminium">
              <tr>
                <td colSpan={3} className="px-3 py-3 font-semibold text-aris-graphite">TOTAL ({filtered.length} donors)</td>
                <td className="px-3 py-3 font-semibold">${totalFiltered.toFixed(1)}M</td>
                {[0,1,2,3,4].map(i => (
                  <td key={i} className="px-3 py-3 font-semibold text-center text-xs">
                    ${filtered.reduce((s,d)=>s+(d.tranches[i]||0),0).toFixed(1)}M
                  </td>
                ))}
                <td className="px-3 py-3 font-semibold text-aris-teal">${totalFiltered.toFixed(1)}M</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex gap-4 text-xs text-aris-nickel">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span> Anchor — grounded in public signals</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> Forecast — base-case assumption</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> Illustrative — included to reach Y5 target range</span>
      </div>
    </div>
  )
}
