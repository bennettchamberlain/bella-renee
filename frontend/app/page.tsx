import {client} from '@/sanity/lib/client'
import {featuredProductsQuery} from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import type {Metadata} from 'next'

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Bella Renee Official Merch | EDM & Drum & Bass Apparel',
  description: 'Shop exclusive Bella Renee merch. Official hoodies, jerseys, and apparel from the rising EDM & Drum & Bass artist. A lot of emotion & a lil bit of bass.',
}

export default async function Home() {
  const featuredProducts = await client.fetch(featuredProductsQuery)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <Image
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80"
          alt="Bella Renee Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase mb-4 tracking-wider">
              Bella Renee
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-widest">Official Merch</p>
          </div>
        </div>
      </section>

      {/* Featured Products - 2 columns max, 1 on mobile */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {featuredProducts.map((product: any) => (
              <ProductCard
                key={product._id}
                name={product.name}
                slug={product.slug.current}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                image={product.images[0]?.asset.url}
                imageAlt={product.images[0]?.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View All CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/products"
            className="inline-block border-2 border-white text-white px-12 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            View All Essentials
          </Link>
        </div>
      </section>

      {/* Want More Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 tracking-wider">Want More?</h2>
          <p className="text-xl text-gray-300 mb-8 uppercase tracking-wide">Shop everything Bella Renee!</p>
          <Link
            href="/products"
            className="inline-block bg-white text-black px-12 py-4 font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Go Get It, Fam!
          </Link>
        </div>
      </section>
    </div>
  )
}
