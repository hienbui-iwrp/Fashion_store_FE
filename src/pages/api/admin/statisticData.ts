// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revenue: number
  profit: number
  date: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const {
    query: { id },
    method,
  } = req
  console.log(req)

  res.status(200).json([
    { revenue: 100000, profit: 50000, date: new Date('2021-10-01') },
    { revenue: 200000, profit: 51000, date: new Date('2021-10-02') },
    { revenue: 300000, profit: 80000, date: new Date('2021-10-03') },
    { revenue: 250000, profit: 70000, date: new Date('2021-10-04') },
    { revenue: 150000, profit: 90000, date: new Date('2021-10-05') },
    { revenue: 180000, profit: 80000, date: new Date('2021-10-06') },
    { revenue: 260000, profit: 50000, date: new Date('2021-10-07') },
    { revenue: 500000, profit: 40000, date: new Date('2021-10-08') },
    { revenue: 320000, profit: 100000, date: new Date('2021-10-09') },
    { revenue: 100000, profit: 50000, date: new Date('2021-10-10') },
    { revenue: 200000, profit: 51000, date: new Date('2021-10-11') },
    { revenue: 300000, profit: 80000, date: new Date('2021-10-13') },
    { revenue: 50000, profit: 90000, date: new Date('2021-10-15') },
    { revenue: 180000, profit: 80000, date: new Date('2021-10-16') },
    { revenue: 260000, profit: 50000, date: new Date('2021-10-17') },
    { revenue: 80000, profit: 40000, date: new Date('2021-10-18') },
    { revenue: 30000, profit: 100000, date: new Date('2021-10-19') },
    { revenue: 110000, profit: 80000, date: new Date('2021-11-01') },
    { revenue: 260000, profit: 50000, date: new Date('2021-11-05') },
    { revenue: 600000, profit: 40000, date: new Date('2021-12-01') },
    { revenue: 270000, profit: 100000, date: new Date('2021-12-03') },
  ])
}
