// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  date: Date
  startTime: Date
  endTime: Date
  total: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      date: new Date('01/01/2022'),
      startTime: new Date('01/01/2022 08:00'),
      endTime: new Date('01/01/2022 18:20'),
      total: 8,
    },
    {
      date: new Date('02/01/2022'),
      startTime: new Date('01/01/2022 09:00'),
      endTime: new Date('01/01/2022 19:10'),
      total: 8,
    },
    {
      date: new Date('03/01/2022'),
      startTime: new Date('01/01/2022 09:00'),
      endTime: new Date('01/01/2022 18:30'),
      total: 7,
    },
    {
      date: new Date('04/01/2022'),
      startTime: new Date('01/01/2022 08:00'),
      endTime: new Date('01/01/2022 18:00'),
      total: 8,
    },
    {
      date: new Date('05/01/2022'),
      startTime: new Date('01/01/2022 09:00'),
      endTime: new Date('01/01/2022 20:00'),
      total: 8,
    },
    {
      date: new Date('06/01/2022'),
      startTime: new Date('01/01/2022 07:00'),
      endTime: new Date('01/01/2022 18:00'),
      total: 8,
    },
  ])
}
