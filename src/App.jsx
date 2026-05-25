import React, { useState } from 'react'
import CommandCentre from './components/CommandCentre.jsx'
import FunderRegister from './components/FunderRegister.jsx'
import Countries from './components/Countries.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import { getCountryById } from './data/crmData.js'

const TABS = [
  { id: 'cmd', label: '🏠 Command Centre' },
  { id: 'fund', label: '💰 Funder Register' },
  { id: 'country', label: '🗺️ Countries' },
  { id: 'project', label: '📋 Project Detail', hiddenUntilUsed: true },
]

function Breadcrumb({ activeTab, countryId, onNavigate }) {
  const country = getCountryById(countryId)

  if (activeTab === 'cmd') {
    return <span>🏠 Command Centre</span>
  }
  if (activeTab === 'fund') {
    return (
      <>
        <button type="button" className="bc-link" onClick={() => onNavigate('cmd')}>🏠 Command Centre</button>
        <span>›</span>
        <span>💰 Funder Register</span>
      </>
    )
  }
  if (activeTab === 'country') {
    return (
      <>
        <button type="button" className="bc-link" onClick={() => onNavigate('cmd')}>🏠 Command Centre</button>
        <span>›</span>
        <span>🗺️ Countries</span>
        {country && (
          <>
            <span>›</span>
            <span>{country.flag} {country.name}</span>
          </>
        )}
      </>
    )
  }
  if (activeTab === 'project') {
    return (
      <>
        <button type="button" className="bc-link" onClick={() => onNavigate('cmd')}>🏠</button>
        <span>›</span>
        <button type="button" className="bc-link" onClick={() => onNavigate('country')}>🗺️ Countries</button>
        <span>›</span>
        <span>📋 Project Detail</span>
      </>
    )
  }
  return null
}

export default function App() {
  const [activeTab, setActiveTab] = useState('cmd')
  const [activeCountryId, setActiveCountryId] = useState('ke')
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [showProjectTab, setShowProjectTab] = useState(false)
  const [fundFilter, setFundFilter] = useState('all')

  const navigateToCountry = (countryId) => {
    setActiveCountryId(countryId)
    setActiveTab('country')
  }

  const navigateToFund = (filter = 'all') => {
    setFundFilter(filter)
    setActiveTab('fund')
  }

  const navigateToProject = (countryId, projectIndex) => {
    setActiveCountryId(countryId)
    setSelectedProjectIndex(projectIndex)
    setShowProjectTab(true)
    setActiveTab('project')
  }

  const handleNavigate = (tab) => {
    setActiveTab(tab)
  }

  const visibleTabs = TABS.filter(tab => !tab.hiddenUntilUsed || (tab.id === 'project' && showProjectTab))

  return (
    <div className="min-h-screen bg-aris-white text-[13px]">
      <nav className="top-nav" role="navigation" aria-label="CRM sections">
        <div className="nav-brand">
          🌍 GCTF CRM <span>Giga Connectivity Trust Fund · Q2 2027</span>
        </div>
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <div className="nav-badge">FUTURE STATE SHOWCASE</div>
      </nav>

      <div className="breadcrumb">
        <Breadcrumb activeTab={activeTab} countryId={activeCountryId} onNavigate={handleNavigate} />
      </div>

      <main className="page-content">
        {activeTab === 'cmd' && (
          <CommandCentre onCountryDrill={navigateToCountry} onFundFilter={navigateToFund} />
        )}
        {activeTab === 'fund' && <FunderRegister initialFilter={fundFilter} />}
        {activeTab === 'country' && (
          <Countries
            activeCountryId={activeCountryId}
            onCountryChange={setActiveCountryId}
            onProjectDrill={navigateToProject}
          />
        )}
        {activeTab === 'project' && (
          <ProjectDetail
            countryId={activeCountryId}
            projectIndex={selectedProjectIndex}
            onProjectChange={navigateToProject}
          />
        )}
      </main>
    </div>
  )
}
