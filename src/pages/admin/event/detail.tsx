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
  Form,
} from 'antd'
import { AddButton, RemoveButton, TableList } from '@/components'
import {
  EventProps,
  formatDate,
  FormatDateAndTime,
  formatEventDataXML,
  formatGoodsDataXML,
  formatTime,
  GoodsProps,
  ModalAllGoods,
} from '@/utils'
import { Router, useRouter } from 'next/router'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import {
  addEventBff,
  getEventDetailBFF,
  getGoodsBFF,
  updateEventBff,
} from '@/api'
import { GoodsAges, GoodsGenders, GoodsTypes, Routes } from '@/constants'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

type EventForm = {
  name?: string
  discount?: number
  startTime?: Date
  startDate?: Date
  endTime?: Date
  endDate?: Date
  image?: string
  goods?: string[]
}

const Detail = () => {
  const [data, setData] = useState<EventProps>()
  const [goodsData, setGoodsData] = useState<GoodsProps[]>([])
  const [allGoodsData, setAllGoodsData] = useState<GoodsProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAllGoods, setModalAllGoods] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<EventForm>({})

  const router = useRouter()
  const { id } = router.query

  const columns: ColumnsType<GoodsProps> = []
  if (goodsData) {
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
        return (
          <RemoveButton
            label=''
            borderRadius={5}
            onClick={() => {
              const _goodsData = [...goodsData]
              setGoodsData(
                _goodsData.filter((item: any) => item.id != record.id)
              )
            }}
          />
        )
      },
      onCell: (record) => {
        return {
          style: { maxWidth: 60 },
        }
      },
    })
  }

  const onSave = async () => {
    const event: EventProps = {
      id: '',
      name: formData?.name,
      discount: formData?.discount && formData?.discount / 100,
      startTime: FormatDateAndTime(
        new Date(formData.startDate ?? data?.startTime ?? ''),
        new Date(formData.startTime ?? data?.startTime ?? '')
      ),
      endTime: FormatDateAndTime(
        new Date(formData.endDate ?? data?.endTime ?? ''),
        new Date(formData.endTime ?? data?.endTime ?? '')
      ),
      image: '',
      goods: goodsData.map((goods) => goods.id),
    }

    if (data) {
      await updateEventBff(id, event)
        .then(async (res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          dispatch(setNotificationValue('Đã cập nhật thông tin'))
          router.push(Routes.admin.event)
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    } else {
      await addEventBff(event)
        .then(async (res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          dispatch(setNotificationValue('Đã thêm sự kiện mới'))
          router.push(Routes.admin.event)
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    }
  }

  const getAllGoods = async () => {
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
    setLoading(false)
  }
  useEffect(() => {
    getAllGoods()
  }, [])

  const getData = async () => {
    await getEventDetailBFF(id).then((res: any) => {
      const _data = formatEventDataXML(res.Data[0])
      setData(_data)
    })
  }
  useEffect(() => {
    if (id) getData()
    getAllGoods()
  }, [id])

  useEffect(() => {
    if (data && allGoodsData) {
      setGoodsData(
        allGoodsData.filter((item: GoodsProps) =>
          data?.goods?.includes(item.id)
        )
      )
    }
  }, [data, allGoodsData])

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
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                    }}
                  />
                )}
                {!id && (
                  <Input
                    className={styles.adminInputShadow}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className={styles.adminRow}>
              <Col span={8}>
                <b>Mức giảm (%)</b>
              </Col>
              <Col span={16}>
                {data && (
                  <InputNumber
                    className={styles.adminInputShadow}
                    defaultValue={data.discount}
                    onChange={(e) => {
                      setFormData({ ...formData, discount: e ?? 0 })
                    }}
                  />
                )}
                {!id && (
                  <InputNumber
                    className={styles.adminInputShadow}
                    onChange={(e: number | null) => {
                      setFormData({ ...formData, discount: e ?? 0 })
                    }}
                  />
                )}
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
                      onChange={(e) => {
                        setFormData({ ...formData, startDate: e?.toDate() })
                      }}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      onChange={(e) => {
                        setFormData({ ...formData, startDate: e?.toDate() })
                      }}
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
                      onChange={(e) => {
                        setFormData({ ...formData, endDate: e?.toDate() })
                      }}
                    />
                  )}
                  {!id && (
                    <DatePicker
                      className={styles.adminInputShadow}
                      format={'DD/MM/YYYY'}
                      onChange={(e) => {
                        setFormData({ ...formData, endDate: e?.toDate() })
                      }}
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
                      onChange={(e) => {
                        setFormData({ ...formData, startTime: e?.toDate() })
                      }}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      onChange={(e) => {
                        setFormData({ ...formData, startTime: e?.toDate() })
                      }}
                    />
                  )}
                  {data && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      defaultValue={dayjs(formatTime(data?.endTime), 'HH:mm')}
                      onChange={(e) => {
                        setFormData({ ...formData, endTime: e?.toDate() })
                      }}
                    />
                  )}
                  {!id && (
                    <TimePicker
                      className={styles.adminInputShadow}
                      format={'HH:mm'}
                      onChange={(e) => {
                        setFormData({ ...formData, endTime: e?.toDate() })
                      }}
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
            onClick={() => {
              router.push(Routes.admin.event)
            }}
          />
          <AddButton
            label='Lưu'
            icon={<CheckOutlined />}
            borderRadius={10}
            onClick={onSave}
          />
        </Space>
      </Card>
      <TableList<GoodsProps>
        data={goodsData ?? []}
        title='Sản phẩm áp dụng'
        columns={columns}
        loading={loading}
        ellipsis={true}
      />
      {modalAllGoods && (
        <ModalAllGoods
          open={modalAllGoods}
          cancel={() => setModalAllGoods(false)}
          callback={(listGoods: string[]) => {
            console.log(listGoods)
            setGoodsData(
              allGoodsData.filter((item: GoodsProps) =>
                listGoods.includes(item.id)
              )
            )
          }}
          extraData={goodsData}
          allGoods={allGoodsData}
        />
      )}
    </>
  )
}

Detail.displayName = 'Event Detail Management'

export default Detail
