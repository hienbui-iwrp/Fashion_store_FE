import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes, StaffRole } from '@/constants'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import {
  formatDate,
  formatStaffDataXML,
  ModalAddStaffRequest,
  StaffProps,
} from '@/utils'
import { getStaffBff } from '@/api'

export const StaffBranch = () => {
  const [data, setData] = useState<StaffProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddStaffRequest, setModalAddStaffRequest] = useState(false)

  const columns: ColumnsType<StaffProps> = []
  if (data[0]) {
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: 'id',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.id ?? 1) > (b.id ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Tên nhân viên',
      dataIndex: 'name',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.name ?? 1) > (b.name ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: 'role',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.role ?? 1) > (b.role ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        const roleName = StaffRole.find(
          (item: any) => item.value == text
        )?.content
        return roleName ?? 'Nhân viên'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.startDate ?? 1) > (b.startDate ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })
  }

  const getData = () => {
    setTimeout(async () => {
      await getStaffBff()
        .then((res: any) => {
          const _data = res.Data.map((item: any) => formatStaffDataXML(item))
          setData(
            _data.filter(
              (item: StaffProps) =>
                (item.role == '7' || item.role == '6') &&
                item.branchId == localStorage.getItem('branchId')
            )
          )
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }, 500)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Yêu cầu thêm mới'
            onClick={() => {
              setModalAddStaffRequest(true)
            }}
            large
          />
        </div>
        <TableList<StaffProps>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={Routes.branchLeader.staffDetail}
          loading={loading}
        />
      </Space>
      {modalAddStaffRequest && (
        <ModalAddStaffRequest
          open={modalAddStaffRequest}
          cancel={() => setModalAddStaffRequest(false)}
        />
      )}
    </>
  )
}
