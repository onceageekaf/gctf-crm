//src/components/CommandCentre.jsx

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Tooltip, Legend,
} from 'chart.js'
import { DONORS } from '../data/fundingData.js'
import { COUNTRIES, STATUS_COLORS } from '../data/countryData.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const ARIS = {
  cobalt: '#082E4A', teal: '#065056', graphite: '#2A3B42',
  sky: '#B2CBD8', mint: '#80ADAD',
}

const YEARS = ['2026', '2027', '2028', '2029', '2030']

export default function CommandCentre({ onCountryDrill }) {
  const totalFund = 631
  const mobilised = 487
  const deployed = 214
  const schoolsConnected = 62340
  const schoolsTarget = 134669
  const avgCostPerSchool = 3435
  const bcgBenchmark = 5575
  const openIssues = 7

  const stageTotals = {
    'Disbursed / Reporting':       DONORS.filter(d => ['Funds Disbursed','Reporting'].includes(d.stage)).reduce((s,d)=>s+d.pledge_m,0),
    'Agreement Signed':            DONORS.filter(d => d.stage === 'Grant Agreement Signed').reduce((s,d)=>s+d.pledge_m,0),
    'Agreement in Progress':       DONORS.filter(d => d.stage === 'Grant Agreement in Progress').reduce((s,d)=>s+d.pledge_m,0),
    'Under Review / Applied':      DONORS.filter(d => ['Grant Under Review','Grant Applied'].includes(d.stage)).reduce((s,d)=>s+d.pledge_m,0),
    'Identified':                  DONORS.filter(d => d.stage === 'Grant Identified').reduce((s,d)=>s+d.pledge_m,0),
  }

  const funnelData = {
    labels: Object.keys(stageTotals),
    datasets: [{ data: Object.values(stageTotals), backgroundColor: [ARIS.teal, ARIS.cobalt, ARIS.graphite, ARIS.mint, ARIS.sky], borderRadius: 4 }]
  }

  const anchorForecast = DONORS.filter(d => d.tier !== 'illustrative')
  const illustrative   = DONORS.filter(d => d.tier === 'illustrative')

  const inflowData = {
    labels: YEARS,
    datasets: [
      { label: 'Anchor + Forecast ($M)', data: YEARS.map((_,i) => anchorForecast.reduce((s,d)=>s+(d.tranches[i]||0),0)), backgroundColor: ARIS.teal, borderRadius: 4 },
      { label: 'Illustrative ($M)',       data: YEARS.map((_,i) => illustrative.reduce((s,d)=>s+(d.tranches[i]||0),0)),   backgroundColor: ARIS.sky,  borderRadius: 4 },
    ]
  }

  const kpis = [
    { label: 'Total Fund Envelope', value: `$${totalFund}M`,               sub: 'GCTF target',                               color: 'bg-aris-cobalt text-white' },
    { label: 'Mobilised (2027)',     value: `$${mobilised}M`,               sub: `${Math.round(mobilised/totalFund*100)}% of envelope`, color: 'bg-aris-teal text-white' },
    { label: 'Capital Deployed',     value: `$${deployed}M`,                sub: `${Math.round(deployed/mobilised*100)}% utilisation`, color: 'bg-aris-graphite text-white' },
    { label: 'Schools Connected',    value: schoolsConnected.toLocaleString(), sub: `of ${schoolsTarget.toLocaleString()} target`, color: 'bg-white border border-aris-aluminium' },
    { label: 'Avg Cost / School',    value: `$${avgCostPerSchool.toLocaleString()}`, sub: `BCG benchmark $${bcgBenchmark.toLocaleString()}`, color: avgCostPerSchool <= bcgBenchmark ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200' },
    { label: 'Open Issues',          value: openIssues,                     sub: '2 critical · 3 amber · 2 info',             color: 'bg-amber-50 border border-amber-200' },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={`rounded-xl p-4 ${k.color}`}>
            <p className="text-xs font-medium opacity-70 mb-1">{k.label}</p>
            <p className="text-2xl font-semibold">{k.value}</p>
            <p className="text-xs opacity-60 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Annual Donor Inflows ($M) — 2026–2030</h2>
          <div style={{ height: 260 }}>
            <Bar data={inflowData} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
              scales: {
                x: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b7280' } },
                y: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b7280' }, title: { display: true, text: '$M', color: '#6b7280' } }
              }
            }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Pipeline by Stage ($M)</h2>
          <div style={{ height: 260 }}>
            <Bar data={funnelData} options={{
              indexAxis: 'y',
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b7280' } },
                y: { grid: { display: false }, ticks: { color: '#374151', font: { size: 11 } } }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Country Table */}
      <div className="bg-white rounded-xl border border-aris-aluminium overflow-hidden">
        <div className="px-5 py-4 border-b border-aris-aluminium flex items-center justify-between">
          <h2 className="text-sm font-semibold text-aris-graphite">Country Allocation Overview</h2>
          <span className="text-xs text-aris-nickel">Click row to drill down →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-aris-white">
              <tr>
                {['Rank','Country','Status','Drawdown','Schools Target','Connected','Progress','Technology'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-aris-nickel">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-aris-aluminium">
              {COUNTRIES.map(c => {
                const pct = Math.round(c.schools_connected / c.schools_target * 100)
                return (
                  <tr key={c.code} className="hover:bg-aris-white cursor-pointer transition-colors" onClick={() => onCountryDrill(c)}>
                    <td className="px-4 py-3 font-medium text-aris-nickel">#{c.rank}</td>
                    <td className="px-4 py-3 font-medium">{c.flag} {c.name}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                    <td className="px-4 py-3 font-medium">${c.drawdown_m}M</td>
                    <td className="px-4 py-3">{c.schools_target.toLocaleString()}</td>
                    <td className="px-4 py-3">{c.schools_connected.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-aris-aluminium rounded-full h-1.5">
                          <div className="bg-aris-teal h-1.5 rounded-full" style={{ width: `${Math.min(pct,100)}%` }} />
                        </div>
                        <span className="text-xs text-aris-nickel w-8">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-aris-nickel">{c.technology_mix}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

