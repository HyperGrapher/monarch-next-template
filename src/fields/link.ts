import type { Field } from 'payload'

export const linkFields = (labelName = 'label', urlName = 'url'): Field[] => [
  { name: labelName, type: 'text', localized: true, required: true },
  {
    name: urlName,
    type: 'text',
    required: true,
    admin: { description: 'Internal path like /projects or /contact (language prefix is added automatically), or a full https:// URL.' },
  },
]
