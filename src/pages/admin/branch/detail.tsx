import React, { useEffect, useState } from 'react'
import { BASE_URL, Routes } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddEditBranch } from '@/utils/modals'
import { useModalConfirm } from '@/hooks'
import {
  BranchProps,
  formatAddress,
  formatDate,
  formatTime,
  timeToDate,
} from '@/utils'
import { apiBranchService } from '@/utils/axios'
import { useDispatch } from 'react-redux'
import {
  setNotificationType,
  setNotificationValue,
} from '@/redux/slices/notificationSlice'
import { formatBranchData, formatBranchDataXML } from '@/utils/formats/formatData'
import { deleteBranch, deleteBranchBff, getBranchDetail, getBranchDetailBff } from '@/api'

interface ItemType {
  name: string
  content: string
}

interface StatisticDataType {
  revenue?: number
  profit?: number
  date: Date
}

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [dataItems, setDataItems] = useState<ItemType[]>([])
  const [statisticData, setStatisticData] = useState<StatisticDataType[]>([])
  const [data, setData] = useState<BranchProps>()
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)

  const dispatch = useDispatch()

  const routes = useRouter()
  const { id } = routes.query

  const getData = async () => {
    let _data: BranchProps = {}

    await getBranchDetailBff(id).then((data: any) => {
      if (data.getElementsByTagName('BranchId')[0].value == 0) routes.push(Routes.error)
      _data = formatBranchDataXML(data)
    })

    await apiBranchService.get(`/staff/${id}`).then((res) => {
      _data.staff = res.data.Data.length
    })
    setData(_data)
  }

  const getStatisticData = async () => {
    await axios.get(`${BASE_URL}/api/admin/statisticData`).then((res) => {
      setStatisticData(res.data)
    })
  }

  useEffect(() => {
    if (id) {
      getData()
      getStatisticData()
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (data) {
      setDataItems([
        { name: 'M?? chi nh??nh', content: data.id ?? '' },
        { name: '?????a ch???', content: formatAddress(data) },
        { name: 'Qu???n l??', content: data.manager ?? 'Ch??a c??' },
        {
          name: 'Nh??n vi??n',
          content: data?.staff?.toString() ?? '0',
        },
        {
          name: 'Gi??? ho???t ?????ng',
          content:
            formatTime(new Date(data.openTime ?? '')) +
            ' - ' +
            formatTime(new Date(data.closeTime ?? '')),
        },
        {
          name: 'Ng??y th??nh l???p',
          content: formatDate(new Date(data.createdAt ?? '')),
        },
      ])
    }
  }, [data])

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'X??a chi nh??nh',
    content: 'B???n c?? ch???c  ch???n mu???n x??a chi nh??nh n??y?',
    onOk: async () => {
      deleteBranchBff(id)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')

          routes.push(Routes.admin.branch)
          dispatch(setNotificationValue('X??a chi nh??nh th??nh c??ng'))
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('C?? l???i khi th???c hi???n'))
        })
    },
  })

  return (
    <LayoutAdmin selected={0}>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card
          className='max-w-full-lg'
          title={data?.name?.toUpperCase() ?? 'Kh??ng t??n'}
          bordered={false}
          loading={loading}
        >
          <Row justify='center' align='middle'>
            <Col xs={24} sm={12}>
              <Image
                alt='img'
                preview={true}
                src={
                  data?.image ??
                  'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                }
                width={'80%'}
              />
            </Col>
            <Col xs={24} sm={12}>
              <List
                bordered={false}
                dataSource={dataItems ?? []}
                renderItem={(item) => {
                  return (
                    <Row style={{ padding: 8 }}>
                      <Col xs={24} lg={8}>
                        <b>{item.name}</b>
                      </Col>
                      <Col xs={24} lg={16}>
                        {item.content}
                      </Col>
                    </Row>
                  )
                }}
              />
              <Row justify='end' align='bottom'>
                <Space size={20}>
                  <RemoveButton onClick={showModelConfirm} />
                  <AddButton
                    label='Ch???nh s???a'
                    iconInput={<EditFilled />}
                    onClick={() => setModalAddEditBranch(true)}
                  />
                </Space>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className='!max-w-full-lg'>
          <LineChart data={statisticData} revenue profit={true} />
        </Card>
        {modalAddEditBranch && (
          <ModalAddEditBranch
            open={modalAddEditBranch}
            cancel={() => setModalAddEditBranch(false)}
            extraData={data}
          />
        )}
        {contextModalComfirm}
      </Space>
    </LayoutAdmin>
  )
}

Detail.displayName = 'Branch Detail'

export default Detail
