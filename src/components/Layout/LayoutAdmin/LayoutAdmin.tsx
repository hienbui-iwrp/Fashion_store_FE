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
import Link from 'next/link'
import { ModalChangePassword } from '@/utils'
import Loading from '@/components/Loading'

const { Header, Sider, Content } = Layout

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [modalChangePassword, setModalChangePassword] = useState(false)

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('logged') === '') {
      router.replace('/login')
    }
  }
  const [loading, setLoading] = useState<Boolean>(true)
  const [title, setTitle] = useState('')
  const [itemSelected, setItemSelected] = useState(
    [
      Routes.admin.homepage,
      Routes.admin.branch,
      Routes.admin.branchDetail,
    ].includes(router.pathname)
      ? 0
      : [Routes.admin.statistic].includes(router.pathname)
      ? 1
      : [
          Routes.admin.homepage,
          Routes.admin.branch,
          Routes.admin.branchDetail,
        ].includes(router.pathname)
      ? 0
      : [Routes.admin.staff, Routes.admin.staffDetail].includes(router.pathname)
      ? 20
      : [Routes.admin.staffRequest].includes(router.pathname)
      ? 21
      : [Routes.admin.account, Routes.admin.accountDetail].includes(
          router.pathname
        )
      ? 3
      : [Routes.admin.event, Routes.admin.eventDetail].includes(router.pathname)
      ? 4
      : [
          Routes.admin.goods,
          Routes.admin.goodsDetail,
          Routes.admin.goodsTranfer,
        ].includes(router.pathname)
      ? 5
      : [Routes.admin.warehouse].includes(router.pathname)
      ? 6
      : [Routes.admin.order].includes(router.pathname)
      ? 70
      : [Routes.admin.orderOnline].includes(router.pathname)
      ? 71
      : 7
  )

  const menuItem = [
    {
      label: 'Chi nhánh',
      icon: BranchIcon,
      props: {
        size: itemSelected == 0 ? 25 : 18,
        height: 22,
        stroke: itemSelected == 0 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kinh doanh',
      icon: StatisticIcon,
      props: {
        size: itemSelected == 1 ? 25 : 18,
        stroke: itemSelected == 1 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Nhân viên',
      icon: StaffIcon,
      children: ['Nhân viên', 'Yêu cầu'],
      props: {
        size:
          itemSelected == 20 || itemSelected == 21 || itemSelected == 2
            ? 25
            : 18,
        stroke:
          itemSelected == 20 || itemSelected == 21 || itemSelected == 2
            ? Colors.white
            : Colors.gray,
      },
    },
    {
      label: 'Tài khoản',
      icon: AccountIcon,
      props: {
        size: itemSelected == 3 ? 25 : 18,
        stroke: itemSelected == 3 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Sự kiện',
      icon: EventIcon,
      props: {
        size: itemSelected == 4 ? 25 : 18,
        stroke: itemSelected == 4 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Hàng hóa',
      icon: GoodsIcon,
      props: {
        size: itemSelected == 5 ? 25 : 18,
        stroke: itemSelected == 5 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Kho',
      icon: WarehouseIcon,
      props: {
        size: itemSelected == 6 ? 25 : 18,
        stroke: itemSelected == 6 ? Colors.white : Colors.gray,
      },
    },
    {
      label: 'Đơn hàng',
      icon: OrderIcon,
      children: ['Cửa hàng', 'Trực tuyến'],
      props: {
        size:
          itemSelected == 70 || itemSelected == 71 || itemSelected == 7
            ? 25
            : 18,
        stroke:
          itemSelected == 70 || itemSelected == 71 || itemSelected == 7
            ? Colors.white
            : Colors.gray,
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
            router.push(Routes.admin.branch)
            break
          case 1:
            router.push(Routes.admin.statistic)
            break
          case 3:
            router.push(Routes.admin.account)
            break
          case 4:
            router.push(Routes.admin.event)
            break
          case 5:
            router.push(Routes.admin.goods)
            break
          case 6:
            router.push(Routes.admin.warehouse)
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
                router.push(Routes.admin.staff)
                break
              case '21':
                router.push(Routes.admin.staffRequest)
                break
              case '70':
                router.push(Routes.admin.order)
                break
              case '71':
                router.push(Routes.admin.orderOnline)
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
            e.stopPropagation()
            setModalChangePassword(true)
          }}
        >
          <Button
            className='border-0'
            size={'small'}
            onClick={(e) => {
              e.stopPropagation()
              setModalChangePassword(true)
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
      case 2:
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
      case 7:
      case 70:
      case 71:
        setTitle('Quản lý đơn hàng')
        break
    }
  }, [itemSelected])

  useEffect(() => {
    if (
      !localStorage.getItem('logged') ||
      localStorage.getItem('userRole') != '2'
    ) {
      router.replace(Routes.error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [router.pathname])

  return loading ? (
    <Loading />
  ) : (
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
            <Link
              href='/'
              className='flex justify-center items-center px-4 my-8'
            >
              <Image
                alt='img'
                style={{ maxWidth: 210, width: '100%', maxHeight: 90 }}
                src='/logo.png'
                preview={false}
              />
            </Link>
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
          <ModalChangePassword
            open={modalChangePassword}
            cancel={() => setModalChangePassword(false)}
          />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

LayoutAdmin.displayName = 'Layout Admin'

export default LayoutAdmin
