import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Routes, StaffRole, StaffStatus } from '@/constants'
import { EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import {
  BranchProps,
  formatBranchDataXML,
  formatStaffDataXML,
  ModalAddEditStaff,
  StaffProps,
} from '@/utils'
import { InputSearch } from '@/components'
import { getBranchBff, getStaffBff } from '@/api'

export const Staff = (props: { role?: number }) => {
  const [data, setData] = useState<StaffProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)
  const [currentData, setCurrentData] = useState<StaffProps>()
  const [branchData, setBranchData] = useState<BranchProps[]>()

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
      title: 'Nơi làm việc',
      dataIndex: 'branchId',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.branchId ?? 1) > (b.branchId ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        const name = branchData?.find((item: any) => {
          return item.id.toString() == text
        })?.name
        return name ?? 'Toàn hệ thống'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: StaffProps, index: number) {
        return (
          <AddButton
            icon={<EditOutlined />}
            borderRadius={5}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentData(record)
              setModalAddEditStaff(true)
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

  const getData = async (keyword?: string) => {
    await getStaffBff(keyword)
      .then((res: any) => {
        const _data = res.Data.map((item: any) => formatStaffDataXML(item))
        if (props?.role == 3) {
          setData(
            _data.filter(
              (item: StaffProps) => item.role == '7' || item.role == '6'
            )
          )
        } else setData(_data)
      })
      .catch((err) => console.log(err))

    setLoading(false)
  }

  const getBranchData = async () => {
    await getBranchBff()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatBranchDataXML(item)
        })
        setBranchData(_data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
    getBranchData()
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              setCurrentData(undefined)
              setModalAddEditStaff(true)
            }}
            large
          />
          <InputSearch
            onEnter={(item) => {
              setLoading(true)
              getData(item)
            }}
            onClear={() => {
              getData()
              setLoading(true)
            }}
          />
        </div>
        <TableList<StaffProps>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={
            props?.role == 3
              ? Routes.branchManager.staffDetail
              : Routes.admin.staffDetail
          }
          loading={loading}
        />
      </Space>
      {modalAddEditStaff && (
        <ModalAddEditStaff
          open={modalAddEditStaff}
          cancel={() => setModalAddEditStaff(false)}
          extraData={currentData}
          callback={(item) => {
            setLoading(true)
            setTimeout(() => {
              getData()
              setLoading(false)
            }, 1000)
          }}
        />
      )}
    </>
  )
}
