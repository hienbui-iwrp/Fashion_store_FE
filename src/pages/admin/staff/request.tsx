import React, { useEffect, useRef, useState } from 'react'
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
  formatStaffDataXML,
  ModalStaffDetail,
  RequestProps,
  StaffProps,
} from '@/utils'
import { useModalConfirm } from '@/hooks'
import {
  getBranchBff,
  getListRequestBFF,
  getStaffBff,
  updateRequestBFF,
} from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

const Request = () => {
  const [data, setData] = useState<RequestProps[]>([])
  const [staffData, setStaffData] = useState<StaffProps[]>([])
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

  const findStaff = (request: RequestProps) => {
    return (
      staffData.find((item: StaffProps) => item.id == request.staffId) ?? {}
    )
  }

  const getDataAdd = (): any => {
    const _data = data.filter(
      (item: any) =>
        item.type === RequestType.add &&
        findStaff(item)?.status == StaffStatus.pending
    )
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Tên nhân viên mới',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) => {
        return (findStaff(a)?.name ?? 1) > (findStaff(b)?.name ?? 1) ? 1 : -1
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 150 },
        }
      },
      render(text: string, record: RequestProps, index: number) {
        return findStaff(record)?.name
      },
    })
    columns.push({
      title: 'Nơi công tác',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.branchId ?? 1) > (findStaff(b)?.branchId ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const name = branchData?.find((item: any) => {
          return (
            item.id.toString() ==
            staffData.find((s: StaffProps) => s.id == record.staffId)?.branchId
          )
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
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.role ?? 1) > (findStaff(b)?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const roleName = StaffRole.find(
          (item: any) => item.value == findStaff(record)?.role
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
  }

  const getDataRemove = (): any => {
    const _data = data.filter(
      (item: any) =>
        item.type === RequestType.delete &&
        findStaff(item)?.status == StaffStatus.approved
    )
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.id ?? 1) > (findStaff(b)?.id ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return findStaff(record)?.id
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })
    columns.push({
      title: 'Tên nhân viên',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.name ?? 1) > (findStaff(b)?.name ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return findStaff(record)?.name
      },
      onCell: (record: RequestProps) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Nơi làm việc',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.branchId ?? 1) > (findStaff(b)?.branchId ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const name = branchData?.find((item: any) => {
          return (
            item.id.toString() ==
            staffData.find((s: StaffProps) => s.id == record.staffId)?.branchId
          )
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
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.role ?? 1) > (findStaff(b)?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        const roleName = StaffRole.find(
          (item: any) => item.value == findStaff(record)?.role
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
  }

  const getData = async () => {
    await getListRequestBFF()
      .then((res: any) => {
        if (res?.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatRequestDataXML(item)
        }).filter((item: any) => item.status == RequestStatus.pending)

        setData(_data)
      })
      .catch((err: any) => {
        console.log(err)
      })

    await getStaffBff()
      .then((res: any) => {
        if (res?.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => formatStaffDataXML(item))
        console.log(_data)
        setStaffData(_data)
      })
      .catch((err) => console.log(err))

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
          data={getDataAdd().data}
          title='Yêu cầu thêm'
          columns={getDataAdd().columns}
          loading={loading}
          ellipsis={true}
          callback={(i: RequestProps) => {
            setCurrentStaffData(findStaff(i))
          }}
          onSelectRow={() => setModalStaffDetail(true)}
          rowKey={['id', 'type']}
        />

        <TableList<RequestProps>
          data={getDataRemove().data}
          title='Yêu cầu xóa'
          columns={getDataRemove().columns}
          callback={(i: RequestProps) => {
            setCurrentStaffData(findStaff(i))
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
