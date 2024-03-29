import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux'
import { selectUser } from '@/redux'
import { userActions } from '@/redux'
import type { MenuProps } from 'antd'
import { Layout, Col, Row, Image, Input, Typography, Dropdown } from 'antd'
import ButtonHeader from './../../Button/ButtonHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faCartShopping,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons'
import {
  Colors,
  FacebookIcon,
  GoodsTypes,
  InstagramIcon,
  NavbarCloseIcon,
  NavbarIcon,
  Routes,
  TwitterIcon,
} from '@/constants'
import { getCustomerInfoBff, searchProductsBff } from '@/api'
import {
  ProductDetailDataProps,
  formatProductsDataXML,
  formatUserDataXML,
} from '@/utils'
import { InputSearch } from '@/components/Input'
import styles from './LayoutClient.module.css'
import ProductsSearch from '@/components/ProductsSearch'
import Loading from '@/components/Loading'

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

const secondaryList: ItemNavProps[] = [
  {
    label: 'Nam',
    link: Routes.products + '?gender=man',
    hasSubItem: false,
    key: 'Nam',
  },
  {
    label: 'Nữ',
    link: Routes.products + '?gender=woman',
    hasSubItem: false,
    key: 'Nữ',
  },
  ...GoodsTypes.map((item) => {
    return {
      label: item.label,
      link: Routes.products + '?type=' + item.value,
      hasSubItem: false,
      key: 'item.label',
    }
  }),
]

const primaryList: ItemNavProps[] = [
  {
    label: 'Giới thiệu',
    link: Routes.intro,
    hasSubItem: false,
    key: 'Giới thiệu',
  },
  {
    label: 'Sản phẩm',
    link: Routes.products,
    hasSubItem: false,
    key: 'Sản phẩm',
  },
  {
    label: 'Hỗ trợ',
    link: Routes.support,
    hasSubItem: false,
    key: 'Hỗ trợ',
  },
]

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { setUserInfo } = userActions
  const dataCustomer = useSelector(selectUser)
  const [loading, setLoading] = useState<Boolean>(true)

  const [navbar, setNavbar] = useState(false)
  const [logged, setLogged] = useState(false)
  const [searching, setSearching] = useState(false)
  const [dataProductsSearch, setDataProductsSearch] = useState<
    ProductDetailDataProps[]
  >([])

  const handleSearch = async (e: any) => {
    console.log(e.target.value)
    const value = e.target.value.trim()
    if (value.length > 0) {
      setSearching(true)
      await searchProductsBff(value, 7).then((res) => {
        if (res?.StatusCode === '200') {
          const data = formatProductsDataXML(res?.Data)
          setDataProductsSearch(data)
        }
      })
    }
  }
  const handleBlurSearch = () => {
    setTimeout(() => {
      setSearching(false)
    }, 500)
  }

  const onSearch = (value: string) => {
    setSearching(false)
    router.push(`/products?search=${value}`)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          className='min-w-max'
          onClick={() => {
            localStorage.setItem('logged', '')
            router.push(Routes.login)
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ]

  const fetchUserInfo = async () => {
    const res = await getCustomerInfoBff(localStorage.getItem('userId') || '')
    if (res?.StatusCode == 200) {
      const dataUser = formatUserDataXML(res?.Data[0])
      dispatch(setUserInfo(dataUser))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('logged') !== '') {
      setLogged(true)
      fetchUserInfo()
      console.log('object select', dataCustomer)
      console.log(localStorage.getItem('userRole'))
      if (localStorage.getItem('userRole') !== '1') {
        router.replace(Routes.error)
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  // }, [router.pathname])

  return loading ? (
    <Loading />
  ) : (
    <Layout
      className='m-auto bg-gray-200 relative'
      style={{ minHeight: '100vh' }}
    >
      <Header
        // className='header-client !bg-white !p-0 z-50  fixed right-0	left-0	top-0 w-full '
        className='header-client !bg-gradient-to-br to-green-400 from-emerald-700 !p-0 z-50  fixed right-0	left-0	top-0 w-full '
        // className='header-client !bg-emerald-600 !p-0 z-50  fixed right-0	left-0	top-0 w-full '
        style={{ boxShadow: `0px 3px 4px 0px ${Colors.shadow}` }}
      >
        <Row align='middle'>
          <Col xs={6} sm={8} md={4} lg={4} xl={4}>
            <Link href='/' className='flex justify-center items-center px-4'>
              <Image
                alt='img'
                style={{ maxWidth: 180, width: '100%', maxHeight: 60 }}
                src='/logo.png'
                preview={false}
              />
            </Link>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} xl={5}>
            <ul className='items-center justify-around  w-full hidden md:flex'>
              {primaryList.map((item, index) => {
                const textColor =
                  item.link == router.pathname ? 'text-white' : 'text-gray-300'
                return (
                  <li
                    key={index}
                    className='text-sm hover:cursor-pointer px-2'
                    style={{ fontWeight: '600' }}
                  >
                    <Link
                      className={`${textColor}	 hover:text-white	 text-lg`}
                      // className={`${textColor}	 hover:text-gray-700	 text-lg`}
                      // className='text-emerald-600 hover:text-emerald-400 text-lg	'
                      href={`${item.link}` || '/'}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Col>
          <Col xs={8} sm={10} md={15} lg={10} xl={12}>
            <div className=' px-2 md:px-8 w-full'>
              <InputSearch
                style={{
                  width: '100%',
                  backgroundColor: Colors.clientBlack100,
                }}
                placeholder='Tìm kiếm...'
                onChange={handleSearch}
                onBlur={handleBlurSearch}
                onEnter={onSearch}
              />
              {searching && (
                <ProductsSearch productsSearch={dataProductsSearch} />
              )}
            </div>
          </Col>
          <Col xs={10} sm={6} md={5} lg={4} xl={3}>
            <div className='flex justify-around items-center w-full pr-4'>
              {logged && (
                <Link href='/manage-orders' passHref>
                  <ButtonHeader
                    icon={
                      <FontAwesomeIcon
                        className='w-5 h-5'
                        icon={faFileInvoice}
                      />
                    }
                  />
                </Link>
              )}
              {logged && (
                <Link href='/cart' passHref>
                  <ButtonHeader
                    icon={
                      <FontAwesomeIcon
                        className='w-5 h-5'
                        icon={faCartShopping}
                      />
                    }
                  />
                </Link>
              )}
              {!logged ? (
                <Link
                  href='/login'
                  // className='hover:bg-emerald-400 rounded-full h-10 pr-4 flex items-center hover:text-white text-white'
                  className=' rounded-full h-10 pr-4 flex items-center text-gray-300 hover:text-white'
                >
                  <ButtonHeader
                    icon={<FontAwesomeIcon className='w-5 h-5' icon={faUser} />}
                    name={'Đăng nhập'}
                  />
                  {/* <span className='w-max text-md'>Đăng nhập</span> */}
                </Link>
              ) : (
                <Dropdown menu={{ items }} placement='bottom'>
                  <Link href='/user-info'>
                    <ButtonHeader
                      icon={
                        <FontAwesomeIcon className='w-5 h-5' icon={faUser} />
                      }
                    />
                  </Link>
                </Dropdown>
              )}
              <div className='flex items-center justify-end md:hidden'>
                <button
                  className='p-2 text-black rounded-md outline-none border mr-4'
                  onClick={() => setNavbar(!navbar)}
                  style={{
                    borderColor: Colors.white,
                    height: 'fit-content',
                  }}
                >
                  {navbar ? (
                    <NavbarCloseIcon
                      fill={Colors.white}
                      stroke={Colors.white}
                    />
                  ) : (
                    <NavbarIcon fill={Colors.white} stroke={Colors.white} />
                  )}
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <nav
          className='w-full bg-white'
          style={{ boxShadow: `0px 3px 4px 0px ${Colors.shadow}` }}
        >
          <div className='mx-auto md:items-center md:flex md:px-8 lg:px-16 '>
            <div
              className={`flex-1 justify-self-center pb-3 w-full md:flex md:pb-0 md:mt-0 ${
                navbar ? 'flex' : 'hidden'
              }`}
            >
              <ul className='justify-start items-center w-full space-y-0 md:flex md:space-x-4 md:space-y-0 px-8 md:px-4 py-1 hidden md:flex '>
                {secondaryList.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className='text-green-600 hover:text-emerald-700 text-sm	'
                      // className='text-emerald-600 hover:text-emerald-600 text-xs	'
                      href={`${item.link}` || '/'}
                    >
                      <li
                        className='text-sm hover:cursor-pointer text-xs hover:bg-green-200 md:!ml-1.5 px-0 lg:px-1 rounded-full'
                        style={{ fontWeight: '600' }}
                      >
                        {item.label}
                      </li>
                    </Link>
                  )
                })}
              </ul>
              <ul className='justify-start w-full space-y-0 md:flex md:space-x-4 md:space-y-0 px-8 md:px-4 pb-2 md:hidden block'>
                {primaryList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='text-sm hover:cursor-pointer text-xs  hover:bg-gray-100	py-2 px-2 rounded-full'
                      style={{ fontWeight: '600' }}
                    >
                      <Link
                        className='text-gray-700 hover:text-gray-700 text-xs	'
                        href={`${item.link}` || '/'}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </nav>
      </Header>
      <Content
        className='bg-[#fefefe] md:pt-28 pt-20 pb-24 px-3 sm:px-6 md:px-8 lg:px-16 '
        style={{ backgroundColor: Colors.clientBackground }}
      >
        {children}
      </Content>
      <Footer className='!bg-black !text-white'>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <div>
              <Title className='!text-white'>PTH FASHION</Title>
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
                  className='hover:text-yellow-400 dark:hover:text-yellow-400'
                  style={{ color: Colors.clientEmerald700 }}
                >
                  <FacebookIcon />
                </a>
                <a
                  href='#'
                  className=' hover:text-yellow-400 dark:hover:text-yellow-400'
                  style={{ color: Colors.clientEmerald700 }}
                >
                  <InstagramIcon />
                </a>
                <a
                  href='#'
                  className='hover:text-yellow-400 dark:hover:text-yellow-400'
                  style={{ color: Colors.clientEmerald700 }}
                >
                  <TwitterIcon />
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
                <li className='mb-4'>
                  <div>
                    Logo created by{' '}
                    <a
                      href='https://www.designevo.com/'
                      title='Free Online Logo Maker'
                    >
                      DesignEvo logo maker
                    </a>
                  </div>
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
