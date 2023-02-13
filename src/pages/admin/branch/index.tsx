import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL } from '@/constants'
import { EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { formatAddress, ModalAddEditBranch, timeToDate } from '@/utils'
import { apiBranchService } from '@/utils/axios'

interface DataType {
  id: string
  name: string
  street?: string
  ward?: string
  district?: string
  province?: string
  createdAt: Date
  manager: string
  openTime: Date
  closeTime: Date
}

const Branch = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)
  const [currentData, setCurrentData] = useState<DataType>()

  const columns: ColumnsType<DataType> = []
  if (data[0]) {
    columns.push({
      title: 'Mã chi nhánh',
      dataIndex: 'id',
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      sorter: (a: DataType, b: DataType) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{formatAddress(record)}</div>,
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: DataType, index: number) {
        return {
          children: (
            <AddButton
              iconInput={<EditOutlined />}
              borderRadius={5}
              onClick={(e) => {
                setCurrentData(record)
                e.stopPropagation()
                setModalAddEditBranch(true)
              }}
            />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await apiBranchService.get('').then((res) => {
      const _data = res.data.Data.map((item: any) => {
        return {
          id: item.BranchCode,
          name: item.BranchName,
          street: item.BranchStreet,
          ward: item.BranchWard,
          district: item.BranchDistrict,
          province: item.BranchProvince,
          createdAt: new Date(item.CreatedAt),
          openTime: timeToDate(item.OpenTime),
          closeTime: timeToDate(item.CloseTime),
        }
      })
      setData(_data)
    })
  }

  useEffect(() => {
    setLoading(false)
    getData()
  }, [])

  return (
    <LayoutAdmin selected={0}>
      <Space direction='vertical' style={{ width: '99%' }} size='small'>
        <AddButton
          label='Thêm mới'
          onClick={() => {
            setCurrentData(undefined)
            setModalAddEditBranch(true)
          }}
          large
        />
        <TableList<DataType>
          data={data ?? []}
          title='Danh sách chi nhánh'
          columns={columns}
          selectUrl={`${BASE_URL}/admin/branch/detail/`}
          loading={loading}
        />
      </Space>
      {modalAddEditBranch && (
        <ModalAddEditBranch
          open={modalAddEditBranch}
          cancel={() => setModalAddEditBranch(false)}
          extraData={currentData}
          callback={() => {
            setLoading(true)
            setTimeout(() => {
              getData()
              setLoading(false)
            }, 1000)
          }}
        />
      )}
    </LayoutAdmin>
  )
}

Branch.displayName = 'Branch Management'

export default Branch
