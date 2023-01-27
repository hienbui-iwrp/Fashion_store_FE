import { Layout, Menu, Image, Button, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Admin.module.css'
import { Colors } from '@/constants/colors'
import {
  AccountIcon,
  BranchIcon,
  EventIcon,
  GoodsIcon,
  OrderIcon,
  StaffIcon,
  StatisticIcon,
  WarehouseIcon,
} from '@/constants/asset/svg'

const { Header, Sider, Content } = Layout

const LayoutAdmin = ({
  content,
  selected,
}: {
  content: React.ReactNode
  selected: number
}) => {
  const [title, setTitle] = useState('')

  const menuItem = [
    {
      label: 'Chi nhánh',
      icon: BranchIcon,
      props: {
        size: selected == 0 ? 22 : 18,
        height: 22,
        stroke: selected == 0 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kinh doanh',
      icon: StatisticIcon,
      props: {
        size: selected == 1 ? 22 : 18,
        stroke: selected == 1 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Nhân viên',
      icon: StaffIcon,
      children: ['Nhân viên', 'Yêu cầu'],
      props: {
        size: selected == 20 || selected == 21 ? 22 : 18,
        stroke: selected == 20 || selected == 21 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Tài khoản',
      icon: AccountIcon,
      props: {
        size: selected == 3 ? 22 : 18,
        stroke: selected == 3 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Sự kiện',
      icon: EventIcon,
      props: {
        size: selected == 4 ? 22 : 18,
        stroke: selected == 4 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Hàng hóa',
      icon: GoodsIcon,
      props: {
        size: selected == 5 ? 22 : 18,
        stroke: selected == 5 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kho',
      icon: WarehouseIcon,
      props: {
        size: selected == 6 ? 22 : 18,
        stroke: selected == 6 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Đơn hàng',
      icon: OrderIcon,
      children: ['Cửa hàng', 'Trực tuyến'],
      props: {
        size: selected == 70 || selected == 71 ? 22 : 18,
        stroke: selected == 70 || selected == 71 ? Colors.white : Colors.gray,
      },
    },
  ]

  const siderItems: MenuProps['items'] = menuItem.map((item, index) => {
    return {
      key: index,
      icon: React.createElement(item.icon, item.props),
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

  const avatarItems: MenuProps['items'] = [
    {
      label: (
        <a
          onClick={(e) => {
            e.preventDefault()
            console.log('Đổi mật khẩu')
          }}
        >
          <Button
            className='border-0'
            size={'small'}
            onClick={() => {
              console.log('DMK')
            }}
          >
            Đổi mật khẩu
          </Button>
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault()
            console.log('Đăng xuất')
          }}
        >
          <Button
            className='border-0 flex items-center	'
            style={{ color: Colors.adminGreen900 }}
            icon={<LogoutOutlined />}
            size={'small'}
          >
            Đăng xuất
          </Button>
        </a>
      ),
      key: '1',
    },
  ]
  useEffect(() => {
    switch (selected) {
      case 0:
        setTitle('Quản lý chi nhánh')
        break
      case 1:
        setTitle('Quản lý hoạt động kinh doanh')
        break
      case 20:
      case 21:
        setTitle('Quản lý nhân viên')
        break
      case 3:
        setTitle('Quản lý tài khoản')
        break
      case 4:
        setTitle('Quản lý sự kiện')
        break
      case 5:
        setTitle('Quản lý hàng hóa')
        break
      case 6:
        setTitle('Quản lý kho')
        break
      case 70:
      case 71:
        setTitle('Quản lý đơn hàng')
        break
    }
  }, [selected])

  return (
    <Layout>
      <Sider className={styles.adminSider}>
        <div className={styles.adminContainer + ' z-20'}>
          <div className='my-8 flex-1 justify-end'>
            <h1 className='text-center text-white font-bold	text-3xl italic font-sans'>
              PTH Fashion
            </h1>
          </div>
          <Menu
            className={styles.adminMenu}
            mode='inline'
            defaultSelectedKeys={[selected.toString()]}
            items={siderItems}
          />
        </div>
      </Sider>
      <Layout className='relative !w-full'>
        <Header className='!bg-white drop-shadow flex justify-between items-center	!h-12 !sticky top-0 z-10'>
          <span className='text-black font-bold	text-xl leading-none	'>
            {title}
          </span>
          <Dropdown menu={{ items: avatarItems }} trigger={['click']}>
            <Button
              className='bg-emerald-50 border-0'
              icon={<Image width='30px' src='/Avatar.png' preview={false} />}
              size={'large'}
            />
          </Dropdown>
        </Header>
        <Content className='bg-emerald-50	!min-h-screen'>
          <div className={styles.adminContentContainer}>
            <Space direction='vertical' size={20}>
              {content}
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

LayoutAdmin.displayName = 'Layout Admin'

export default LayoutAdmin
