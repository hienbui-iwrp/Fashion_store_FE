// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  password: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: '1',
      name: 'account1',
      password: `Account1`,
    },
    {
      id: '2',
      name: 'account2',
      password: `Account2`,
    },
    {
      id: '3',
      name: 'account3',
      password: `Account3`,
    },
  ])
}
