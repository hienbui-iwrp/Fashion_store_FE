// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  user: string
  total: string
  createdDate: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 'oo1',
      user: 'VinhHien123',
      total: '1000000',
      createdDate: new Date('01/01/2022'),
    },
    {
      id: 'oo2',
      user: 'VH25',
      total: '300000',
      createdDate: new Date('01/12/2022'),
    },
  ])
}
