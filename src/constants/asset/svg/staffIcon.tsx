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
        d='M17 20.192h5v-2a3 3 0 0 0-5.356-1.857L17 20.192Zm0 0H7h10Zm0 0v-2c0-.656-.126-1.283-.356-1.857L17 20.192Zm-10 0H2v-2a3 3 0 0 1 5.356-1.857L7 20.192Zm0 0v-2c0-.656.126-1.283.356-1.857L7 20.192Zm.356-3.857a5.002 5.002 0 0 1 9.288 0H7.356ZM15 7.192a3 3 0 1 1-6 0 3 3 0 0 1 6 0v0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 2}
      />
    </svg>
  )
}

const StaffIcon = SvgComponent
// StaffIcon.displayName = 'Staff Icon'
export default StaffIcon
