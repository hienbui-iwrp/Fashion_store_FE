import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import {
  CheckOutlined,
  CloseOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import {
  Card,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Space,
  TimePicker,
  Image,
} from 'antd'
import { AddButton, RemoveButton, TableList } from '@/components'
import {
  EventProps,
  formatDate,
  formatEventDataXML,
  formatGoodsDataXML,
  formatTime,
  GoodsProps,
  ModalAllGoods,
} from '@/utils'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { getEventDetailBFF, getGoodsBFF } from '@/api'
import { GoodsAges, GoodsGenders, GoodsTypes } from '@/constants'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const Detail = () => {
  const [data, setData] = useState<EventProps>()
  const [goodsData, setGoodsData] = useState<GoodsProps[]>([])
  const [allGoodsData, setAllGoodsData] = useState<GoodsProps[]>([])
  const [loading, setLoading] = useState(false)
  const [modalAllGoods, setModalAllGoods] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const columns: ColumnsType<GoodsProps> = []
  if (data) {
    columns.push({
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      render(text: string, record: GoodsProps, index: number) {
        return text
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.id > b.id ? 1 : -1),
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
    })

    columns.push({
      title: 'Hình ảnh',
      dataIndex: 'image',
      render(text: string, record: GoodsProps, index: number) {
        return (
          <Image
            alt='img'
            src={
              record?.image
                ? record?.image[0]
                : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
            }
            preview={{
              src: record?.image
                ? record?.image[0]
                : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
            }}
            style={{
              maxWidth: 40,
              maxHeight: 40,
            }}
          />
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
    })

    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render(text: string, record: GoodsProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.name > b.name ? 1 : -1),
    })

    columns.push({
      title: 'Giới tính',
      dataIndex: 'gender',
      render(text: string, record: GoodsProps, index: number) {
        return (
          GoodsGenders.find((item: any) => item.value == record.gender)
            ?.label ?? 'Không xác định'
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      filters: GoodsGenders.map((item: any) => {
        return { text: item.label, value: item.value }
      }),
      onFilter: (value: string | number | boolean, record: GoodsProps) =>
        record.gender == value,
    })

    columns.push({
      title: 'Loại',
      dataIndex: 'type',
      render(text: string, record: GoodsProps, index: number) {
        return (
          GoodsTypes.find((item: any) => item.value == record.type)?.label ??
          'Không xác định'
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      filters: GoodsTypes.map((item: any) => {
        return { text: item.label, value: item.value }
      }),
      onFilter: (value: string | number | boolean, record: GoodsProps) =>
        record.type == value,
    })

    columns.push({
      title: 'Lứa tuổi',
      dataIndex: 'age',
      render(text: string, record: GoodsProps, index: number) {
        return (
          GoodsAges.find((item: any) => item.value == record.age)?.label ??
          'Không xác định'
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.age > b.age ? 1 : -1),
      filters: GoodsAges.map((item: any) => {
        return { text: item.label, value: item.value }
      }),
      onFilter: (value: string | number | boolean, record: GoodsProps) =>
        record.age == value,
    })

    columns.push({
      title: '',
      dataIndex: '',
      render(text: string, record: GoodsProps, index: number) {
        return <RemoveButton label='' borderRadius={5} onClick={() => {}} />
      },
      onCell: (record) => {
        return {
          style: { maxWidth: 60 },
        }
      },
    })
  }

  const onSave = () => {}

  const getData = async () => {
    await getEventDetailBFF(id).then((res: any) => {
      const _data = formatEventDataXML(res.Data[0])
      setData(_data)
    })

    await getGoodsBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: GoodsProps) =>
          formatGoodsDataXML(item)
        ).reduce((acc: GoodsProps[], item: GoodsProps) => {
          if (!acc?.find((i: GoodsProps) => i.id == item.id)) {
            return [...acc, item]
          } else return acc
        }, [])
        setAllGoodsData(_data)
      })
      .catch((err) => console.log(err))
  }

  const getGoodsData = async () => {
    setLoading(true)
    await getGoodsBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: GoodsProps) =>
          formatGoodsDataXML(item)
        ).reduce((acc: GoodsProps[], item: GoodsProps) => {
          if (!acc?.find((i: GoodsProps) => i.id == item.id)) {
            return [...acc, item]
          } else return acc
        }, [])
        setAllGoodsData(_data)

        setGoodsData(
          _data.filter((item: GoodsProps) => data?.goods?.includes(item.id))
        )
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    if (id) getData()
  }, [id])

  useEffect(() => {
    if (data) getGoodsData()
  }, [data])

  return (
    <>
      <Card>
        <Row className='justify-between'>
          <Col xs={24} sm={20} lg={10}>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Tên sự kiện</b>
              </Col>
              <Col span={16}>
                {data && (
                  <Input
                    className={styles.adminInputShadow}
                    defaultValue={data.name}
                  />
                )}
                {!id && <Input className={styles.adminInputShadow} />}
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Mức giảm</b>
              </Col>
              <Col span={16}>
                {data && (
                  <InputNumber
                    className={styles.adminInputShadow}
                    defaultValue={data.discount}
                  />
                )}
                {!id && <InputNumber className={styles.adminInputShadow} />}
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Ảnh</b>
              </Col>
              <Col span={16}>
                <Space className='flex items-start justify-between items-center'>
                  <Image
                    alt='img'
                    src={
                      data?.image ??
                      'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                    }
                    preview={{
                      src:
                        data?.image ??
                        'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                    }}
                    style={{
                      maxWidth: 130,
                      boxShadow: '1px 1px 2px 1px #ccc',
                    }}
                  />
                  <AddButton icon={<FileImageOutlined />} label={'Chọn ảnh'} />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={20} lg={11}>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Ngày</b>
              </Col>
              <Col span={16}>
                <Space size={30}>
                  {data && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      defaultValue={dayjs(
                        formatDate(data?.startTime),
                        'DD/MM/YYYY'
                      )}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                    />
                  )}

                  {data && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      defaultValue={dayjs(
                        formatDate(data?.endTime),
                        'DD/MM/YYYY'
                      )}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                    />
                  )}
                </Space>
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Thời điểm</b>
              </Col>
              <Col span={16}>
                <Space size={30}>
                  {data && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      defaultValue={dayjs(formatTime(data?.startTime), 'HH:mm')}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                    />
                  )}
                  {data && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      defaultValue={dayjs(formatTime(data?.endTime), 'HH:mm')}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                    />
                  )}
                </Space>
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Áp dụng</b>
              </Col>
              <Col span={16}>
                <div className='flex items-center	justify-between'>
                  <span>{goodsData.length} sản phẩm</span>
                  <AddButton
                    label='Chọn sản phẩm'
                    onClick={() => setModalAllGoods(true)}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Space className='flex justify-end mt-6' size={'large'}>
          <RemoveButton
            label='Hủy'
            icon={<CloseOutlined />}
            borderRadius={10}
          />
          <AddButton label='Lưu' icon={<CheckOutlined />} borderRadius={10} />
        </Space>
      </Card>
      <TableList<GoodsProps>
        data={goodsData ?? []}
        title='Sản phẩm áp dụng'
        columns={columns}
        loading={loading}
        ellipsis={true}
        // rowKey={['id']}
      />
      {modalAllGoods && (
        <ModalAllGoods
          open={modalAllGoods}
          cancel={() => setModalAllGoods(false)}
          callback={(listGoods: string[]) => {
            setGoodsData(
              allGoodsData.filter((item: GoodsProps) =>
                listGoods.includes(item.id)
              )
            )
          }}
          extraData={goodsData}
        />
      )}
    </>
  )
}

Detail.displayName = 'Event Detail Management'

export default Detail
