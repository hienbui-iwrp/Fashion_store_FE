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
        fill='#fff'
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 1}
        fillRule='evenodd'
        clipRule='evenodd'
        d='m12.04 2.995 1.348-.84h4.94l1.228 2.362-3.282 5.138h2.671l1.08 2.542L9.347 23.155 6.944 21.41l3.154-5.755H8.267l-1.347-2.16 5.12-10.5Zm.55 11.16-4.32 7.957 10.677-10.957h-5.56l4.942-7.5h-4.941l-5.121 10.5h4.323Z'
      />
    </svg>
  )
}

const EventIcon = memo(SvgComponent)
EventIcon.displayName = 'Event Icon'
export default EventIcon
