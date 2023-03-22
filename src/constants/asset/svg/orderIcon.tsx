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
        d='M5 3.083H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-2m-6 0h6m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m-6 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const OrderIcon = SvgComponent
// OrderIcon.displayName = 'Order Icon'
export default OrderIcon
