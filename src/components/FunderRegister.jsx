import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { FUND_ROWS, STAGE_LABEL, STAGE_CLASS, TIER_CLASS } from '../data/crmData.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend)

const CHART = { fg: '#111827', muted: '#6b7280', border: '#e5e7eb' }

const SUMMARY_STATS = [
  { label: 'Total Pipeline', value: '$1.54B', sub: '57 active opportunities', color: '#082E4A' },
  { label: 'Disbursed to Date', value: '$214M', sub: '17 active tranches', color: '#065056' },
  { label: 'Agreements Signed', value: '$87M', sub: '6 instruments', color: '#082E4A' },
  { label: 'Under Review', value: '$204M', sub: '5 in review', color: '#d97706' },
  { label: 'New Identified', value: '$540M', sub: '14 opportunities', color: '#1e40af' },
  { label: 'Closed / Reported', value: '$42M', sub: '3 grants closed', color: '#8A9294' },
]

const FILTER_OPTIONS = [
  { id: 'all', label: 'All (57)' },
  { id: 'identified', label: 'Identified (14)' },
  { id: 'eoi', label: 'EOI / Submitted (16)' },
  { id: 'review', label: 'Under Review (5)' },
  { id: 'awarded', label: 'Awarded (8)' },
  { id: 'disbursed', label: 'Disbursed (17)' },
  { id: 'reporting', label: 'Closed (3)' },
]

const FILTER_MAP = {
  all: null,
  identified: ['identified'],
  eoi: ['eoi', 'submitted'],
  review: ['review'],
  awarded: ['awarded', 'agreement'],
  disbursed: ['signed', 'disbursed'],
  reporting: ['reporting'],
}

const FILTER_ALIASES = {
  signed: 'disbursed',
  agreement: 'awarded',
  submitted: 'eoi',
}

function normalizeFilter(filter) {
  return FILTER_ALIASES[filter] || filter
}

function filterRows(filter) {
  const allowed = FILTER_MAP[filter]
  return FUND_ROWS.filter(row => !allowed || allowed.includes(row.stage))
}

const stageChartData = {
  labels: ['Identified', 'EOI', 'Submitted', 'Review', 'Awarded', 'Agreement', 'Signed', 'Disbursed', 'Closed'],
  datasets: [{
    label: '$M',
    data: [540, 203, 200, 204, 151, 108, 87, 214, 42],
    backgroundColor: ['#B2CBD8', '#80ADAD', '#065056', '#2A3B42', '#082E4A', '#3A4042', '#065056', '#082E4A', '#8A9294'],
    borderRadius: 4,
  }],
}

const stageChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: CHART.border }, ticks: { color: CHART.muted, callback: v => `$${v}M` } },
    y: { grid: { display: false }, ticks: { color: CHART.muted, font: { size: 10 } } },
  },
}

const typeChartData = {
  labels: ['IFI Concessional', 'Bilateral Grant', 'DFI/Blended', 'Philanthropic', 'Outcome Bond', 'USF/Regional', 'Corporate/Tech'],
  datasets: [{
    data: [420, 290, 180, 150, 150, 65, 55],
    backgroundColor: ['#082E4A', '#065056', '#2A3B42', '#80ADAD', '#B2CBD8', '#8A9294', '#3A4042'],
    borderColor: ['#082E4A', '#065056', '#2A3B42', '#80ADAD', '#B2CBD8', '#8A9294', '#3A4042'],
    borderWidth: 1,
  }],
}

const typeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '55%',
  plugins: {
    legend: { position: 'bottom', labels: { boxWidth: 8, padding: 6, font: { size: 9 }, color: CHART.fg } },
  },
}

const trendChartData = {
  labels: ['J26', 'F26', 'M26', 'A26', 'M26', 'J26', 'J26', 'A26', 'S26', 'O26', 'N26', 'D26', 'J27', 'F27', 'M27', 'A27', 'M27', 'J27'],
  datasets: [{
    label: 'Monthly Disbursements ($M)',
    data: [4, 5, 6, 7, 8, 7, 9, 10, 12, 11, 13, 15, 22, 28, 35, 42, 50, 55],
    borderColor: '#082E4A',
    backgroundColor: '#082E4A22',
    fill: true,
    borderWidth: 2,
    pointRadius: 2,
    tension: 0.4,
  }],
}

const trendChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: CHART.muted, font: { size: 9 }, maxRotation: 45 } },
    y: { grid: { color: CHART.border }, ticks: { color: CHART.muted, callback: v => `$${v}M` } },
  },
}

export default function FunderRegister({ initialFilter = 'all' }) {
  const [fundFilter, setFundFilter] = useState(() => normalizeFilter(initialFilter))

  useEffect(() => {
    setFundFilter(normalizeFilter(initialFilter))
  }, [initialFilter])

  const rows = filterRows(fundFilter)

  return (
    <div>
      <div className="illustrative-banner">
        ⚠️ All figures are illustrative and forward-looking — pre-feasibility planning only.
      </div>

      <div className="summary-strip">
        {SUMMARY_STATS.map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <span className="filter-label">Stage:</span>
        {FILTER_OPTIONS.map(option => (
          <button
            key={option.id}
            type="button"
            className={`filter-btn ${fundFilter === option.id ? 'active' : ''}`}
            onClick={() => setFundFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="panel panel-flat">
        <p className="sr-only">
          Funding pipeline table listing grants and instruments by donor, type, amount, stage, and status.
        </p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Donor / Instrument</th>
              <th>Type</th>
              <th>Tier</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th>Stage</th>
              <th>Countries</th>
              <th>Next Milestone</th>
              <th>Due</th>
              <th>Flag</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td className="text-[10px] text-[#6b7280]">{row.id}</td>
                <td className="font-semibold max-w-[180px] text-[11px]">{row.donor}</td>
                <td className="text-[11px] text-[#6b7280]">{row.type}</td>
                <td>
                  <span className={`pill ${TIER_CLASS[row.tier]}`}>
                    {row.tier.charAt(0).toUpperCase() + row.tier.slice(1)}
                  </span>
                </td>
                <td className="font-bold text-right">${row.amount}M</td>
                <td><span className={`pill ${STAGE_CLASS[row.stage]}`}>{STAGE_LABEL[row.stage]}</span></td>
                <td className="text-[11px] text-[#6b7280]">{row.countries}</td>
                <td className="text-[11px]">{row.milestone}</td>
                <td className="text-[11px] text-[#6b7280]">{row.due}</td>
                <td className="text-center">{row.flag}</td>
                <td className="text-[11px] text-[#6b7280]">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fund-charts-grid">
        <div className="panel">
          <div className="panel-title">Pipeline Value by Stage ($M)</div>
          <div className="relative h-[200px]">
            <Bar data={stageChartData} options={stageChartOptions} />
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Grants by Donor Type</div>
          <div className="relative h-[200px]">
            <Doughnut data={typeChartData} options={typeChartOptions} />
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Monthly Disbursement Trend ($M)</div>
          <div className="relative h-[200px]">
            <Line data={trendChartData} options={trendChartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
