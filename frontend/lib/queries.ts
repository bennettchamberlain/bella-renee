import {groq} from 'next-sanity'

// Get all featured products for homepage
export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    compareAtPrice,
    images[] {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      name,
      slug
    },
    tags
  }
`

// Get all products for listing page
export const allProductsQuery = groq`
  *[_type == "product" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    compareAtPrice,
    images[] {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      name,
      slug
    },
    tags,
    featured
  }
`

// Get single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    compareAtPrice,
    description,
    images[] {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    videos[] {
      asset->{
        _id,
        url
      },
      title,
      thumbnail {
        asset->{
          url
        }
      }
    },
    category->{
      name,
      slug
    },
    variants[] {
      size,
      color,
      sku,
      stock,
      priceModifier
    },
    tags,
    featured,
    inStock,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          url
        }
      }
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image {
      asset->{
        url
      }
    }
  }
`

// Get products by category
export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    compareAtPrice,
    images[] {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      name,
      slug
    },
    tags
  }
`

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo {
      asset->{
        url
      }
    },
    announcementBar,
    socialLinks,
    footer,
    emailSignup
  }
`
