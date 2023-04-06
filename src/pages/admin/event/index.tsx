import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes } from '@/constants'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import { EventProps, formatDate, formatEventDataXML, formatTime } from '@/utils'
import { InputSearch } from '@/components'
import { useRouter } from 'next/router'
import { getEventBFF } from '@/api'

const Event = () => {
  const [data, setData] = useState<EventProps[]>([])
  const [allData, setAllData] = useState<EventProps[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const columns: ColumnsType<EventProps> = []
  if (data) {
    columns.push({
      title: 'Mã sự kiện',
      dataIndex: 'id',
      fixed: 'left',
      render(text: string, record: EventProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
      sorter: (a: EventProps, b: EventProps) =>
        (a?.id ?? 1) > (b?.id ?? 1) ? 1 : -1,
    })

    columns.push({
      title: 'Tên sự kiện',
      dataIndex: 'name',
      render(text: string, record: EventProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
      sorter: (a: EventProps, b: EventProps) =>
        (a.name ?? 1) > (b.name ?? 1) ? 1 : -1,
    })

    columns.push({
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      render(text: string, record: EventProps, index: number) {
        return formatTime(text) + ' - ' + formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 150 },
        }
      },
      sorter: (a: EventProps, b: EventProps) =>
        (a.startTime ?? 1) > (b.startTime ?? 1) ? 1 : -1,
    })
    columns.push({
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      render(text: string, record: EventProps, index: number) {
        return formatTime(text) + ' - ' + formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 150 },
        }
      },
      sorter: (a: EventProps, b: EventProps) =>
        (a.endTime ?? 1) > (b.endTime ?? 1) ? 1 : -1,
    })

    columns.push({
      title: 'Mức giảm',
      dataIndex: 'discount',
      render(text: string, record: EventProps, index: number) {
        return text + '%'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: EventProps, b: EventProps) =>
        (a.discount ?? 1) > (b.discount ?? 1) ? 1 : -1,
    })
  }

  const getData = async () => {
    await getEventBFF().then((res: any) => {
      const _data = res.Data.map((item: any) => formatEventDataXML(item))
      setData(_data)
      setAllData(_data)
    })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div className='flex justify-between'>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              router.push(Routes.admin.eventDetail)
            }}
            large
          />
          <InputSearch
            onEnter={(text) => {
              setData(
                allData.filter(
                  (item: EventProps) =>
                    item.id?.toLowerCase().includes(text.toLowerCase()) ||
                    item.name?.toLowerCase().includes(text.toLowerCase())
                )
              )
            }}
            onClear={async () => {
              setData(allData)
            }}
          />
        </div>
        <TableList<EventProps>
          data={data}
          title='Danh sách sự kiện'
          columns={columns}
          selectUrl={Routes.admin.eventDetail}
          loading={loading}
          ellipsis={true}
        />
      </Space>
    </>
  )
}

Event.displayName = 'Event Management'

export default Event
