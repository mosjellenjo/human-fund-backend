import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Human Fund',
  description: 'The Human Fund - Making a difference in people\'s lives',
  generator: 'v0.dev',
  icons: {
    icon: '/images/Original_logo_bw_humans2.png',
    apple: '/images/Original_logo_bw_humans2.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
