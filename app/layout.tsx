import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'The Human Fund | Money for People',
  description: 'The Human Fund is dedicated to making a difference in the lives of people everywhere, especially during the Festivus season.',
  generator: 'v0.dev',
  icons: {
    icon: '/images/Original_logo_bw_humans3.png',
    apple: '/images/Original_logo_bw_humans3.png',
  },
  other: {
    'google-site-verification': 'YOUR_VERIFICATION_CODE', // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
