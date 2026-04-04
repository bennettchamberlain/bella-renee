import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter, IBM_Plex_Mono} from 'next/font/google'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '@/app/client-utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import {CartProvider} from '@/context/CartContext'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  
  // SEO-optimized defaults
  const title = 'Bella Renee Official Merch | EDM & Drum & Bass Apparel'
  const description = 'Shop exclusive Bella Renee merch. Official hoodies, jerseys, and apparel from the rising EDM & Drum & Bass artist. A lot of emotion & a lil bit of bass.'
  
  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  
  // Use the Bella Renee hero image for Open Graph if no custom image is set
  const ogImageUrl = ogImage?.url || '/images/bella-hero.jpg'
  
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  
  return {
    metadataBase,
    title: {
      template: `%s | Bella Renee Official Store`,
      default: title,
    },
    description,
    keywords: [
      'Bella Renee',
      'Bella Renee merch',
      'EDM merch',
      'Drum and Bass apparel',
      'EDM artist merch',
      'Kannibalen Records',
      'electronic music apparel',
      'Bella Renee hoodie',
      'Bella Renee jersey',
      'official artist merch'
    ],
    authors: [{name: 'Bella Renee'}],
    creator: 'Bella Renee',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      title,
      description,
      siteName: 'Bella Renee Official Store',
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Bella Renee - EDM & Drum & Bass Artist',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@bellareneemusic',
      creator: '@bellareneemusic',
      images: [ogImageUrl],
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
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="bg-black text-white">
        <CartProvider>
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
