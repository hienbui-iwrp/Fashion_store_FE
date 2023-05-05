import {
  getBranchDetailBff,
  getOrdersDetailBFF,
  getStaffDetailBFF,
} from '@/api'
import { TableList } from '@/components'
import { ShipStatus } from '@/constants'
import {
  BranchProps,
  GoodsOrderAdminData,
  OrderAdminData,
  StaffProps,
  formatAddress,
  formatBranchDataXML,
  formatDate,
  formatNumber,
  formatOrderAdminDataXML,
  formatRouteImage,
  formatStaffDataXML,
} from '@/utils'
import { Card, Col, Divider, Row, Image } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Detail = () => {
  const [data, setData] = useState<OrderAdminData>()
  const [branchData, setBranchData] = useState<BranchProps>()
  const [staffData, setStaffData] = useState<StaffProps>()

  const routes = useRouter()
  const { id } = routes.query

  const columns: ColumnsType<GoodsOrderAdminData> = []
  if (data) {
    columns.push({
      title: 'Mã sản phẩm',
      dataIndex: 'goodsId',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.goodsId > b.goodsId ? 1 : -1,
    })

    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.name > b.name ? 1 : -1,
    })

    columns.push({
      title: 'Hình ảnh',
      dataIndex: 'image',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return (
          <Image
            alt='img'
            src={
              formatRouteImage(record?.image) ??
              'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
            }
            style={{
              maxWidth: 40,
              maxHeight: 40,
            }}
          />
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.name > b.name ? 1 : -1,
    })

    columns.push({
      title: 'Màu sắc',
      dataIndex: 'goodsColor',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
    })

    columns.push({
      title: 'Kích thước',
      dataIndex: 'goodsSize',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
    })

    columns.push({
      title: 'Đơn giá',
      dataIndex: 'price',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return formatNumber(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.price > b.price ? 1 : -1,
    })

    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.quantity > b.quantity ? 1 : -1,
    })

    columns.push({
      title: 'Thành tiền',
      dataIndex: '',
      render(text: string, record: GoodsOrderAdminData, index: number) {
        return formatNumber(record.quantity * record.price)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: GoodsOrderAdminData, b: GoodsOrderAdminData) =>
        a.quantity * a.price > b.quantity * b.price ? 1 : -1,
    })
  }

  const getData = async () => {
    await getOrdersDetailBFF(id)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error()
        const _data = formatOrderAdminDataXML(res.Data[0])
        setData(_data)
        console.log(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (id) getData()
  }, [id])

  const getMoreDate = async () => {
    if (!data?.isOnline) {
      await getBranchDetailBff(data?.offlineData?.branchhId)
        .then((data: any) => {
          const _data = formatBranchDataXML(data)
          setBranchData(_data)
        })
        .catch((err) => console.log(err))

      await getStaffDetailBFF(data?.offlineData?.staffId)
        .then((res: any) => {
          const _data = formatStaffDataXML(res.Data[0])
          setStaffData(_data)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    if (data) getMoreDate()
  }, [data])

  const Total = () => {
    const totalPrice = Number(data?.totalPrice) ?? 0
    const totalTax = Number(
      data?.goods.reduce((acc: number, item: GoodsOrderAdminData) => {
        console.log('item: ', item)
        return acc + item.tax
      }, 0)
    )
    const totalDiscount = Number(
      data?.goods.reduce(
        (acc: number, item: GoodsOrderAdminData) =>
          acc + item.discount * item.unitPrice,
        0
      )
    )
    let totalShip = 0

    if (data?.isOnline) totalShip = Number(data.onlineData?.shipFee) ?? 0

    return (
      <div className='flex justify-end'>
        <Col xs={18} sm={12} lg={8}>
          <Row>
            <Col span={12}>
              <b>Tổng tiền</b>
            </Col>
            <Col span={12}>{formatNumber(totalPrice)}</Col>
          </Row>
          <Row className='my-2'>
            <Col span={12}>Thuế</Col>
            <Col span={12}>{formatNumber(totalTax)}</Col>
          </Row>
          <Row className='my-2'>
            <Col span={12}>Khuyến mãi</Col>
            <Col span={12}>{formatNumber(totalDiscount)}</Col>
          </Row>
          {data?.isOnline && (
            <Row className='my-2'>
              <Col span={12}>Ship</Col>
              <Col span={12}>{formatNumber(totalShip)}</Col>
            </Row>
          )}
          <Divider
            style={{
              height: 1,
              backgroundColor: '#aaa',
            }}
          />
          <Row>
            <Col span={12}>
              <b>Tổng cộng</b>
            </Col>
            <Col span={12}>
              {formatNumber(totalPrice + totalTax - totalDiscount + totalShip)}
            </Col>
          </Row>
        </Col>
      </div>
    )
  }

  return (
    data && (
      <Card>
        <TableList<GoodsOrderAdminData>
          data={data?.goods ?? []}
          columns={columns}
          scroll={{ y: '30vh' }}
          header={
            <>
              <Row>
                <Col xs={12}>
                  <Row className='mb-4'>
                    <Col xs={24} lg={10}>
                      <b>Chi nhánh</b>
                    </Col>
                    <Col xs={24} lg={14}>
                      {data?.isOnline ? 'Trực tuyến' : branchData?.name}
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col xs={24} lg={10}>
                      <b>Ngày giao dịch</b>
                    </Col>
                    <Col xs={24} sm={14}>
                      {formatDate(data?.transactionDate)}
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row className='mb-4'>
                    <Col xs={24} lg={10}>
                      <b>Mã đơn</b>
                    </Col>
                    <Col xs={24} lg={14}>
                      {data?.id}
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col xs={24} lg={10}>
                      <b>
                        {data?.isOnline
                          ? 'Tên đăng nhập'
                          : 'Nhân viên giao dịch'}
                      </b>
                    </Col>
                    <Col xs={24} lg={14}>
                      {!data?.isOnline
                        ? ` ${staffData?.name} (${staffData?.id})`
                        : data?.onlineData?.customerId}
                    </Col>
                  </Row>
                </Col>
              </Row>
              {data?.onlineData && (
                <>
                  <Row style={{ marginTop: -14 }}>
                    <Col xs={12}>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Tên người nhận</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {data?.onlineData.nameReceiver}
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Số điện thoại</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {data?.onlineData.phoneReceiver}
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Ngày dự kiến</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {formatDate(data.onlineData.expectDate)}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12}>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Email người nhận</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {data?.onlineData.emailReceiver}
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Trạng thái</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {ShipStatus.find(
                            (item: any) => item.value == data.onlineData?.status
                          )?.label ?? 'Không xác định'}
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col xs={24} lg={10}>
                          <b>Phương thức thanh toán</b>
                        </Col>
                        <Col xs={24} lg={14}>
                          {data.onlineData.paymentMethod}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={24} lg={5}>
                      <b>Địa chỉ</b>
                    </Col>
                    <Col xs={24} lg={18}>
                      {formatAddress(data.onlineData?.address)}
                    </Col>
                  </Row>
                </>
              )}
            </>
          }
          pagination={false}
        />
        <Divider
          style={{
            height: 2,
            backgroundColor: '#333',
          }}
        />
        <Total />
      </Card>
    )
  )
}

export default Detail
