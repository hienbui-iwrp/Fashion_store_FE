import React from 'react'
import { Layout, Menu } from 'antd'
import { memo } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'

const BranchManagement = memo(() => {
  const content = (
    <div>
      <h1>abc</h1>
    </div>
  )

  return <LayoutAdmin content={content} />
})

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
