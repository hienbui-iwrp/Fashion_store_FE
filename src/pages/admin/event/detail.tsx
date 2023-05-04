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
  UploadFile,
  UploadProps,
  Upload,
  Button,
  Modal,
} from 'antd'
import { AddButton, RemoveButton, TableList } from '@/components'
import {
  EventProps,
  formatDate,
  FormatDateAndTime,
  formatEventDataXML,
  formatGoodsDataXML,
  formatRouteImage,
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
  deleteEventImageBFF,
  getEventDetailBFF,
  getGoodsBFF,
  updateEventBff,
  uploadEventImageBFF,
} from '@/api'
import {
  Colors,
  GoodsAges,
  GoodsGenders,
  GoodsTypes,
  Routes,
} from '@/constants'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'
import { RcFile } from 'antd/lib/upload'

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

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const Detail = () => {
  const [data, setData] = useState<EventProps>()
  const [goodsData, setGoodsData] = useState<GoodsProps[]>([])
  const [allGoodsData, setAllGoodsData] = useState<GoodsProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAllGoods, setModalAllGoods] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<EventForm>({})

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

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
                ? formatRouteImage(record?.image[0])
                : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
            }
            preview={{
              src: record?.image
                ? formatRouteImage(record?.image[0])
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

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = async (e: any) => {
    if (fileList?.length > e.fileList.length) {
      // delete
      await deleteEventImageBFF({ id })
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('Fail')
          console.log('Delete image success')
        })
        .catch(() => {
          console.log('Delete image error')
        })
    }

    if (fileList?.length < e.fileList.length) {
      await uploadEventImageBFF({ eventId: id, file: e.file.originFileObj })
        .then((res: any) => {
          console.log(res)
          if (res.StatusCode != 200) throw new Error('Fail')
          console.log('Upload image success')
        })
        .catch(() => {
          console.log('Upload image error')
        })
    }

    setFileList(e.fileList)
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
      if (_data?.image != '')
        setFileList([
          ...[],
          {
            uid: '1',
            name: _data?.image ?? '',
            status: 'done',
            url: formatRouteImage(_data?.image),
          },
        ])
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
                    placeholder='Nhập tên sự kiện'
                  />
                )}
                {!id && (
                  <Input
                    className={styles.adminInputShadow}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                    }}
                    placeholder='Nhập tên sự kiện'
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
                    placeholder='Nhập mức giảm'
                  />
                )}
                {!id && (
                  <InputNumber
                    className={styles.adminInputShadow}
                    onChange={(e: number | null) => {
                      setFormData({ ...formData, discount: e ?? 0 })
                    }}
                    placeholder='Nhập mức giảm'
                  />
                )}
              </Col>
            </Row>
            {id && (
              <Row className={styles.adminRow} style={{ height: 110 }}>
                <Col span={8}>
                  <b>Ảnh</b>
                </Col>
                <Col span={16}>
                  <Upload
                    className='flex'
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList?.length == 0 && (
                      <Button
                        icon={<FileImageOutlined />}
                        style={{
                          height: 100,
                          width: 100,
                          marginLeft: 0,
                          backgroundColor: Colors.adminGreen900,
                          color: Colors.white,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Thêm ảnh
                      </Button>
                    )}
                  </Upload>
                </Col>
              </Row>
            )}
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
      <Modal open={previewOpen} footer={null} onCancel={handleCancel} centered>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

Detail.displayName = 'Event Detail Management'

export default Detail
