import { EventProps } from './../utils/types/assetType'
import {
  FormatOutputFullDate,
  adminBff,
  formatResponse,
  shareBff,
} from '@/utils'

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

export const getEventClientBff = async () => {
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

export const getEventCurrentClientBff = async () => {
  const numOfNextDate = 7
  const payload = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Body>
      <NextDate>${numOfNextDate}</NextDate>
  </soap:Body>
    `
  return await shareBff
    .post(`/event-service/current-event`, payload)
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

export const updateEventBff = async (id: any, event: EventProps) => {
  const startTime = event.startTime ? FormatOutputFullDate(event.startTime) : ''
  const endTime = event.endTime ? FormatOutputFullDate(event.endTime) : ''

  const goodsXml =
    event?.goods && event.goods.length > 0
      ? event.goods.reduce(
        (acc: string, item: string) => `${acc}\n<Goods>${item}</Goods>`,
        ''
      )
      : '<Goods></Goods>'

  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
      <EventId>${id ?? ''}</EventId>
      <Name>${event?.name ?? ''}</Name>
      <Discount>${event?.discount ?? ''}</Discount>
      <StartTime>${startTime ?? ''}</StartTime>
      <EndTime>${endTime ?? ''}</EndTime>
      <Image>${event?.image ?? ''}</Image>
      ${goodsXml}
    </soap:Body>
      `

  return await adminBff
    .post(`/event-service/update-event`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getEvent err: ', err)
    })
}

export const addEventBff = async (event: EventProps) => {
  const startTime = event.startTime ? FormatOutputFullDate(event.startTime) : ''
  const endTime = event.endTime ? FormatOutputFullDate(event.endTime) : ''

  const goodsXml =
    event?.goods && event.goods.length > 0
      ? event.goods.reduce(
        (acc: string, item: string) => `${acc}\n<Goods>${item}</Goods>`,
        ''
      )
      : '<Goods></Goods>'

  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
      <Name>${event?.name ?? ''}</Name>
      <Discount>${event?.discount ?? ''}</Discount>
      <StartTime>${startTime ?? ''}</StartTime>
      <EndTime>${endTime ?? ''}</EndTime>
      <Image>${event?.image ?? ''}</Image>
      ${goodsXml}
    </soap:Body>
    </soap:Body>
      `

  return await adminBff
    .post(`/event-service/add-event`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('getEvent err: ', err)
    })
}

export const uploadEventImageBFF = async (file: {
  file: any
  eventId?: any
}) => {
  const form = new FormData()
  form.append('images', file.file)
  form.append('eventId', file.eventId ?? '')

  return adminBff
    .post('/event-service/image:upload', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('uploadEventImageBFF err: ', err)
    })
}

export const deleteEventImageBFF = async (event: { id: any }) => {
  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Body>
      <EventId>${event.id}</EventId>
    </soap:Body>`

  return adminBff
    .post('/event-service/image:delete', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      return formatResponse(res.data)
    })
    .catch((err) => {
      console.log('deleteEventImageBFF err: ', err)
    })
}
