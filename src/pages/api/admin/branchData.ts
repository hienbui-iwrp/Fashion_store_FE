// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  address: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: '1',
      name: 'Chi nhánh 1',
      address: `New York No. Lake Park`,
    },
    {
      id: '2',
      name: 'Chi nhánh 2',
      address: ` Lake Park`,
    },
    {
      id: '3',
      name: 'Chi nhánh 3',
      address: ` Lake Park`,
    },
    {
      id: '4',
      name: 'Chi nhánh 4',
      address: `New York No. Lake Park`,
    },
    {
      id: '5',
      name: 'Chi nhánh 5',
      address: `New York No. Lake Park`,
    },
    {
      id: '6',
      name: 'Chi nhánh 6',
      address: `New York No. Lake Park`,
    },
    {
      id: '7',
      name: 'Chi nhánh 1',
      address: `New York No. Lake Park`,
    },
    {
      id: '8',
      name: 'Chi nhánh 2',
      address: ` Lake Park`,
    },
    {
      id: '9',
      name: 'Chi nhánh 3',
      address: ` Lake Park`,
    },
    {
      id: '10',
      name: 'Chi nhánh 4',
      address: `New York No. Lake Park`,
    },
    {
      id: '11',
      name: 'Chi nhánh 5',
      address: `New York No. Lake Park`,
    },
    {
      id: '12',
      name: 'Chi nhánh 6',
      address: `New York No. Lake Park`,
    },
  ])
}
