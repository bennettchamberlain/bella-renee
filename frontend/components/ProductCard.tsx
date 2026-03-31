import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  image: string
  imageAlt?: string
}

export default function ProductCard({
  name,
  slug,
  price,
  compareAtPrice,
  image,
  imageAlt,
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      {/* Extra Large Image - much taller aspect ratio */}
      <div className="relative overflow-hidden bg-white/5 aspect-[4/5] mb-6">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Product Info - Larger Text */}
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide">
          {name}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
            ${price.toFixed(2)} USD
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-gray-500 line-through text-lg md:text-xl">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
