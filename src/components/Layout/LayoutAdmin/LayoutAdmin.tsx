import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import React, { memo } from 'react'
import styles from '@/styles/BranchManagement.module.css'

const { Header, Sider, Content } = Layout

const LayoutAdmin = memo(({ content }: { content: React.ReactElement }) => {
  console.log(typeof content)
  const items: MenuProps['items'] = [
    HomeOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1)

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      onClick: () => {
        console.log(key)
      },

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`,
        }
      }),
      style: { color: 'white' },
    }
  })
  return (
    <Layout>
      <Sider className='!bg-green h-screen'>
        <Menu
          className={styles.sider}
          mode='inline'
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{content}</Content>
      </Layout>
    </Layout>
  )
})

LayoutAdmin.displayName = 'Layout Admin'

export default LayoutAdmin
