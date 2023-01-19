import { SvgIcon } from '@/utils'
import * as React from 'react'
import { memo } from 'react'

const SvgComponent = (props: SvgIcon) => {
  return (
    <svg
      width={props.size ?? 23}
      height={props.size ?? 23}
      fill={props.fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 23 23'
    >
      <path
        d='M16 8.748v8-8Zm-4 3v5-5Zm-4 3v2-2Zm-2 6h12a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 2}
      />
    </svg>
  )
}

const StatisticIcon = memo(SvgComponent)
StatisticIcon.displayName = 'Statistic Icon'
export default StatisticIcon
