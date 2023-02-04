export default function FormatOutputDate(date: any): string {
  const _date = new Date(date)

  const day = _date.getDate()
  const month = _date.getMonth() + 1

  let result: string = day < 10 ? '0' + day : day.toString()

  result += '/' + (month < 10 ? '0' + month : month)

  return result + '/' + _date.getFullYear()
}
