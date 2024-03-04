import './globals.css'

import Footer from './components/Footer'
import MainNav from './components/MainNav'
import { Inter } from 'next/font/google'

import Loading from './components/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home - SoCal Politics',
  applicationName: 'SoCal Politics',
  keywords: ['Next.js', 'React', 'JavaScript', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
  authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com' }],
  creator: 'Jose Toscano',
  publisher: 'Jose Toscano',
  favicon: 'https://socalpolitics.com/cdn/images/icon.ico',
  description: 'We are a nonpartisan news outlet dedicated to providing the best coverage on elections and politics that impact Southern California',
  metadataBase: new URL('https://socalpolitics.com'),
  referrer: 'access-control-allow-origin',
  openGraph: {
    title: 'Home - SoCal Politics',
    description: 'We are a nonpartisan news outlet dedicated to providing the best coverage on elections and politics at the local, statewide, and federal levels that have an impact on Southern California',
    url: 'https://socalpolitics.com',
    siteName: 'SoCal Politics',
    images: [
      {
        url: 'https://socalpolitics.com/cdn/images/banner.png', 
        secureUrl: 'https://socalpolitics.com/cdn/images/banner.png',
        width: 1200,
        height: 630,
        alt: 'SoCal Politics Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - SoCal Politics',
    description: 'We are a nonpartisan news outlet dedicated to providing the best coverage on elections and politics at the local, statewide, and federal levels that have an impact on Southern California',
    siteId: '1467726470533754880',
    creator: '@_socalpolitics',
    creatorId: '1467726470533754880',
    images: ['https://socalpolitics.com/cdn/images/banner.png'], // Must be an absolute URL
  },
  alternates: {
    canonical: 'https://socalpolitics.com',
    languages: {
      'en-US': 'https://socalpolitics.com',
    },
  },
  other: {
    "google-site-verification": 'hbu7Dt1MaJ2hKRPEziVTTXZdDup_Rx9RrZfLE7zcMp0',
  },
  manifest: 'https://socalpolitics.com/cdn/files/manifest.json',
}

export function generateViewport({ params }) {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#A62A28' },
      { media: '(prefers-color-scheme: dark)', color: '#ce3735' },
    ],  
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* <meta name="theme-color" content="#A62A28"/> */}
        <meta name="google-site-verification" content="hbu7Dt1MaJ2hKRPEziVTTXZdDup_Rx9RrZfLE7zcMp0" />

      </head>
      <body>

      <MainNav />

      {children}
      
      <Footer/>

      </body>
    </html>
  )
}
