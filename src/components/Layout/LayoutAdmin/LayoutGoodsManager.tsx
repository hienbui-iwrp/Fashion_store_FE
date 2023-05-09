import { Layout, Menu, Image, Button, Dropdown, ConfigProvider } from 'antd'
import type { MenuProps } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Admin.module.css'
import { Colors } from '@/constants/colors'
import { GoodsIcon } from '@/constants/asset/svg'
import { useRouter } from 'next/router'
import { Routes } from '@/constants'
import Link from 'next/link'
import { ModalChangePassword } from '@/utils'
import Loading from '@/components/Loading'

const { Header, Sider, Content } = Layout

export const LayoutGoodsManager = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const [modalChangePassword, setModalChangePassword] = useState(false)

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('logged') === '') {
      router.replace('/login')
    }
  }
  const [loading, setLoading] = useState<Boolean>(true)

  const menuItem = [
    {
      label: 'Hàng hóa',
      icon: GoodsIcon,
      props: {
        size: 25,
        stroke: Colors.white,
      },
    },
  ]

  const siderItems: MenuProps['items'] = menuItem.map((item, index) => {
    return {
      key: index,
      icon: React.createElement(item.icon, item.props),
      label: item.label,
      onClick: () => {
        router.push(Routes.goodsManager.goods)
      },
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
    if (
      !localStorage.getItem('logged') ||
      localStorage.getItem('userRole') != '5'
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
              defaultSelectedKeys={['0']}
              items={siderItems}
            />
          </div>
        </Sider>
        <Layout className='relative !w-full'>
          <Header className='!bg-white drop-shadow flex justify-between items-center	!h-12 !sticky top-0 z-10'>
            <span className='text-black font-bold	text-xl leading-none	'>
              Quản lý hàng hóa
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
