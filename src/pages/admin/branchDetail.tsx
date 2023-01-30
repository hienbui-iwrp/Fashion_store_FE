import React, { useEffect, useState } from 'react'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space, Modal } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddBranch } from '@/utils/modals'
import { useModalDelete } from '@/hooks'
import { formatTime } from '@/utils'

interface DataType {
  id: string
  name: string
  address: string
  manager: string
  area: number
  staff: number
  startTime: Date
  endTime: Date
  image?: string
}

const BranchDetail = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [dataFetch, setDataFetch] = useState<DataType>()
  const [modalAddBranch, setModalAddBranch] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const getData = async () => {
    await axios
      .get(`http://localhost:3000/api/admin/branchDetailData?id=${id}`)
      .then((res) => {
        formatData(res.data)
        setDataFetch(res.data)
      })
  }
  const formatData = (data: any) => {
    let dataFormat: any[] = []
    for (const key in data) {
      if (key == 'image') continue
      if (key == 'startTime' || key == 'endTime')
        dataFormat = [...dataFormat, { [key]: new Date(data[key]) }]
      else dataFormat = [...dataFormat, { [key]: data[key] }]
    }
    for (const i in dataFormat) {
      console.log(typeof new Date())
    }
    setData(dataFormat)
  }

  useEffect(() => {
    getData()
  }, [])

  const { showModelDelete, contextModalDelete } = useModalDelete({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: () => {
      console.log('delete branch')
    },
  })

  const nameCurrentBranch = () => {
    data.find
  }

  const content = (
    <Space direction='vertical' style={{ width: '99%' }} size='large'>
      <Card
        className='max-w-full-lg'
        title={dataFetch?.name?.toUpperCase() ?? 'Không tên'}
        bordered={false}
        loading={loading}
      >
        <Row justify='center' align='middle'>
          {/* xs sm lg xl */}
          <Col xs={24} sm={12}>
            <Image
              preview={true}
              src={
                dataFetch?.image ??
                'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
              }
              width={'80%'}
            />
          </Col>
          <Col xs={24} sm={12}>
            <List
              bordered={false}
              dataSource={data ?? []}
              renderItem={(item) => {
                const key = Object.keys(item)
                return (
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} sm={8}>
                      <b>{key}</b>
                    </Col>
                    <Col xs={24} sm={16}>
                      {item[key] instanceof Date
                        ? formatTime(item[key])
                        : item[key]}
                    </Col>
                  </Row>
                )
              }}
            />
            <Row justify='end' align='bottom'>
              <Space size={20}>
                <RemoveButton onClick={showModelDelete} />
                <AddButton
                  label='Chỉnh sửa'
                  iconInput={<EditFilled />}
                  onClick={() => setModalAddBranch(true)}
                />
              </Space>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card className='!max-w-full-lg'>
        <LineChart />
      </Card>
      <ModalAddBranch
        open={modalAddBranch}
        cancel={() => setModalAddBranch(false)}
      />
      {contextModalDelete}
    </Space>
  )

  return <LayoutAdmin content={content} selected={0} />
}

BranchDetail.displayName = 'Branch Detail'

export default BranchDetail
