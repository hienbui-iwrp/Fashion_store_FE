import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { ModalAddEditStaff } from '@/utils'
import { InputSearch } from '@/components'
import { useRouter } from 'next/router'

interface DataType {
  id: string
  name: string
  price: number
  cost: number
  supplier: string
  gender: string
  type: string
  age: string
  color: string
  size: string
  image: string[]
  quantity: number
}

interface DateItem {
  id: string
  name: string
  quantity: number
}

const Goods = () => {
  const [data, setData] = useState<DateItem[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const columns: ColumnsType<DateItem> = []
  if (data[0]) {
    columns.push({
      title: 'STT',
      dataIndex: '',
      render(text: string, record: DateItem, index: number) {
        return {
          children: <div>{index}</div>,
        }
      },
      sorter: (a: DateItem, b: DateItem) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Mã hàng hóa',
      dataIndex: 'id',
      render(text: string, record: DateItem, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DateItem, b: DateItem) => (a.id > b.id ? 1 : -1),
    })
    columns.push({
      title: 'Tên hàng hóa',
      dataIndex: 'name',
      render(text: string, record: DateItem, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DateItem, b: DateItem) => (a.id > b.id ? 1 : -1),
    })
    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: DateItem, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DateItem, b: DateItem) => (a.id > b.id ? 1 : -1),
    })
  }

  const getData = async () => {
    await axios.get(`${BASE_URL}/api/admin/goodsData`).then((res) => {
      const listId = Array.from(
        new Set(
          res.data.map((item: any) => {
            return item.id
          })
        )
      )

      const _data = listId.map((id: any) => {
        console.log(
          id.value,
          'name: ',
          res.data.find((item: any) => item.id == id)
        )
        return {
          id: id,
          name: res.data.find((item: any) => item.id == id).name,
          quantity: res.data.reduce((acc: number, item: any) => {
            return acc + (item.id == id ? item.quantity : 0)
          }, 0),
        }
      })
      setData(_data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              router.push(BASE_URL + 'goods/detail')
            }}
            large
          />
          <InputSearch />
        </div>
        <TableList<DateItem>
          data={data}
          title='Danh sách hàng hóa'
          columns={columns}
          selectUrl={BASE_URL + 'admin/goods/detail'}
          loading={loading}
        />
      </Space>
    </>
  )
}

Goods.displayName = 'Goods Management'

export default Goods
