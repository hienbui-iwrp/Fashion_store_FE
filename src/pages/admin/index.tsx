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

  console.log(content)
  return <LayoutAdmin content={content} />
})

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
