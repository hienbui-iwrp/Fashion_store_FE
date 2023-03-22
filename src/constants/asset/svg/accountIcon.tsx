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
        d='M12.43 5.145a4 4 0 1 1 0 5.292V5.145Zm3 16.646h-12v-1a6 6 0 0 1 12 0v1Zm0 0h6v-1a6 6 0 0 0-9-5.197l3 6.197Zm-2-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0v0Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 2}
      />
    </svg>
  )
}

const AccountIcon = SvgComponent
// AccountIcon.displayName = 'Account Icon'
export default AccountIcon
