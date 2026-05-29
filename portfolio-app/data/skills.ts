export interface Skill {
  id: string
  label: string
  group: string
  x: number
  y: number
}

export const skills: Skill[] = [
  { id: 'java',        label: 'Java',        group: 'Languages',  x: 18, y: 28 },
  { id: 'python',      label: 'Python',      group: 'Languages',  x: 32, y: 14 },
  { id: 'ts',          label: 'TypeScript',  group: 'Languages',  x: 48, y: 24 },
  { id: 'sql',         label: 'SQL',         group: 'Languages',  x: 22, y: 56 },
  { id: 'nmap',        label: 'Nmap',        group: 'Recon',      x: 65, y: 18 },
  { id: 'metasploit',  label: 'Metasploit',  group: 'Exploit',    x: 78, y: 32 },
  { id: 'wireshark',   label: 'Wireshark',   group: 'Analysis',   x: 70, y: 60 },
  { id: 'kali',        label: 'Kali Linux',  group: 'Platform',   x: 86, y: 50 },
  { id: 'pki',         label: 'PKI / EJBCa', group: 'Crypto',     x: 42, y: 68 },
  { id: 'pqc',         label: 'PQC / liboqs',group: 'Crypto',     x: 58, y: 78 },
  { id: 'firebase',    label: 'Firebase',    group: 'Backend',    x: 35, y: 42 },
  { id: 'docker',      label: 'Docker',      group: 'Infra',      x: 14, y: 72 },
]
