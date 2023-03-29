// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CustomerInfoProps } from '@/utils'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomerInfoProps>
) {
  res.status(200).json(
    {
      name: 'account1',
      username: 'account',
      email: 'string@gmail.com',
      street: 'string',
      ward: 'string',
      district: 'string',
      province: 'string'
    })
}
