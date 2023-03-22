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
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 2}
        d='M11 21.494h4m5 0v-16a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16h14Zm0 0h2-2Zm0 0h-5 5Zm-14 0H4h2Zm0 0h5-5Zm4-14h1-1Zm0 4h1-1Zm5-4h1-1Zm0 4h1-1Zm-4 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h-4Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const WarehouseIcon = SvgComponent
// WarehouseIcon.displayName = 'Wareh2ouse Icon'
export default WarehouseIcon
