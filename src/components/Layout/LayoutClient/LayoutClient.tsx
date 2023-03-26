import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import type { MenuProps } from 'antd'
import {
  Layout,
  Col,
  Row,
  Image,
  Input,
  Menu,
  Typography,
  Popover,
  Button,
  Dropdown,
} from 'antd'
import ButtonHeader from './../../Button/ButtonHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Routes } from '@/constants'

const { Header, Footer, Content } = Layout
const { Search } = Input
const { Title } = Typography
interface ItemNavProps {
  label: string
  link?: string
  hasSubItem?: boolean
  listSubItem?: ItemNavProps[]
  key: string
}

const listItem: ItemNavProps[] = [
  {
    label: 'Giới thiệu',
    link: 'intro',
    hasSubItem: false,
    key: 'Giới thiệu',
  },
  {
    label: 'Tất cả sản phẩm',
    link: 'products',
    hasSubItem: true,
    listSubItem: [
      {
        label: 'Giày',
        key: 'shoe',
      },
      {
        label: 'Dép',
        key: 'dep',
      },
      {
        label: 'Áo khoác',
        key: 'coat',
      },
      {
        label: 'Áo thun',
        key: 'T-shirt',
      },
    ],
    key: 'Tất cả sản phẩm',
  },
  {
    label: 'Nam',
    link: 'man',
    hasSubItem: true,
    listSubItem: [
      {
        label: 'Giày',
        key: 'shoe',
      },
      {
        label: 'Dép',
        key: 'dep',
      },
      {
        label: 'Áo khoác',
        key: 'coat',
      },
      {
        label: 'Áo thun',
        key: 'T-shirt',
      },
    ],
    key: 'Tất cả sản phẩm',
  },
  {
    label: 'Nữ',
    link: 'woman',
    hasSubItem: true,
    listSubItem: [
      {
        label: 'Giày',
        key: 'shoe',
      },
      {
        label: 'Dép',
        key: 'dep',
      },
      {
        label: 'Áo khoác',
        key: 'coat',
      },
      {
        label: 'Áo thun',
        key: 'T-shirt',
      },
    ],
    key: 'Nữ',
  },
  {
    label: 'Trẻ em',
    link: 'baby',
    hasSubItem: true,
    listSubItem: [
      {
        label: 'Giày',
        key: 'shoe',
      },
      {
        label: 'Dép',
        key: 'dep',
      },
      {
        label: 'Áo khoác',
        key: 'coat',
      },
      {
        label: 'Áo thun',
        key: 'T-shirt',
      },
    ],
    key: 'Trẻ em',
  },
  {
    label: 'Phụ kiện',
    link: 'accessory',
    hasSubItem: true,
    listSubItem: [
      {
        label: 'Giày',
        key: 'shoe',
      },
      {
        label: 'Dép',
        key: 'dep',
      },
      {
        label: 'Áo khoác',
        key: 'coat',
      },
      {
        label: 'Áo thun',
        key: 'T-shirt',
      },
    ],
    key: 'phụ kiện',
  },
  // {
  //   label: 'Mới về',
  //   link: 'new',
  //   hasSubItem: false,
  //   key: 'Mới về',
  // },
  // {
  //   label: 'Flash sale',
  //   link: 'sales',
  //   hasSubItem: false,
  //   key: 'Flash sale',
  // },
  {
    label: 'Hỗ trợ',
    link: 'support',
    hasSubItem: false,
    key: 'Hỗ trợ',
  },
]

const iconFb: React.ReactNode = (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path
      fillRule='evenodd'
      d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
      clipRule='evenodd'
    />
  </svg>
)
const iconIg: React.ReactNode = (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path
      fillRule='evenodd'
      d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
      clipRule='evenodd'
    />
  </svg>
)
const iconTwitter: React.ReactNode = (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
  </svg>
)
// Children must be rendered, otherwise the child routes cannot be displayed
// Here you can also set global provision
const onSearch = (value: string) => console.log(value)

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [navbar, setNavbar] = useState(false)
  const [logged, setLogged] = useState(false)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          onClick={() => {
            localStorage.setItem('logged', '')
            router.push('/login')
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ]

  useEffect(() => {
    if (localStorage.getItem('logged') !== '') {
      setLogged(true)
      console.log(localStorage.getItem('userRole'))
      if (localStorage.getItem('userRole') !== '1') {
        router.replace(Routes.error)
      }
    }
  }, [router.pathname])

  return (
    <Layout className='m-auto bg-gray-200' style={{ minHeight: '100vh' }}>
      <Header className='header-client !bg-neutral-50 !p-0 !h-full'>
        <Row className='flex'>
          <Col span={15} className='flex items-center '>
            <a href='#' className='flex'>
              <Image
                alt='img'
                width='150px'
                className='pl-10'
                src='/logo_pth.png'
                preview={false}
                onClick={() => {
                  router.replace('/')
                }}
              />
            </a>
            <Search
              className='pl-10 w-2/5 md:w-3/5'
              placeholder='Tìm kiếm...'
              onSearch={onSearch}
              // style={{ width: 200 }}
            />
          </Col>
          <Col span={9} className='flex justify-around items-center'>
            <Link href='/manage-orders' prefetch={false} passHref>
              <ButtonHeader name='Quản lý đơn hàng' />
            </Link>
            <Link href='/cart' prefetch={false} passHref>
              <ButtonHeader
                name='Giỏ hàng'
                icon={
                  <FontAwesomeIcon className='pr-2' icon={faCartShopping} />
                }
              />
            </Link>
            {!logged ? (
              <Link href='/login'>
                <ButtonHeader
                  name='Đăng nhập'
                  icon={<FontAwesomeIcon className='pr-2' icon={faUser} />}
                />
              </Link>
            ) : (
              <Dropdown menu={{ items }} placement='bottom'>
                <Link href='/user-info'>
                  <ButtonHeader
                    name='Nguyễn Đức A'
                    icon={<FontAwesomeIcon className='pr-2' icon={faUser} />}
                  />
                </Link>
              </Dropdown>
            )}
          </Col>
        </Row>
        {/* <Menu
          className='bg-[#F9F9F9] !leading-8'
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={listItem.map((item, index) => {
            const key = index + 1;
            return {
              key,
              label: item.label,
            };
          })}
        /> */}
        <nav
          className='w-full !bg-green-100 shadow'
          // className='w-full bg-[#F9F9F9] shadow'
          style={{ backgroundColor: '#ddd' }}
        >
          <div className='mx-auto md:items-center md:flex md:px-8 lg:px-16 '>
            <div>
              <div className='flex items-center justify-end py-3 md:py-5 md:block'>
                <div className='md:hidden'>
                  <button
                    className='p-2 text-black rounded-md outline-none border-black border'
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-black'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4 6h16M4 12h16M4 18h16'
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? 'block' : 'hidden'
                }`}
              >
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 '>
                  {listItem.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className='text-black text-sm hover:cursor-pointer'
                        style={{ fontWeight: '600' }}
                      >
                        <Link href={`/${item.link}` || '/'}>{item.label}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Header>
      <Content className='bg-stone-50 pt-6 pb-24 px-3 sm:px-6 md:px-8 lg:px-16 '>
        {children}
      </Content>
      <Footer className='!bg-black !text-white'>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <div>
              <Title className='!text-white'>FASHION</Title>
              <Typography className='text-white'>
                268 Lý Thường Kiệt, Quận 10, Tp.HCM
              </Typography>
              <Typography className='text-white'>0867742135</Typography>
              <Typography className='text-white'>
                sp.pfashion1@gmail.com
              </Typography>
              <div className='flex mt-1 space-x-6'>
                <a
                  href='#'
                  className='text-yellow-600 hover:text-yellow-400 dark:hover:text-yellow-400'
                >
                  {iconFb}
                </a>
                <a
                  href='#'
                  className='text-yellow-600 hover:text-yellow-400 dark:hover:text-yellow-400'
                >
                  {iconIg}
                </a>
                <a
                  href='#'
                  className='text-yellow-600 hover:text-yellow-400 dark:hover:text-yellow-400'
                >
                  {iconTwitter}
                </a>
              </div>
            </div>
          </Col>
          <Col className='gutter-row' span={6}>
            <div>
              <Title className='!text-gray-300' level={4}>
                Về chúng tôi
              </Title>
              <ul className='text-gray-600 dark:text-gray-400'>
                <li className='mb-4'>
                  <Link
                    href='#'
                    className='hover:underline hover:text-gray-300'
                  >
                    Trang chủ
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link
                    href='#'
                    className='hover:underline hover:text-gray-300'
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link
                    href='#'
                    className='hover:underline hover:text-gray-300'
                  >
                    Hỗ trợ
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className='gutter-row' span={6}>
            <div>
              <Title className='!text-gray-300' level={4}>
                Truy cập nhanh
              </Title>
              <ul className='text-gray-600 dark:text-gray-400'>
                <li className='mb-4'>
                  <Link
                    href='/intro'
                    className='hover:underline hover:text-gray-300'
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline hover:text-gray-300'>
                    Hướng dẫn chọn size
                  </a>
                </li>
                <li className='mb-4'>
                  <Link
                    href='#'
                    className='hover:underline hover:text-gray-300'
                  >
                    Quản lý đơn hàng
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}
