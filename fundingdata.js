//src/data/fundingData.js

export const FUNDING_STAGES = [
  'Grant Identified',
  'Grant Applied',
  'Grant Under Review',
  'Grant Success',
  'Grant Agreement in Progress',
  'Grant Agreement Signed',
  'Funds Disbursed',
  'Reporting',
]

export const DONORS = [
  // Anchor tier
  { id: 1,  name: 'World Bank IDA',                    type: 'IFI Concessional',      tier: 'anchor',       pledge_m: 80,   tranches: [10, 15, 20, 20, 15], stage: 'Funds Disbursed',             notes: '' },
  { id: 2,  name: 'AfDB (African Development Bank)',   type: 'IFI Concessional',      tier: 'anchor',       pledge_m: 65,   tranches: [8,  12, 15, 18, 12], stage: 'Funds Disbursed',             notes: '' },
  { id: 3,  name: 'Islamic Development Bank (IsDB)',   type: 'IFI Concessional',      tier: 'anchor',       pledge_m: 40,   tranches: [0,  8,  10, 12, 10], stage: 'Grant Agreement Signed',      notes: '' },
  { id: 4,  name: 'AIIB',                              type: 'IFI Concessional',      tier: 'anchor',       pledge_m: 35,   tranches: [0,  7,  9,  11, 8],  stage: 'Grant Agreement Signed',      notes: '' },
  { id: 5,  name: 'Switzerland (FDFA)',                type: 'Bilateral Grant',        tier: 'anchor',       pledge_m: 22,   tranches: [4,  5,  5,  5,  3],  stage: 'Funds Disbursed',             notes: '' },
  { id: 6,  name: 'Spain (AECID)',                     type: 'Bilateral Grant',        tier: 'anchor',       pledge_m: 18,   tranches: [3,  4,  4,  4,  3],  stage: 'Grant Agreement Signed',      notes: '' },
  { id: 7,  name: 'UK (FCDO)',                         type: 'Bilateral Grant',        tier: 'anchor',       pledge_m: 30,   tranches: [5,  6,  7,  7,  5],  stage: 'Funds Disbursed',             notes: '' },
  { id: 8,  name: 'Latvia (MFA)',                      type: 'Bilateral Grant',        tier: 'anchor',       pledge_m: 5,    tranches: [1,  1,  1,  1,  1],  stage: 'Grant Agreement Signed',      notes: '' },
  // Forecast tier
  { id: 9,  name: 'New Bilateral (Target)',            type: 'Bilateral Grant',        tier: 'forecast',     pledge_m: 25,   tranches: [0,  5,  7,  8,  5],  stage: 'Grant Under Review',          notes: 'Forecast placeholder — bilateral donor outreach in progress' },
  { id: 12, name: 'Kenya CA USF',                      type: 'Universal Service Fund', tier: 'forecast',     pledge_m: 50,   tranches: [0,  8,  10, 20, 12], stage: 'Grant Agreement in Progress', notes: 'Legal review of cross-border data clause pending' },
  { id: 13, name: 'Smart Africa Alliance',             type: 'Multilateral',           tier: 'forecast',     pledge_m: 15,   tranches: [0,  3,  4,  5,  3],  stage: 'Grant Applied',               notes: '' },
  { id: 14, name: 'UNECA',                             type: 'UN Agency',              tier: 'forecast',     pledge_m: 12,   tranches: [0,  2,  3,  4,  3],  stage: 'Grant Identified',            notes: '' },
  // Illustrative tier
  { id: 10, name: 'BII (British International Investment)', type: 'Mezzanine Finance', tier: 'illustrative', pledge_m: 104,  tranches: [0,  17, 17, 40, 30], stage: 'Grant Under Review',          notes: 'IC investment decision pending — illustrative' },
  { id: 11, name: 'UNICEF Outcome Bonds',              type: 'Outcome Bond',           tier: 'illustrative', pledge_m: 150,  tranches: [0,  25, 28, 58, 39], stage: 'Grant Identified',            notes: 'Table 15 T5+ data needed — INDICATIVE-PENDING UNRESOLVED' },
  { id: 15, name: 'Lido Protocol DAO',                 type: 'Corporate/Philanthropic',tier: 'illustrative', pledge_m: 15,   tranches: [0,  3,  4,  5,  3],  stage: 'Grant Identified',            notes: '' },
  { id: 16, name: 'NFT Connectivity Credits',          type: 'Innovative Finance',     tier: 'illustrative', pledge_m: 25,   tranches: [0,  5,  7,  8,  5],  stage: 'Grant Identified',            notes: '' },
  { id: 17, name: 'Connectivity Credits (Corporate)',  type: 'Corporate/Philanthropic',tier: 'illustrative', pledge_m: 15.5, tranches: [3.5,3,  3,  3,  3],  stage: 'Grant Applied',               notes: '' },
]

export const TIER_COLORS = {
  anchor:       { bg: 'bg-teal-100',  text: 'text-teal-800',  border: 'border-teal-300',  hex: '#065056' },
  forecast:     { bg: 'bg-blue-100',  text: 'text-blue-800',  border: 'border-blue-300',  hex: '#082E4A' },
  illustrative: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', hex: '#213B6E' },
}

export const STAGE_COLORS = {
  'Grant Identified':             'bg-gray-100 text-gray-700',
  'Grant Applied':                'bg-yellow-100 text-yellow-800',
  'Grant Under Review':           'bg-blue-100 text-blue-800',
  'Grant Success':                'bg-green-100 text-green-800',
  'Grant Agreement in Progress':  'bg-purple-100 text-purple-800',
  'Grant Agreement Signed':       'bg-indigo-100 text-indigo-800',
  'Funds Disbursed':              'bg-teal-100 text-teal-800',
  'Reporting':                    'bg-emerald-100 text-emerald-800',
}
