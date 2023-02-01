export default function formatTime(time: any): string {
  const _time = new Date(time)
  const hour = _time.getHours()
  const minute = _time.getMinutes()
  let result = ''
  if (hour < 10) result += '0' + hour
  else result += hour

  result += ':'

  if (minute < 10) result += '0' + minute
  else result += minute

  return result
}
