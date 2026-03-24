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
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4]">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white uppercase tracking-wide">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white font-medium">${price.toFixed(2)} USD</span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-gray-500 line-through text-sm">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
