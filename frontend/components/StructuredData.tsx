export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bella Renee',
    alternateName: 'Bella Renee Music',
    url: 'https://bellarenee.com',
    logo: 'https://bellarenee.com/logo.png',
    sameAs: [
      'https://instagram.com/bellareneemusic',
      'https://tiktok.com/@bellareneemusic',
      'https://youtube.com/c/BellaReneeMusic',
      'https://x.com/bellareneemusic',
      'https://facebook.com/BellaReneeMusic',
      'https://www.bandsintown.com/a/11339806-bella-renee',
    ],
  }

  const musicGroupSchema = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Bella Renee',
    genre: ['EDM', 'Drum and Bass', 'Electronic Dance Music'],
    description: 'EDM & Drum and Bass artist. A lot of emotion & a lil bit of bass.',
    url: 'https://hoo.be/bellarenee',
    sameAs: [
      'https://instagram.com/bellareneemusic',
      'https://tiktok.com/@bellareneemusic',
      'https://youtube.com/c/BellaReneeMusic',
      'https://x.com/bellareneemusic',
      'https://facebook.com/BellaReneeMusic',
    ],
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bella Renee Official Store',
    description: 'Official merch store for EDM & Drum and Bass artist Bella Renee',
    url: 'https://bellarenee.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bellarenee.com/products?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(musicGroupSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(webSiteSchema)}}
      />
    </>
  )
}
