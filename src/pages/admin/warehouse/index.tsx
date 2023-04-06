import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space } from 'antd'
import { AddButton, TableList } from '@/components'
import {
  formatAddress,
  formatDate,
  formatWarehouseDataXML,
  ModalAddEditWarehouse,
  WarehouseProps,
} from '@/utils'
import { InputSearch } from '@/components'
import { getWarehouseBFF } from '@/api'

const Warehouse = () => {
  const [data, setData] = useState<WarehouseProps[]>([])
  const [allData, setAllData] = useState<WarehouseProps[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAddEditWarehouse, setModalAddEditWarehouse] = useState(false)
  const [currentData, setCurrentData] = useState<WarehouseProps>()

  const columns: ColumnsType<WarehouseProps> = []
  if (data) {
    columns.push({
      title: 'Mã kho',
      dataIndex: 'id',
      render(text: string, record: WarehouseProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 80, maxWidth: 150 },
        }
      },
      sorter: (a: WarehouseProps, b: WarehouseProps) => (a.id > b.id ? 1 : -1),
      fixed: 'left',
    })

    columns.push({
      title: 'Tên kho',
      dataIndex: 'name',
      render(text: string, record: WarehouseProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 90 },
        }
      },
      sorter: (a: WarehouseProps, b: WarehouseProps) =>
        a.name > b.name ? 1 : -1,
      fixed: 'left',
    })

    columns.push({
      title: 'Địa chỉ',
      dataIndex: '',
      render(text: string, record: WarehouseProps, index: number) {
        return formatAddress(record)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: WarehouseProps, b: WarehouseProps) =>
        formatAddress(a) > formatAddress(b) ? 1 : -1,
    })

    columns.push({
      title: 'Sức chứa',
      dataIndex: 'capacity',
      render(text: string, record: WarehouseProps, index: number) {
        return text
      },
      onCell: (record) => {
        return {
          style: { minWidth: 100 },
        }
      },
      sorter: (a: WarehouseProps, b: WarehouseProps) =>
        a.capacity > b.capacity ? 1 : -1,
    })

    // columns.push({
    //   title: 'Còn lại',
    //   dataIndex: 'empty',
    //   render(text: string, record: WarehouseProps, index: number) {
    //     return text
    //   },
    //   onCell: (record) => {
    //     return {
    //       style: { minWidth: 100 },
    //     }
    //   },
    //   sorter: (a: WarehouseProps, b: WarehouseProps) =>
    //     a.empty > b.empty ? 1 : -1,
    // })

    // columns.push({
    //   title: 'Quản lý',
    //   dataIndex: 'manager',
    //   render(text: string, record: WarehouseProps, index: number) {
    //     return text
    //   },
    //   onCell: (record) => {
    //     return {
    //       style: { minWidth: 100 },
    //     }
    //   },
    //   sorter: (a: WarehouseProps, b: WarehouseProps) =>
    //     a.manager > b.manager ? 1 : -1,
    // })

    // columns.push({
    //   title: 'Nhân viên',
    //   dataIndex: 'staff',
    //   render(text: string, record: WarehouseProps, index: number) {
    //     return text
    //   },
    //   onCell: (record) => {
    //     return {
    //       style: { minWidth: 100 },
    //     }
    //   },
    //   sorter: (a: WarehouseProps, b: WarehouseProps) =>
    //     a.staff > b.staff ? 1 : -1,
    // })

    columns.push({
      title: 'Ngày thành lập',
      dataIndex: 'createdDate',
      render(text: string, record: WarehouseProps, index: number) {
        return formatDate(text)
      },
      onCell: (record) => {
        return {
          style: { minWidth: 130 },
        }
      },
      sorter: (a: WarehouseProps, b: WarehouseProps) =>
        a.createdDate > b.createdDate ? 1 : -1,
    })
  }

  const getData = async () => {
    await getWarehouseBFF()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')

        const _data = res.Data.map((item: WarehouseProps) =>
          formatWarehouseDataXML(item)
        )
        setData(_data)
        setAllData(_data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <div className='flex justify-between'>
          <AddButton
            label='Thêm mới'
            onClick={() => {
              setCurrentData(undefined)
              setModalAddEditWarehouse(true)
            }}
            large
          />
          <InputSearch
            onEnter={(text) => {
              setLoading(true)
              setData(
                allData.filter(
                  (account: WarehouseProps) =>
                    account.id.toLowerCase().includes(text.toLowerCase()) ||
                    account.name.toLowerCase().includes(text.toLowerCase())
                )
              )
              setLoading(false)
            }}
            onClear={() => {
              setData(allData)
            }}
          />
        </div>
        <TableList<WarehouseProps>
          data={data}
          title='Danh sách kho'
          columns={columns}
          loading={loading}
          ellipsis={true}
          scroll={{ x: '75vw' }}
          onSelectRow={() => setModalAddEditWarehouse(true)}
          callback={(item: any) => setCurrentData(item)}
        />
      </Space>
      {modalAddEditWarehouse && (
        <ModalAddEditWarehouse
          open={modalAddEditWarehouse}
          cancel={() => setModalAddEditWarehouse(false)}
          extraData={currentData}
          callback={(item) => {
            setLoading(true)
            setTimeout(() => {
              getData()
              setLoading(false)
            }, 1000)
          }}
        />
      )}
    </>
  )
}

Warehouse.displayName = 'Warehouse Management'

export default Warehouse
