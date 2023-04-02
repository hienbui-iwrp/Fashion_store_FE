import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { GoodsTypes, Routes } from '@/constants'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import { GoodsProps, formatGoodsDataXML } from '@/utils'
import { InputSearch } from '@/components'
import { useRouter } from 'next/router'
import { getGoodsBFF } from '@/api/goods'

const Goods = () => {
  const [data, setData] = useState<GoodsProps[]>([])
  const [allData, setAllData] = useState<GoodsProps[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const columns: ColumnsType<GoodsProps> = []
  if (data[0]) {
    columns.push({
      title: 'Mã hàng hóa',
      dataIndex: 'id',
      render(text: string, record: GoodsProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Tên hàng hóa',
      dataIndex: 'name',
      render(text: string, record: GoodsProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Loại',
      dataIndex: 'type',
      render(text: string, record: GoodsProps, index: number) {
        return (
          GoodsTypes.find((item: any) => item.value == record.type)?.label ??
          'Không xác định'
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 70 },
        }
      },
      filters: GoodsTypes.map((item: any) => {
        return { text: item.label, value: item.value }
      }),
      onFilter: (value: string | number | boolean, record: GoodsProps) =>
        record.type == value,
    })

    columns.push({
      title: 'Trạng thái',
      dataIndex: 'isSale',
      render(text: string, record: GoodsProps, index: number) {
        return record.isSale ? 'Đang bán' : 'Tạm ngưng'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      filters: [
        { text: 'Đang bán', value: true },
        { text: 'Tạm ngưng', value: false },
      ],
      onFilter: (value: string | number | boolean, record: GoodsProps) =>
        record.isSale == value,
    })
  }

  const getData = async () => {
    setLoading(true)
    await getGoodsBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')

        const _data = res.Data.map((item: GoodsProps) =>
          formatGoodsDataXML(item)
        ).reduce((acc: GoodsProps[], item: GoodsProps) => {
          if (!acc?.find((i: GoodsProps) => i.id == item.id)) {
            return [...acc, item]
          } else return acc
        }, [])

        setData(_data)
        setAllData(_data)
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              router.push(Routes.admin.goodsDetail)
            }}
            large
          />
          <InputSearch
            onEnter={(text) => {
              setLoading(true)
              setData(
                allData.filter(
                  (account: GoodsProps) =>
                    account.id.toLowerCase().includes(text.toLowerCase()) ||
                    account.name.toLowerCase().includes(text.toLowerCase())
                )
              )
              setLoading(false)
            }}
            onClear={() => {
              setData(allData)
            }}
          />
        </div>
        <TableList<GoodsProps>
          data={data}
          title='Danh sách hàng hóa'
          columns={columns}
          selectUrl={Routes.admin.goodsDetail}
          loading={loading}
        />
      </Space>
    </>
  )
}

Goods.displayName = 'Goods Management'

export default Goods
