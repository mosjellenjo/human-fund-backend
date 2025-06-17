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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        {/* Favicon */}
        <link rel="icon" href="/images/Original_logo_bw_humans3.png" type="image/png" />
        {/* Structured data for Search logo */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://humanfund.no",
          "logo": "https://humanfund.no/images/Original_logo_bw_humans3.png"
        }` }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
