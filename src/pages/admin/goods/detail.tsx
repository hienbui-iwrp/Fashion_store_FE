import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import {
  Colors,
  GoodsAges,
  GoodsGenders,
  GoodsSizes,
  GoodsTypes,
  Routes,
} from '@/constants'
import {
  CheckOutlined,
  CloseOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import {
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Image,
  Button,
  Form,
} from 'antd'
import { AddButton, DropdownButton, FilterTag, TableList } from '@/components'
import {
  formatDate,
  formatGoodsDataXML,
  formatGoodsInWarehouseDataXML,
  formatWarehouseDataXML,
  GoodsClassifyProps,
  GoodsInWarehouseProps,
  GoodsProps,
  ModalTranferGoods,
  WarehouseProps,
} from '@/utils'
import { useRouter } from 'next/router'
import {
  addGoodsBff,
  getGoodsDetailBFF,
  getGoodsInWarehouseBFF,
  getWarehouseBFF,
  updateGoodsBff,
} from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

const Detail = () => {
  const [data, setData] = useState<GoodsProps>()
  const [newGoods, setNewGoods] = useState<any>()
  const [warehouseData, setWarehouseData] = useState<WarehouseProps[]>()
  const [goodsInwarehouseData, setGoodsInWarehouseData] =
    useState<GoodsInWarehouseProps[]>()
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [modalTranferGoods, setModalTranferGoods] = useState(false)

  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const columns: ColumnsType<GoodsInWarehouseProps> = []
  if (data) {
    columns.push({
      title: 'Mã kho',
      dataIndex: 'warehouseId',
      render(text: string, record: GoodsClassifyProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
      sorter: (a: GoodsInWarehouseProps, b: GoodsInWarehouseProps) =>
        (a.id ?? 1) > (b.id ?? 1) ? 1 : -1,
    })

    columns.push({
      title: 'Tên kho',
      dataIndex: '',
      render(text: string, record: any, index: number) {
        return (
          warehouseData?.find(
            (item: WarehouseProps) => item.id === record.warehouseId
          )?.name ?? 'kho'
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
    })
    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: GoodsInWarehouseProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: GoodsInWarehouseProps, b: GoodsInWarehouseProps) =>
        a.quantity > b.quantity ? 1 : -1,
    })

    columns.push({
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render(text: string, record: GoodsInWarehouseProps, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
    })

    columns.push({
      title: 'Ngày thêm',
      dataIndex: 'updateDate',
      render(text: string, record: GoodsInWarehouseProps, index: number) {
        return text ? formatDate(text) : 'Chưa có'
      },
      onCell: (record) => {
        return {
          style: { minWidth: 110 },
        }
      },
    })
  }

  const onSave = async () => {
    if (id) {
      await updateGoodsBff(id, data, sizes, colors)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          dispatch(setNotificationValue('Đã cập nhật thông tin hàng'))
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
      router.push(Routes.admin.goods)

      console.log('data: ', data)
    } else {
      try {
        const goods: GoodsProps = {
          ...newGoods,

          size: sizes[0],
          color: colors[0],
          isSale: true,
        }
        if (
          !goods.name ||
          !goods.color ||
          !goods.size ||
          !goods.type ||
          !goods.gender ||
          !goods.age ||
          !goods.supplier ||
          !goods.price ||
          !goods.cost
        )
          throw new Error()
        await addGoodsBff(goods, sizes, colors)
          .then((res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('Đã thêm hàng mới'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        router.push(Routes.admin.goods)
      } catch {
        dispatch(setNotificationType('error'))
        dispatch(setNotificationValue('Vui lòng nhập đầy đủ thông tin'))
      }
    }
  }

  const getData = async () => {
    await getGoodsDetailBFF(id)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: GoodsProps) =>
          formatGoodsDataXML(item)
        )
        setData(_data[0])
        setSizes(
          _data.reduce(
            (acc: string[], item: any) =>
              acc.includes(item.size) ? acc : [...acc, item.size],
            []
          )
        )
        setColors(
          _data.reduce(
            (acc: string[], item: any) =>
              acc.includes(item.color) ? acc : [...acc, item.color],
            []
          )
        )
      })
      .catch((err) => console.log('err getGoodsDetailBFF: ', err))

    await getGoodsInWarehouseBFF(id)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _goodsInWarehouseData = res.Data.map((item: any) =>
          formatGoodsInWarehouseDataXML(item)
        )
        setGoodsInWarehouseData(_goodsInWarehouseData)
      })
      .catch((err) => console.log('err getGoodsInWarehouseBFF: ', err))

    await getWarehouseBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => formatWarehouseDataXML(item))
        setWarehouseData(_data)
      })
      .catch((err) => console.log('err getWarehouseBFF: ', err))
  }

  useEffect(() => {
    if (id) getData()
    setLoading(false)
  }, [id])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card>
          {id && (
            <Row className={styles.adminRow}>
              <Col xs={12} sm={4}>
                <b>Mã sản phẩm</b>
              </Col>
              <Col xs={12} sm={20}>
                <b>{data?.id}</b>
              </Col>
            </Row>
          )}

          <Row>
            <Col xs={24} sm={15}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={6}>
                  <b>Tên sản phẩm</b>
                </Col>
                <Col xs={14} sm={18}>
                  {data?.name && (
                    <Input
                      defaultValue={data.name}
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setData({ ...data, name: e.target.value })
                      }}
                    />
                  )}
                  {!id && (
                    <Input
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setNewGoods({ ...newGoods, name: e.target.value })
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Giới tính</b>
                </Col>
                <Col xs={14} sm={16}>
                  {data && (
                    <DropdownButton
                      label={
                        GoodsGenders.find(
                          (item: any) => item.value == data.gender
                        )?.label
                      }
                      callback={(item: any) =>
                        setData({
                          ...data,
                          gender:
                            GoodsGenders.find((i: any) => item == i.label)
                              ?.value ?? GoodsGenders[2].value,
                        })
                      }
                      items={GoodsGenders.map((item: any) => item.label)}
                    />
                  )}
                  {!data && (
                    <DropdownButton
                      label={'Giới tính'}
                      callback={(item: any) =>
                        setNewGoods({
                          ...newGoods,
                          gender:
                            GoodsGenders.find((i: any) => item == i.label)
                              ?.value ?? GoodsGenders[2].value,
                        })
                      }
                      items={GoodsGenders.map((item: any) => item.label)}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={7} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={13}>
                  <b>Đơn giá</b>
                </Col>
                <Col xs={14} sm={11}>
                  {data?.price && (
                    <InputNumber
                      defaultValue={data.price}
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setData({ ...data, price: e.target.value })
                      }}
                    />
                  )}
                  {!id && (
                    <InputNumber
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setNewGoods({ ...newGoods, price: e.target.value })
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col sm={1} lg={2}></Col>
            <Col xs={24} sm={7} lg={6}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={12}>
                  <b>Giá nhập</b>
                </Col>
                <Col xs={14} sm={12}>
                  {data?.cost && (
                    <InputNumber
                      defaultValue={data?.cost}
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setData({ ...data, cost: e.target.value })
                      }}
                    />
                  )}
                  {!id && (
                    <InputNumber
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setNewGoods({ ...newGoods, cost: e.target.value })
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Loại</b>
                </Col>
                <Col xs={14} sm={16}>
                  {data && (
                    <DropdownButton
                      label={
                        GoodsTypes.find((item: any) => item.value == data.type)
                          ?.label
                      }
                      callback={(item: any) =>
                        setData({
                          ...data,
                          type:
                            GoodsTypes.find((i: any) => item == i.label)
                              ?.value ?? GoodsTypes[2].value,
                        })
                      }
                      items={GoodsTypes.map((item: any) => item.label)}
                    />
                  )}
                  {!data && (
                    <DropdownButton
                      label={'Loại'}
                      callback={(item: any) =>
                        setNewGoods({
                          ...newGoods,
                          type:
                            GoodsTypes.find((i: any) => item == i.label)
                              ?.value ?? GoodsTypes[2].value,
                        })
                      }
                      items={GoodsTypes.map((item: any) => item.label)}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={15}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={6}>
                  <b>Nhà cung cấp</b>
                </Col>
                <Col xs={14} sm={18}>
                  {data?.supplier && (
                    <Input
                      defaultValue={data.supplier}
                      className={styles.adminInputShadow}
                    />
                  )}
                  {!id && (
                    <Input
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setNewGoods({ ...newGoods, supplier: e.target.value })
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={8}>
                  <b>Lứa tuổi</b>
                </Col>
                <Col xs={14} sm={16}>
                  {data && (
                    <DropdownButton
                      label={
                        GoodsAges.find((item: any) => item.value == data.age)
                          ?.label
                      }
                      callback={(item: any) =>
                        setData({
                          ...data,
                          type:
                            GoodsAges.find((i: any) => item == i.label)
                              ?.value ?? GoodsAges[2].value,
                        })
                      }
                      items={GoodsAges.map((item: any) => item.label)}
                    />
                  )}
                  {!data && (
                    <DropdownButton
                      label={'Lứa tuổi'}
                      callback={(item: any) =>
                        setNewGoods({
                          ...newGoods,
                          age:
                            GoodsAges.find((i: any) => item == i.label)
                              ?.value ?? GoodsAges[0].value,
                        })
                      }
                      items={GoodsAges.map((item: any) => item.label)}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={15}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={6}>
                  <b>Mô tả</b>
                </Col>
                <Col xs={14} sm={18}>
                  {data?.description && (
                    <Input
                      defaultValue={data.description}
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setData({ ...data, description: e.target.value })
                      }}
                    />
                  )}
                  {!id && (
                    <Input
                      className={styles.adminInputShadow}
                      onBlur={(e) => {
                        setNewGoods({
                          ...newGoods,
                          description: e.target.value,
                        })
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={1} lg={2}></Col>
            <Col xs={24} sm={8} lg={7}></Col>
          </Row>
          <Row>
            <Col xs={24} sm={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={13}>
                  <b>Màu sắc</b>
                </Col>
                <Col xs={14} sm={11}>
                  <Input
                    className={styles.adminInputShadow}
                    onBlur={(e) => {
                      e.preventDefault()
                      if (
                        e.target.value != '' &&
                        !colors.includes(e.target.value)
                      ) {
                        console.log('aaa')
                        setColors([...colors, e.target.value])
                      }
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <div className='flex items-center ml-4'>
              {colors?.map((item) => (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _colors = [...colors]
                    var index = _colors.indexOf(item)
                    if (index > -1) {
                      _colors.splice(index, 1)
                      setColors(_colors)
                    }
                  }}
                />
              ))}
            </div>
          </Row>
          <Row>
            <Col xs={24} sm={7}>
              <Row className={styles.adminRow}>
                <Col xs={10} sm={13}>
                  <b>Kích thước</b>
                </Col>
                <Col xs={14} sm={11}>
                  <DropdownButton
                    label={''}
                    callback={(item: any) => {
                      if (sizes.indexOf(item) == -1) setSizes([...sizes, item])
                    }}
                    items={GoodsSizes.map((item: any) => item.label)}
                  />
                </Col>
              </Row>
            </Col>
            <div className='flex items-center ml-4 flex-wrap	'>
              {sizes?.map((item) => (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _sizes = [...sizes]
                    var index = _sizes.indexOf(item)
                    if (index > -1) {
                      _sizes.splice(index, 1)
                      setSizes(_sizes)
                    }
                  }}
                />
              ))}
            </div>
          </Row>
          <div className='flex flex-wrap my-3'>
            {data?.image?.map((img: string, index: number) => {
              return (
                <span key={index} className='relative drop-shadow-md mx-2'>
                  <Image
                    style={{ maxWidth: 100, maxHeight: 100 }}
                    src={img}
                    alt='img'
                  />
                  <Button
                    className='absolute flex items-center  justify-center'
                    style={{
                      top: -6,
                      right: -6,
                      width: 14,
                      height: 14,
                      fontSize: 8,
                      borderRadius: 12,
                      backgroundColor: Colors.adminRed900,
                      color: Colors.white,
                    }}
                    icon={<CloseOutlined />}
                  ></Button>
                </span>
              )
            })}
            <Button
              icon={<FileImageOutlined />}
              style={{
                height: 100,
                marginLeft: 10,
                backgroundColor: Colors.adminGreen900,
                color: Colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Thêm ảnh
            </Button>
          </div>
          <p className='flex justify-end'>
            <AddButton label='Lưu' icon={<CheckOutlined />} onClick={onSave} />
          </p>
        </Card>
        {sizes &&
          colors &&
          colors.map((colorItem: any, colorIndex: number) => {
            return sizes.map((sizeItem: any, sizeIndex: number) => {
              const _data = goodsInwarehouseData?.filter(
                (item: GoodsInWarehouseProps) =>
                  item.size == sizeItem && item.color == colorItem
              )
              return (
                <div key={`${sizeIndex}${colorIndex}`} className='my-2'>
                  <TableList<GoodsInWarehouseProps>
                    data={_data ?? []}
                    columns={columns}
                    pagination={false}
                    loading={loading}
                    header={
                      <div className='flex justify-between'>
                        <div style={{ minWidth: 150 }}>
                          <Row className='mb-2'>
                            <Col span={18}>
                              <b>Màu</b>
                            </Col>
                            <Col span={6}>{colorItem}</Col>
                          </Row>
                          <Row className='mb-2'>
                            <Col span={18}>
                              <b>Kích thước</b>
                            </Col>
                            <Col span={6}>{sizeItem}</Col>
                          </Row>
                        </div>
                        <div>
                          <AddButton
                            label='Vận chuyển hàng'
                            onClick={() => {
                              setModalTranferGoods(true)
                            }}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>
              )
            })
          })}
      </Space>
      <ModalTranferGoods
        open={modalTranferGoods}
        cancel={() => setModalTranferGoods(false)}
        extraData={warehouseData}
      />
    </>
  )
}

Detail.displayName = 'Goods Detail'

export default Detail
