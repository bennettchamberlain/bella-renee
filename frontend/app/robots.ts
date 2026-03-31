import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/draft/', '/studio/'],
    },
    sitemap: 'https://bellarenee.com/sitemap.xml',
  }
}
