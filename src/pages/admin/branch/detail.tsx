import React, { useEffect, useState } from 'react'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space, Modal } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddEditBranch } from '@/utils/modals'
import { useModalConfirm } from '@/hooks'
import { formatDate, formatTime } from '@/utils'
import { apiBranchService } from '@/utils/axios'

type DataType = {
  id: string
  name: string
  address: string
  createdAt: Date
  manager: string
  openTime: Date
  closeTime: Date
  image?: string
  staff?: number
}

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
  const [data, setData] = useState<DataType>()
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const getData = async () => {
    let _data: DataType = {
      id: '',
      name: '',
      address: '',
      createdAt: new Date(),
      manager: '',
      openTime: new Date(),
      closeTime: new Date(),
      image: '',
      staff: 0,
    }

    await apiBranchService.get(`/${id}`).then((res) => {
      _data = {
        id: res.data.Data.BranchCode,
        name: res.data.Data.BranchName,
        address:
          res.data.Data.BranchStreet +
          ', ' +
          res.data.Data.BranchWard +
          ', ' +
          res.data.Data.BranchDistrict +
          ', ' +
          res.data.Data.BranchProvince,
        createdAt: new Date(res.data.Data.CreatedAt),
        openTime: new Date(res.data.Data.OpenTime),
        closeTime: new Date(res.data.Data.CloseTime),
        manager: res.data.Data.Manager,
        image: res.data.Data?.Image,
      }
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
        { name: 'Mã chi nhánh', content: data.id },
        { name: 'Địa chỉ', content: data.address },
        { name: 'Quản lý', content: data.manager },
        {
          name: 'Nhân viên',
          content: data?.staff?.toString() ?? '0',
        },
        {
          name: 'Giờ hoạt động',
          content:
            formatTime(new Date(data.openTime)) +
            ' - ' +
            formatTime(new Date(data.closeTime)),
        },
        {
          name: 'Ngày thành lập',
          content: formatDate(new Date(data.createdAt)),
        },
      ])
    }
  }, [data])

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: () => {
      console.log('delete branch')
    },
  })

  const content = (
    <Space direction='vertical' style={{ width: '99%' }} size='large'>
      <Card
        className='max-w-full-lg'
        title={data?.name?.toUpperCase() ?? 'Không tên'}
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
                  label='Chỉnh sửa'
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
  )

  return <LayoutAdmin content={content} selected={0} />
}

Detail.displayName = 'Branch Detail'

export default Detail
