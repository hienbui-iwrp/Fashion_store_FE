import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'
import AddButton from '@/components/Button/AddButton'
import TableList from '@/components/Table/table'
import { ColumnsType } from 'antd/es/table'
import { Colors } from '@/constants'

interface DataType {
  id: string
  name: string
  address: string
}

const BranchManagement = memo(() => {
  const [data, setData] = useState<DataType[]>([
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
  ])
  const columns: ColumnsType<DataType> = []
  for (const key in data[0]) {
    columns.push({
      title: key,
      dataIndex: key,
      sorter: (a: DataType, b: DataType) => (a[key] > b[key] ? 1 : -1),
      ellipsis: true,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{text}</div>,
        }
      },
    })
  }

  const content = (
    <div>
      <AddButton label='Thêm mới' />
      <TableList<DataType>
        data={data}
        title='Danh sách kho'
        columns={columns}
      />
    </div>
  )

  return <LayoutAdmin content={content} selected={0} />
})

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
