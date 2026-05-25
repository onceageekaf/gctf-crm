import React from 'react'
import { getCountryById, getProjectStatusClass } from '../data/crmData.js'

export default function ProjectDetail({ countryId, projectIndex, onProjectChange }) {
  const country = getCountryById(countryId) || getCountryById('ke')
  const project = country.projects[projectIndex] || country.projects[0]
  const utilisation = project.budget_m > 0 ? Math.round((project.spent_m / project.budget_m) * 100) : 0

  return (
    <div>
      <div className="illustrative-banner">
        ⚠️ All figures are illustrative and forward-looking — pre-feasibility planning only.
      </div>

      <div className="project-grid">
        <div className="flex flex-col gap-3">
          <div className="project-hero">
            <div className="text-[11px] opacity-65 uppercase tracking-wide mb-1.5">
              {country.flag} {country.name} · Priority {country.priority}
            </div>
            <div className="text-base font-bold mb-2">{project.name}</div>
            <span className={`pill ${getProjectStatusClass(project.status)}`}>{project.status}</span>

            <div className="project-kpi-grid">
              {[
                ['Schools', project.schools.toLocaleString()],
                ['Budget', `$${project.budget_m}M`],
                ['Spent', `$${project.spent_m}M`],
                ['Utilisation', `${utilisation}%`],
              ].map(([label, value]) => (
                <div key={label} className="project-kpi">
                  <div className="project-kpi-label">{label}</div>
                  <div className="project-kpi-value">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className="text-[10px] opacity-65 mb-1">BUDGET UTILISATION</div>
              <div className="prog-wrap">
                <div className="prog-fill" style={{ width: `${utilisation}%`, background: '#80ADAD' }} />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">📋 Project Details</div>
            <table className="crm-table">
              <tbody>
                {[
                  ['Technology', <span key="tech" className="pill pill-grey">{project.tech}</span>],
                  ['Vendor / ISP', project.vendor],
                  ['Start Date', project.start],
                  ['End Date', project.end],
                  ['Country', `${country.flag} ${country.name}`],
                  ['Income Tier', country.income_tier],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="font-semibold text-[11px]">{label}</td>
                    <td className="text-[11px]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-title">🏦 Funding Sources</div>
            {country.donors.map(d => (
              <div key={d} className="text-[11px] py-1 border-b border-[#e5e7eb] last:border-b-0">{d}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="panel">
            <div className="panel-title">🚨 Country-Level Issues Affecting This Project</div>
            {country.issues.map(issue => (
              <div key={issue.title} className="issue-item">
                <div className="issue-icon">{issue.icon}</div>
                <div>
                  <div className="issue-title">{issue.title}</div>
                  <div className="issue-sub">{issue.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title">📅 Country Programme Milestones</div>
            <div className="timeline">
              {country.milestones.map(milestone => (
                <div key={`${milestone.date}-${milestone.label}`} className={`tl-item tl-${milestone.type}`}>
                  <div className="tl-date">{milestone.date}</div>
                  <div>
                    <div className="tl-title">{milestone.label}</div>
                    <div className="tl-sub">{milestone.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">🏗️ All Projects in {country.name}</div>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Tech</th>
                  <th>Schools</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {country.projects.map((item, index) => {
                  const isCurrent = item.name === project.name
                  return (
                    <tr
                      key={item.name}
                      className="clickable-row"
                      style={isCurrent ? { background: '#f0f9ff' } : undefined}
                      onClick={() => onProjectChange(country.id, index)}
                    >
                      <td className="font-semibold text-[11px]">{isCurrent ? '▶ ' : ''}{item.name}</td>
                      <td className="text-[11px]">{item.tech}</td>
                      <td className="font-semibold">{item.schools.toLocaleString()}</td>
                      <td>${item.budget_m}M</td>
                      <td>${item.spent_m}M</td>
                      <td><span className={`pill ${getProjectStatusClass(item.status)}`}>{item.status}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
