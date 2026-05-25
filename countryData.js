//src/data/fundingData.js

export const COUNTRIES = [
  {
    rank: 1, code: 'KE', name: 'Kenya', flag: '🇰🇪',
    status: 'On Track', drawdown_m: 90, schools_target: 26946, schools_connected: 14200,
    technology_mix: 'Fiber (LTA-S)', capex_per_school: 2800, opex_per_school: 540,
    income_tier: 'LMIC', currency: 'KES',
    deployment_schedule_m: [12, 18, 22, 20, 18],
    milestones: [
      { year: 2026, label: 'Procurement finalised', status: 'complete' },
      { year: 2026, label: 'First 12 schools connected', status: 'complete' },
      { year: 2027, label: '14,200 schools connected', status: 'in-progress' },
      { year: 2028, label: '22,000 schools connected', status: 'pending' },
      { year: 2030, label: 'Full 26,946 schools', status: 'pending' },
    ],
    risks: [
      { level: 'low',    description: 'LTA-S contract rates locked through 2028' },
      { level: 'medium', description: 'USF cross-border data clause — legal review Q3 2027' },
    ],
    notes: 'BCG-verified benchmark country. Kenya LTA-S unit costs used as model anchor.',
    provisional: false,
  },
  {
    rank: 2, code: 'RW', name: 'Rwanda', flag: '🇷🇼',
    status: 'Complete', drawdown_m: 50, schools_target: 3890, schools_connected: 3890,
    technology_mix: 'Fiber / WISP', capex_per_school: 5369, opex_per_school: 2183,
    income_tier: 'LIC', currency: 'RWF',
    deployment_schedule_m: [5, 10, 15, 12, 8],
    milestones: [
      { year: 2026, label: 'Project launch', status: 'complete' },
      { year: 2027, label: 'All 3,890 schools connected', status: 'complete' },
      { year: 2027, label: 'Handover to national operator', status: 'complete' },
    ],
    risks: [
      { level: 'low', description: 'Government partnership established — low execution risk' },
    ],
    notes: 'GSR21 Rwanda benchmark used. BCG-verified WISP costs applied.',
    provisional: false,
  },
  {
    rank: 3, code: 'SL', name: 'Sierra Leone', flag: '🇸🇱',
    status: 'On Track', drawdown_m: 50, schools_target: 3120, schools_connected: 980,
    technology_mix: 'Satellite / WISP', capex_per_school: 5204, opex_per_school: 6040,
    income_tier: 'LIC', currency: 'SLE',
    deployment_schedule_m: [5, 10, 15, 12, 8],
    milestones: [
      { year: 2026, label: 'Vendor mobilisation', status: 'complete' },
      { year: 2027, label: '980 schools connected', status: 'in-progress' },
      { year: 2029, label: 'Full 3,120 schools', status: 'pending' },
    ],
    risks: [
      { level: 'high',   description: 'Satellite OpEx high vs. BCG benchmark — cost overrun watch' },
      { level: 'medium', description: 'Rainy season deployment delays Q2/Q3' },
    ],
    notes: 'BCG-verified. High OpEx profile due to satellite dependency.',
    provisional: false,
  },
  {
    rank: 4, code: 'NG', name: 'Nigeria', flag: '🇳🇬',
    status: 'At Risk', drawdown_m: 120, schools_target: 22000, schools_connected: 1200,
    technology_mix: '4G / WISP', capex_per_school: 526, opex_per_school: 1445,
    income_tier: 'LMIC', currency: 'NGN',
    deployment_schedule_m: [15, 25, 30, 28, 22],
    milestones: [
      { year: 2026, label: 'Federal MoU signed', status: 'complete' },
      { year: 2027, label: '1,200 schools — pilot phase', status: 'in-progress' },
      { year: 2028, label: '10,000 schools target', status: 'at-risk' },
      { year: 2030, label: 'Full 22,000 schools', status: 'pending' },
    ],
    risks: [
      { level: 'high',   description: 'FX volatility — NGN devaluation +40% since model baseline' },
      { level: 'high',   description: 'State-level procurement bureaucracy causing delays' },
      { level: 'medium', description: 'Grid reliability in northern states — power backup needed' },
    ],
    notes: 'Provisional — ITU LMIC scaling applied. Giga Maps verification pending.',
    provisional: true,
  },
  {
    rank: 5, code: 'ZA', name: 'South Africa', flag: '🇿🇦',
    status: 'On Track', drawdown_m: 75, schools_target: 8500, schools_connected: 2100,
    technology_mix: 'Fiber / 4G', capex_per_school: 2800, opex_per_school: 540,
    income_tier: 'UMIC', currency: 'ZAR',
    deployment_schedule_m: [8, 15, 20, 18, 14],
    milestones: [
      { year: 2026, label: 'DOE partnership agreement', status: 'complete' },
      { year: 2027, label: '2,100 schools connected', status: 'in-progress' },
      { year: 2029, label: 'Full 8,500 schools', status: 'pending' },
    ],
    risks: [
      { level: 'medium', description: 'Load-shedding — backup power costs not fully modelled' },
    ],
    notes: 'Provisional — UMIC scaling applied.',
    provisional: true,
  },
  {
    rank: 6, code: 'TZ', name: 'Tanzania', flag: '🇹🇿',
    status: 'On Track', drawdown_m: 79, schools_target: 14445, schools_connected: 3200,
    technology_mix: '4G / Satellite', capex_per_school: 526, opex_per_school: 1445,
    income_tier: 'LIC', currency: 'TZS',
    deployment_schedule_m: [10, 18, 22, 18, 11],
    milestones: [
      { year: 2026, label: 'Vendor pre-qual complete', status: 'complete' },
      { year: 2027, label: '3,200 schools connected', status: 'in-progress' },
      { year: 2029, label: 'Full 14,445 schools', status: 'pending' },
    ],
    risks: [
      { level: 'medium', description: 'Rural last-mile infrastructure — satellite fallback required' },
    ],
    notes: 'Provisional — ITU LIC scaling applied.',
    provisional: true,
  },
  {
    rank: 7, code: 'ET', name: 'Ethiopia', flag: '🇪🇹',
    status: 'On Track', drawdown_m: 95, schools_target: 18200, schools_connected: 800,
    technology_mix: 'Satellite / 4G', capex_per_school: 5204, opex_per_school: 6040,
    income_tier: 'LIC', currency: 'ETB',
    deployment_schedule_m: [8, 18, 25, 25, 19],
    milestones: [
      { year: 2026, label: 'Ministry MoU', status: 'complete' },
      { year: 2027, label: '800 schools — Phase 1', status: 'in-progress' },
      { year: 2030, label: 'Full 18,200 schools', status: 'pending' },
    ],
    risks: [
      { level: 'high',   description: 'Conflict-affected regions — security clearance required' },
      { level: 'medium', description: 'Satellite cost profile above BCG benchmark' },
    ],
    notes: 'Provisional — LIC satellite-heavy profile. High execution risk.',
    provisional: true,
  },
  {
    rank: 8, code: 'GH', name: 'Ghana', flag: '🇬🇭',
    status: 'On Track', drawdown_m: 55, schools_target: 7200, schools_connected: 1800,
    technology_mix: 'Fiber / 4G', capex_per_school: 2800, opex_per_school: 540,
    income_tier: 'LMIC', currency: 'GHS',
    deployment_schedule_m: [6, 12, 15, 13, 9],
    milestones: [
      { year: 2026, label: 'GhanaLearn partnership', status: 'complete' },
      { year: 2027, label: '1,800 schools connected', status: 'in-progress' },
      { year: 2029, label: 'Full 7,200 schools', status: 'pending' },
    ],
    risks: [
      { level: 'low', description: 'Strong mobile infrastructure baseline' },
    ],
    notes: 'Provisional — LMIC scaling applied.',
    provisional: true,
  },
  {
    rank: 9, code: 'SN', name: 'Senegal', flag: '🇸🇳',
    status: 'On Track', drawdown_m: 45, schools_target: 6800, schools_connected: 1100,
    technology_mix: '4G / WISP', capex_per_school: 526, opex_per_school: 1445,
    income_tier: 'LIC', currency: 'XOF',
    deployment_schedule_m: [5, 10, 12, 10, 8],
    milestones: [
      { year: 2026, label: 'MEN partnership signed', status: 'complete' },
      { year: 2027, label: '1,100 schools connected', status: 'in-progress' },
      { year: 2029, label: 'Full 6,800 schools', status: 'pending' },
    ],
    risks: [
      { level: 'low', description: 'Stable political environment, strong EdTech ecosystem' },
    ],
    notes: 'Provisional — LIC scaling applied.',
    provisional: true,
  },
  {
    rank: 10, code: 'UG', name: 'Uganda', flag: '🇺🇬',
    status: 'On Track', drawdown_m: 50, schools_target: 9100, schools_connected: 900,
    technology_mix: 'Satellite / 4G', capex_per_school: 5204, opex_per_school: 6040,
    income_tier: 'LIC', currency: 'UGX',
    deployment_schedule_m: [5, 10, 14, 13, 8],
    milestones: [
      { year: 2026, label: 'Vendor selection complete', status: 'complete' },
      { year: 2027, label: '900 schools connected', status: 'in-progress' },
      { year: 2030, label: 'Full 9,100 schools', status: 'pending' },
    ],
    risks: [
      { level: 'medium', description: 'Satellite OpEx sustainability beyond Year 3' },
    ],
    notes: 'Provisional — LIC satellite profile applied.',
    provisional: true,
  },
  {
    rank: 11, code: 'MZ', name: 'Mozambique', flag: '🇲🇿',
    status: 'On Track', drawdown_m: 36, schools_target: 5800, schools_connected: 400,
    technology_mix: 'Satellite', capex_per_school: 5204, opex_per_school: 6040,
    income_tier: 'LIC', currency: 'MZN',
    deployment_schedule_m: [4, 7, 10, 9, 6],
    milestones: [
      { year: 2026, label: 'Initial scoping complete', status: 'complete' },
      { year: 2027, label: '400 schools — pilot', status: 'in-progress' },
      { year: 2030, label: 'Full 5,800 schools', status: 'pending' },
    ],
    risks: [
      { level: 'high',   description: 'Cyclone risk — infrastructure hardening required' },
      { level: 'medium', description: 'Limited local ISP capacity' },
    ],
    notes: 'Provisional — LIC satellite profile. High climate risk.',
    provisional: true,
  },
  {
    rank: 12, code: 'MW', name: 'Malawi', flag: '🇲🇼',
    status: 'On Track', drawdown_m: 20, schools_target: 8068, schools_connected: 120,
    technology_mix: 'Satellite / 4G', capex_per_school: 5204, opex_per_school: 6040,
    income_tier: 'LIC', currency: 'MWK',
    deployment_schedule_m: [2, 4, 6, 5, 3],
    milestones: [
      { year: 2026, label: 'Needs assessment', status: 'complete' },
      { year: 2027, label: '120 schools — pilot', status: 'in-progress' },
      { year: 2030, label: 'Full 8,068 schools', status: 'pending' },
    ],
    risks: [
      { level: 'medium', description: 'Fiscal space constraints — sovereign co-funding uncertain' },
    ],
    notes: 'Provisional — LIC scaling. Lowest drawdown per school-target ratio.',
    provisional: true,
  },
]

export const STATUS_COLORS = {
  'Complete': 'bg-emerald-100 text-emerald-800',
  'On Track':  'bg-teal-100 text-teal-800',
  'At Risk':   'bg-red-100 text-red-800',
  'Delayed':   'bg-amber-100 text-amber-800',
}

export const RISK_COLORS = {
  low:    'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high:   'bg-red-100 text-red-700 border-red-200',
}
