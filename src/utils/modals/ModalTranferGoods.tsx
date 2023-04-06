import React, { useState } from 'react'
import { Modal, Space, Input, InputNumber, Row, Col, Radio } from 'antd'
import { AddButton, DropdownButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { ModalTranferGoodsProps } from '..'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { useDispatch } from 'react-redux'
import {
  customerReturnGoodsBff,
  exportGoodsBff,
  importGoodsBff,
  returnGoodsBff,
  tranferGoodsBff,
} from '@/api'
import { useRouter } from 'next/router'
import { setNotificationType, setNotificationValue } from '@/redux'

dayjs.extend(customParseFormat)

const Action = {
  null: -1,
  import: 0,
  tranfer: 1,
  export: 2,
  return: 3,
  customerReturn: 4,
}

const ModalTranferGoods = (props: ModalTranferGoodsProps) => {
  const [mode, setMode] = useState<number>(Action.null)
  const [warehouseImport, setWarehouseImport] = useState<string>('')
  const [warehouseExport, setWarehouseExport] = useState<string>('')
  const [suppiler, setSuppiler] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

  const dispatch = useDispatch()

  const onSave = async () => {
    console.log(props.extraData)
    switch (mode) {
      case Action.import:
        await importGoodsBff(
          props?.extraData?.goodsClassify ?? {},
          quantity,
          suppiler,
          warehouseImport
        )
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            props.callback && props.callback({})
            props?.cancel()
            dispatch(setNotificationValue('Thực hiện thành công'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        break
      case Action.export:
        await exportGoodsBff(
          props?.extraData?.goodsClassify ?? {},
          quantity,
          warehouseExport,
          order
        )
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            props.callback && props.callback({})
            props?.cancel()
            dispatch(setNotificationValue('Thực hiện thành công'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        break
      case Action.tranfer:
        await tranferGoodsBff(
          props?.extraData?.goodsClassify ?? {},
          quantity,
          warehouseExport,
          warehouseImport
        )
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            props.callback && props.callback({})
            props?.cancel()
            dispatch(setNotificationValue('Thực hiện thành công'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        break
      case Action.return:
        await returnGoodsBff(
          props?.extraData?.goodsClassify ?? {},
          quantity,
          warehouseExport,
          suppiler
        )
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            props.callback && props.callback({})
            props?.cancel()
            dispatch(setNotificationValue('Thực hiện thành công'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        break
      case Action.customerReturn:
        await customerReturnGoodsBff(
          props?.extraData?.goodsClassify ?? {},
          quantity,
          order,
          warehouseImport
        )
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            props.callback && props.callback({})
            props?.cancel()
            dispatch(setNotificationValue('Thực hiện thành công'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
        break
      default:
        dispatch(setNotificationType('error'))
        dispatch(setNotificationValue('Vui lòng chọn tác vụ'))
        break
    }
  }

  return (
    <>
      <Modal
        title={props.extraData ? 'Vận chuyển hàng' : 'Nhập hàng'}
        style={{ maxWidth: 850 }}
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
        width={'90%'}
        footer={[
          <Space key='btn'>
            <RemoveButton
              label='Hủy'
              key='cancel'
              icon={<CloseOutlined />}
              onClick={props.cancel}
            />
            ,
            <AddButton
              key='add'
              label='Thực hiện'
              icon={<CheckOutlined />}
              onClick={onSave}
            />
          </Space>,
        ]}
      >
        <div style={{ margin: '0 20px' }}>
          <div className='mb-1 pt-2'>
            <b>Tác vụ</b>
          </div>
          <Radio.Group
            onChange={(event: any) => {
              setMode(event.target.value)
              console.log(event.target.value)
            }}
            style={{ width: '100%' }}
          >
            <Row className={styles.row}>
              <Col xs={24} sm={8} lg={4} className='my-1'>
                <Radio value={Action.import}>Nhập kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4} className='my-1'>
                <Radio value={Action.tranfer}>Chuyển kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4} className='my-1'>
                <Radio value={Action.export}>Xuất kho</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6} className='my-1'>
                <Radio value={Action.return}>Trả hàng nhà cung cấp</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6} className='my-1'>
                <Radio value={Action.customerReturn}>Khách trả hàng</Radio>
              </Col>
            </Row>
          </Radio.Group>

          <Row className='mt-6'>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Kho nhập</b>
                </Col>
                <Col xs={14} lg={15}>
                  <DropdownButton
                    label='Chọn kho'
                    items={props.extraData?.allWarehouse?.map(
                      (item) => item.name
                    )}
                    disabled={
                      ![
                        Action.import,
                        Action.tranfer,
                        Action.customerReturn,
                      ].includes(mode)
                    }
                    callback={(text: string) => {
                      setWarehouseImport(
                        props.extraData?.allWarehouse?.find(
                          (item) => item.name == text
                        )?.id ?? ''
                      )
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Kho Xuất</b>
                </Col>
                <Col xs={14} lg={16}>
                  <DropdownButton
                    label='Chọn kho'
                    items={props.extraData?.allWarehouse?.map(
                      (item) => item.name
                    )}
                    disabled={
                      ![Action.export, Action.tranfer, Action.return].includes(
                        mode
                      )
                    }
                    callback={(text: string) => {
                      setWarehouseExport(
                        props.extraData?.allWarehouse?.find(
                          (item) => item.name == text
                        )?.id ?? ''
                      )
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Nhà cung cấp</b>
                </Col>
                <Col xs={14} lg={15}>
                  <Input
                    className={styles.adminInputShadow}
                    disabled={![Action.import, Action.return].includes(mode)}
                    onBlur={(e) => setSuppiler(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Số lượng</b>
                </Col>
                <Col xs={14} lg={16}>
                  <InputNumber
                    className={styles.adminInputShadow}
                    onBlur={(e) => setQuantity(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Mã đơn</b>
                </Col>
                <Col xs={14} lg={15}>
                  <Input
                    className={styles.adminInputShadow}
                    disabled={
                      ![Action.export, Action.customerReturn].includes(mode)
                    }
                    onBlur={(e) => setOrder(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              {/* <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Giao vận</b>
                </Col>
                <Col xs={14} lg={16}>
                  <DropdownButton
                    label='GHN'
                    items={['a', 'a']}
                    disabled={
                      ![Action.export, Action.tranfer, Action.return].includes(
                        mode
                      )
                    }
                  />
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ModalTranferGoods
