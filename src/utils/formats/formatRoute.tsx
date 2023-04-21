import { IMAGE_URL } from '@/constants'

export const formatRouteImage = (path?: string) => {
  if (!path) return ''
  if (path.includes('http')) return path

  const relativePath = 'admin_bff/uploads'
  const index = path.indexOf(relativePath)
  if (index === -1) {
    return path
  } else {
    const result = IMAGE_URL + '/' + path.slice(index + relativePath.length)
    return result
  }
}
