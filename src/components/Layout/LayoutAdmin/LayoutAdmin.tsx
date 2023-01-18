import { Layout, Menu, Image } from 'antd'
import type { MenuProps } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import styles from '@/styles/Admin.module.css'

const { Header, Sider, Content } = Layout

const LayoutAdmin = memo(({ content }: { content: React.ReactElement }) => {
  console.log(typeof content)
  const menuItem = [
    { label: 'Chi nhánh', icon: HomeOutlined },
    { label: 'Kinh doanh', icon: HomeOutlined },
    {
      label: 'Nhân viên',
      icon: HomeOutlined,
      children: ['Nhân viên', 'Yêu cầu'],
    },
    { label: 'Tài khoản', icon: HomeOutlined },
    { label: 'Sự kiện', icon: HomeOutlined },
    { label: 'Hàng hóa', icon: HomeOutlined },
    { label: 'Kho', icon: HomeOutlined },
    {
      label: 'Đơn hàng',
      icon: HomeOutlined,
      children: ['Cửa hàng', 'Trực tuyến'],
    },
  ]

  const items: MenuProps['items'] = menuItem.map((item, index) => {
    return {
      key: index,
      icon: React.createElement(item.icon),
      label: item.label,
      onClick: () => {
        console.log(index)
      },

      children: item.children?.map((child, childIndex) => {
        return {
          key: index + '' + childIndex,
          label: child,
          onClick: () => {
            console.log(index + '' + childIndex)
          },
        }
      }),
    }
  })

  return (
    <Layout>
      <Sider className={styles.adminSider}>
        <div className='my-8 flex-1 justify-end'>
          <h1 className='text-center text-white font-bold	text-3xl italic font-sans'>
            PTH Fashion
          </h1>
        </div>
        <Menu
          className={styles.adminMenu}
          mode='inline'
          defaultSelectedKeys={['0']}
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
