// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  discount: number
  startTime: Date
  endTime: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 'e1',
      name: 'Tuần lễ Giáng sinh',
      startTime: new Date('12/20/2022 00:00'),
      discount: 20,
      endTime: new Date('12/27/2022 23:59'),
    },
    {
      id: 'e2',
      name: 'Xuân Quý Mão',
      startTime: new Date('01/22/2023'),
      discount: 15,
      endTime: new Date('01/25/2023'),
    },
  ])
}
