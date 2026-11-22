import type { Block } from 'payload'
import { linkFields } from '../fields/link'

// Controlled page-builder blocks. Text is localized per field (not per block) so editors
// reorder/add/remove sections ONCE and translate the text in each language.

const hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  interfaceName: 'HeroBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small label above the heading.' } },
    { name: 'heading', type: 'text', localized: true, required: true, admin: { description: 'Keep under ~60 characters.' } },
    { name: 'body', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Landscape, at least 2000 px wide.' } },
    { name: 'ctas', type: 'array', maxRows: 2, labels: { singular: 'Button', plural: 'Buttons' }, fields: linkFields() },
    { name: 'layout', type: 'select', defaultValue: 'split', options: [{ label: 'Text beside image', value: 'split' }, { label: 'Large image below text', value: 'stacked' }] },
  ],
}

const richTextSection: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text section', plural: 'Rich text sections' },
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'content', type: 'richText', localized: true, required: true },
    { name: 'width', type: 'select', defaultValue: 'narrow', options: [{ label: 'Narrow (reading width)', value: 'narrow' }, { label: 'Wide', value: 'wide' }] },
  ],
}

const textImage: Block = {
  slug: 'textImage',
  labels: { singular: 'Text + image', plural: 'Text + image sections' },
  interfaceName: 'TextImageBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Shown at its natural ratio; portrait or landscape both work.' } },
    { name: 'imagePosition', type: 'select', defaultValue: 'right', options: [{ label: 'Image on the right', value: 'right' }, { label: 'Image on the left', value: 'left' }] },
    { name: 'background', type: 'select', defaultValue: 'paper', options: [{ label: 'Paper', value: 'paper' }, { label: 'Mist (tinted)', value: 'mist' }] },
  ],
}

const imageGallery: Block = {
  slug: 'gallery',
  labels: { singular: 'Image gallery', plural: 'Image galleries' },
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    { name: 'layout', type: 'select', defaultValue: 'staggered', options: [{ label: 'Staggered', value: 'staggered' }, { label: 'Even grid', value: 'grid' }] },
  ],
}

const stats: Block = {
  slug: 'stats',
  labels: { singular: 'Statistics', plural: 'Statistics' },
  interfaceName: 'StatsBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 63, 15+, 11' } },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
  ],
}

const servicesGrid: Block = {
  slug: 'servicesGrid',
  labels: { singular: 'Services list', plural: 'Services lists' },
  interfaceName: 'ServicesGridBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, admin: { description: 'Leave empty to show every service.' } },
  ],
}

const projectsGrid: Block = {
  slug: 'projectsGrid',
  labels: { singular: 'Projects grid', plural: 'Projects grids' },
  interfaceName: 'ProjectsGridBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true, admin: { description: 'Leave empty to show the latest featured projects.' } },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 12, admin: { description: 'Used when no projects are selected.' } },
  ],
}

const testimonials: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  interfaceName: 'TestimonialsBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true, admin: { description: 'Only publish quotes you are permitted to use. Demo entries are fictional.' } },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', localized: true, required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', localized: true },
      ],
    },
  ],
}

const callToAction: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  interfaceName: 'CtaBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    ...linkFields('buttonLabel', 'buttonUrl'),
    { name: 'background', type: 'select', defaultValue: 'ink', options: [{ label: 'Dark', value: 'ink' }, { label: 'Mist (tinted)', value: 'mist' }, { label: 'Paper', value: 'paper' }] },
  ],
}

const faq: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  interfaceName: 'FaqBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}

export const blocks: Block[] = [
  hero,
  richTextSection,
  textImage,
  imageGallery,
  stats,
  servicesGrid,
  projectsGrid,
  testimonials,
  callToAction,
  faq,
]
