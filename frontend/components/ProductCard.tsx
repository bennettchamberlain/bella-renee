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
      {/* Large Image - taller aspect ratio */}
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4] mb-4">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-semibold text-white uppercase tracking-wide">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-xl text-white font-medium">
            ${price.toFixed(2)} USD
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-gray-500 line-through text-base">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
