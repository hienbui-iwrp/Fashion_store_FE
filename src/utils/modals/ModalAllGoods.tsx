import React, { useEffect, useState } from 'react'
import { Modal, Space, Image } from 'antd'
import { ModalAllGoodsProps } from '../types/modalType'
import { AddButton, InputSearch, RemoveButton, TableList } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { GoodsProps, formatGoodsDataXML, formatRouteImage } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { Colors, GoodsAges, GoodsGenders, GoodsTypes } from '@/constants'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { getGoodsBFF } from '@/api'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const ModalAllGoods = (props: ModalAllGoodsProps) => {
  const [data, setData] = useState<GoodsProps[]>()
  const [allData, setAllData] = useState<GoodsProps[]>([])
  const [rowSelected, setRowSelected] = useState<string[]>(
    props?.extraData?.map((item: any) => item.id) ?? []
  )
  const [loading, setLoading] = useState(false)

  const getAllGoods = async () => {
    setLoading(true)
    await getGoodsBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: GoodsProps) =>
          formatGoodsDataXML(item)
        )
        setData(_data)
        setAllData(_data)
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    if (!props.allGoods) getAllGoods()
    else setData(props.allGoods)
  }, [])

  const columns: ColumnsType<GoodsProps> = []
  if (data) {
    columns.push({
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      render(text: string, record: GoodsProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 120 },
        }
      },
      sorter: (a: GoodsProps, b: GoodsProps) => (a.id > b.id ? 1 : -1),
      fixed: 'left',
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
                ? (record?.image[0])
                : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
            }
            style={{
              maxWidth: 32,
              maxHeight: 32,
            }}
          />
        )
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80 },
        }
      },
      fixed: 'left',
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
  }

  const rowSelection: TableRowSelection<GoodsProps> = {
    onChange: (selectedRowKeys, selectedRows) => { },
    onSelect: (record, selected, selectedRows) => {
      let _rowSelected = rowSelected
      if (selected) {
        _rowSelected = [..._rowSelected, record.id]
      } else {
        _rowSelected = rowSelected.filter((item: any) => {
          return record.id != item
        })
      }
      setRowSelected(_rowSelected)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected)
        setRowSelected(
          // data?.map((item: any) => item.id + item.size + item.color) ?? []
          data?.map((item: any) => item.id) ?? []
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
                  icon={<CloseOutlined />}
                  onClick={props.cancel}
                />
                <AddButton
                  key='add'
                  label='Lưu'
                  icon={<CheckOutlined />}
                  onClick={() => {
                    props.callback && props.callback(rowSelected)
                    props.cancel && props.cancel()
                  }}
                />
              </Space>,
            ]
          )
        }
        width={'90%'}
      >
        <TableList<GoodsProps>
          header={
            <div className='flex justify-between'>
              <b>Tất cả sản phẩm</b>
              <InputSearch
                style={{ backgroundColor: Colors.adminBackground }}
                onEnter={(text) => {
                  setData(
                    (props.allGoods ?? allData).filter(
                      (account: GoodsProps) =>
                        account.id.toLowerCase().includes(text.toLowerCase()) ||
                        account.name.toLowerCase().includes(text.toLowerCase())
                    )
                  )
                }}
                onClear={() => {
                  setData(props.allGoods ?? allData)
                }}
              />
            </div>
          }
          loading={loading}
          data={data ?? []}
          columns={columns}
          rowSelection={
            props.single ? undefined : { ...rowSelection, checkStrictly: true }
          }
          onSelectRow={(record) => {
            if (props.single) {
              props.callback && props.callback(record)
            }
          }}
          rowKey={['id']}
          scroll={{ y: '50vh' }}
          maxWidth={'100%'}
        />
      </Modal>
    </>
  )
}

export default ModalAllGoods
