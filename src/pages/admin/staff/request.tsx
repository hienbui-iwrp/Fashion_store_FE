import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { BASE_URL, Colors, RequestStatus, RequestType } from '@/constants'
import axios from 'axios'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { Space } from 'antd'
import { AddButton, LayoutAdmin, RemoveButton, TableList } from '@/components'
import {
  BranchProps,
  formatBranchData,
  formatDate,
  formatNumber,
  formatRequestData,
  formatStaffData,
  ModalStaffDetail,
  RequestProps,
  StaffProps,
} from '@/utils'
import { useModalConfirm } from '@/hooks'
import { getBranch, getListRequest, getStaff, updateRequest } from '@/api'
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
      await updateRequest(requestId.current, RequestStatus.unApproved)
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
    onOk: () => {
      updateRequest(requestId.current, RequestStatus.approved)
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
    return staffData.find((item: StaffProps) => item.id == request.staffId)
  }

  const getDataAdd = (): any => {
    const _data = data.filter((item: any) => item.type === RequestType.add)
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Tên nhân viên mới',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) => {
        return (findStaff(a)?.name ?? 1) > (findStaff(b)?.name ?? 1) ? 1 : -1
      },
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{findStaff(record)?.name}</div>,
        }
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
        return {
          children: <div>{name}</div>,
        }
      },
    })
    columns.push({
      title: 'Vị trí',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.role ?? 1) > (findStaff(b)?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{findStaff(record)?.role}</div>,
        }
      },
    })
    // columns.push({
    //   title: 'Lương yêu cầu',
    //   dataIndex: '',
    //   sorter: (a: RequestProps, b: RequestProps) =>
    //     (findStaff(a)?.salary ?? 1) > (findStaff(b)?.salary ?? 1) ? 1 : -1,
    //   render(text: string, record: RequestProps, index: number) {
    //     return {
    //       children: <div>{formatNumber(findStaff(record)?.salary)}</div>,
    //     }
    //   },
    // })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'date',
      sorter: (a: RequestProps, b: RequestProps) => (a.date > b.date ? 1 : -1),
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{formatDate(text)}</div>,
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: '',
      render(text: string, record: RequestProps, index: number) {
        return {
          props: {
            style: { maxWidth: 100 },
          },
          children: (
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
          ),
        }
      },
    })
    return { data: _data, columns }
  }

  const getDataRemove = (): any => {
    const _data = data.filter((item: any) => item.type === RequestType.delete)
    const columns: ColumnsType<RequestProps> = []
    columns.push({
      title: 'Mã nhân viên',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.id ?? 1) > (findStaff(b)?.id ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{findStaff(record)?.id}</div>,
        }
      },
    })
    columns.push({
      title: 'Tên nhân viên',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.name ?? 1) > (findStaff(b)?.name ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{findStaff(record)?.name}</div>,
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
        return {
          children: <div>{name}</div>,
        }
      },
    })

    columns.push({
      title: 'Vị trí',
      dataIndex: '',
      sorter: (a: RequestProps, b: RequestProps) =>
        (findStaff(a)?.role ?? 1) > (findStaff(b)?.role ?? 1) ? 1 : -1,
      render(text: string, record: RequestProps, index: number) {
        return {
          children: <div>{findStaff(record)?.role}</div>,
        }
      },
    })

    columns.push({
      title: '',
      dataIndex: '',
      render(text: string, record: RequestProps, index: number) {
        return {
          props: {
            style: { maxWidth: 70 },
          },
          children: (
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
          ),
        }
      },
    })
    return { data: _data, columns }
  }

  const getData = async () => {
    await getListRequest().then((res: any) => {
      if (res.data.StatusCode != 200) throw new Error('FAIL')
      const _data = res.data.Data.filter(
        (item: any) => item.Status == RequestStatus.pending
      ).map((item: any) => {
        return formatRequestData(item)
      })
      console.log(_data)
      setData(_data)
    })

    await getStaff().then((res: any) => {
      if (res.data.StatusCode != 200) throw new Error('FAIL')
      const _data = res.data.Data.map((item: any) => {
        return formatStaffData(item)
      })
      setStaffData(_data)
    })

    await getBranch().then((res: any) => {
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
          rowKey={['id', 'staffId']}
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
          rowKey={['id', 'staffId']}
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
