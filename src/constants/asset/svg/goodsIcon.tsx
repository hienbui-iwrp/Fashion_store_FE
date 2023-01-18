import { SvgIcon } from '@/utils'
import * as React from 'react'
import { memo } from 'react'

const SvgComponent = (props: SvgIcon) => {
  console.log(props)
  return (
    <svg
      width={props.size ?? 23}
      height={props.size ?? 23}
      fill={props.fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 23 23'
    >
      <path
        d='M6 3.313a2.2 2.2 0 0 0-2.2 2.2v2.2a2.2 2.2 0 0 0 2.2 2.2h2.2a2.2 2.2 0 0 0 2.2-2.2v-2.2a2.2 2.2 0 0 0-2.2-2.2H6Zm0 8.8a2.2 2.2 0 0 0-2.2 2.2v2.2a2.2 2.2 0 0 0 2.2 2.2h2.2a2.2 2.2 0 0 0 2.2-2.2v-2.2a2.2 2.2 0 0 0-2.2-2.2H6Zm6.6-6.6a2.2 2.2 0 0 1 2.2-2.2H17a2.2 2.2 0 0 1 2.2 2.2v2.2a2.2 2.2 0 0 1-2.2 2.2h-2.2a2.2 2.2 0 0 1-2.2-2.2v-2.2Zm0 8.8a2.2 2.2 0 0 1 2.2-2.2H17a2.2 2.2 0 0 1 2.2 2.2v2.2a2.2 2.2 0 0 1-2.2 2.2h-2.2a2.2 2.2 0 0 1-2.2-2.2v-2.2Z'
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 2}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  )
}

const GoodsIcon = memo(SvgComponent)
GoodsIcon.displayName = 'Goods Icon'
export default GoodsIcon
