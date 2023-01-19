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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.989 14.695c1.174 0 2.13.905 2.13 2.017v2.861c0 .24.201.43.459.436h1.86c1.465 0 2.656-1.121 2.656-2.5V9.396a1.537 1.537 0 0 0-.65-1.217l-6.433-4.89a2.448 2.448 0 0 0-2.938.002L3.685 8.177c-.422.306-.66.752-.664 1.235v8.097c0 1.379 1.191 2.5 2.656 2.5h1.877c.265 0 .48-.2.48-.445 0-.054.006-.108.018-.16v-2.692c0-1.105.95-2.01 2.116-2.017h2.82Zm4.448 6.71H15.56c-1.075-.025-1.904-.83-1.904-1.832v-2.86c0-.344-.3-.623-.667-.623h-2.816c-.36.002-.658.282-.658.622v2.852c0 .07-.01.137-.03.2-.105.92-.93 1.64-1.93 1.64H5.676c-2.272 0-4.12-1.747-4.12-3.895V9.405c.01-.924.457-1.77 1.229-2.327L9.16 2.2a3.964 3.964 0 0 1 4.761-.002l6.422 4.882a2.893 2.893 0 0 1 1.213 2.306v8.123c0 2.148-1.847 3.895-4.12 3.895Z'
        fill={props.stroke ?? '#fff'}
        stroke={props.stroke ?? '#fff'}
        strokeWidth={props.strokeWidth ?? 1}
      />
    </svg>
  )
}

const BranchIcon = memo(SvgComponent)
BranchIcon.displayName = 'Branch Icon'
export default BranchIcon
