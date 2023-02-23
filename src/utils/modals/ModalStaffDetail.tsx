import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, List, Divider } from 'antd'
import { ModalStaffDetailProps } from '../types/modalType'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from '@/styles/Admin.module.css'
import { useRouter } from 'next/router'
import {
  formatAddress,
  formatBranchData,
  formatDate,
  formatNumber,
} from '../formats'
import { getBranchDetail } from '@/api'
import { BranchProps } from '../types'

dayjs.extend(customParseFormat)

interface DataType {
  id: string
  name: string
  citizenId: string
  phone: string
  address?: string
  street?: string
  ward?: string
  district?: string
  province?: string
  dateOfBirth: Date
  homeTown: string
  workLocation: string
  role: string
  salary: number
  startDate: Date
  account?: string
}

interface ItemType {
  name: string
  content: string | number
}

const ModalStaffDetail = (props: ModalStaffDetailProps) => {
  const [dataItems1, setDataItems1] = useState<ItemType[]>([])
  const [dataItems2, setDataItems2] = useState<ItemType[]>([])

  const updateData = (branch: BranchProps) => {
    setDataItems1([
      { name: 'Mã nhân viên', content: props?.extraData?.id ?? '' },
      { name: 'Tên nhân viên', content: props?.extraData?.name ?? '' },
      { name: 'Căn cước', content: props?.extraData?.citizenId ?? '' },
      { name: 'Số điện thoại', content: props?.extraData?.phone ?? '' },
      { name: 'Địa chỉ', content: formatAddress(props?.extraData) ?? '' },
      {
        name: 'Ngày sinh',
        content: formatDate(props?.extraData?.birthdate) ?? '',
      },
    ])
    setDataItems2([
      { name: 'Quê quán', content: props?.extraData?.hometown ?? '' },
      { name: 'Nơi làm việc', content: branch.name ?? '' },
      { name: 'Vị trí', content: props?.extraData?.role ?? '' },
      {
        name: 'Lương',
        content: formatNumber(props?.extraData?.salary ?? 0) + ' VND',
      },
      {
        name: 'Ngày bắt đầu',
        content: formatDate(props?.extraData?.startDate) ?? '',
      },
      {
        name: 'Tài khoản',
        content: props?.extraData?.account ?? 'Không có',
      },
    ])
  }

  useEffect(() => {
    if (props.extraData) {
      getBranchDetail(props.extraData.branchId).then((res: any) => {
        const _data = formatBranchData(res.data.Data)
        updateData(_data)
      })
    }
  }, [props.open])

  return (
    <>
      <Modal
        title='Thông tin chi tiết'
        centered
        open={props.open}
        onCancel={props.cancel}
        footer={<></>}
        width={'80%'}
      >
        <Row justify='center' align='middle'>
          <Col xs={24} sm={11}>
            <Row>
              <Col xs={24} sm={23}>
                <List
                  bordered={false}
                  dataSource={dataItems1 ?? []}
                  key={'list1'}
                  renderItem={(item) => {
                    return (
                      item.content && (
                        <Row style={{ padding: 8 }}>
                          <Col xs={24} lg={8}>
                            <b>{item.name}</b>
                          </Col>
                          <Col xs={24} lg={16}>
                            {item.content}
                          </Col>
                        </Row>
                      )
                    )
                  }}
                />
              </Col>
              <Col xs={0} sm={1}>
                <Divider
                  type='vertical'
                  style={{
                    height: '100%',
                    backgroundColor: '#aaa',
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12}>
            <List
              bordered={false}
              dataSource={dataItems2 ?? []}
              key={'list2'}
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
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ModalStaffDetail
