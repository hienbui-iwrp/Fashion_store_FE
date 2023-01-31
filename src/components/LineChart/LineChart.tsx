import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Colors } from '@/constants'
import { LineChartProps } from '@/utils/types/componentType'
const Line = dynamic(
  () => import('@ant-design/charts').then(({ Line }) => Line),
  { ssr: false, loading: () => <h1>Loading...</h1> }
)

interface DataType {
  date: Date
  value: number
  category: string
}

const LineChart = (props: LineChartProps) => {
  const [data, setData] = useState<DataType[]>([
    // { year: '1991', value: 3000000, category: 'a' },
  ])

  useEffect(() => {
    if (props.data) {
      let _data: any[] = []
      props.data?.forEach((item) => {
        if (props.haveRevenue) {
          _data = [
            ..._data,
            { date: item.date, value: item.revenue, category: 'revenue' },
          ]
        }
        if (props.haveProfit) {
          _data = [
            ..._data,
            { date: item.date, value: item.profit, category: 'profit' },
          ]
        }
      })
      setData(_data)
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
          return (
            date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
          )
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
    color: props.haveRevenue
      ? [Colors.adminGreen500, Colors.adminGreen900, '#4778EC', '#F8827D']
      : [Colors.adminGreen900, Colors.adminGreen500, '#4778EC', '#F8827D'],
    lineStyle: {
      lineWidth: 2,
      strokeOpacity: 0.9,
    },
    style: { width: '99%' },
  }

  return <Line {...config} />
}
export default LineChart
