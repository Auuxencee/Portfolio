export interface Certification {
  id: string
  issuer: string
  name: string
  code: string
  desc: string
  status: 'earned' | 'in-progress'
  year: string
  colorClass: 'blue' | 'amber'
}

export const certifications: Certification[] = [
  {
    id: 'isc2-cc',
    issuer: 'ISC2',
    name: 'Certified in Cybersecurity',
    code: 'CC',
    desc: 'Entry-level cybersecurity certification covering core security principles, incident response, network security, and access control management.',
    status: 'earned',
    year: '2024',
    colorClass: 'blue',
  },
  {
    id: 'aws-saa',
    issuer: 'Amazon Web Services',
    name: 'Solutions Architect Associate',
    code: 'SAA-C03',
    desc: 'Designing and deploying secure, resilient, and cost-optimised AWS architectures across compute, storage, networking, and database services.',
    status: 'in-progress',
    year: '2026',
    colorClass: 'amber',
  },
  {
    id: 'aws-scs',
    issuer: 'Amazon Web Services',
    name: 'Security Specialty',
    code: 'SCS-C02',
    desc: 'Advanced cloud security: IAM, infrastructure protection, data protection, incident response, and security automation in AWS environments.',
    status: 'in-progress',
    year: '2026',
    colorClass: 'amber',
  },
]
