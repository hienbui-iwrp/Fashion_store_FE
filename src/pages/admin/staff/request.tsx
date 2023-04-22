import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { RequestStatus, RequestType, StaffRole, StaffStatus } from '@/constants'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { AddButton, RemoveButton, TableList } from '@/components'
import {
  BranchProps,
  formatBranchDataXML,
  formatDate,
  formatRequestDataXML,
  ModalStaffDetail,
  RequestProps,
  StaffProps,
} from '@/utils'
import { useModalConfirm } from '@/hooks'
import { getBranchBff, getListRequestBFF, updateRequestBFF } from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

const Request = () => {
  const [data, setData] = useState<RequestProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalStaffDetail, setModalStaffDetail] = useState(false)
  const [currentStaffData, setCurrentStaffData] = useState<StaffProps>()
  const [branchData, setBranchData] = useState<BranchProps[]>()

  let requestId = useRef('')
  const dispatch = useDispatch()

  const removeModal = useModalConfirm({
    title: 'Xóa yêu cầu',
    content: 'Bạn chắc chắn muốn xóa yêu cầu này?',
    onOk: async () => {
      await updateRequestBFF(requestId.current, RequestStatus.unApproved)
        .then((res: any) => {
          dispatch(setNotificationValue('Xóa yêu cầu thành công'))
          setTimeout(() => {
            getData()
            setLoading(false)
          }, 1000)
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    },
    onCancel: () => {
      setModalStaffDetail(false)
    },
  })

  const acceptModal = useModalConfirm({
    title: 'Xác nhận yêu cầu',
    content: 'Bạn chắc chắn muốn chấp nhận yêu cầu này?',
    onOk: async () => {
      await updateRequestBFF(requestId.current, RequestStatus.approved)
        .then((res: any) => {
          dispatch(setNotificationValue('Đã thêm nhân viên mới'))
          setLoading(true)
          setTimeout(() => {
            getData()
            setLoading(false)
          }, 1000)
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    },
    onCancel: () => {
      setModalStaffDetail(false)
    },
  })

  const getDataAdd = useMemo((): any => {
    const _data = data.filter((item: any) => item.type === RequestType.add)
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Tên nhân viên mới',
      dataIndex: 'name',
      sorter: (a: RequestProps, b: RequestProps) => {
        return (a.name ?? 1) > (b.name ?? 1) ? 1 : -1
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 150 },
        }
      },
      render(text: string, record: RequestProps, index: number) {
        return text
      },
    })
    columns.push({
      title: 'Nơi công tác',
      dataIndex: 'branchId',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.branchId ?? 1) > (b?.branchId ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const name = branchData?.find((item: any) => {
          return item.id.toString() == text
        })?.name
        return name
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: 'role',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.role ?? 1) > (b?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const roleName = StaffRole.find(
          (item: any) => item.value == text
        )?.content
        return roleName ?? 'Nhân viên'
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 80 },
        }
      },
    })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'date',
      sorter: (a: RequestProps, b: RequestProps) => (a.date > b.date ? 1 : -1),
      render(text: string, record: RequestProps, index: number) {
        return formatDate(text)
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: '',
      onCell: (record: RequestProps) => {
        return {
          style: { maxWidth: 210 },
        }
      },
      render(text: string, record: RequestProps, index: number) {
        return (
          <Space key={index + record.id}>
            <RemoveButton
              icon={<CloseOutlined />}
              label={'Xóa'}
              onClick={(e) => {
                requestId.current = record.id
                removeModal.showModelConfirm()
                e.stopPropagation()
              }}
            />
            <AddButton
              icon={<CheckOutlined />}
              label={'Duyệt'}
              onClick={(e) => {
                requestId.current = record.id
                acceptModal.showModelConfirm()
                e.stopPropagation()
              }}
            />
          </Space>
        )
      },
    })
    return { data: _data, columns }
  }, [data, branchData])

  const getDataRemove = useMemo((): any => {
    const _data = data.filter((item: any) => item.type === RequestType.delete)
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: 'staffId',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.id ?? 1) > (b?.id ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return text
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })
    columns.push({
      title: 'Tên nhân viên',
      dataIndex: 'name',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.name ?? 1) > (b?.name ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return text
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Nơi làm việc',
      dataIndex: 'branchId',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.branchId ?? 1) > (b?.branchId ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const name = branchData?.find((item: any) => {
          return item.id.toString() == text
        })?.name
        return name
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: 'role',
      sorter: (a: RequestProps, b: RequestProps) =>
        (a?.role ?? 1) > (b?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const roleName = StaffRole.find(
          (item: any) => item.value == text
        )?.content
        return roleName ?? 'Nhân viên'
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: '',
      onCell: (record: RequestProps) => {
        return {
          style: { maxWidth: 210 },
        }
      },
      render(text: string, record: RequestProps, index: number) {
        return (
          <Space key={index + record.id}>
            <RemoveButton
              icon={<CloseOutlined />}
              label={'Xóa'}
              onClick={(e) => {
                requestId.current = record.id
                removeModal.showModelConfirm()
                e.stopPropagation()
              }}
            />
            <AddButton
              icon={<CheckOutlined />}
              label={'Duyệt'}
              onClick={(e) => {
                requestId.current = record.id
                acceptModal.showModelConfirm()
                e.stopPropagation()
              }}
            />
          </Space>
        )
      },
    })
    return { data: _data, columns }
  }, [data, branchData])

  const getData = async () => {
    await getListRequestBFF()
      .then((res: any) => {
        if (res?.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatRequestDataXML(item)
        })
        console.log('data:', _data)

        setData(_data)
      })
      .catch((err: any) => {
        console.log(err)
      })

    await getBranchBff()
      .then((res: any) => {
        if (res?.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatBranchDataXML(item)
        })
        setBranchData(_data)
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
        <TableList<RequestProps>
          data={getDataAdd.data}
          title='Yêu cầu thêm'
          columns={getDataAdd.columns}
          loading={loading}
          ellipsis={true}
          callback={(i: RequestProps) => {
            setCurrentStaffData({
              id: i.staffId,
              name: i.name,
              citizenId: i.citizenId,
              phone: i.phone,
              street: i.street,
              ward: i.ward,
              district: i.district,
              province: i.province,
              birthdate: i.birthdate,
              hometown: i.hometown,
              branchId: i.branchId,
              role: i.role,
              salary: i.salary,
              startDate: i.startDate,
              status: i.status,
              email: i.email,
              gender: i.gender,
            })
          }}
          onSelectRow={() => setModalStaffDetail(true)}
          rowKey={['id', 'type']}
        />

        <TableList<RequestProps>
          data={getDataRemove.data}
          title='Yêu cầu xóa'
          columns={getDataRemove.columns}
          callback={(i: RequestProps) => {
            setCurrentStaffData({
              id: i.staffId,
              name: i.name,
              citizenId: i.citizenId,
              phone: i.phone,
              street: i.street,
              ward: i.ward,
              district: i.district,
              province: i.province,
              birthdate: i.birthdate,
              hometown: i.hometown,
              branchId: i.branchId,
              role: i.role,
              salary: i.salary,
              startDate: i.startDate,
              status: i.status,
              email: i.email,
              gender: i.gender,
            })
          }}
          onSelectRow={() => setModalStaffDetail(true)}
          loading={loading}
          ellipsis={true}
          rowKey={['id', 'type']}
        />
      </Space>
      <ModalStaffDetail
        extraData={currentStaffData}
        open={modalStaffDetail}
        cancel={() => setModalStaffDetail(false)}
      />
      {removeModal.contextModalComfirm}
      {acceptModal.contextModalComfirm}
    </>
  )
}

Request.displayName = 'Staff Request'

export default Request
