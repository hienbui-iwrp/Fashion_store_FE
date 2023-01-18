import React from 'react'
import { Layout, Menu } from 'antd'
import { memo } from 'react'
import LayoutAdmin from '@/components/Layout/LayoutAdmin/LayoutAdmin'
import AddButton from '@/components/Button/AddButton'

const BranchManagement = memo(() => {
  const content = (
    <div>
      <AddButton label='Thêm mới' />
      <h1>abc</h1>
    </div>
  )

  return <LayoutAdmin content={content} selected={0} />
})

BranchManagement.displayName = 'Branch Management'

export default BranchManagement
