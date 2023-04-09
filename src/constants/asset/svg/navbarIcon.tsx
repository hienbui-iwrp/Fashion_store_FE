import { SvgIcon } from '@/utils'
import * as React from 'react'
import { memo } from 'react'

export const NavbarIcon = (props: SvgIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-black'
      fill={props.fill ?? 'currentColor'}
      viewBox='0 0 24 24'
      width={props.size ?? 15}
      height={props.size ?? 15}
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 6h16M4 12h16M4 18h16'
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth={props.strokeWidth ?? 3}
      />
    </svg>
  )
}
