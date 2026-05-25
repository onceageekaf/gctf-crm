import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { COUNTRIES } from '../data/crmData.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend)

const CHART = {
  fg: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
}

const KPIS = [
  { label: 'Total Fund Mobilised', value: '$487M', sub: 'of $631M target', delta: '▲ 77% of envelope', deltaClass: 'up' },
  { label: 'Schools Connected', value: '62,340', sub: 'of 134,669 target', delta: '▲ 46% on track', deltaClass: 'up' },
  { label: 'Capital Deployed', value: '$214M', sub: 'across 12 countries', delta: '⚠ 34% utilisation', deltaClass: 'warn' },
  { label: 'Avg. Cost / School', value: '$3,435', sub: 'BCG benchmark: $5,575', delta: '✓ 38% below BCG', deltaClass: 'ok' },
  { label: 'Open Issues', value: '7', sub: '2 critical · 3 amber · 2 info', delta: '⚠ Review required', deltaClass: 'warn' },
]

const FUNNEL_STAGES = [
  { stage: 'Grant Identified', width: 100, bg: '#B2CBD8', amount: 540, count: 14, filter: 'identified' },
  { stage: 'Expression of Interest', width: 72, bg: '#80ADAD', amount: 389, count: 9, filter: 'eoi' },
  { stage: 'Proposal Submitted', width: 55, bg: '#065056', amount: 298, count: 7, filter: 'submitted' },
  { stage: 'Under Review', width: 38, bg: '#2A3B42', amount: 204, count: 5, filter: 'review' },
  { stage: 'Grant Awarded', width: 28, bg: '#3A4042', amount: 151, count: 8, filter: 'awarded' },
  { stage: 'Agreement in Progress', width: 20, bg: '#2A3B42', amount: 108, count: 4, filter: 'agreement' },
  { stage: 'Agreement Signed', width: 16, bg: '#065056', amount: 87, count: 6, filter: 'signed' },
  { stage: 'Disbursed / Active', width: 22, bg: '#082E4A', amount: 214, count: 17, filter: 'disbursed' },
  { stage: 'Reporting / Closed', width: 8, bg: '#8A9294', amount: 42, count: 3, filter: 'reporting' },
]

const LIVE_ISSUES = [
  { icon: '🔴', title: 'Nigeria — ISP contract dispute', sub: 'Spectralink NG contesting exclusivity. Risk to $11.8M tranche. Due: 30 Jun 2027' },
  { icon: '🔴', title: 'BII Mezzanine — IC decision pending', sub: '$104M pending IC sign-off. Blocks 4 countries. Expected Q3 2027' },
  { icon: '🟡', title: 'Tanzania — customs delay', sub: '330 VSAT units at Dar port. Affects 800 schools.' },
  { icon: '🟡', title: 'UNICEF Outcome Bonds renegotiation', sub: '$150M term sheet revision. New terms Q4 2027.' },
  { icon: '🟡', title: 'Ethiopia — MOU renewal overdue', sub: 'Deployment on hold pending Ministry signature.' },
  { icon: '🔵', title: 'Giga Maps refresh — 9 countries', sub: 'School data not validated since Jan 2027. ETA Aug 2027.' },
  { icon: '🔵', title: 'Kenya USF cross-border clause', sub: '$50M pending MoF legal clearance. No impact to ops.' },
]

function progressColor(country) {
  if (country.statusClass === 'pill-navy') return '#065056'
  if (country.statusClass === 'pill-green') return '#082E4A'
  return '#80ADAD'
}

const chartFont = { family: "'Host Grotesk', system-ui, sans-serif", size: 11 }

const waterfallData = {
  labels: ['2026', '2027', '2028', '2029', '2030'],
  datasets: [
    { label: 'Donor Inflows ($M)', data: [55, 96, 142, 168, 127], backgroundColor: '#082E4A', borderRadius: 4 },
    { label: 'Country Drawdowns ($M)', data: [27, 187, 218, 195, 138], backgroundColor: '#80ADAD', borderRadius: 4 },
    {
      label: 'Net Balance ($M)',
      data: [28, 165, 314, 336, 325],
      type: 'line',
      borderColor: '#FDE737',
      backgroundColor: 'transparent',
      pointBackgroundColor: '#FDE737',
      borderWidth: 2,
      pointRadius: 4,
      tension: 0.3,
    },
  ],
}

const waterfallOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { boxWidth: 10, padding: 10, font: chartFont, color: CHART.fg } },
  },
  scales: {
    x: { grid: { color: CHART.border }, ticks: { color: CHART.muted } },
    y: { grid: { color: CHART.border }, ticks: { color: CHART.muted, callback: v => `$${v}M` } },
  },
}

const donutData = {
  labels: ['Anchor ($192M)', 'Forecast ($152M)', 'Illustrative ($143M)', 'Not Yet ($144M)'],
  datasets: [{
    data: [192, 152, 143, 144],
    backgroundColor: ['#082E4A', '#065056', '#80ADAD', '#E8EAEB'],
    borderColor: ['#082E4A', '#065056', '#80ADAD', '#E8EAEB'],
    borderWidth: 1,
  }],
}

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { position: 'right', labels: { boxWidth: 9, padding: 8, font: { ...chartFont, size: 10 }, color: CHART.fg } },
  },
}

const quarterlyData = {
  labels: ['Q1 26', 'Q2 26', 'Q3 26', 'Q4 26', 'Q1 27', 'Q2 27'],
  datasets: [
    { label: 'Inflows', data: [8, 14, 18, 15, 24, 28], backgroundColor: '#082E4A', borderRadius: 3 },
    { label: 'Drawdowns', data: [4, 7, 8, 8, 42, 55], backgroundColor: '#80ADAD', borderRadius: 3 },
  ],
}

const quarterlyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { boxWidth: 8, padding: 8, font: { ...chartFont, size: 10 }, color: CHART.fg } },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: CHART.muted, font: { size: 10 } } },
    y: { grid: { color: CHART.border }, ticks: { color: CHART.muted, font: { size: 10 }, callback: v => `$${v}M` } },
  },
}

export default function CommandCentre({ onCountryDrill, onFundFilter }) {
  return (
    <div>
      <div className="illustrative-banner">
        ⚠️ All figures are illustrative and forward-looking — produced for pre-feasibility planning purposes only. Not a statement of actual commitments.
      </div>

      <div className="kpi-grid">
        {KPIS.map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-sub">{kpi.sub}</div>
            <div className={`kpi-delta ${kpi.deltaClass}`}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      <div className="section-row two-col">
        <div className="panel">
          <div className="panel-title">
            📊 Funding Pipeline by Stage{' '}
            <span className="text-[10px] font-normal text-[#6b7280]">— click a bar to open Funder Register</span>
          </div>
          {FUNNEL_STAGES.map(row => (
            <div key={row.stage} className="funnel-row">
              <div className="funnel-stage">{row.stage}</div>
              <div className="funnel-bar-wrap">
                <button
                  type="button"
                  className="funnel-bar"
                  style={{ width: `${row.width}%`, background: row.bg }}
                  onClick={() => onFundFilter?.(row.filter)}
                >
                  <span>${row.amount}M · {row.count}</span>
                </button>
              </div>
              <div className="funnel-count">{row.count}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-title">💧 Annual Fund Balance (2026–2030)</div>
          <p className="sr-only">
            Bar chart showing annual fund inflows and drawdowns 2026–2030, net balance rising from $28M to $335M.
          </p>
          <div className="relative h-[280px]">
            <Bar data={waterfallData} options={waterfallOptions} />
          </div>
        </div>
      </div>

      <div className="section-row three-col">
        <div className="panel">
          <div className="panel-title">
            🗺️ Country Programme Status{' '}
            <span className="text-[10px] font-normal text-[#6b7280]">— click row to drill down</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Schools</th>
                <th>Deployed</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map(country => {
                const pct = Math.round((country.schools_connected / country.schools_target) * 100)
                return (
                  <tr
                    key={country.id}
                    className="clickable-row"
                    onClick={() => onCountryDrill(country.id)}
                  >
                    <td><strong>{country.flag} {country.name}</strong></td>
                    <td>{country.schools_connected.toLocaleString()} / {country.schools_target.toLocaleString()}</td>
                    <td>${country.deployed_m}M</td>
                    <td>
                      <div className="prog-wrap">
                        <div className="prog-fill" style={{ width: `${Math.min(pct, 100)}%`, background: progressColor(country) }} />
                      </div>
                    </td>
                    <td><span className={`pill ${country.statusClass}`}>{country.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-title">🏦 Mobilised Capital by Donor Tier</div>
          <p className="sr-only">Doughnut: Anchor $192M, Forecast $152M, Illustrative $143M, Not Yet $144M.</p>
          <div className="relative h-[190px] mb-3">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
          <div className="panel-title mt-2.5">📅 Quarterly Drawdown vs Inflows</div>
          <div className="relative h-[140px]">
            <Bar data={quarterlyData} options={quarterlyOptions} />
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">🚨 Live Issues & Flags</div>
          {LIVE_ISSUES.map(issue => (
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
    </div>
  )
}
