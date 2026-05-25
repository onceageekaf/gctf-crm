//src/components/Countries.jsx and src/components/ProjectDetail.jsx

import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { COUNTRIES, STATUS_COLORS, RISK_COLORS } from '../data/countryData.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ARIS = { cobalt: '#082E4A', teal: '#065056', graphite: '#2A3B42' }
const YEARS = ['2026','2027','2028','2029','2030']
const MILESTONE_COLORS = { complete: 'bg-emerald-500', 'in-progress': 'bg-blue-500', 'at-risk': 'bg-red-500', pending: 'bg-gray-300' }

export default function ProjectDetail({ country }) {
  const [selected, setSelected] = useState(country || COUNTRIES[0])
  const c = selected

  let cum = 0
  const cumulativeSchools = c.deployment_schedule_m.map(m => {
    cum += Math.round((m * 1_000_000) / (c.capex_per_school + c.opex_per_school))
    return cum
  })
  const cumulativeDrawdown = c.deployment_schedule_m.reduce((acc,v,i)=>[...acc,(acc[i-1]||0)+v],[])

  const lineData = {
    labels: YEARS,
    datasets: [
      { label: 'Cumulative Schools Connected', data: cumulativeSchools, borderColor: ARIS.teal, backgroundColor: ARIS.teal+'22', fill: true, tension: 0.3, borderWidth: 2, pointRadius: 4, yAxisID: 'y' },
      { label: 'Cumulative Drawdown ($M)',      data: cumulativeDrawdown, borderColor: ARIS.cobalt, backgroundColor: 'transparent', tension: 0.3, borderWidth: 2, borderDash: [5,5], pointRadius: 4, yAxisID: 'y1' },
    ]
  }

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
    scales: {
      y:  { type:'linear', position:'left',  title:{ display:true, text:'Schools',      color:'#6b7280', font:{size:11} }, grid:{color:'rgba(0,0,0,0.05)'}, ticks:{color:'#6b7280'} },
      y1: { type:'linear', position:'right', title:{ display:true, text:'Drawdown ($M)',color:'#6b7280', font:{size:11} }, grid:{drawOnChartArea:false},      ticks:{color:'#6b7280'} },
      x:  { grid:{color:'rgba(0,0,0,0.05)'}, ticks:{color:'#6b7280'} }
    }
  }

  return (
    <div className="space-y-5">
      {/* Country Selector */}
      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map(co => (
          <button key={co.code} onClick={() => setSelected(co)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selected.code===co.code ? 'bg-aris-teal text-white' : 'bg-white border border-aris-aluminium text-aris-nickel hover:border-aris-teal'}`}>
            {co.flag} {co.name}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-aris-aluminium p-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{c.flag}</span>
            <div>
              <h1 className="text-xl font-semibold text-aris-graphite">{c.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                <span className="text-xs text-aris-nickel">Priority #{c.rank} · {c.income_tier} · {c.currency}</span>
                {c.provisional && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Provisional</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[['Total Drawdown',`$${c.drawdown_m}M`],['Schools Target',c.schools_target.toLocaleString()],['Connected',c.schools_connected.toLocaleString()]].map(([k,v])=>(
              <div key={k} className="bg-aris-white rounded-lg p-3">
                <p className="text-xs text-aris-nickel">{k}</p>
                <p className="text-lg font-semibold text-aris-graphite">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Deployment Trajectory — Schools & Drawdown</h2>
          <div style={{ height: 280 }}><Line data={lineData} options={lineOptions} /></div>
        </div>
        <div className="bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Unit Costs vs. BCG Benchmark</h2>
          <div className="space-y-3 text-sm">
            {[{label:'CapEx / School',value:c.capex_per_school,benchmark:5369},{label:'OpEx / School / yr',value:c.opex_per_school,benchmark:2183}].map(({label,value,benchmark})=>{
              const ratio = value/benchmark
              const over  = ratio > 1.15
              return (
                <div key={label} className="bg-aris-white rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-aris-nickel">{label}</span>
                    <span className={`text-xs font-semibold ${over?'text-red-600':'text-emerald-600'}`}>${value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-aris-nickel">
                    <span>BCG: ${benchmark.toLocaleString()}</span>
                    <span className={over?'text-red-500':'text-emerald-500'}>{over?'▲':'▼'} {Math.abs(Math.round((ratio-1)*100))}%</span>
                  </div>
                </div>
              )
            })}
            <div className="bg-aris-white rounded-lg p-3">
              <span className="text-xs text-aris-nickel block mb-1">Technology Mix</span>
              <span className="text-xs font-semibold text-aris-graphite">{c.technology_mix}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Milestones</h2>
          <div className="space-y-2">
            {c.milestones.map((m,i)=>(
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0 ${MILESTONE_COLORS[m.status]}`} />
                <div className="flex-1"><p className="text-xs font-medium text-aris-graphite">{m.label}</p><p className="text-xs text-aris-nickel">{m.year}</p></div>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${m.status==='complete'?'bg-emerald-100 text-emerald-700':m.status==='in-progress'?'bg-blue-100 text-blue-700':m.status==='at-risk'?'bg-red-100 text-red-700':'bg-gray-100 text-gray-600'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-aris-aluminium p-5">
          <h2 className="text-sm font-semibold text-aris-graphite mb-4">Risks & Issues</h2>
          <div className="space-y-2">
            {c.risks.map((r,i)=>(
              <div key={i} className={`text-xs p-3 rounded-lg border ${RISK_COLORS[r.level]}`}>
                <span className="font-semibold capitalize">{r.level} risk: </span>{r.description}
              </div>
            ))}
          </div>
          {c.notes && <div className="mt-4 bg-aris-white rounded-lg p-3 text-xs text-aris-nickel"><span className="font-medium text-aris-graphite block mb-1">Model Notes</span>{c.notes}</div>}
        </div>
      </div>
    </div>
  )
}
