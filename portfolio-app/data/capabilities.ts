export interface Capability {
  n: string
  title: string
  desc: string
  span: 'span-4' | 'span-6'
  vis: 'shield' | 'scan' | 'flow' | 'pki' | 'lattice' | 'risk'
}

export const capabilities: Capability[] = [
  {
    n: '001',
    title: 'Application Security',
    desc: 'Threat modeling, Secure by Design integration, OWASP Top 10 testing — from code review to deployment hardening across web and backend surfaces.',
    span: 'span-4',
    vis: 'shield',
  },
  {
    n: '002',
    title: 'Pentesting & Vulnerability Research',
    desc: 'Black-box and grey-box assessments: SQL injection, file inclusion, XSS, command injection. Network recon with Nmap, exploitation with Metasploit, traffic forensics with Wireshark.',
    span: 'span-4',
    vis: 'scan',
  },
  {
    n: '003',
    title: 'Network Security',
    desc: 'Protocol inspection, port scanning, lateral-movement detection, and traffic forensics across segmented network topologies. Scapy scripting for custom packet analysis.',
    span: 'span-4',
    vis: 'flow',
  },
  {
    n: '004',
    title: 'Public Key Infrastructure',
    desc: 'Certificate authorities, trust hierarchies, key lifecycle and revocation — deployed with EJBCa. The cryptographic plumbing of identity at scale.',
    span: 'span-6',
    vis: 'pki',
  },
  {
    n: '005',
    title: 'Post-Quantum Cryptography',
    desc: 'NIST-standardised algorithms: ML-KEM (Kyber), ML-DSA (Dilithium), SPHINCS+. KEM-adapted Double Ratchet. liboqs via WebAssembly for browser-native PQC.',
    span: 'span-6',
    vis: 'lattice',
  },
]
