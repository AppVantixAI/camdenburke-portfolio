import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Camden Burke - AI Integration Consultant',
  description: 'Founder & AI Integration Consultant at AppVantix LLC. Helping individuals and small teams unlock time and clarity through human-first automation.',
  keywords: 'AI consultant, automation strategy, web development, app development, Camden Burke, AppVantix',
  authors: [{ name: 'Camden Burke' }],
  openGraph: {
    title: 'Camden Burke - AI Integration Consultant',
    description: 'Founder & AI Integration Consultant at AppVantix LLC',
    url: 'https://camdenburke.co.uk',
    siteName: 'Camden Burke Portfolio',
    images: [
      {
        url: 'https://appvantix.com/assets/avatars/camden.jpg',
        width: 800,
        height: 800,
        alt: 'Camden Burke',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}