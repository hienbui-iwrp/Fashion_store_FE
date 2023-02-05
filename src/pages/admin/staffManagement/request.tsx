import React, { useEffect, useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, RemoveButton, TableList } from '@/components'
import { FormatNumber, ModalStaffDetail } from '@/utils'
import { useModalConfirm } from '@/hooks'

type StaffDataType = {
  id?: string
  name: string
  citizenId: string
  phone: string
  address: string
  dateOfBirth: Date
  homeTown: string
  workLocation: string
  role: string
  salary: number
  startDate: Date
  account?: string
}

type DataType = {
  id: string
  staff: StaffDataType
  status: 'accepted' | 'rejected' | 'waiting'
  type: 'add' | 'remove'
}

const Request = () => {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [modalStaffDetail, setModalStaffDetail] = useState(false)
  const [currentStaffData, setCurrentStaffData] = useState<StaffDataType>()

  const removeModal = useModalConfirm({
    title: 'Xóa yêu cầu',
    content: 'Bạn chắc chắn muốn xóa yêu cầu này?',
    onOk: () => {},
    onCancel: () => {
      setModalStaffDetail(false)
    },
  })

  const acceptModal = useModalConfirm({
    title: 'Xác nhận yêu cầu',
    content: 'Bạn chắc chắn muốn chấp nhận yêu cầu này?',
    onOk: () => {},
    onCancel: () => {
      setModalStaffDetail(false)
    },
  })

  const getDataAdd = (): any => {
    const _data = data.filter((item: any) => item.type === 'add')
    const columns: ColumnsType<DataType> = []
    columns.push({
      title: 'Tên nhân viên mới',
      dataIndex: 'name',
      sorter: (a: DataType, b: DataType) =>
        a.staff.name > b.staff.name ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.name}</div>,
        }
      },
    })
    columns.push({
      title: 'Nơi công tác',
      dataIndex: 'workLocation',
      sorter: (a: DataType, b: DataType) =>
        a.staff.workLocation > b.staff.workLocation ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.workLocation}</div>,
        }
      },
    })
    columns.push({
      title: 'Vị trí',
      dataIndex: 'role',
      sorter: (a: DataType, b: DataType) =>
        a.staff.role > b.staff.role ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.role}</div>,
        }
      },
    })
    columns.push({
      title: 'Lương yêu cầu',
      dataIndex: 'salary',
      sorter: (a: DataType, b: DataType) =>
        a.staff.salary > b.staff.salary ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{FormatNumber(record.staff.salary)}</div>,
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: 'option',
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: (
            <Space>
              <RemoveButton
                iconInput={<CloseOutlined />}
                label={'Xóa'}
                onClick={(e) => {
                  removeModal.showModelConfirm()
                  e.stopPropagation()
                }}
              />
              <AddButton
                iconInput={<CheckOutlined />}
                label={'Duyệt'}
                onClick={(e) => {
                  acceptModal.showModelConfirm()
                  e.stopPropagation()
                }}
              />
            </Space>
          ),
        }
      },
    })
    return { data: _data, columns }
  }

  const getDataRemove = (): any => {
    const _data = data.filter((item: any) => item.type === 'remove')
    const columns: ColumnsType<DataType> = []
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: 'id',
      sorter: (a: DataType, b: DataType) =>
        (a.staff.id ?? 0) > (b.staff.id ?? 0) ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.id}</div>,
        }
      },
    })
    columns.push({
      title: 'Tên nhân viên',
      dataIndex: 'name1',
      sorter: (a: DataType, b: DataType) =>
        a.staff.name > b.staff.name ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.name}</div>,
        }
      },
    })

    columns.push({
      title: 'Nơi làm việc',
      dataIndex: 'workLocation',
      sorter: (a: DataType, b: DataType) =>
        a.staff.workLocation > b.staff.workLocation ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.workLocation}</div>,
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: 'role1',
      sorter: (a: DataType, b: DataType) =>
        a.staff.role > b.staff.role ? 1 : -1,
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: <div>{record.staff.role}</div>,
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: 'option1',
      render(text: string, record: DataType, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
            },
          },
          children: (
            <Space>
              <RemoveButton
                iconInput={<CloseOutlined />}
                label={'Xóa'}
                onClick={(e) => {
                  removeModal.showModelConfirm()
                  e.stopPropagation()
                }}
              />
              <AddButton
                iconInput={<CheckOutlined />}
                label={'Duyệt'}
                onClick={(e) => {
                  acceptModal.showModelConfirm()
                  e.stopPropagation()
                }}
              />
            </Space>
          ),
        }
      },
    })
    return { data: _data, columns }
  }

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/staffManagement/requestData`)
      .then((res) => {
        setData(res.data)
      })
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  const content = (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <TableList<DataType>
          data={getDataAdd().data}
          title='Yêu cầu thêm'
          columns={getDataAdd().columns}
          loading={loading}
          ellipsis={true}
          callBack={(i: DataType) => {
            setCurrentStaffData(
              data.find((item: DataType) => item.id == i.id)?.staff
            )
          }}
          onSelectRow={() => setModalStaffDetail(true)}
        />
        <TableList<DataType>
          data={getDataRemove().data}
          title='Yêu cầu xóa'
          columns={getDataRemove().columns}
          callBack={(i: DataType) => {
            setCurrentStaffData(
              data.find((item: DataType) => item.id == i.id)?.staff
            )
          }}
          onSelectRow={() => setModalStaffDetail(true)}
          loading={loading}
          ellipsis={true}
        />
      </Space>
      <ModalStaffDetail
        extraData={currentStaffData}
        open={modalStaffDetail}
        cancel={() => setModalStaffDetail(false)}
      />
    </>
  )

  return (
    <>
      <LayoutAdmin content={content} selected={21} />
      {removeModal.contextModalComfirm}
      {acceptModal.contextModalComfirm}
    </>
  )
}

Request.displayName = 'Staff Request'

export default Request
