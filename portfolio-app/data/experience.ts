export interface Experience {
  period: string
  duration: string
  org: string
  mission?: string
  role: string
  desc: string
  tags: string[]
  type: 'work' | 'education'
}

export const experiences: Experience[] = [
  {
    period: 'Apr – Oct 2026',
    duration: '6 months',
    org: 'HeadMind Partners',
    mission: 'Christian Dior Couture mission',
    role: 'Junior Cybersecurity Consultant',
    desc: 'Cyber risk analysis using the ISP methodology across all Dior IT projects. Embedding Secure by Design principles upstream: risk identification, scoring, and delivery of consultant-grade reports. Tracking security action plans in collaboration with IT and business teams.',
    tags: ['ISP Methodology', 'Risk Analysis', 'Secure by Design', 'Consulting', 'EBIOS'],
    type: 'work',
  },
  {
    period: 'Apr – Aug 2025',
    duration: '4 months',
    org: 'ALTEN / Airbus',
    mission: 'Vitrolles (Aeronautics)',
    role: 'Engineering Intern — CS & Data',
    desc: 'Full development of a custom client-deliverable management application (AppSheet). MySQL database design and administration: concurrency control, data governance. Data visualisation dashboards with Power BI. End-to-end project management from requirements through client delivery.',
    tags: ['AppSheet', 'MySQL', 'Power BI', 'Data Governance', 'Project Management'],
    type: 'work',
  },
  {
    period: 'Jan 2024',
    duration: '1 month',
    org: 'EXAIL Robotics',
    mission: 'Toulon (Maritime Robotics)',
    role: 'Electronics Production Intern',
    desc: 'Testing, bug analysis and validation of electronic systems (PCBs) for autonomous underwater robots. Systematic defect identification and documentation in production environments.',
    tags: ['PCB Testing', 'Embedded Systems', 'Quality Assurance', 'Robotics'],
    type: 'work',
  },
  {
    period: '2023 – 2026',
    duration: '3 years',
    org: 'Mines Saint-Étienne',
    role: 'Engineering Degree — Cybersecurity Track (EI23)',
    desc: 'Specialisation in cybersecurity: application security, cryptography, secure architectures, and machine learning. Projects include a post-quantum encrypted messenger and a web application penetration testing lab. ISC2 CC certified.',
    tags: ['Cryptography', 'Application Security', 'PQC', 'Network Security', 'ISC2 CC'],
    type: 'education',
  },
  {
    period: '2021 – 2023',
    duration: '2 years',
    org: 'Institut Stanislas',
    mission: 'Cannes',
    role: 'MPSI — Mathematics & Physics',
    desc: 'Intensive preparatory classes for the Grandes Écoles entrance examinations. Rigorous training in advanced mathematics, physics, and engineering sciences — forming the analytical and problem-solving foundations applied throughout engineering studies.',
    tags: ['Advanced Mathematics', 'Physics', 'Analytical Reasoning', 'Grandes Écoles'],
    type: 'education',
  },
]
