import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Bella Renee Official Merch',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link (optional)',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'spotify',
          title: 'Spotify',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2026, Bella Renee',
        },
        {
          name: 'shippingPolicyUrl',
          title: 'Shipping Policy URL',
          type: 'url',
        },
        {
          name: 'returnPolicyUrl',
          title: 'Return Policy URL',
          type: 'url',
        },
        {
          name: 'privacyPolicyUrl',
          title: 'Privacy Policy URL',
          type: 'url',
        },
        {
          name: 'contactEmail',
          title: 'Contact Email',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'emailSignup',
      title: 'Email Signup',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'JOIN US!',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Be the first to know about new merch, promos, giveaways & sales!',
        },
        {
          name: 'formEndpoint',
          title: 'Form Endpoint URL',
          type: 'url',
          description: 'MailChimp, ConvertKit, etc. form action URL',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
