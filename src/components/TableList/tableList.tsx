import React from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import { BASE_URL, Colors, Routes } from '@/constants'
import { TableListProps } from '@/utils/types/componentType'
import { useRouter } from 'next/router'

const TableList = function <T extends object>(props: TableListProps<T>) {
  const router = useRouter()

  const tableProps: TableProps<T> = {
    bordered: false,
    loading: props?.loading ?? false,
    size: 'small',
    expandable: undefined,
    title: () => props.title && <b style={{ fontSize: 17 }}>{props.title}</b>,
    footer: undefined,
    showHeader: true,
    scroll: { x: props?.scroll?.x ?? '20vw', y: props?.scroll?.y ?? '70vh' },
    tableLayout: 'auto',
    pagination: {
      position: props.pagination ?? true ? ['bottomRight'] : [],
      pageSize: props.pageSize ?? 30,
    },
    rowSelection: props?.rowSelection,
    rowKey: props.rowKey
      ? (record: any) => {
          const key = props?.rowKey?.reduce(
            (total, item) => total + record[item],
            ''
          )
          return key
        }
      : (record: any) => record?.id ?? '',
  }

  const tableColumns = props?.columns?.map((item: any) => ({
    ...item,
    ellipsis: props.ellipsis ?? true,
  }))

  return (
    <div
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingTop: props.header ? 15 : 0,
        paddingBottom: props.pagination ?? true ? 0 : 20,
        maxWidth: '80vw',
      }}
    >
      <div style={{ marginBottom: 10 }}>{props.header}</div>
      <Table
        rowClassName={(record, index) =>
          index % 2 === 1 ? 'table-row-light' : 'table-row-green'
        }
        columns={tableColumns}
        dataSource={props.data ?? []}
        onRow={(record: any, index) => {
          return {
            onClick: (event) => {
              props.callback && props.callback(record)
              props.selectUrl &&
                router.push(props.selectUrl + `?id=${record.id}`)
              props.onSelectRow && props.onSelectRow()
            },
          }
        }}
        style={{ width: '99%' }}
        {...tableProps}
      />
    </div>
  )
}

export default TableList
