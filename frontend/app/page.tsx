import {client} from '@/sanity/lib/client'
import {featuredProductsQuery} from '@/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const featuredProducts = await client.fetch(featuredProductsQuery)

  return (
    <div className="min-h-screen">
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Horizontal Scroll Grid - Mobile */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {featuredProducts.map((product: any) => (
                <div key={product._id} className="flex-none w-[70vw] snap-start">
                  <ProductCard
                    name={product.name}
                    slug={product.slug.current}
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    image={product.images[0]?.asset.url}
                    imageAlt={product.images[0]?.alt}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Regular Grid - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
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
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/products"
            className="inline-block border-2 border-white text-white px-12 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            View All Essentials
          </Link>
        </div>
      </section>

      {/* Hero/About Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold uppercase mb-6">Want More?</h2>
          <p className="text-xl text-gray-300 mb-8">Shop everything Bella Renee!</p>
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
