export default function formatDate(time: Date): string {
  const hour = time.getHours()
  const minute = time.getMinutes()
  let result = ''
  if (hour < 10) result += '0' + hour
  else result += hour

  result += ':'

  if (minute < 10) result += '0' + minute
  else result += minute

  return result
}
