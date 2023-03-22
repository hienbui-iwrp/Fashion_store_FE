import { Layout, Menu, Image, Button, Dropdown, ConfigProvider } from 'antd'
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
import { useRouter } from 'next/router'
import { Routes } from '@/constants'

const { Header, Sider, Content } = Layout

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('logged') === '') {
      router.replace('/login')
    }
  }

  const [title, setTitle] = useState('')
  const [itemSelected, setItemSelected] = useState(0)
  const [logged, setLogged] = useState(false)

  const menuItem = [
    {
      label: 'Chi nhánh',
      icon: BranchIcon,
      props: {
        size: itemSelected == 0 ? 22 : 18,
        height: 22,
        stroke: itemSelected == 0 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kinh doanh',
      icon: StatisticIcon,
      props: {
        size: itemSelected == 1 ? 22 : 18,
        stroke: itemSelected == 1 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Nhân viên',
      icon: StaffIcon,
      children: ['Nhân viên', 'Yêu cầu'],
      props: {
        size: itemSelected == 2 ? 22 : 18,
        stroke: itemSelected == 2 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Tài khoản',
      icon: AccountIcon,
      props: {
        size: itemSelected == 3 ? 22 : 18,
        stroke: itemSelected == 3 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Sự kiện',
      icon: EventIcon,
      props: {
        size: itemSelected == 4 ? 22 : 18,
        stroke: itemSelected == 4 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Hàng hóa',
      icon: GoodsIcon,
      props: {
        size: itemSelected == 5 ? 22 : 18,
        stroke: itemSelected == 5 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kho',
      icon: WarehouseIcon,
      props: {
        size: itemSelected == 6 ? 22 : 18,
        stroke: itemSelected == 6 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Đơn hàng',
      icon: OrderIcon,
      children: ['Cửa hàng', 'Trực tuyến'],
      props: {
        size: itemSelected == 7 ? 22 : 18,
        stroke: itemSelected == 7 ? Colors.white : Colors.gray,
      },
    },
  ]

  const siderItems: MenuProps['items'] = menuItem.map((item, index) => {
    return {
      key: index,
      icon: React.createElement(item.icon, item.props),
      label: item.label,
      onClick: () => {
        setItemSelected(index)
        switch (index) {
          case 0:
            router.push('/admin/branch')
            break
          case 1:
            router.push('/admin/statistic')
            break
          case 3:
            router.push('/admin/account')
            break
          case 4:
            router.push('/admin/event')
            break
          case 5:
            router.push('/admin/goods')
            break
          case 6:
            router.push('/admin/warehouse')
            break
        }
      },

      children: item.children?.map((child, childIndex) => {
        return {
          key: index + '' + childIndex,
          label: child,
          onClick: () => {
            switch (index + '' + childIndex) {
              case '20':
                router.push('/admin/staff')
                break
              case '21':
                router.push('/admin/staff/request')
                break
              case '70':
                router.push('/admin/order')
                break
              case '71':
                router.push('/admin/order/online')
                break
            }
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
        <Button
          onClick={() => {
            localStorage.setItem('logged', '')
            router.push('/login')
          }}
          className='border-0 flex items-center	'
          style={{ color: Colors.adminGreen900 }}
          icon={<LogoutOutlined />}
          size={'small'}
        >
          Đăng xuất
        </Button>
      ),
      key: '1',
    },
  ]

  useEffect(() => {
    switch (itemSelected) {
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
  }, [itemSelected])

  useEffect(() => {
    if (
      !localStorage.getItem('logged') ||
      localStorage.getItem('userRole') == '1'
    ) {
      router.replace(Routes.error)
    }
  }, [router.pathname])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Colors.adminGreen500,
          colorPrimaryBg: Colors.adminBackground,
        },
      }}
    >
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
              defaultSelectedKeys={[itemSelected.toString()]}
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
                icon={
                  <Image
                    alt='img'
                    width='30px'
                    src='/Avatar.png'
                    preview={false}
                  />
                }
                size={'large'}
              />
            </Dropdown>
          </Header>
          <Content className='bg-emerald-50	!min-h-screen'>
            <div className={styles.adminContentContainer}>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

LayoutAdmin.displayName = 'Layout Admin'

export default LayoutAdmin
