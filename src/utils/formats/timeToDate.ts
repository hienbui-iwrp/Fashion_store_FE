export default function timeToDate(time?: string) {
  // HH:MM:mm -> Date
  if (time) {
    const [hour, minute, second] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hour))
    date.setMinutes(parseInt(minute))
    return date
  }
  return undefined
}
