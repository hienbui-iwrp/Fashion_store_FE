// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
  role: string
  workingLocation: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: '1',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '2',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '3',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '4',
      name: 'Hữu thọ',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '5',
      name: 'NV A',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '6',
      name: 'VN B',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '7',
      name: 'VN C',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '8',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '9',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '10',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },

    {
      id: '11',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '12',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '13',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '14',
      name: 'Hữu thọ',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '15',
      name: 'NV A',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '16',
      name: 'VN B',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '17',
      name: 'VN C',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '18',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '19',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '20',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '21',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '22',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '23',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '24',
      name: 'Hữu thọ',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '25',
      name: 'NV A',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '26',
      name: 'VN B',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '27',
      name: 'VN C',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '28',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '29',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '30',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '31',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '32',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '33',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '34',
      name: 'Hữu thọ',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '35',
      name: 'NV A',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '36',
      name: 'VN B',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 2',
    },
    {
      id: '37',
      name: 'VN C',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 3',
    },
    {
      id: '38',
      name: 'Vinh Hiển',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '39',
      name: 'VH',
      role: 'Nhân viên',
      workingLocation: 'Chi nhánh 1',
    },
    {
      id: '40',
      name: 'Tuấn Phong',
      role: 'Trưởng chi nhánh',
      workingLocation: 'Chi nhánh 2',
    },
  ])
}
