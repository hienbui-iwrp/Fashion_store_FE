import { formatResponse, shareBff } from '@/utils'

export const getEventBFF = async () => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body/>
    `
  return await shareBff
    .post(`/event-service/all-event`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getEvent err: ', err)
    })
}

export const getEventDetailBFF = async (id: any) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
        <EventId>${id}</EventId>
    </soap:Body>
      `
  return await shareBff
    .post(`/event-service/event-detail`, payload)
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getEvent err: ', err)
    })
}
