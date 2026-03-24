import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity client with write token
const client = createClient({
  projectId: '5yhn9pbe',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-25',
  token: 'skHqdRBzXcICgowty33PU7nAMdcqtXHfUKheVkC0bmbHCJSUjwfmerjQJsr8ffpx4mXecReCJ856AJx5OhlzXYWmj6l20eKUoZ7ljGb3do3eoaHeHAYZ30BtmgUrm4eKcQ3EKBxutkYmx4Q9Un6GYJsAxvSYlmGEfqx74cIDyhlfEX8fuBYY',
})

// Product definitions based on image filenames
const products = [
  {
    name: 'Brain Freeze Hockey Jersey',
    slug: 'brain-freeze-hockey-jersey',
    images: [
      'Bella_Renee_Merch_Preview_Jersey_1.png',
      'Bella_Renee_Merch_Preview_Jersey__2.png',
      'Bella_Renee_Merch_Preview_Jersey__3.png',
    ],
    price: 140,
    category: 'jerseys',
    description:
      'Premium hockey-style jersey featuring bold Bella Renee graphics. Made from breathable polyester mesh for comfort and style at any show. Oversized fit with ribbed collar and cuffs.',
    tags: ['jersey', 'limited', 'bestseller'],
    featured: true,
  },
  {
    name: 'Bella Renee Signature Hoodie',
    slug: 'signature-hoodie',
    images: [
      'Bella_Renee_Merch_Preview_hoodie__1.png',
      'Bella_Renee_Merch_Preview_hoodie__2.png',
    ],
    price: 80,
    category: 'hoodies',
    description:
      'Ultra-soft heavyweight hoodie with front pocket and adjustable drawstring hood. Features exclusive Bella Renee artwork. Perfect for festival nights and everyday wear.',
    tags: ['hoodie', 'cozy', 'unisex'],
    featured: true,
  },
  {
    name: 'Bella Renee Crop Top',
    slug: 'crop-top',
    images: ['Bella_Renee_Merch_Preview_crop_top__1.png'],
    price: 40,
    category: 'tops',
    description:
      'Fitted crop top with bold Bella Renee branding. Soft cotton blend, perfect for dancing the night away. Pairs great with high-waisted bottoms.',
    tags: ['crop', 'fitted', 'festival'],
    featured: true,
  },
  {
    name: 'Bella Renee Long Sleeve Tee',
    slug: 'long-sleeve-tee',
    images: ['Bella_Renee_Merch_Preview_Long_Sleeve__1.png'],
    price: 55,
    category: 'tops',
    description:
      'Classic long sleeve tee with unique Bella Renee graphics on front and back. 100% cotton for all-day comfort. Versatile piece for any wardrobe.',
    tags: ['longsleeve', 'tee', 'comfortable'],
    featured: false,
  },
  {
    name: 'Bella Renee Track Pants',
    slug: 'track-pants',
    images: ['Bella_Renee_Merch_Preview_pants__1.png'],
    price: 70,
    category: 'bottoms',
    description:
      'Stylish track pants with side stripe detail and Bella Renee logo. Elastic waistband with drawstring. Soft fleece interior for maximum comfort.',
    tags: ['pants', 'track', 'comfortable'],
    featured: true,
  },
  {
    name: 'Bella Renee Sport Skirt',
    slug: 'sport-skirt',
    images: ['Bella_Renee_Merch_Preview_sport_skrit_1.png'],
    price: 50,
    category: 'bottoms',
    description:
      'Athletic-inspired skirt with built-in shorts. Features Bella Renee branding and comfortable elastic waistband. Perfect for active festival-goers.',
    tags: ['skirt', 'athletic', 'festival'],
    featured: true,
  },
]

// Categories to create
const categories = [
  {name: 'Jerseys', slug: 'jerseys', order: 1},
  {name: 'Hoodies', slug: 'hoodies', order: 2},
  {name: 'Tops', slug: 'tops', order: 3},
  {name: 'Bottoms', slug: 'bottoms', order: 4},
  {name: 'Accessories', slug: 'accessories', order: 5},
]

async function uploadImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(imagePath),
  })
  return asset._id
}

async function createCategories() {
  console.log('Creating categories...')
  const categoryMap = {}

  for (const cat of categories) {
    // Check if category exists
    const existing = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, {
      slug: cat.slug,
    })

    if (existing) {
      console.log(`✓ Category "${cat.name}" already exists`)
      categoryMap[cat.slug] = existing._id
      continue
    }

    const doc = {
      _type: 'category',
      name: cat.name,
      slug: {_type: 'slug', current: cat.slug},
      order: cat.order,
    }

    const result = await client.create(doc)
    categoryMap[cat.slug] = result._id
    console.log(`✓ Created category: ${cat.name}`)
  }

  return categoryMap
}

async function createProducts(categoryMap) {
  console.log('\nCreating products...')
  const imagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'merch-samples')

  for (const product of products) {
    // Check if product exists
    const existing = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {
      slug: product.slug,
    })

    if (existing) {
      console.log(`✓ Product "${product.name}" already exists`)
      continue
    }

    console.log(`\nUploading images for "${product.name}"...`)
    const imageRefs = []

    for (const imageName of product.images) {
      const imagePath = path.join(imagesDir, imageName)
      if (!fs.existsSync(imagePath)) {
        console.log(`  ⚠ Image not found: ${imageName}`)
        continue
      }

      const assetId = await uploadImage(imagePath)
      imageRefs.push({
        _type: 'image',
        asset: {_type: 'reference', _ref: assetId},
        alt: product.name,
      })
      console.log(`  ✓ Uploaded: ${imageName}`)
    }

    // Create product document
    const doc = {
      _type: 'product',
      name: product.name,
      slug: {_type: 'slug', current: product.slug},
      images: imageRefs,
      price: product.price,
      description: product.description,
      category: {_type: 'reference', _ref: categoryMap[product.category]},
      tags: product.tags,
      featured: product.featured,
      inStock: true,
      variants: [
        {_type: 'object', size: 's', stock: 50},
        {_type: 'object', size: 'm', stock: 50},
        {_type: 'object', size: 'l', stock: 50},
        {_type: 'object', size: 'xl', stock: 50},
      ],
    }

    await client.create(doc)
    console.log(`✅ Created product: ${product.name} ($${product.price})`)
  }
}

async function main() {
  try {
    console.log('🚀 Starting Bella Renee product import...\n')
    const categoryMap = await createCategories()
    await createProducts(categoryMap)
    console.log('\n✅ Import complete! Check Sanity Studio at http://localhost:3333')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
