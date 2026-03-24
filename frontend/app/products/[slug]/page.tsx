import {client} from '@/sanity/lib/client'
import {productBySlugQuery, allProductsQuery} from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

export const revalidate = 60

// Generate static params for all products
export async function generateStaticParams() {
  const products = await client.fetch(allProductsQuery)
  return products.map((product: any) => ({
    slug: product.slug.current,
  }))
}

export default async function ProductPage({params}: {params: {slug: string}}) {
  const product = await client.fetch(productBySlugQuery, {slug: params.slug})

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 && (
              <>
                {/* Main Image */}
                <div className="relative aspect-[3/4] bg-white/5">
                  <Image
                    src={product.images[0].asset.url}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(0, 4).map((image: any, index: number) => (
                      <div key={index} className="relative aspect-square bg-white/5 cursor-pointer">
                        <Image
                          src={image.asset.url}
                          alt={image.alt || `${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold uppercase mb-4">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">${product.price.toFixed(2)} USD</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="border-t border-white/10 pt-6">
              <AddToCartButton
                product={{
                  _id: product._id,
                  name: product.name,
                  slug: product.slug.current,
                  price: product.price,
                  image: product.images?.[0]?.asset.url || '',
                }}
                variants={product.variants}
              />
            </div>

            {/* Additional Info */}
            {product.tags && product.tags.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 text-sm uppercase tracking-wide border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
