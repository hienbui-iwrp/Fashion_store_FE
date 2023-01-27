import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Colors } from '@/constants'
const Line = dynamic(
  () => import('@ant-design/charts').then(({ Line }) => Line),
  { ssr: false }
)

const LineChart = () => {
  const [data, setData] = useState([
    { year: '1991', value: 3000000, category: 'a' },
    { year: '1992', value: 40000, category: 'b' },
    { year: '1993', value: 30000.5, category: 'c' },
    { year: '1994', value: 500000, category: 'a' },
    { year: '1995', value: 40000.9, category: 'b' },
    { year: '1996', value: 600000, category: 'c' },
    { year: '1997', value: 7000000, category: 'c' },
    { year: '1998', value: 900000, category: 'b' },
    { year: '1999', value: 130000, category: 'a' },
  ])

  const config = {
    data: data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
      label: {
        style: {
          fill: '#000',
        },
        formatter: (value: any) => {
          return new Date(value).getFullYear()
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
      size: 2,
      shape: 'diamond',
    },
    smooth: true,
    loading: false,
    colorField: 'item',
    color: [Colors.adminGreen500, Colors.adminGreen900, '#4778EC', '#F8827D'],
    lineStyle: {
      lineWidth: 2,
      strokeOpacity: 0.9,
    },
    style: { width: '99%' },
  }

  return <Line {...config} />
}
export default LineChart
