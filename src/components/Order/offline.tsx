import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes } from '@/constants'
import { DatePicker, Space } from 'antd'
import { TableList, InputSearch } from '@/components'
import {
  OrderAdminData,
  formatDate,
  formatNumber,
  formatOrderAdminDataXML,
} from '@/utils'
import { getOfflineOrdersBFF } from '@/api'
import { Dayjs } from 'dayjs'

export const OrderOffline = (props: { role?: number }) => {
  const [data, setData] = useState<OrderAdminData[]>([])
  const [allData, setAllData] = useState<OrderAdminData[]>([])
  const [loading, setLoading] = useState(true)
  const [minDate, setMinDate] = useState<Dayjs>()
  const [maxDate, setMaxDate] = useState<Dayjs>()

  const columns: ColumnsType<OrderAdminData> = []
  if (data) {
    columns.push({
      title: 'Mã đơn',
      dataIndex: 'id',
      render(text: string, record: OrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: OrderAdminData, b: OrderAdminData) =>
        a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Mã công khai',
      dataIndex: 'publicId',
      render(text: string, record: OrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: OrderAdminData, b: OrderAdminData) =>
        a.publicId.toLowerCase() > b.publicId.toLowerCase() ? 1 : -1,
    })

    columns.push({
      title: 'Số hàng',
      dataIndex: 'totalGoods',
      render(text: string, record: OrderAdminData, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: OrderAdminData, b: OrderAdminData) =>
        a.totalGoods > b.totalGoods ? 1 : -1,
    })

    columns.push({
      title: 'Ngày giao dịch',
      dataIndex: 'transactionDate',
      render(text: string, record: OrderAdminData, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 130 },
        }
      },
      sorter: (a: OrderAdminData, b: OrderAdminData) =>
        a.transactionDate > b.transactionDate ? 1 : -1,
    })

    columns.push({
      title: 'Giá trị',
      dataIndex: 'totalPrice',
      render(text: string, record: OrderAdminData, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: OrderAdminData, b: OrderAdminData) =>
        a.totalPrice > b.totalPrice ? 1 : -1,
    })
  }

  const getData = async () => {
    await getOfflineOrdersBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error()
        const _data = res.Data.map((item: any) => formatOrderAdminDataXML(item))
        if (props.role == 6) {
          setData(
            _data.filter(
              (item: OrderAdminData) =>
                item.offlineData?.branchId == localStorage.getItem('branchId')
            )
          )
          setAllData(
            _data.filter(
              (item: OrderAdminData) =>
                item.offlineData?.branchId == localStorage.getItem('branchId')
            )
          )
        } else {
          setData(_data)
          setAllData(_data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (minDate || maxDate) {
      setData(
        allData.filter(
          (item: OrderAdminData) =>
            (minDate?.toDate() ?? 0) <= item.transactionDate &&
            (maxDate?.toDate() ?? new Date(9999, 11, 31)) >=
              item.transactionDate
        )
      )
    } else {
      setData(allData)
    }
  }, [minDate, maxDate])

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Space size='large' style={{ marginBottom: 10 }}>
            <DatePicker
              style={{ borderRadius: 12 }}
              onChange={(date) => {
                setMinDate(date ?? undefined)
              }}
            />
            <DatePicker
              style={{ borderRadius: 12 }}
              onChange={(date) => {
                setMaxDate(date ?? undefined)
              }}
            />
          </Space>
          <InputSearch
            onEnter={(text) =>
              setData(
                allData.filter(
                  (item: OrderAdminData) =>
                    item.id.toLowerCase().includes(text.toLowerCase()) ||
                    item.publicId.toLowerCase().includes(text.toLowerCase())
                )
              )
            }
            onClear={() => setData(allData)}
          />
        </div>
        <TableList<OrderAdminData>
          data={data}
          title='Danh sách đơn hàng'
          columns={columns}
          selectUrl={
            props?.role == 3
              ? Routes.branchManager.orderDetail
              : props?.role == 6
              ? Routes.branchLeader.orderDetail
              : Routes.admin.orderDetail
          }
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </>
  )
}
