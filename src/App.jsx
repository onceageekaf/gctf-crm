// src/app.jsx

import React, { useState } from 'react'
import CommandCentre from './components/CommandCentre.jsx'
import FunderRegister from './components/FunderRegister.jsx'
import Countries from './components/Countries.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'

const TABS = [
  { id: 'command', label: '🏠 Command Centre' },
  { id: 'funders', label: '💰 Funder Register' },
  { id: 'countries', label: '🗺️ Countries' },
  { id: 'project', label: '📋 Project Detail' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('command')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountryDrill = (country) => {
    setSelectedCountry(country)
    setActiveTab('project')
  }

  return (
    <div className="min-h-screen bg-aris-white">
      {/* Header */}
      <header className="bg-aris-cobalt text-white shadow-lg">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-aris-teal rounded-lg flex items-center justify-center text-sm font-bold">G</div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">GCTF CRM</h1>
              <p className="text-xs text-aris-sky opacity-80">Giga Connectivity Trust Fund — Pre-Feasibility Model</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-aris-teal px-3 py-1 rounded-full font-medium">2027 Future-State Scenario</span>
            <span className="text-xs text-aris-sky opacity-70">Illustrative Figures Only</span>
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-aris-aluminium shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6">
          <nav className="flex gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-aris-teal text-aris-teal'
                    : 'border-transparent text-aris-nickel hover:text-aris-graphite hover:border-aris-aluminium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Illustrative Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-screen-xl mx-auto px-6 py-2 flex items-center gap-2">
          <span className="text-amber-600 text-xs font-semibold">⚠ ILLUSTRATIVE MODEL</span>
          <span className="text-amber-700 text-xs">All figures are pre-feasibility forecasting scaffolding calibrated to public signals. Not confirmed commitments. $631M GCTF envelope vs. $6B total school connectivity cost for 500,000 African schools.</span>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-screen-xl mx-auto px-6 py-6">
        {activeTab === 'command' && <CommandCentre onCountryDrill={handleCountryDrill} />}
        {activeTab === 'funders' && <FunderRegister />}
        {activeTab === 'countries' && <Countries onCountryDrill={handleCountryDrill} />}
        {activeTab === 'project' && <ProjectDetail country={selectedCountry} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-aris-aluminium mt-12 py-4">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-aris-nickel">GCTF Pre-Feasibility Model v2.0 · Built on Protos by Aris Machina</span>
          <span className="text-xs text-aris-nickel">Traceability Score: 69.0% · Critical Flags: 0 · Audit Pass ✅</span>
        </div>
      </footer>
    </div>
  )
}
