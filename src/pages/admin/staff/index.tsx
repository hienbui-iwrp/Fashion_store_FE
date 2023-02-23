import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors, Routes, StaffStatus } from '@/constants'
import { EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, TableList } from '@/components'
import {
  apiStaffService,
  BranchProps,
  formatBranchData,
  formatStaffData,
  ModalAddEditStaff,
  StaffProps,
} from '@/utils'
import { InputSearch } from '@/components'
import { filterStaffById, filterStaffByName, getBranch, getStaff } from '@/api'

const Staff = () => {
  const [data, setData] = useState<StaffProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)
  const [currentData, setCurrentData] = useState<StaffProps>()
  const [keyword, setKeyword] = useState<string>()
  const [branchData, setBranchData] = useState<BranchProps[]>()

  const columns: ColumnsType<StaffProps> = []
  if (data[0]) {
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: 'id',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.id ?? 1) > (b.id ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Tên nhân viên',
      dataIndex: 'name',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.name ?? 1) > (b.name ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: 'role',
      sorter: (a: StaffProps, b: StaffProps) =>
        (a.role ?? 1) > (b.role ?? 1) ? 1 : -1,
      render(text: string, record: StaffProps, index: number) {
        return {
          children: <div>{text}</div>,
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
        return {
          children: <div>{name}</div>,
        }
      },
    })

    columns.push({
      title: '',
      render(text: string, record: StaffProps, index: number) {
        return {
          children: (
            <AddButton
              iconInput={<EditOutlined />}
              borderRadius={5}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentData(record)
                setModalAddEditStaff(true)
              }}
            />
          ),
        }
      },
    })
  }

  const getData = async () => {
    await getStaff().then((res: any) => {
      if (res.data.StatusCode != 200) throw new Error('FAIL')
      const _data = res.data.Data.filter(
        (item: any) => item.Status == StaffStatus.approved
      ).map((item: any) => {
        return formatStaffData(item)
      })
      setData(_data)
    })

    getBranch().then((res: any) => {
      const _data = res.data.Data.map((item: any) => {
        if (res.data.StatusCode != 200) throw new Error('FAIL')
        return formatBranchData(item)
      })
      setBranchData(_data)
    })
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const filterData = async () => {
    let dataName: StaffProps[] = []
    await filterStaffByName(keyword).then((res: any) => {
      dataName = res.data.Data.filter(
        (item: any) => item.Status == StaffStatus.approved
      ).map((item: any) => {
        return formatStaffData(item)
      })
    })

    let dataId: StaffProps[] = []
    await filterStaffById(keyword).then((res: any) => {
      dataId = res.data.Data.filter(
        (item: any) => item.Status == StaffStatus.approved
      ).map((item: any) => {
        return formatStaffData(item)
      })
    })

    setData([...dataName, ...dataId])
    setLoading(false)
  }

  useEffect(() => {
    if (keyword) filterData()
  }, [keyword])

  return (
    <LayoutAdmin selected={20}>
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
              setKeyword(item)
            }}
            onClear={() => {
              getData()
              setLoading(true)
              setKeyword(undefined)
            }}
          />
        </div>
        <TableList<StaffProps>
          data={data}
          title='Danh sách nhân viên'
          columns={columns}
          selectUrl={Routes.admin.staffDetail}
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
    </LayoutAdmin>
  )
}

Staff.displayName = 'Staff Management'

export default Staff
