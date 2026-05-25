//src/components/Countries.jsx and src/components/ProjectDetail.jsx

import React, { useState } from 'react'
import { COUNTRIES, STATUS_COLORS, RISK_COLORS } from '../data/countryData.js'

export default function Countries({ onCountryDrill }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COUNTRIES.map(c => {
          const pct = Math.round(c.schools_connected / c.schools_target * 100)
          const isSel = selected?.code === c.code
          return (
            <div key={c.code} onClick={() => setSelected(c === selected ? null : c)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${isSel ? 'border-aris-teal shadow-md' : 'border-aris-aluminium hover:border-aris-mint hover:shadow-sm'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h3 className="font-semibold text-aris-graphite text-sm">{c.name}</h3>
                    <span className="text-xs text-aris-nickel">Priority #{c.rank} · {c.income_tier}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>{c.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-aris-nickel">Drawdown</span><br /><span className="font-semibold">${c.drawdown_m}M</span></div>
                <div><span className="text-aris-nickel">Technology</span><br /><span className="font-semibold">{c.technology_mix}</span></div>
                <div><span className="text-aris-nickel">Schools Target</span><br /><span className="font-semibold">{c.schools_target.toLocaleString()}</span></div>
                <div><span className="text-aris-nickel">Connected</span><br /><span className="font-semibold">{c.schools_connected.toLocaleString()}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-aris-aluminium rounded-full h-1.5">
                  <div className="bg-aris-teal h-1.5 rounded-full" style={{ width: `${Math.min(pct,100)}%` }} />
                </div>
                <span className="text-xs font-medium text-aris-nickel">{pct}%</span>
              </div>
              {c.provisional && <p className="text-xs text-amber-600 mt-2">⚠ Provisional — Giga Maps verification pending</p>}
            </div>
          )
        })}
      </div>

      <div className="lg:col-span-1">
        {selected ? (
          <div className="bg-white rounded-xl border border-aris-aluminium p-5 sticky top-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selected.flag}</span>
                <div>
                  <h2 className="font-semibold text-aris-graphite">{selected.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
                </div>
              </div>
              <button onClick={() => onCountryDrill(selected)} className="text-xs bg-aris-teal text-white px-3 py-1.5 rounded-lg hover:bg-aris-cobalt transition-colors">Full Detail →</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[['Drawdown',`$${selected.drawdown_m}M`],['Technology',selected.technology_mix],['CapEx/School',`$${selected.capex_per_school.toLocaleString()}`],['OpEx/School/yr',`$${selected.opex_per_school.toLocaleString()}`],['Currency',selected.currency],['Income Tier',selected.income_tier]].map(([k,v])=>(
                <div key={k} className="bg-aris-white rounded-lg p-2">
                  <span className="text-aris-nickel block">{k}</span>
                  <span className="font-semibold text-aris-graphite">{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-aris-nickel mb-2 uppercase tracking-wide">Key Risks</h3>
              <div className="space-y-1.5">
                {selected.risks.map((r,i)=>(
                  <div key={i} className={`text-xs px-3 py-2 rounded-lg border ${RISK_COLORS[r.level]}`}>
                    <span className="font-semibold capitalize">{r.level}: </span>{r.description}
                  </div>
                ))}
              </div>
            </div>
            {selected.notes && <p className="text-xs text-aris-nickel bg-aris-white rounded-lg p-3">{selected.notes}</p>}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-aris-aluminium p-8 flex flex-col items-center justify-center text-center h-64">
            <span className="text-4xl mb-3">🗺️</span>
            <p className="text-sm font-medium text-aris-graphite">Select a country</p>
            <p className="text-xs text-aris-nickel mt-1">Click any card to see details and risks</p>
          </div>
        )}
      </div>
    </div>
  )
}
