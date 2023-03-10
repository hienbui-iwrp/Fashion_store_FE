import React, { useEffect, useState } from 'react'
import { Modal, Space, Image } from 'antd'
import { ModalAllGoodsProps } from '../types/modalType'
import { AddButton, InputSearch, RemoveButton, TableList } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { formatDate } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import axios from 'axios'
import { BASE_URL, Colors } from '@/constants'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

type DataType = {
  id: string
  name: string
  price: number
  cost: number
  supplier: string
  gender: string
  type: string
  age: string
  color: string
  size: string
  image: string[]
}

const ModalAllGoods = (props: ModalAllGoodsProps) => {
  const [data, setData] = useState<DataType[]>()
  const [rowSelected, setRowSelected] = useState<string[]>(
    props?.extraData?.map((item: any) => item.id + item.size + item.color) ?? []
  )
  console.log(props.single)

  const getAllGoods = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/goodsData`)
      .then((response) => setData(response.data))
  }

  useEffect(() => {
    getAllGoods()
  }, [])

  const columns: ColumnsType<DataType> = []
  if (data) {
    columns.push({
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.id > b.id ? 1 : -1),
    })

    columns.push({
      title: 'Hình ảnh',
      dataIndex: 'image',
      render(text: string, record: DataType, index: number) {
        return {
          children: (
            <Image
              alt='img'
              src={record?.image ? record?.image[0] : ''}
              preview={{
                src: record?.image ? record?.image[0] : '',
              }}
              style={{
                maxWidth: 32,
                maxHeight: 32,
              }}
            />
          ),
        }
      },
    })

    columns.push({
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
    })

    columns.push({
      title: 'Giới tính',
      dataIndex: 'gender',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.gender > b.gender ? 1 : -1),
      filters: [
        { text: 'Nam', value: 'Nam' },
        { text: 'Nữ', value: 'Nữ' },
        { text: 'Unisex', value: 'Unisex' },
      ],
      onFilter: (value: string, record: DataType) =>
        record.gender.includes(value),
    })

    columns.push({
      title: 'Loại',
      dataIndex: 'type',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.type > b.type ? 1 : -1),
      filters: [
        { text: 'Áo khoác', value: 'Áo khoác' },
        { text: 'Áo thun', value: 'Áo thun' },
      ],
      onFilter: (value: string, record: DataType) =>
        record.type.includes(value),
    })

    columns.push({
      title: 'Lứa tuổi',
      dataIndex: 'age',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.age > b.age ? 1 : -1),
      filters: [
        { text: 'Người lớn', value: 'Người lớn' },
        { text: 'Trẻ em', value: 'Trẻ em' },
      ],
      onFilter: (value: string, record: DataType) => record.age.includes(value),
    })

    columns.push({
      title: 'Kích thước',
      dataIndex: 'size',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.size > b.size ? 1 : -1),
      filters: [
        { text: 'S', value: 'S' },
        { text: 'M', value: 'M' },
        { text: 'L', value: 'L' },
        { text: 'XL', value: 'XL' },
        { text: 'XXL', value: 'XXL' },
        { text: 'XXXL', value: 'XXXL' },
      ],
      onFilter: (value: string, record: DataType) =>
        record.size.includes(value),
    })

    columns.push({
      title: 'Màu sắc',
      dataIndex: 'color',
      render(text: string, record: DataType, index: number) {
        return {
          children: <div>{text}</div>,
        }
      },
      sorter: (a: DataType, b: DataType) => (a.color > b.color ? 1 : -1),
    })
  }

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {
      let _rowSelected = rowSelected
      if (selected) {
        _rowSelected = [..._rowSelected, record.id + record.size + record.color]
      } else {
        _rowSelected = rowSelected.filter((item: any) => {
          return record.id + record.size + record.color != item
        })
      }
      setRowSelected(_rowSelected)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected)
        setRowSelected(
          data?.map((item: any) => item.id + item.size + item.color) ?? []
        )
      else setRowSelected([])
    },
    selectedRowKeys: rowSelected,
  }

  return (
    <>
      <Modal
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
        footer={
          props.single ? (
            <></>
          ) : (
            [
              <Space key='btn'>
                <RemoveButton
                  label='Hủy'
                  key='cancel'
                  iconInput={<CloseOutlined />}
                  onClick={props.cancel}
                />
                <AddButton
                  key='add'
                  label='Lưu'
                  iconInput={<CheckOutlined />}
                />
              </Space>,
            ]
          )
        }
        width={'90%'}
      >
        <TableList<DataType>
          header={
            <div className='flex justify-between'>
              <b>Tất cả sản phẩm</b>
              <InputSearch
                style={{ backgroundColor: Colors.adminBackground }}
              />
            </div>
          }
          data={data ?? []}
          columns={columns}
          rowSelection={
            props.single ? undefined : { ...rowSelection, checkStrictly: true }
          }
          rowKey={['id', 'size', 'color']}
          scroll={{ y: '50vh' }}
        />
      </Modal>
    </>
  )
}

export default ModalAllGoods
