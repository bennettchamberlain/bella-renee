import {client} from '@/sanity/lib/client'
import {allProductsQuery, categoriesQuery} from '@/lib/queries'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    client.fetch(allProductsQuery),
    client.fetch(categoriesQuery),
  ])

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase text-center mb-4 tracking-wider">
            Shop All
          </h1>
          <p className="text-center text-gray-400 uppercase tracking-wide">Exclusive Bella Renee merch</p>
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-sm tracking-wide"
            >
              All
            </a>
            {categories.map((category: any) => (
              <a
                key={category._id}
                href={`/products?category=${category.slug.current}`}
                className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-sm tracking-wide"
              >
                {category.name}
              </a>
            ))}
          </div>
        )}

        {/* Products Grid - 2 columns desktop, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product: any) => (
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

        {/* No products message */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
