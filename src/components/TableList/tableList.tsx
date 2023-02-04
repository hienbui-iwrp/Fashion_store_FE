import React from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import { BASE_URL, Colors } from '@/constants'
import { TableListProps } from '@/utils/types/componentType'
import { useRouter } from 'next/router'

const TableList = function <T extends object>(props: TableListProps<T>) {
  const router = useRouter()

  const tableProps: TableProps<T> = {
    bordered: false,
    loading: props?.loading ?? false,
    size: 'small',
    expandable: undefined,
    title: () =>
      props.title && (
        <h1>
          <b>{props.title}</b>
        </h1>
      ),
    footer: undefined,
    showHeader: true,
    scroll: { x: props?.scroll?.x ?? '60vw', y: props?.scroll?.y ?? '70vh' },
    tableLayout: 'auto',
    pagination: { position: ['bottomRight'], pageSize: props.pageSize ?? 30 },
  }

  const tableColumns = props?.columns.map((item: any) => ({
    ...item,
    ellipsis: props.ellipsis ?? false,
  }))

  return (
    <div
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: Colors.white,
        borderRadius: 12,
      }}
      {...props}
    >
      <Table
        columns={props.columns}
        dataSource={props.data ?? []}
        onRow={(record: any, index) => {
          return {
            onClick: (event) => {
              props.callBack && props.callBack(record)
              props.selectUrl &&
                router.push(props.selectUrl + `?id=${record.id}` ?? BASE_URL)
              props.onSelectRow && props.onSelectRow()
            },
          }
        }}
        {...tableProps}
      />
    </div>
  )
}

export default TableList
