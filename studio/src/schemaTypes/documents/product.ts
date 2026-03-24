import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'videos',
      title: 'Product Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Video Title',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original/crossed-out price (optional)',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  {title: 'XS', value: 'xs'},
                  {title: 'S', value: 's'},
                  {title: 'M', value: 'm'},
                  {title: 'L', value: 'l'},
                  {title: 'XL', value: 'xl'},
                  {title: 'XXL', value: 'xxl'},
                  {title: 'One Size', value: 'onesize'},
                ],
              },
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
            },
            {
              name: 'sku',
              title: 'SKU',
              type: 'string',
            },
            {
              name: 'stock',
              title: 'Stock Quantity',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
            {
              name: 'priceModifier',
              title: 'Price Modifier',
              type: 'number',
              description: 'Add or subtract from base price (e.g., +5 for XL)',
            },
          ],
          preview: {
            select: {
              size: 'size',
              color: 'color',
              stock: 'stock',
            },
            prepare({size, color, stock}) {
              return {
                title: `${size ? size.toUpperCase() : 'N/A'}${color ? ` - ${color}` : ''}`,
                subtitle: `Stock: ${stock ?? 'Unlimited'}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit (base SKU, variants can have their own)',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      inStock: 'inStock',
    },
    prepare({title, media, price, inStock}) {
      return {
        title,
        subtitle: `$${price} ${inStock ? '✓ In Stock' : '✗ Out of Stock'}`,
        media,
      }
    },
  },
})
