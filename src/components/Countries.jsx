import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { COUNTRIES, getProjectStatusClass } from '../data/crmData.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const CHART_COLORS = {
  schools: '#082E4A',
  deployed: '#80ADAD',
  muted: '#6b7280',
  border: '#e5e7eb',
}

export default function Countries({ activeCountryId, onCountryChange, onProjectDrill }) {
  const country = COUNTRIES.find(c => c.id === activeCountryId) || COUNTRIES[0]
  const pct = Math.round((country.schools_connected / country.schools_target) * 100)
  const dpct = Math.round((country.deployed_m / country.drawdown_m) * 100)

  const lineData = {
    labels: country.chart_labels,
    datasets: [
      {
        label: 'Schools Connected',
        data: country.chart_schools,
        borderColor: CHART_COLORS.schools,
        backgroundColor: `${CHART_COLORS.schools}22`,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Deployed ($M)',
        data: country.chart_deployed,
        borderColor: CHART_COLORS.deployed,
        borderDash: [4, 3],
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
        yAxisID: 'y2',
        fill: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 10, padding: 10, font: { size: 10 }, color: '#111827' },
      },
    },
    scales: {
      x: { grid: { color: CHART_COLORS.border }, ticks: { color: CHART_COLORS.muted } },
      y1: {
        position: 'left',
        grid: { color: CHART_COLORS.border },
        ticks: { color: CHART_COLORS.muted, callback: v => v.toLocaleString() },
        title: { display: true, text: 'Schools', color: CHART_COLORS.muted },
      },
      y2: {
        position: 'right',
        grid: { display: false },
        ticks: { color: CHART_COLORS.muted, callback: v => `$${v}M` },
        title: { display: true, text: 'USD Deployed', color: CHART_COLORS.muted },
      },
    },
  }

  return (
    <div>
      <div className="illustrative-banner">
        ⚠️ All figures are illustrative and forward-looking — produced for pre-feasibility planning purposes only. Not a statement of actual commitments.
      </div>

      <div className="country-tabs">
        {COUNTRIES.map(c => (
          <button
            key={c.id}
            type="button"
            className={`ctab ${c.id === activeCountryId ? 'active' : ''}`}
            onClick={() => onCountryChange(c.id)}
          >
            <span className="dot" style={{ background: c.dot }} />
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      <div className="detail-grid">
        <div className="left-col">
          <div className="country-hero">
            <div className="country-flag">{country.flag}</div>
            <div className="country-name">{country.name}</div>
            <div className="country-meta">Priority {country.priority} · {country.income_tier} · {country.tech}</div>
            <div className="mt-2">
              <span className={`pill ${country.statusClass}`}>{country.status}</span>
            </div>
            <div className="hero-kpis">
              <div className="hero-kpi">
                <div className="hero-kpi-label">Schools Connected</div>
                <div className="hero-kpi-value">{country.schools_connected.toLocaleString()}</div>
                <div className="text-[10px] opacity-65">of {country.schools_target.toLocaleString()} ({pct}%)</div>
              </div>
              <div className="hero-kpi">
                <div className="hero-kpi-label">Deployed</div>
                <div className="hero-kpi-value">${country.deployed_m}M</div>
                <div className="text-[10px] opacity-65">of ${country.drawdown_m}M ({dpct}%)</div>
              </div>
            </div>
            <div className="mt-2.5">
              <div className="text-[10px] opacity-65 mb-1">DEPLOYMENT PROGRESS</div>
              <div className="prog-wrap">
                <div className="prog-fill" style={{ width: `${pct}%`, background: '#80ADAD' }} />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">🏦 Funding Sources</div>
            {country.donors.map(d => (
              <div key={d} className="text-[11px] py-1 border-b border-[#e5e7eb] last:border-b-0">{d}</div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title">🚨 Issues & Flags</div>
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
        </div>

        <div className="right-col">
          <div className="panel">
            <div className="panel-title">📈 Deployment Progress</div>
            <div className="relative h-[180px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          <div className="panel overflow-x-auto">
            <div className="panel-title">
              🏗️ Active Projects{' '}
              <span className="text-[10px] font-normal text-[#6b7280]">— click to view project detail</span>
            </div>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Tech</th>
                  <th>Vendor</th>
                  <th>Schools</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Timeline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {country.projects.map((project, index) => (
                  <tr
                    key={project.name}
                    className="clickable-row"
                    onClick={() => onProjectDrill(country.id, index)}
                  >
                    <td className="font-semibold text-[11px]">{project.name}</td>
                    <td><span className="pill pill-grey">{project.tech}</span></td>
                    <td className="text-[10px] text-[#6b7280]">{project.vendor}</td>
                    <td className="font-semibold">{project.schools.toLocaleString()}</td>
                    <td>${project.budget_m}M</td>
                    <td>${project.spent_m}M</td>
                    <td className="text-[10px] text-[#6b7280]">{project.start} – {project.end}</td>
                    <td><span className={`pill ${getProjectStatusClass(project.status)}`}>{project.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-title">📅 Programme Milestones</div>
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
        </div>
      </div>
    </div>
  )
}
