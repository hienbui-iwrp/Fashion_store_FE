export default function FormatMoney(x: number): string {
  return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
export function FormatMoneyD(x: number): string {
  return x.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
