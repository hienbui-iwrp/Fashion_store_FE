import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes } from '@/constants'
import { EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import { BranchProps, formatAddress, ModalAddEditBranch } from '@/utils'
import { apiBranchService } from '@/utils/axios'
import { formatBranchData } from '@/utils/formats/formatData'
import { getBranch } from '@/api'

const Branch = () => {
  const [data, setData] = useState<BranchProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)
  const [currentData, setCurrentData] = useState<BranchProps>()

  const columns: ColumnsType<BranchProps> = []
  if (data[0]) {
    columns.push({
      title: 'Mã chi nhánh',
      dataIndex: 'id',
      sorter: (a: BranchProps, b: BranchProps) =>
        (a.id ?? 1) > (b.id ?? 1) ? 1 : -1,
      render(text: string, record: BranchProps, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      sorter: (a: BranchProps, b: BranchProps) =>
        (a.name ?? 1) > (b.name ?? 1) ? 1 : -1,
      render(text: string, record: BranchProps, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      sorter: (a: BranchProps, b: BranchProps) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
      render(text: string, record: BranchProps, index: number) {
        return {
          children: <div>{formatAddress(record)}</div>,
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: BranchProps, index: number) {
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

  const getData = () => {
    getBranch().then((res: any) => {
      const _data = res.data.Data.map((item: any) => {
        if (res.data.StatusCode != 200) throw new Error('FAIL')
        return formatBranchData(item)
      })
      setData(_data)
    })
  }

  // get data
  useEffect(() => {
    getData()
    setLoading(false)
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
        <TableList<BranchProps>
          data={data ?? []}
          title='Danh sách chi nhánh'
          columns={columns}
          selectUrl={Routes.admin.branchDetail}
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
