// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  branch: string
  total: string
  createdDate: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 'o1',
      branch: 'b1',
      total: '1000000',
      createdDate: new Date('01/01/2022'),
    },
    {
      id: 'o2',
      branch: 'b2',
      total: '300000',
      createdDate: new Date('01/12/2022'),
    },
  ])
}
