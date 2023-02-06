export default function FormatNumber(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
