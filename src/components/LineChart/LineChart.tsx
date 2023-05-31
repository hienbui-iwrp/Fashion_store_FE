import React, { useState, useEffect, memo } from 'react'
import dynamic from 'next/dynamic'
import { Colors } from '@/constants'
import { LineChartProps } from '@/utils/types/componentType'
import { Skeleton } from 'antd'
import { formatDate, formatNumber } from '@/utils'

const Line = dynamic(
  () => import('@ant-design/charts').then(({ Line }) => Line),
  { ssr: false, loading: () => <Skeleton active paragraph={{ rows: 10 }} /> }
)

interface DataType {
  date: Date
  value: number
  category: string
}

const LineChart = memo((props: LineChartProps) => {
  const [data, setData] = useState<DataType[]>([])

  useEffect(() => {
    if (props.data) {
      let _data: any[] = []
      props.data?.forEach((item) => {
        if (props.revenue) {
          _data = [
            ..._data,
            { date: item.date, value: item.revenue, category: 'Doanh thu' },
          ]
        }
        if (props.profit) {
          _data = [
            ..._data,
            { date: item.date, value: item.profit, category: 'Lợi nhuận' },
          ]
        }
      })
      setData(_data.sort((a: DataType, b: DataType) => b.date.getMilliseconds() - a.date.getMilliseconds()))
    }
  }, [props.data])

  const config = {
    data: data,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
      label: {
        style: {
          fill: '#000',
        },
        formatter: (value: any) => {
          const date = new Date(value)
          return formatDate(date)
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#000',
        },
        formatter: (value: string) =>
          `${value}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    point: {
      size: 3,
      shape: 'diamond',
    },
    smooth: true,
    loading: false,
    colorField: 'item',
    color: props.revenue
      ? [Colors.adminGreen500, Colors.adminGreen900, '#4778EC', '#F8827D']
      : [Colors.adminGreen900, Colors.adminGreen500, '#4778EC', '#F8827D'],
    lineStyle: {
      lineWidth: 2,
      strokeOpacity: 0.9,
    },
    style: { width: '99%' },
  }

  return (
    <div {...props}>
      {props.showTotal && (
        <b>
          {formatNumber(
            (props.revenue
              ? props.data?.reduce((sum, item) => {
                return sum + (item.revenue ?? 0)
              }, 0)
              : props.data?.reduce((sum, item) => {
                return sum + (item.profit ?? 0)
              }, 0)) ?? 0
          )}{' '}
          VND
        </b>
      )}
      <div
        className='flex justify-center items-center text-lg'
        style={{ minHeight: 300 }}
      >
        {data[0] && <Line {...config} />}
        {!data[0] && <b>Không có dữ liệu</b>}
      </div>
    </div>
  )
})

LineChart.displayName = 'LineChart'
export default LineChart
