import { Layout, Menu, Image, Button, Dropdown, ConfigProvider } from 'antd'
import type { MenuProps } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import React, { use, useEffect, useState } from 'react'
import styles from '@/styles/Admin.module.css'
import { Colors } from '@/constants/colors'
import { OrderIcon, StaffIcon, StatisticIcon } from '@/constants/asset/svg'
import { useRouter } from 'next/router'
import { Routes } from '@/constants'
import Link from 'next/link'
import { ModalChangePassword, formatStaffDataXML } from '@/utils'
import { getStaffDetailBFF } from '@/api'

const { Header, Sider, Content } = Layout

export const LayoutBranchLeader = ({
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

  const [title, setTitle] = useState('')
  const [itemSelected, setItemSelected] = useState(
    [
      Routes.branchLeader.homepage,
      Routes.branchLeader.staff,
      Routes.branchLeader.staffDetail,
    ].includes(router.pathname)
      ? 0
      : [Routes.branchLeader.statistic].includes(router.pathname)
      ? 1
      : 2
  )

  const menuItem = [
    {
      label: 'Nhân viên',
      icon: StaffIcon,
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
      label: 'Đơn hàng',
      icon: OrderIcon,
      props: {
        size: itemSelected == 2 ? 25 : 18,
        stroke: itemSelected == 2 ? Colors.white : Colors.gray,
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
            router.push(Routes.branchLeader.staff)
            break
          case 1:
            router.push(Routes.branchLeader.statistic)
            break
          case 2:
            router.push(Routes.branchLeader.order)
            break
        }
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
            localStorage.setItem('branchId', '')
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
        setTitle('Quản lý nhân viên')
        break
      case 1:
        setTitle('Quản lý hoạt động kinh doanh')
        break
      case 2:
        setTitle('Quản lý đơn hàng')
        break
    }
  }, [itemSelected])

  useEffect(() => {
    if (
      !localStorage.getItem('logged') ||
      localStorage.getItem('userRole') != '6'
    ) {
      router.replace(Routes.error)
    }
  }, [router.pathname])

  const getData = () => {
    setTimeout(async () => {
      await getStaffDetailBFF(localStorage.getItem('userId'))
        .then((res: any) => {
          const _data = formatStaffDataXML(res.Data[0])
          localStorage.setItem('branchId', _data.branchId ?? '')
        })
        .catch((error) => {
          console.log(error)
        })
    }, 500)
  }
  useEffect(() => {
    getData()
  }, [])

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
