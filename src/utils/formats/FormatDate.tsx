export default function FormatOutputDate(date: any): string {
  // date => dd/MM/YYYY
  if (date) {
    const _date = new Date(date)

    const day = _date.getDate()
    const month = _date.getMonth() + 1

    let result: string = day < 10 ? '0' + day : day.toString()

    result += '/' + (month < 10 ? '0' + month : month)

    return result + '/' + _date.getFullYear()
  }
  return ''
}
export const FormatDateYearFirst = (date: any) => {
  // date => dd/MM/YYYY
  if (date) {
    const _date = new Date(date)

    const day = _date.getDate()
    const month = _date.getMonth() + 1

    let result: string = _date.getFullYear().toString()

    result += '/' + (month < 10 ? '0' + month : month)

    return result + '/' + (day < 10 ? '0' + day : day)
  }
  return ''
}

export const FormatOutputFullDate = (date: any) => {
  // date => YYYY/MM/DD HH:mm:ss
  if (date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  return ''
}

export const FormatDateAndTime = (date: Date, time: Date) => {
  console.log(date, 'date-time', time)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()

  const combinedDate = new Date(year, month, day, hours, minutes)
  return combinedDate
}
