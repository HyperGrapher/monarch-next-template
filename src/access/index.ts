import type { Access, FieldAccess, PayloadRequest } from 'payload'

type MaybeUser = PayloadRequest['user'] | null | undefined
const hasRole = (user: MaybeUser, role: string) =>
  !!user && Array.isArray((user as any).roles) && (user as any).roles.includes(role)

export const isAdmin = (user: MaybeUser) => hasRole(user, 'admin')
/** Any signed-in CMS user (admin or editor) may manage content. */
export const isStaff = (user: MaybeUser) => !!user

export const adminOnly: Access = ({ req }) => isAdmin(req.user)
export const staffOnly: Access = ({ req }) => isStaff(req.user)
export const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req.user)

/** Public sees published documents only; signed-in staff see drafts too. Works for collections and globals. */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req.user)) return true
  return { _status: { equals: 'published' } }
}
