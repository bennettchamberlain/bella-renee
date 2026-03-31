import {MetadataRoute} from 'next'
import {client} from '@/sanity/lib/client'
import {allProductsQuery} from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all products for dynamic URLs
  const products = await client.fetch(allProductsQuery)

  // Base URL - update this to your production domain
  const baseUrl = 'https://bellarenee.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
