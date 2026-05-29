import type { Metadata } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Auxence Massieux — Cybersecurity Engineer',
  description:
    'Cybersecurity Engineer specialising in application security, post-quantum cryptography, and secure software development. Engineering graduate of Mines Saint-Étienne.',
  keywords: [
    'cybersecurity', 'post-quantum cryptography', 'application security',
    'penetration testing', 'secure development', 'Mines Saint-Étienne',
  ],
  authors: [{ name: 'Auxence Massieux' }],
  openGraph: {
    title: 'Auxence Massieux — Cybersecurity Engineer',
    description: 'Engineering graduate specialising in cryptographic systems, defensive infrastructure, and secure software development.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
