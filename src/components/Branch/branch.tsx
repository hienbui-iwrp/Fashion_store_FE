import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes } from '@/constants'
import { EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import { BranchProps, formatAddress, ModalAddEditBranch } from '@/utils'
import { formatBranchDataXML } from '@/utils/formats/formatData'
import { getBranchBff } from '@/api'

export const Branch = (props?: { role?: number }) => {
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
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      sorter: (a: BranchProps, b: BranchProps) =>
        (a.name ?? 1) > (b.name ?? 1) ? 1 : -1,
      render(text: string, record: BranchProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      sorter: (a: BranchProps, b: BranchProps) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
      render(text: string, record: BranchProps, index: number) {
        return formatAddress(record)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: BranchProps, index: number) {
        return (
          <AddButton
            icon={<EditOutlined />}
            borderRadius={5}
            onClick={(e) => {
              setCurrentData(record)
              e.stopPropagation()
              setModalAddEditBranch(true)
            }}
          />
        )
      },
      onCell: (record) => {
        return {
          style: { maxWidth: 50 },
        }
      },
    })
  }

  const getData = async () => {
    await getBranchBff()
      .then((res: any) => {
        if (res?.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatBranchDataXML(item)
        })
        setData(_data)
      })
      .catch((err) => console.log(err))
  }

  // get data
  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
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
          selectUrl={
            props?.role == 3
              ? Routes.branchManager.branchDetail
              : Routes.admin.branchDetail
          }
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
            }, 1500)
          }}
        />
      )}
    </>
  )
}
