export interface Project {
  id: string
  index: string
  kind: string
  year: string
  title: string
  subtitle: string
  problem: string
  approach: string
  stack: string[]
  featured: boolean
  github?: string
  period: string
}

export const projects: Project[] = [
  {
    id: 'aegisquantum',
    index: '001',
    kind: 'Academic Project — Mines Saint-Étienne',
    year: '2026',
    title: 'AegisQuantum',
    subtitle: 'Post-Quantum End-to-End Encrypted Messenger',
    problem:
      "Classical asymmetric cryptography (RSA, ECDH) will be broken by quantum computers running Shor's algorithm. Existing messaging protocols have no credible migration path toward quantum resistance.",
    approach:
      'Built a complete E2E encrypted messaging application using NIST-standardised post-quantum algorithms. ML-KEM-768 (FIPS 203) for key encapsulation, ML-DSA-65 (FIPS 204) for digital signatures, and a KEM-adapted Double Ratchet protocol for forward secrecy — compiled from C via WebAssembly (liboqs).',
    stack: [
      'TypeScript', 'React', 'Firebase', 'WebAssembly',
      'liboqs', 'ML-KEM-768', 'ML-DSA-65', 'AES-GCM', 'Double Ratchet',
    ],
    featured: true,
    github: 'https://github.com/Auuxencee',
    period: 'Feb – Mar 2026',
  },
  {
    id: 'pentest-lab',
    index: '002',
    kind: 'Academic Project — Mines Saint-Étienne',
    year: '2025',
    title: 'Web App Security Lab',
    subtitle: 'OWASP Top 10 · Network Recon · PKI Infrastructure',
    problem:
      'Theoretical web security knowledge does not translate to operational skill without a controlled environment where real attacks can be attempted and studied systematically.',
    approach:
      'Security testing on DVWA covering the full OWASP Top 10: SQL injection, file inclusion, command injection, malicious file upload, and XSS. Network reconnaissance with Nmap and Metasploit, traffic analysis with Wireshark and Scapy. Deployed and administered a full PKI with EJBCa including certificate issuance, revocation and lifecycle management.',
    stack: [
      'Kali Linux', 'Nmap', 'Metasploit', 'Wireshark', 'Scapy',
      'SQLMap', 'Hydra', 'EJBCa', 'PKI', 'DVWA',
    ],
    featured: false,
    period: 'Nov 2025 – Jan 2026',
  },
  {
    id: 'risk-analysis',
    index: '003',
    kind: 'Internship — HeadMind Partners / Christian Dior Couture',
    year: '2026',
    title: 'ISP Risk Analysis',
    subtitle: 'Cyber Risk Framework · Secure by Design · Consultant Deliverables',
    problem:
      'Large enterprise IT programmes accumulate security debt when risk is assessed reactively. Embedding security upstream, during project design, prevents costly remediations and reduces the attack surface before systems reach production.',
    approach:
      'Applied the ISP (Information Security Program) methodology across all Christian Dior Couture IT projects. Delivered risk mappings, scored threat scenarios, produced consultant-grade reports, and worked directly with business and IT teams to define treatment measures and track security action plans.',
    stack: [
      'ISP Methodology', 'Risk Analysis', 'Secure by Design',
      'EBIOS RM', 'Threat Modeling', 'Consulting',
    ],
    featured: false,
    period: 'Apr – Oct 2026',
  },
]
