export default function formatNumber(x?: number | string): string {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return ''
}
