import React, { useState } from 'react'
import { Modal, Space, Input, InputNumber, Row, Col, Radio } from 'antd'
import { AddButton, DropdownButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { ModalTranferGoodsProps } from '..'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { useDispatch } from 'react-redux'

dayjs.extend(customParseFormat)

const ModalTranferGoods = (props: ModalTranferGoodsProps) => {
  const [mode, setMode] = useState<number>(-1)

  const dispatch = useDispatch()

  const onSave = async () => {}

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
            <b>Hành động</b>
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
                <Radio value={0}>Nhập kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4} className='my-1'>
                <Radio value={1}>Chuyển kho</Radio>
              </Col>
              <Col xs={24} sm={8} lg={4} className='my-1'>
                <Radio value={2}>Xuất kho</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6} className='my-1'>
                <Radio value={3}>Trả hàng nhà cung cấp</Radio>
              </Col>
              <Col xs={24} sm={12} lg={6} className='my-1'>
                <Radio value={4}>Khách trả hàng</Radio>
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
                    items={props.extraData?.map((item) => item.name)}
                    disabled={![0, 1, 4].includes(mode)}
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
                    items={props.extraData?.map((item) => item.name)}
                    disabled={![1, 2, 3].includes(mode)}
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
                    disabled={![0, 3].includes(mode)}
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
                  <InputNumber className={styles.adminInputShadow} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={9}>
                  <b>Giao vận</b>
                </Col>
                <Col xs={14} lg={15}>
                  <DropdownButton
                    label='GHN'
                    items={['a', 'a']}
                    disabled={![1, 2, 3].includes(mode)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={2} lg={4}></Col>
            <Col xs={24} sm={11} lg={10}>
              <Row className={styles.adminRow}>
                <Col xs={10} lg={8}>
                  <b>Mã đơn</b>
                </Col>
                <Col xs={14} lg={16}>
                  <Input
                    className={styles.adminInputShadow}
                    disabled={![2, 4].includes(mode)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ModalTranferGoods
