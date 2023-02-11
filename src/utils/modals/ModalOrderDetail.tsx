import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, List, Divider } from 'antd'
import { ModalOrderDetailProps } from '../types/modalType'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from '@/styles/Admin.module.css'
import { formatDate, FormatNumber } from '../formats'
import { TableList } from '@/components'
import { ColumnsType } from 'antd/es/table'
import { Colors } from '@/constants'

dayjs.extend(customParseFormat)

interface Goods {
  id: string
  name: string
  price: number
  quantity: number
}

const ModalOrderDetail = (props: ModalOrderDetailProps) => {
  const columns: ColumnsType<Goods> = []
  if (props.extraData) {
    columns.push({
      title: 'STT',
      dataIndex: '',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{index}</div>,
        }
      },
    })
    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'createdDate',
      render(text: string, record: Goods, index: number) {
        return {
          children: <div>{record.name}</div>,
        }
      },
    })
    columns.push({
      title: 'Đơn giá',
      dataIndex: 'price',
      render(text: string, record: Goods, index: number) {
        return {
          props: {
            style: {
              background: index % 2 ? Colors.white : Colors.adminBackground,
              color: text == 'Đang giao' ? Colors.adminRed500 : Colors.black,
            },
          },
          children: <div>{FormatNumber(text)}</div>,
        }
      },
    })
    columns.push({
      title: 'Số lượng',
      dataIndex: 'quantity',
      render(text: string, record: any, index: number) {
        return {
          children: <div>{FormatNumber(text)}</div>,
        }
      },
    })
    columns.push({
      title: 'Thành tiền',
      dataIndex: '',
      render(text: string, record: any, index: number) {
        return {
          children: <div>{FormatNumber(record.quantity * record.price)}</div>,
        }
      },
    })
  }

  return (
    <>
      <Modal
        title='Chi tiết đơn hàng'
        centered
        open={props.open}
        onCancel={props.cancel}
        footer={<></>}
        width={'80%'}
      >
        <TableList<any>
          data={props.extraData?.goods ?? []}
          columns={columns}
          scroll={{ y: '30vh' }}
          header={
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={24} lg={10}>
                    <b>Mã đơn hàng</b>
                  </Col>
                  <Col xs={24} lg={14}>
                    {props.extraData?.id}
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} lg={10}>
                    <b>Ngày tạo</b>
                  </Col>
                  <Col xs={24} sm={14}>
                    {formatDate(props.extraData?.createdDate)}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={24} lg={10}>
                    <b>Trạng thái</b>
                  </Col>
                  <Col xs={24} lg={14}>
                    {props.extraData?.status}
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} lg={10}>
                    <b>Ngày hoàn thành</b>
                  </Col>
                  <Col xs={24} lg={14}>
                    {'Chưa có thông tin'}
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          pagination={'none'}
        />
        <Divider
          style={{
            height: 2,
            backgroundColor: '#333',
          }}
        />
        <div className='flex justify-end'>
          <Col xs={18} sm={12} lg={8}>
            <Row>
              <Col span={12}>
                <b>Tổng tiền</b>
              </Col>
              <Col span={12}>{FormatNumber(props.extraData?.total ?? 0)}</Col>
            </Row>
            <Row>
              <Col span={12}>Thuế</Col>
              <Col span={12}>{FormatNumber(props.extraData?.tax ?? 0)}</Col>
            </Row>
            <Row>
              <Col span={12}>Khuyến mãi</Col>
              <Col span={12}>{FormatNumber(0)}</Col>
            </Row>
            <Divider />
            <Row>
              <Col span={12}>
                <b>Tổng cộng</b>
              </Col>
              <Col span={12}>
                {FormatNumber(
                  (props.extraData?.total ?? 0) + (props.extraData?.tax ?? 0)
                )}
              </Col>
            </Row>
          </Col>
        </div>
      </Modal>
    </>
  )
}

export default ModalOrderDetail
